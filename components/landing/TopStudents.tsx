'use client';

import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { useData } from '@/context/DataContext';
import SectionHeading from './SectionHeading';

export default function TopStudents() {
  const { students, publicDataLoaded } = useData();

  if (!publicDataLoaded || students.length === 0) return null;

  return (
    <section id="students" className="section-dark relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,71,137,0.4),transparent_55%)]" />

      <div className="container relative mx-auto px-4">
        <SectionHeading
          light
          badgeIcon={Trophy}
          badge="Жетишкендик"
          title="Айдын мыкты студенттери"
          subtitle="Биздин курстун эң активдүү жана таланттуу окуучулары"
        />

        <div className="-mx-4 scroll-row px-4 md:-mx-0 md:px-0">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="scroll-row-card-tall group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-700/50 shadow-brand"
            >
              <div className="aspect-[4/5]">
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/teachers.png';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-800 via-brand-navy-800/30 to-transparent" />
              <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand-orange-500/90 px-2.5 py-1 text-xs font-bold text-white">
                <Star className="h-3 w-3 fill-white" />
                Топ
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-xl font-bold leading-tight md:text-2xl">{student.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brand-orange-300">
                  <Trophy className="h-4 w-4" />
                  {student.course}
                </p>
                {student.achievement && (
                  <p className="mt-2 text-xs text-brand-navy-200 line-clamp-2">{student.achievement}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
