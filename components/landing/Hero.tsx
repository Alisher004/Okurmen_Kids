'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Counter Animation Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  const whatsappNumber = '+996500677798';
  const whatsappMessage = 'Салам! Окурмен Kids курстары жөнүндө маалымат алгым келет.';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/+996500677798?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50/90 backdrop-blur-md border border-blue-200 px-6 py-3 rounded-full mb-8 shadow-sm">
              <span className="text-sm md:text-base font-semibold text-slate-800">
                🎓 Бишкектеги балдар үчүн IT академиясы
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-950 mb-6 leading-tight">
              9-15 жаштагы балдар үчүн{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                IT курстар
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
              Балдарыңыздын келечегин бүгүн баштаңыз. Программалоо, веб-дизайн жана логика өнүктүрүү курстары.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl transition-all duration-300"
              >
                📱 WhatsApp аркылуу жазылуу
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/90 backdrop-blur-md border-2 border-slate-200 hover:bg-blue-50 text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300"
              >
                Курстарды көрүү
              </motion.button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: 500, label: 'Студенттер', suffix: '+' },
                { value: 10, label: 'Мугалимдер', suffix: '+' },
                { value: 3, label: 'Курстар', suffix: '+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-xl shadow-lg"
                >
                  <div className="text-2xl md:text-3xl font-bold text-slate-950">
                    <AnimatedCounter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] md:h-[560px]  overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-content"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>
              {/* Optional overlay for better integration */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
