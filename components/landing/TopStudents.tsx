'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Trophy } from 'lucide-react';
import { useData } from '@/context/DataContext';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

const INITIAL_COUNT = 4;

export default function TopStudents() {
  const { students, publicDataLoaded, firebaseConfigured } = useData();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? students : students.slice(0, INITIAL_COUNT);
  const hasMore = students.length > INITIAL_COUNT;

  return (
    <section id="students" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={Trophy}
          badge="Жетишкендик"
          title="Айдын мыкты студенттери"
          subtitle="Биздин курстун эң активдүү жана таланттуу окуучулары"
        />

        {!publicDataLoaded ? (
          <div className="grid animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-lg bg-white/5" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="Студенттер жакында көрсөтүлөт"
            description={
              firebaseConfigured
                ? 'Мыкты окуучулар тизмеси жакында жаңыланат.'
                : 'Firebase орнотулганда студенттер көрүнөт.'
            }
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {visible.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-navy-900"
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base font-bold text-white">{student.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-brand-gold-400">{student.course}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="btn-secondary inline-flex"
                >
                  {expanded ? 'Жашыруу' : 'Баарын көрүү'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
