'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useData } from '@/context/DataContext';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

type TeachersProps = {
  showHeading?: boolean;
};

export default function Teachers({ showHeading = true }: TeachersProps) {
  const { teachers, publicDataLoaded, firebaseConfigured } = useData();
  const sorted = [...teachers].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <section id="teachers-grid" className={showHeading ? 'section-layer' : 'pb-14 md:pb-20'}>
      <div className="site-container">
        {showHeading && <SectionHeading badgeIcon={Users} title="Мугалимдер" />}

        {!publicDataLoaded ? (
          <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.div key={i} className="h-80 rounded-lg bg-white/5" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Мугалимдер жакында"
            description={firebaseConfigured ? 'Команда жакында кошулат.' : 'Firebase орнотулганда көрүнөт.'}
          />
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {sorted.map((teacher, index) => (
              <motion.article
                key={teacher.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-lg bg-slate-800">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold-400">
                      {teacher.position}
                    </p>
                    <h3 className="mt-0.5 text-lg font-bold text-white">{teacher.name}</h3>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Тажрыйба</p>
                    <p className="mt-0.5 text-slate-300">{teacher.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Билими</p>
                    <p className="mt-0.5 text-slate-300">{teacher.education}</p>
                  </div>
                  <p className="leading-relaxed text-slate-400">{teacher.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
