'use client';

import { motion } from 'framer-motion';

const shapes = [
  { className: 'h-24 w-24 rounded-2xl border-2 border-brand-navy-400/50 bg-white/55 shadow-lg', x: '10%', y: '14%', delay: 0, dur: 12, z: 50 },
  { className: 'h-16 w-16 rounded-full border-2 border-brand-gold-400/70 bg-brand-gold-200/50 shadow-md', x: '82%', y: '18%', delay: 0.8, dur: 9, z: 80 },
  { className: 'h-20 w-20 rotate-45 rounded-xl border-2 border-brand-navy-300/60 bg-white/50 shadow-lg', x: '48%', y: '52%', delay: 0.4, dur: 14, z: 110 },
  { className: 'h-14 w-14 rounded-full bg-brand-navy-400/35 shadow-md', x: '88%', y: '68%', delay: 1.5, dur: 11, z: 70 },
  { className: 'h-28 w-28 rounded-full border-2 border-brand-gold-400/55 bg-brand-gold-100/30 shadow-lg', x: '5%', y: '62%', delay: 0.2, dur: 16, z: 40 },
  { className: 'h-12 w-32 rounded-full border border-brand-navy-300/50 bg-white/40', x: '62%', y: '28%', delay: 1, dur: 13, z: 95 },
];

type Background3DProps = {
  variant?: 'default' | 'bold';
};

export default function Background3D({ variant = 'default' }: Background3DProps) {
  const intense = variant === 'bold';
  const gridOpacity = intense ? 0.55 : 0.42;
  const starCount = intense ? 48 : 32;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-mesh-luxury" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#fef9ee]/25" />

      <div className="absolute -left-24 top-10 h-[32rem] w-[32rem] rounded-full bg-brand-navy-400/35 blur-[90px]" />
      <div className="absolute -right-16 top-1/5 h-[28rem] w-[28rem] rounded-full bg-brand-gold-400/40 blur-[80px]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-brand-navy-300/30 blur-[70px]" />

      {/* Infinite scrolling 3D grid */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '800px', perspectiveOrigin: '50% 58%' }}
      >
        <motion.div
          className="relative h-[220%] w-[220%]"
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(68deg)' }}
          animate={{ y: ['-18%', '18%'] }}
          transition={{ duration: intense ? 8 : 12, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 16 }).map((_, row) =>
            Array.from({ length: 16 }).map((_, col) => (
              <div
                key={`g-${row}-${col}`}
                className="absolute border border-brand-navy-400/35 bg-brand-navy-50/10"
                style={{ width: 64, height: 64, left: col * 64, top: row * 64 }}
              />
            ))
          )}
        </motion.div>
      </div>

      {/* Floating shapes + orbital rings */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1100px', perspectiveOrigin: '50% 38%' }}
      >
        <motion.div
          className="relative h-full w-full max-w-7xl"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: [4, -4, 4], rotateY: [-8, 8, -8] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className={`absolute backdrop-blur-[2px] ${shape.className}`}
              style={{ left: shape.x, top: shape.y, transform: `translateZ(${shape.z}px)` }}
              animate={{ y: [0, -28, 0], rotateZ: [0, 18, 0], rotateY: [0, 25, 0] }}
              transition={{ duration: shape.dur, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-brand-navy-400/40"
            style={{ transform: 'translate(-50%, -50%) translateZ(-80px) rotateX(72deg)' }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-brand-gold-500/55"
            style={{ transform: 'translate(-50%, -50%) translateZ(100px) rotateX(58deg)' }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-navy-300/45"
            style={{ transform: 'translate(-50%, -50%) translateZ(20px) rotateX(75deg)' }}
            animate={{ rotateZ: 360, scale: [1, 1.08, 1] }}
            transition={{
              rotateZ: { duration: 35, repeat: Infinity, ease: 'linear' },
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </motion.div>
      </div>

      {/* Secondary rotating grid plane */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '600px', opacity: gridOpacity }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="h-[160%] w-[160%] bg-[linear-gradient(90deg,rgba(59,113,185,0.35)_1px,transparent_1px),linear-gradient(rgba(59,113,185,0.35)_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ transform: 'rotateX(62deg)' }}
        />
      </motion.div>

      {/* Gold particles */}
      {Array.from({ length: starCount }).map((_, i) => (
        <motion.div
          key={`s-${i}`}
          className="absolute rounded-full bg-brand-gold-500 shadow-[0_0_8px_rgba(255,184,0,0.6)]"
          style={{
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            left: `${(i * 17) % 97}%`,
            top: `${(i * 23) % 97}%`,
          }}
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -24, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 20%, rgba(59, 113, 185, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 85% 15%, rgba(255, 184, 0, 0.22) 0%, transparent 40%)`,
        }}
      />
    </div>
  );
}
