'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import TrialLessonSection from '@/components/courses/TrialLessonSection';
import { useData } from '@/context/DataContext';
import { findCourseBySlug } from '@/lib/courseSlug';
import { getCourseDetailContent } from '@/lib/courseDetail';
import { scrollToHash, scrollToSectionId } from '@/lib/scrollRestore';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

type CourseDetailPageProps = {
  slug: string;
};

function SectionBlock({
  num,
  title,
  children,
  className = '',
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section {...fadeUp} className={className}>
      <p className="course-section-num">{num}</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

export default function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const { courses, publicDataLoaded } = useData();

  const course = useMemo(() => findCourseBySlug(courses, slug), [courses, slug]);
  const detail = course ? getCourseDetailContent(course) : null;

  useEffect(() => {
    if (!publicDataLoaded || !course) return;
    if (window.location.hash === '#trial-lesson') {
      requestAnimationFrame(() => scrollToHash('#trial-lesson', 'auto'));
    }
  }, [publicDataLoaded, course]);

  if (publicDataLoaded && !course) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="site-container z-[1] flex min-h-[60vh] flex-col items-center justify-center py-24 pt-[calc(var(--nav-height)+3rem)] text-center">
          <p className="section-badge mb-4">
            <GraduationCap className="h-4 w-4" />
            Курс
          </p>
          <h1 className="section-headline">Курс табылган жок</h1>
          <p className="mt-3 max-w-md text-sm text-slate-400">Шилтеме эскирген же курс өчүрүлгөн болушу мүмкүн.</p>
          <Link href="/#courses" className="btn-primary mt-8 inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Бардык курстар
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course || !detail) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="relative z-[1] pt-[var(--nav-height)]">
          <div className="site-container animate-pulse py-12 md:py-16">
            <div className="h-4 w-32 rounded bg-white/5" />
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="h-6 w-24 rounded bg-white/5" />
                <div className="h-12 w-full max-w-lg rounded bg-white/5" />
                <div className="h-20 w-full max-w-xl rounded bg-white/5" />
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-white/5" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = course.image || PLACEHOLDER;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="relative z-[1] pt-[var(--nav-height)]">
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 lg:left-[42%]">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              unoptimized={
                !imageUrl.includes('images.unsplash.com') &&
                !imageUrl.includes('res.cloudinary.com')
              }
            />
            <div className="course-hero-glow" aria-hidden />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/92 to-[#0f172a]/25 lg:via-[#0f172a]/88 lg:to-transparent"
              aria-hidden
            />
          </div>

          <div className="site-container relative py-10 sm:py-14 md:py-16 lg:py-20">
            <Link
              href="/#courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-brand-gold-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Бардык курстар
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="section-badge mb-4">
                  <GraduationCap className="h-4 w-4" />
                  Okurmen Kids · Программа
                </p>
                <h1 className="text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-white">
                  {course.title}
                </h1>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="course-stat-chip">
                    <Clock className="h-4 w-4 text-brand-gold-500" />
                    {course.duration}
                  </span>
                  <span className="course-stat-chip">
                    <Users className="h-4 w-4 text-brand-gold-500" />
                    {detail.forWho}
                  </span>
                </div>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {course.description}
                </p>

                <button
                  type="button"
                  onClick={() => scrollToSectionId('trial-lesson', { smooth: true, updateHash: true })}
                  className="btn-primary mt-8 inline-flex"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Пробный сабакка жазылуу
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:aspect-[4/3]"
              >
                <Image
                  src={imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                  unoptimized={
                !imageUrl.includes('images.unsplash.com') &&
                !imageUrl.includes('res.cloudinary.com')
              }
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
              </motion.div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="section-layer !pb-0">
          <div className="site-container">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              <div className="space-y-12 lg:col-span-8 xl:col-span-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <motion.div {...fadeUp} className="course-content-card">
                    <Users className="h-5 w-5 text-brand-gold-400" />
                    <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Кимге ылайыктуу
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">{detail.forWho}</p>
                  </motion.div>
                  <motion.div {...fadeUp} className="course-content-card">
                    <BookOpen className="h-5 w-5 text-brand-gold-400" />
                    <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Эмне үйрөнөт
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">{detail.learns}</p>
                  </motion.div>
                </div>

                <SectionBlock num="03" title="Программа">
                  <ol className="space-y-3">
                    {detail.program.map((step, i) => (
                      <li key={step} className="course-step-card flex gap-4 sm:gap-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold-500/15 font-mono text-sm font-bold text-brand-gold-400">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Модуль {i + 1}
                          </p>
                          <p className="mt-1 text-sm font-medium leading-relaxed text-slate-100 sm:text-base">
                            {step}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </SectionBlock>

                <SectionBlock num="04" title="Көндүмдөр жана жыйынтык">
                  <ul className="flex flex-wrap gap-2">
                    {detail.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-lg border border-brand-gold-500/25 bg-brand-gold-500/10 px-3.5 py-2 text-xs font-semibold text-brand-gold-300 sm:text-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {detail.outcome}
                  </p>
                </SectionBlock>

                <SectionBlock num="05" title="Эмне үчүн бул программа">
                  <ul className="grid gap-3 sm:grid-cols-1">
                    {detail.benefits.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 sm:px-5"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-400" />
                        <span className="text-sm leading-relaxed text-slate-200 sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionBlock>

                <motion.section
                  {...fadeUp}
                  className="relative overflow-hidden rounded-2xl border border-brand-gold-500/20 bg-gradient-to-br from-brand-navy-800/80 via-white/[0.04] to-transparent p-8 sm:p-10"
                >
                  <Sparkles className="h-6 w-6 text-brand-gold-400" />
                  <p className="course-section-num mt-4">06</p>
                  <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">Okurmen Kids артыкчылыгы</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    {detail.academyAdvantage}
                  </p>
                </motion.section>

                <SectionBlock num="07" title="Көп берилген суроолор" className="pb-4">
                  <dl className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
                    {detail.faq.map((item) => (
                      <div key={item.question} className="px-5 py-5 sm:px-6 sm:py-6">
                        <dt className="text-base font-semibold text-white">{item.question}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">{item.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </SectionBlock>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 xl:col-span-4">
                <div className="course-sidebar-panel">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold-400">
                    Кыскача
                  </p>
                  <ul className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm text-slate-300">
                    <li className="flex justify-between gap-3">
                      <span className="text-slate-400">Узактыгы</span>
                      <span className="font-medium text-white">{course.duration}</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span className="text-slate-400">Жашы</span>
                      <span className="text-right font-medium text-white">{detail.forWho}</span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span className="text-slate-400">Модульдер</span>
                      <span className="font-medium text-white">{detail.program.length}</span>
                    </li>
                  </ul>

                  <div className="border-t border-white/10 pt-4">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <Target className="h-3.5 w-3.5" />
                      Негизги көндүмдөр
                    </p>
                    <ul className="space-y-2">
                      {detail.skills.slice(0, 4).map((s) => (
                        <li key={s} className="text-xs text-slate-400">
                          · {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToSectionId('trial-lesson', { smooth: true, updateHash: true })}
                    className="btn-primary mt-2 w-full py-3.5"
                  >
                    <CalendarCheck className="h-5 w-5" />
                    Пробный сабак
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.01]">
          <TrialLessonSection defaultCourseInterest={course.title} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
