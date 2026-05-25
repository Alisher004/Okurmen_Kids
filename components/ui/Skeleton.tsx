'use client';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />;
}

export function HeroCarouselSkeleton() {
  return (
    <section className="relative h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#0a0f1a]" aria-hidden>
      <Skeleton className="absolute inset-0 rounded-none" />
      <div
        className="relative z-10 flex h-full flex-col justify-end px-4 pb-12 sm:px-6"
        style={{ paddingTop: 'max(var(--nav-height), env(safe-area-inset-top, 0px))' }}
      >
        <Skeleton className="mb-3 h-3 w-28" />
        <Skeleton className="mb-3 h-12 w-full max-w-md" />
        <Skeleton className="h-4 w-full max-w-sm" />
        <div className="mt-6 flex gap-2">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-28" />
        </div>
      </div>
    </section>
  );
}
