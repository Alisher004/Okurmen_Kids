'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useData } from '@/context/DataContext';

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
  const { courses, teachers, students, publicDataLoaded } = useData();
  const whatsappMessage = 'Салам! Окурмен Kids курстары жөнүндө маалымат алгым келет.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/+996500677798?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const stats = publicDataLoaded
    ? [
        { value: students.length, label: 'Студенттер', suffix: '+' },
        { value: teachers.length, label: 'Мугалимдер', suffix: '+' },
        { value: courses.length, label: 'Курстар', suffix: '+' },
      ].filter((s) => s.value > 0)
    : [];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge mb-6 inline-flex">
              <Sparkles className="h-4 w-4 text-brand-gold-500" />
              Бишкектеги балдар үчүн IT академиясы
            </span>

            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-navy-700 md:text-5xl lg:text-6xl">
              9–15 жаштагы балдар үчүн{' '}
              <span className="gradient-brand-text">IT курстар</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-brand-navy-600 md:text-xl">
              Программалоо, веб-дизайн жана логиканы практикалык долбоорлор менен үйрөтөбүз.
              Балдарыңыздын келечегин бүгүн баштаңыз.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsAppClick}
                className="btn-primary px-8 py-4 text-lg"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp аркылуу жазылуу
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary px-8 py-4 text-lg"
              >
                Курстарды көрүү
                <ArrowRight className="h-5 w-5 text-brand-gold-500" />
              </motion.button>
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="stat-card-luxury"
                  >
                    <div className="stat-value text-2xl font-bold md:text-3xl">
                      <AnimatedCounter end={stat.value} />
                      <span className="text-gold-shine">{stat.suffix}</span>
                    </div>
                    <div className="mt-1 text-xs font-medium text-brand-navy-500 md:text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Видео / GIF — толук көрүнүш */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative flex min-h-[280px] items-center justify-center lg:min-h-[420px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-navy-400/15 via-transparent to-brand-gold-400/20 blur-2xl" />
            <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy-50/80 to-brand-gold-50/50 p-2 shadow-luxury md:rounded-3xl md:p-3">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="mx-auto block max-h-[min(70vh,520px)] w-full object-contain"
                poster="/teachers.png"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
