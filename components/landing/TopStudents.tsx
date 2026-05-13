'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function TopStudents() {
  const { students } = useData();

  if (students.length === 0) return null;

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md border border-yellow-400/30 px-6 py-3 rounded-full mb-6">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-slate-900">Айдын мыкты студенттери</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg"
            >
              <div className="aspect-[4/5]">
                <img
                  src={student.image}
                  alt={student.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = '/teachers.png'; }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-xl md:text-2xl font-bold leading-tight">{student.name}</h3>
                <p className="mt-1 text-sm font-semibold text-yellow-300">{student.course}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
