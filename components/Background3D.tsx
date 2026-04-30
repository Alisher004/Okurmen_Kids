'use client';

import { motion } from 'framer-motion';

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background - Blue to Gold */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-amber-400 opacity-90" />
      
      {/* Animated mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.5)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(251,191,36,0.5)_0%,transparent_50%)]" />
      </div>

      {/* Floating 3D geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl backdrop-blur-sm"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(15deg)',
        }}
      />

      <motion.div
        className="absolute top-1/3 right-20 w-40 h-40 bg-gradient-to-br from-amber-300/20 to-amber-500/20 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-36 h-36 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm"
        animate={{
          y: [0, -25, 0],
          rotate: [0, -180, -360],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateY(25deg)',
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full backdrop-blur-sm"
        animate={{
          y: [0, 35, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-44 h-44 bg-gradient-to-br from-blue-300/15 to-amber-300/15 rounded-3xl backdrop-blur-sm"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px) rotateX(20deg) rotateY(20deg)',
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Light particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
