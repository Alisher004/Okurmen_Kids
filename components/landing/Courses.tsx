'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { getCourseHighlights } from '@/lib/coursePresentation';
import { courseDetailPath } from '@/lib/courseSlug';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop';

export default function Courses() {
  const { courses, publicDataLoaded, firebaseConfigured } = useData();

  return (
    <section id="courses" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={GraduationCap}
          badge="Билим берүү программалары"
          title="Биздин курстар"
        />

        {!publicDataLoaded ? (
          <div className="mx-auto max-w-5xl animate-pulse space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="min-h-[420px] rounded-lg bg-white/5 sm:min-h-[380px]" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="mx-auto max-w-xl">
            <EmptyState
              icon={BookOpen}
              title="Курстар жакында"
              description={firebaseConfigured ? 'Жакында жаңы программалар кошулат.' : 'Firebase орнотулганда көрүнөт.'}
            />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl divide-y divide-white/10">
            {courses.map((course, index) => {
              const imageUrl = course.image || PLACEHOLDER;
              const { forWho, learns, outcome, program } = getCourseHighlights(course);
              const reversed = index % 2 === 1;

              return (
                <motion.article
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  className="grid items-start gap-8 py-12 first:pt-0 last:pb-0 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14"
                >
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-brand-navy-900">
                      <Image
                        src={imageUrl}
                        alt={course.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                        unoptimized={!imageUrl.includes('images.unsplash.com')}
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-xs font-medium text-white/90">{forWho}</span>
                      </div>
                    </div>
                  </div>

                  <div className={reversed ? 'lg:order-1' : ''}>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Программа {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {course.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                      <Clock className="h-4 w-4 text-brand-gold-500" />
                      {course.duration}
                    </p>

                    <div className="mt-6 space-y-5">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Эмне үйрөнөт</p>
                        <p className="text-sm leading-relaxed text-slate-300">{learns}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Жыйынтык</p>
                        <p className="text-sm leading-relaxed text-slate-300">{outcome}</p>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {program.map((item) => (
                          <li key={item} className="text-xs font-medium text-slate-400">
                            · {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={courseDetailPath(course)} className="btn-primary mt-8 inline-flex">
                      Кененирээк маалымат
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
