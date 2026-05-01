'use client';

import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import Image from 'next/image';

// Course images mapping
const courseImages: Record<string, string> = {
  'Frontend Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
  'Scratch Programming': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop',
  'Python Basics': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
  'Web Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
};

export default function Courses() {
  const { courses } = useData();

  const whatsappNumber = '+996500677798';
  
  const handleWhatsAppClick = (courseName: string) => {
    const message = `Салам! ${courseName} курсуна жазылгым келет.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="courses" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4">
            Биздин курстар
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Ар бир курс балдардын жаш өзгөчөлүктөрүнө ылайыкташтырылган
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => {
            const imageUrl = courseImages[course.title] || courseImages['Frontend Development'];
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/95 backdrop-blur-md rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-60`} />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                      {course.age}
                    </span>
                    <span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full font-medium">
                      {course.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <button
                    onClick={() => handleWhatsAppClick(course.title)}
                    className={`w-full bg-gradient-to-r ${course.color || 'from-blue-500 to-blue-600'} text-white py-3 rounded-lg font-semibold border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                  >
                    📱 WhatsApp аркылуу жазылуу
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
