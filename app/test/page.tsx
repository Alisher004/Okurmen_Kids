'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import SkillTestFlow from '@/components/landing/SkillTestFlow';

export default function TestPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="relative z-[1] pt-[var(--nav-height)]">
        <div className="site-container py-10 sm:py-14">
          <Link
            href="/#skill-test-intro"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-brand-gold-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Башкы бетке кайтуу
          </Link>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-14 xl:gap-16">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">IT даярдык тести</h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
                Ар бир суроого жооп бергенден кийин дароо кайтарым аласыз. Акырында — жеке сунуш.
              </p>
              <div className="mt-10">
                <SkillTestFlow />
              </div>
            </div>

            <div className="hidden lg:flex lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:items-end lg:justify-center">
              <Image
                src="/images/skill-test-mentor.png"
                alt="IT тестти өткөн окуучу ноутбук менен"
                width={360}
                height={360}
                className="mentor-cutout h-auto w-full max-w-[360px]"
                sizes="360px"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
