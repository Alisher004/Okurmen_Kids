'use client';

import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Teachers from '@/components/landing/Teachers';
import AcademyLife from '@/components/landing/AcademyLife';
import VideoTestimonials from '@/components/landing/VideoTestimonials';
import { ArrowLeft } from 'lucide-react';

export default function TeachersPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="relative z-[1] pt-[var(--nav-height)]">
        <div className="site-container py-10 sm:py-14">
          <Link
            href="/#teachers"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-gold-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Башкы бетке кайтуу
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">Биздин мугалимдер</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Ар бир мугалим — практика, менторлук жана балдар менен иштөө тажрыйбасы бар адис.
          </p>
        </div>
        <Teachers showHeading={false} />
        <AcademyLife id="teachers-academy-life" />
        <VideoTestimonials id="teachers-reviews" title="Студенттердин пикирлери" />
      </main>
      <Footer />
    </div>
  );
}
