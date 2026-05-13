'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, FileText } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function Teachers() {
  const { teachers } = useData();

  if (teachers.length === 0) {
    return null;
  }

  return (
    <section id="teachers" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Биздин мугалимдер
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Тажрыйбалуу жана балдарды сүйгөн адистер
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="teacher-flip-card group relative h-[390px]"
              tabIndex={0}
            >
              <div className="teacher-flip-inner relative h-full rounded-3xl">
                <div className="teacher-flip-face absolute inset-0 overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = '/api/placeholder/400/400'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-1 text-2xl font-bold leading-tight">{teacher.name}</h3>
                    <p className="font-semibold text-sky-300">{teacher.position}</p>
                  </div>
                </div>

                <div className="teacher-flip-face teacher-flip-back absolute inset-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-yellow-400" />
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">{teacher.name}</h3>
                      <p className="mt-1 font-semibold text-blue-600">{teacher.position}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Тажрыйба</p>
                          <p className="text-sm font-bold text-slate-900">{teacher.experience}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Билими</p>
                          <p className="text-sm font-bold text-slate-900">{teacher.education}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                          <FileText className="h-4 w-4 text-blue-600" />
                          Жөнүндө
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 line-clamp-5">
                          {teacher.bio}
                        </p>
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
