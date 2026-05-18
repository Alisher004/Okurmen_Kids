'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type SectionHeadingProps = {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'center' | 'left';
};

export default function SectionHeading({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  light = false,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-14 max-w-3xl ${alignClass}`}
    >
      {badge && (
        <span
          className={`section-badge mb-4 inline-flex items-center gap-2 ${
            light ? '!border-white/25 !bg-white/10 !text-brand-gold-300' : ''
          }`}
        >
          {BadgeIcon && (
            <BadgeIcon className={`h-4 w-4 shrink-0 ${light ? 'text-brand-gold-400' : 'text-brand-gold-600'}`} />
          )}
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${
          light ? 'text-white' : 'text-brand-navy-700'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed md:text-xl ${
            light ? 'text-brand-navy-100' : 'text-brand-navy-600'
          }`}
        >
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-brand-navy-500 via-brand-gold-500 to-brand-gold-400 shadow-gold-glow ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  );
}
