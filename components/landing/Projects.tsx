'use client';

import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    { title: 'Оюн: Space Adventure', emoji: '🚀', color: 'from-blue-400 to-blue-600' },
    { title: 'Веб-сайт: Менин Мектебим', emoji: '🏫', color: 'from-green-400 to-green-600' },
    { title: 'Анимация: Жаныбарлар', emoji: '🦁', color: 'from-orange-400 to-orange-600' },
    { title: 'Калькулятор', emoji: '🔢', color: 'from-purple-400 to-purple-600' },
    { title: 'Музыка плеер', emoji: '🎵', color: 'from-pink-400 to-pink-600' },
    { title: 'Жаңылыктар сайты', emoji: '📰', color: 'from-indigo-400 to-indigo-600' },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Студенттердин проекттери
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Биздин студенттер түзгөн кызыктуу проекттер
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="aspect-square"
            >
              <div className={`h-full bg-gradient-to-br ${project.color} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center p-4 cursor-pointer`}>
                <div className="text-5xl md:text-6xl mb-3">{project.emoji}</div>
                <div className="text-white font-semibold text-center text-sm md:text-base">
                  {project.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
