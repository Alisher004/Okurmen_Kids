'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function TeachersPreview() {
  return (
    <section id="teachers" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={Users}
          badge="Команда"
          title="Биздин мугалимдер"
          subtitle="Менторлук, практика жана балдар менен иштөө тажрыйбасы"
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg bg-white/[0.04]"
          >
            <Image
              src="/images/teachers-team.png"
              alt="Okurmen Kids мугалимдер командасы"
              width={907}
              height={680}
              className="h-auto w-full object-cover"
              priority={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
              Мугалим — жөн гана окутуучу эмес, ментор
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              Биздин команда IT практикасы бар адистерден турат. Ар бир мугалим окуучунун темпин, кызыгуусун
              жана мотивациясын эске алат. Кичи топ — ар бир балага жеке көним.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Академияда биз тек гана код эмес, команда менен иштөө, суроо берүү жана өз алдына чечим кабыл
              алуу маданиятын өстүрөбүз.
            </p>
            <Link href="/teachers" className="btn-primary mt-8 inline-flex">
              Мугалимдер менен таанышуу
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
