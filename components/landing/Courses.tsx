'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Clock, Users, GraduationCap, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import SectionHeading from './SectionHeading';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop';

export default function Courses() {
  const { courses, publicDataLoaded } = useData();
  const whatsappNumber = '+996500677798';

  if (!publicDataLoaded || courses.length === 0) return null;

  const handleWhatsAppClick = (courseName: string) => {
    const message = `Салам! ${courseName} курс боюнча толук маалымат бере аласызбы?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="courses" className="section-alt relative py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading
          badgeIcon={GraduationCap}
          badge="Билим берүү программалары"
          title="Биздин курстар"
          subtitle="Ар бир курс балдардын жаш өзгөчөлүктөрүнө ылайыкташтырылган"
        />

        <div className="-mx-4 scroll-row px-4 md:-mx-0 md:px-0">
          {courses.map((course, index) => {
            const imageUrl = course.image || PLACEHOLDER;

            return (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="scroll-row-card brand-card-luxury group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={course.title}
                    fill
                    unoptimized={!imageUrl.includes('images.unsplash.com')}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-800/80 via-brand-navy-700/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 backdrop-blur-md">
                    <BookOpen className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-brand-navy-700">{course.title}</h3>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-navy-50 px-3 py-1 text-xs font-semibold text-brand-navy-700">
                      <Users className="h-3.5 w-3.5 text-brand-gold-500" />
                      {course.age}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold-50 px-3 py-1 text-xs font-semibold text-brand-gold-800">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                  </div>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-brand-navy-600">
                    {course.description}
                  </p>

                  <button
                    onClick={() => handleWhatsAppClick(course.title)}
                    className="gradient-cta flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-brand-navy-800 transition-all hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Жазылуу
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
