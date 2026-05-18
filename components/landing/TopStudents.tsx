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
              className="teacher-flip-card group relative h-[390px]"
              tabIndex={0}
            >
              <div className="teacher-flip-inner relative h-full rounded-3xl">
                <div className="teacher-flip-face absolute inset-0 overflow-hidden rounded-3xl bg-brand-navy-800 shadow-brand">
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

                <div className="teacher-flip-face teacher-flip-back absolute inset-0 overflow-hidden rounded-3xl border border-brand-navy-100 bg-white p-6 shadow-card-hover">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-orange-500 via-brand-gold-500 to-brand-navy-500" />
                  <div className="flex h-full flex-col justify-between pt-2">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-navy-700">{student.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 font-semibold text-brand-gold-600">
                        <BookOpen className="h-4 w-4" />
                        {student.course}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange-500 shadow-md">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-brand-navy-500">Статус</p>
                          <p className="text-sm font-bold text-brand-navy-700">Айдын мыкты окуучу</p>
                        </div>
                      </div>

                      {student.achievement && (
                        <div className="rounded-2xl border border-brand-navy-100 bg-brand-navy-50/50 p-4">
                          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy-700">
                            <Trophy className="h-4 w-4 text-brand-gold-500" />
                            Жетишкендик
                          </div>
                          <p className="line-clamp-6 text-sm leading-relaxed text-brand-navy-600">
                            {student.achievement}
                          </p>
                        </div>
                      )}
                    </div>
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
