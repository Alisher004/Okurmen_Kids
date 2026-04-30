'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
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
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-blue-200">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = '/api/placeholder/400/400'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Name on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{teacher.name}</h3>
                    <p className="text-blue-300 font-semibold">{teacher.position}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  {/* Experience */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Тажрыйба</p>
                      <p className="text-sm font-bold text-slate-900">{teacher.experience}</p>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Билими</p>
                      <p className="text-sm font-bold text-slate-900">{teacher.education}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {teacher.bio}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
