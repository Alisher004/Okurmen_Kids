'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, FileText, Users } from 'lucide-react';
import { useData } from '@/context/DataContext';
import SectionHeading from './SectionHeading';

export default function Teachers() {
  const { teachers, publicDataLoaded } = useData();

  if (!publicDataLoaded || teachers.length === 0) return null;

  return (
    <section id="teachers" className="relative overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          badgeIcon={Users}
          badge="Адистер командасы"
          title="Биздин мугалимдер"
          subtitle="Тажрыйбалуу жана балдарды сүйгөн адистер"
        />

        <div className="-mx-4 scroll-row px-4 md:-mx-0 md:px-0">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="scroll-row-card teacher-flip-card group relative h-[390px]"
              tabIndex={0}
            >
              <div className="teacher-flip-inner relative h-full rounded-3xl">
                <div className="teacher-flip-face absolute inset-0 overflow-hidden rounded-3xl bg-brand-navy-800 shadow-brand">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-800 via-brand-navy-800/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-1 text-2xl font-bold leading-tight">{teacher.name}</h3>
                    <p className="font-semibold text-brand-gold-400">{teacher.position}</p>
                  </div>
                </div>

                <div className="teacher-flip-face teacher-flip-back absolute inset-0 overflow-hidden rounded-3xl border border-brand-navy-100 bg-white p-6 shadow-card-hover">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-navy-600 via-brand-navy-500 to-brand-gold-500" />
                  <div className="flex h-full flex-col justify-between pt-2">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-navy-700">{teacher.name}</h3>
                      <p className="mt-1 font-semibold text-brand-gold-600">{teacher.position}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy-700 shadow-md">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-brand-navy-500">Тажрыйба</p>
                          <p className="text-sm font-bold text-brand-navy-700">{teacher.experience}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold-500 shadow-md">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-brand-navy-500">Билими</p>
                          <p className="text-sm font-bold text-brand-navy-700">{teacher.education}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-brand-navy-100 bg-brand-navy-50/50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy-700">
                          <FileText className="h-4 w-4 text-brand-gold-500" />
                          Жөнүндө
                        </div>
                        <p className="line-clamp-5 text-sm leading-relaxed text-brand-navy-600">{teacher.bio}</p>
                      </div>
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
