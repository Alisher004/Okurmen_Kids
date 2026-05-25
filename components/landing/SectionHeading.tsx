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
  actions?: React.ReactNode;
};

export default function SectionHeading({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  light = true,
  align = 'left',
  actions,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-8 md:mb-12 ${centered ? 'text-center' : ''}`}
    >
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
          centered ? 'sm:flex-col sm:items-center' : ''
        }`}
      >
        <div className={centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
          {badge && (
            <span className={`section-badge mb-2 inline-flex items-center gap-2 md:mb-3 ${!light ? 'section-badge-light' : ''}`}>
              {BadgeIcon && (
                <BadgeIcon className={`h-3.5 w-3.5 shrink-0 ${light ? 'text-brand-gold-400' : 'text-brand-gold-600'}`} />
              )}
              {badge}
            </span>
          )}
          <h2
            className={`section-headline ${light ? 'text-white' : 'text-brand-navy-900'} ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-2 max-w-2xl text-sm leading-relaxed sm:mt-3 sm:text-base md:text-lg ${
                light ? 'text-slate-400' : 'text-brand-navy-600'
              } ${centered ? 'mx-auto' : ''}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </motion.div>
  );
}
