'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Award } from 'lucide-react';
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Top Students of the Month
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Бул айда эң мыкты натыйжаларды көрсөткөн студенттер
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              {/* Card */}
              <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-yellow-200">
                {/* Avatar Section */}
                <div className="relative h-56 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 flex items-center justify-center overflow-hidden">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse" />
                  
                  {/* Avatar */}
                  <div className="relative z-10 text-8xl transform group-hover:scale-110 transition-transform duration-500">
                    {student.avatar}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Name */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-950 mb-2">{student.name}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Course */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-1">Курс</p>
                        <p className="text-sm font-bold text-slate-900">{student.course}</p>
                      </div>
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/30 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-1">Жетишкендик</p>
                        <p className="text-sm font-bold text-slate-900">{student.achievement}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
