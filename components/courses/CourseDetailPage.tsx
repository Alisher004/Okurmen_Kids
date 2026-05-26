'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import TrialLessonSection from '@/components/courses/TrialLessonSection';
import { useData } from '@/context/DataContext';
import { findCourseBySlug } from '@/lib/courseSlug';
import { getCourseDetailContent } from '@/lib/courseDetail';
import { scrollToHash } from '@/lib/scrollRestore';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop';

type CourseDetailPageProps = {
  slug: string;
};

export default function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const router = useRouter();
  const { courses, publicDataLoaded } = useData();

  const course = useMemo(() => findCourseBySlug(courses, slug), [courses, slug]);
  const detail = course ? getCourseDetailContent(course) : null;

  useEffect(() => {
    if (!publicDataLoaded) return;
    if (!course) return;
    if (window.location.hash === '#trial-lesson') {
      requestAnimationFrame(() => scrollToHash('#trial-lesson', 'auto'));
    }
  }, [publicDataLoaded, course]);

  if (publicDataLoaded && !course) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="site-container z-[1] py-24 pt-[calc(var(--nav-height)+3rem)] text-center">
          <h1 className="text-2xl font-bold text-white">Курс табылган жок</h1>
          <Link href="/#courses" className="btn-primary mt-6 inline-flex">
            Башкы бетке кайтуу
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
        <main className="site-container z-[1] animate-pulse space-y-8 py-16 pt-[var(--nav-height)]">
          <div className="h-8 w-48 rounded bg-white/10" />
          <div className="h-64 rounded-lg bg-white/5" />
          <div className="h-40 rounded-lg bg-white/5" />
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
        <header className="section-layer pb-0">
          <div className="site-container">
            <button
              type="button"
              onClick={() => router.push('/#courses')}
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-gold-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Бардык курстар
            </button>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-400">Okurmen Kids</p>
                <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white">
                  {course.title}
                </h1>
                <p className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-brand-gold-500" />
                    {course.duration}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>{detail.forWho}</span>
                </p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  {course.description}
                </p>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-800/50 lg:aspect-[4/3]">
                <Image
                  src={imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                  unoptimized={!imageUrl.includes('images.unsplash.com')}
                />
              </div>
            </div>
          </div>
        </header>

        <article className="section-layer border-t border-white/[0.06] pt-10">
          <div className="site-container max-w-3xl">
            <section className="editorial-block p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white sm:text-xl">Кимге ылайыктуу</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{detail.forWho}</p>
            </section>

            <section className="editorial-block mt-6 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white sm:text-xl">Эмне үйрөнөт</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{detail.learns}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-bold text-white sm:text-xl">Программа overview</h2>
              <ol className="mt-4 space-y-3 border-l border-brand-gold-500/30 pl-5">
                {detail.program.map((step, i) => (
                  <li key={step} className="text-sm text-slate-300 sm:text-base">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Кадам {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-bold text-white sm:text-xl">Көндүмдөр жана жыйынтык</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {detail.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">{detail.outcome}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-bold text-white sm:text-xl">Эмне үчүн бул программа</h2>
              <ul className="mt-4 space-y-3">
                {detail.benefits.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate-300 sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="editorial-block mt-10 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white sm:text-xl">Okurmen Kids артыкчылыгы</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{detail.academyAdvantage}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-bold text-white sm:text-xl">Көп берилген суроолор</h2>
              <dl className="mt-4 divide-y divide-white/[0.08]">
                {detail.faq.map((item) => (
                  <div key={item.question} className="py-5 first:pt-0">
                    <dt className="font-semibold text-slate-200">{item.question}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-400">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </article>

        <TrialLessonSection defaultCourseInterest={course.title} />
      </main>
      <Footer />
    </div>
  );
}
