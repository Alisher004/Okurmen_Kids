'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, Play, Video, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/lib/youtube';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

type VideoTestimonialsProps = {
  id?: string;
  title?: string;
  subtitle?: string;
};

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
  const thumb = video.thumbnail || getYouTubeThumbnail(video.videoUrl);
  const embed = getYouTubeEmbedUrl(video.videoUrl, { autoplay: true });

  useEffect(() => {
    if (isPlaying) setLoading(true);
  }, [isPlaying]);

  const handlePlay = () => {
    setLoading(true);
    onPlay();
  };

  return (
    <article className="scroll-row-card">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black/50">
        <AnimatePresence mode="wait">
          {isPlaying && embed ? (
            <motion.div
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-gold-400" />
                </div>
              )}
              <iframe
                src={embed}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setLoading(false)}
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                aria-label="Жабуу"
              >
                <X className="h-4 w-4" />
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
              {thumb && (
                <Image src={thumb} alt="" fill className="object-cover" unoptimized sizes="320px" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/20">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90">
                  <Play className="ml-0.5 h-5 w-5 text-brand-navy-900" />
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 px-0.5">
        <p className="line-clamp-2 text-sm font-semibold text-white">{video.title}</p>
        <p className="mt-0.5 text-xs text-slate-400">{video.studentName}</p>
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

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
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
          <div className="scroll-row">
            {[1, 2, 3].map((i) => (
              <div key={i} className="scroll-row-card aspect-video animate-pulse rounded-lg bg-white/5" />
            ))}
          </div>
        ) : active.length === 0 ? (
          <EmptyState icon={Video} title="Видео пикирлер жакында" />
        ) : (
          <div ref={scrollRef} className="scroll-row gap-4 sm:gap-5">
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
