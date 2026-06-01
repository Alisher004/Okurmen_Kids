'use client';

import Link from 'next/link';
import { Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { useData } from '@/context/DataContext';
import LogoMark from './LogoMark';

const FALLBACK_COURSES = ['Frontend Development', 'Scratch Programming', 'Python Basics', 'Web Design'];

export default function Footer() {
  const { courses } = useData();
  const courseTitles = courses.length > 0 ? courses.map((c) => c.title) : FALLBACK_COURSES;

  return (
    <footer className="footer-luxury relative text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent opacity-80" />

      <div className="container relative z-10 mx-auto px-4 py-14">
        <div className="mb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoMark variant="light" size="lg" showText={true} />
            <p className="mt-4 max-w-xs leading-relaxed text-slate-300">
              Балдар үчүн IT билим берүү борбору. Келечектин программисттерин тарбиялайбыз.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold-400">Курстар</h3>
            <ul className="space-y-2.5 text-slate-300">
              {courseTitles.map((c) => (
                <li key={c}>
                  <a href="#courses" className="transition-colors hover:text-brand-gold-300">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold-400">Байланыш</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="tel:+996500677798" className="transition-colors hover:text-white">
                  +996 500 677 798
                </a>
              </li>
              <li>
                <a href="mailto:okurmen2022@gmail.com" className="transition-colors hover:text-white">
                  okurmen2022@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-400" />
                <span>Бишкек шаары, Табышалиева 29</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold-400">
              Социалдык тармактар
            </h3>
            <div className="flex gap-3">
              <a
                href="https://2gis.kg/bishkek/firm/70000001078008057"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all hover:border-brand-gold-400/50 hover:bg-brand-gold-500/20"
                aria-label="2GIS"
              >
                <span className="text-xs font-bold">2GIS</span>
              </a>
              <a
                href="https://www.instagram.com/okurmen_kids/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all hover:border-brand-gold-400/50 hover:bg-brand-gold-500/20"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@OKURMENKIDS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all hover:border-brand-gold-400/50 hover:bg-brand-gold-500/20"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:okurmen2022@gmail.com"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 transition-all hover:border-brand-gold-400/50 hover:bg-brand-gold-500/20"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Okurmen Kids. Бардык укуктар корголгон.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-gold-300">
              Купуялык саясаты
            </Link>
            <Link href="/terms" className="hover:text-brand-gold-300">
              Колдонуу шарттары
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
