'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, BookOpen, Award } from 'lucide-react';
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

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[390px]"
              tabIndex={0}
            >
              <div className="relative h-full rounded-3xl">
                <div className="absolute inset-0 overflow-hidden rounded-3xl bg-brand-navy-800 shadow-brand">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/teachers.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-800 via-brand-navy-800/40 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand-orange-500/90 px-2.5 py-1 text-xs font-bold text-white">
                    <Star className="h-3 w-3 fill-white" />
                    Топ
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-1 text-2xl font-bold leading-tight">{student.name}</h3>
                    <p className="flex items-center gap-1.5 font-semibold text-brand-orange-300">
                      <Trophy className="h-4 w-4" />
                      {student.course}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
