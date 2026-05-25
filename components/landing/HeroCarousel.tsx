'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { HeroCarouselSkeleton } from '@/components/ui/Skeleton';
import {
  FALLBACK_BANNERS,
  isExternalLink,
  normalizeBanner,
  type NormalizedBanner,
} from '@/lib/heroBanner';
import type { Banner } from '@/lib/types';

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 48;

function useSlides(banners: Banner[], loaded: boolean): NormalizedBanner[] {
  const fallbackSlides = FALLBACK_BANNERS.map((b, i) =>
    normalizeBanner({ ...b, id: `fallback-${i}` } as Banner)
  );

  if (!loaded) return fallbackSlides;

  const active = banners
    .filter((b) => b.isActive !== false)
    .sort((a, b) => a.order - b.order)
    .map(normalizeBanner);

  if (active.length > 0) return active;

  return fallbackSlides;
}

function CtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalLink(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SlideBackground({
  slide,
  priority,
}: {
  slide: NormalizedBanner;
  priority?: boolean;
}) {
  const overlayStrength = 0.35 + (slide.overlayOpacity / 100) * 0.45;
  const useUnoptimized = (url: string) =>
    !url.includes('images.unsplash.com') && !url.includes('firebasestorage.googleapis.com');

  return (
    <div className="absolute inset-0">
      <Image
        src={slide.desktopImage}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="hidden object-cover object-center lg:block"
        unoptimized={useUnoptimized(slide.desktopImage)}
        aria-hidden
      />
      <Image
        src={slide.mobileImage}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center lg:hidden"
        unoptimized={useUnoptimized(slide.mobileImage)}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/60 to-[#0a0f1a]/25"
        style={{ opacity: overlayStrength + 0.2 }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/92 via-[#0a0f1a]/55 to-transparent lg:via-[#0a0f1a]/40"
        style={{ opacity: overlayStrength }}
        aria-hidden
      />
    </div>
  );
}

function HeroSlideContent({ slide }: { slide: NormalizedBanner }) {
  const centered = slide.textAlign === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex flex-1 items-center"
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      <div className="site-container w-full pb-28 pt-8 sm:pb-32 sm:pt-10 lg:pb-24 lg:pt-12">
        <div
          className={`max-w-xl sm:max-w-2xl lg:max-w-[34rem] ${
            centered ? 'mx-auto text-center' : 'text-left'
          }`}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold-400 sm:text-xs">
            Okurmen Kids · IT Academy
          </p>
          <h1
            className={`font-bold leading-[1.06] tracking-tight text-white ${
              centered
                ? 'mx-auto text-[clamp(1.85rem,6.5vw,3.75rem)]'
                : 'text-[clamp(1.75rem,6vw,3.5rem)]'
            }`}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p
              className={`mt-4 text-sm leading-relaxed text-slate-200/90 sm:mt-5 sm:text-base md:text-lg ${
                centered ? 'mx-auto max-w-lg' : 'max-w-md sm:max-w-lg'
              }`}
            >
              {slide.subtitle}
            </p>
          )}
          {slide.valueProposition && (
            <p
              className={`mt-3 text-xs leading-relaxed text-slate-400 sm:text-sm ${
                centered ? 'mx-auto max-w-md' : 'max-w-sm'
              }`}
            >
              {slide.valueProposition}
            </p>
          )}
          <div
            className={`mt-7 flex flex-col gap-3 sm:mt-8 ${
              centered ? 'justify-center' : ''
            }`}
          >
            <CtaLink href={slide.primaryCtaLink} className="btn-primary px-7 py-3.5 text-sm sm:text-base">
              {slide.primaryCtaText}
              <ArrowRight className="h-4 w-4" />
            </CtaLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const arrowClass =
  'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold-400 sm:h-12 sm:w-12';

export default function HeroCarousel() {
  const { banners, publicDataLoaded } = useData();
  const slides = useSlides(banners, publicDataLoaded);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const isFallback = publicDataLoaded && banners.filter((b) => b.isActive !== false).length === 0;
  const multi = slides.length > 1;

  const goTo = useCallback(
    (i: number) => {
      if (slides.length === 0) return;
      setIndex(((i % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!multi || paused || reduceMotion) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [multi, slides.length, paused, reduceMotion]);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [slides.length, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!multi) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [multi, prev, next]);

  useEffect(() => {
    const first = slides[0];
    if (!first?.desktopImage) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = first.mobileImage || first.desktopImage;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [slides]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || !multi) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  const slide = slides[index];
  if (!slide) return <HeroCarouselSkeleton />;

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="hero"
      className="relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#0a0f1a]"
      aria-roledescription="carousel"
      aria-label="Hero баннерлер"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${slides.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0 flex flex-col"
        >
          <SlideBackground slide={slide} priority={index === 0} />
          <HeroSlideContent slide={slide} />
        </motion.div>
      </AnimatePresence>

      {multi && (
        <>
          <button
            type="button"
            onClick={prev}
            className={`absolute left-3 top-1/2 z-30 -translate-y-1/2 ${arrowClass} sm:left-5 lg:left-8`}
            aria-label="Мурунку слайд"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className={`absolute right-3 top-1/2 z-30 -translate-y-1/2 ${arrowClass} sm:right-5 lg:right-8`}
            aria-label="Кийинки слайд"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 pb-6 sm:pb-8">
            <div className="site-container flex flex-col items-center gap-3">
              <div
                className="pointer-events-auto flex items-center gap-2"
                role="tablist"
                aria-label="Слайддар"
              >
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Слайд ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-1 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold-400 ${
                      i === index ? 'w-10 bg-brand-gold-400' : 'w-5 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[11px] font-medium tabular-nums tracking-wider text-white/40">
                {index + 1} / {slides.length}
              </p>
            </div>
          </div>
        </>
      )}

      {isFallback && (
        <p className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 text-center text-[10px] text-white/20">
          Админ панелден баннер кошсоңуз, бул жерде көрүнөт
        </p>
      )}
    </section>
  );
}
