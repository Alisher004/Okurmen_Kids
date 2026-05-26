'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Loader2, Play, Video, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { resolveVideoUrl } from '@/lib/videoEmbed';
import { isYouTubeShortUrl } from '@/lib/youtube';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

type VideoTestimonialsProps = {
  id?: string;
  title?: string;
  subtitle?: string;
};

function isVerticalVideoUrl(url: string): boolean {
  return isYouTubeShortUrl(url);
}

function VideoCard({
  video,
  isPlaying,
  onPlay,
  onClose,
}: {
  video: { id: string; title: string; studentName: string; videoUrl: string; thumbnail?: string };
  isPlaying: boolean;
  onPlay: () => void;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const resolved = resolveVideoUrl(video.videoUrl, { autoplay: true });
  const thumb = video.thumbnail || resolved?.thumbnail;
  const isVertical = isVerticalVideoUrl(video.videoUrl);

  useEffect(() => {
    if (isPlaying) setLoading(true);
  }, [isPlaying]);

  const handlePlay = () => {
    setLoading(true);
    onPlay();
  };

  const frameClass = isVertical ? 'shorts-frame shorts-frame--vertical' : 'landscape-frame';
  const cardWidthClass = isVertical ? 'scroll-row-card-shorts' : 'scroll-row-card';

  return (
    <article className={cardWidthClass}>
      <div className={frameClass}>
        <AnimatePresence mode="wait">
          {isPlaying && resolved ? (
            <motion.div
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-gold-400" />
                </div>
              )}
              {resolved.kind === 'native' ? (
                <video
                  src={resolved.src}
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  onLoadedData={() => setLoading(false)}
                  onCanPlay={() => setLoading(false)}
                />
              ) : (
                <iframe
                  src={resolved.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  onLoad={() => setLoading(false)}
                />
              )}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition hover:bg-black/90"
                aria-label="Жабуу"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ) : isPlaying && !resolved ? (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 p-4 text-center"
            >
              <p className="text-xs text-slate-300 sm:text-sm">Бул шилтемени сайтта ойнотуу мүмкүн эмес</p>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex text-xs sm:text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Сырткы ачуу
              </a>
              <button type="button" onClick={onClose} className="text-xs text-slate-400 underline">
                Жабуу
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="thumb"
              type="button"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handlePlay}
              className="group relative h-full w-full"
              aria-label={`${video.title} видеосун ойнотуу`}
            >
              {thumb ? (
                <Image
                  src={thumb}
                  alt=""
                  fill
                  className="object-cover object-center"
                  unoptimized
                  sizes={isVertical ? '240px' : '320px'}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-800 via-brand-navy-900 to-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 transition group-hover:from-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg transition group-hover:scale-105">
                  <Play className="ml-0.5 h-6 w-6 text-brand-navy-900" />
                </span>
              </div>
              {isVertical && (
                <span className="absolute left-2 top-2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  Shorts
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

export default function VideoTestimonials({
  id = 'reviews',
  title = 'Окуучулардын жана ата-энелердин пикирлери',
  subtitle = 'Чыныгы тажрыйба — видео форматында',
}: VideoTestimonialsProps) {
  const { videoReviews, publicDataLoaded } = useData();
  const active = videoReviews.filter((v) => v.isActive !== false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollStep = 260;

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -scrollStep : scrollStep, behavior: 'smooth' });
  };

  const navButtons =
    active.length > 1 ? (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold-400"
          aria-label="Мурунку"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold-400"
          aria-label="Кийинки"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    ) : undefined;

  return (
    <section id={id} className="section-layer">
      <div className="site-container">
        <SectionHeading badgeIcon={Video} badge="Пикирлер" title={title} subtitle={subtitle} actions={navButtons} />

        {!publicDataLoaded ? (
          <div className="scroll-row gap-4 sm:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="scroll-row-card-shorts shorts-frame animate-pulse bg-white/5" />
            ))}
          </div>
        ) : active.length === 0 ? (
          <EmptyState icon={Video} title="Видео пикирлер жакында" />
        ) : (
          <div ref={scrollRef} className="scroll-row gap-4 sm:gap-5 md:gap-6">
            {active.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isPlaying={playingId === video.id}
                onPlay={() => setPlayingId(video.id)}
                onClose={() => setPlayingId(null)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
