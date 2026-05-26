'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Send, Phone } from 'lucide-react';
import LogoMark from './LogoMark';
import { useData } from '@/context/DataContext';
import { useEnrollModal } from '@/context/EnrollModalContext';
import { scrollToSectionId } from '@/lib/scrollRestore';

export default function Navbar() {
  const { courses, publicDataLoaded } = useData();
  const { openEnroll } = useEnrollModal();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    scrollToSectionId(id, { smooth: true, updateHash: true });
    setIsOpen(false);
  };

  const navLink =
    'relative text-sm font-medium text-white/90 transition-colors hover:text-brand-gold-300';

  const navItems = [
    { id: 'why-us', label: 'Биз жөнүндө', type: 'scroll' as const },
    publicDataLoaded && courses.length > 0 && { id: 'courses', label: 'Курстар', type: 'scroll' as const },
    { id: 'teachers', label: 'Мугалимдер', type: 'scroll' as const },
    { id: 'faq', label: 'FAQ', type: 'scroll' as const },
  ].filter(Boolean) as Array<{ id: string; label: string; type: 'scroll' }>;

  const handleNav = (item: (typeof navItems)[number]) => {
    scrollToSection(item.id);
  };

  return (
    <nav
      className={`nav-luxury fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'shadow-luxury backdrop-blur-xl' : 'backdrop-blur-md'
      }`}
    >
      <div className="site-container max-w-7xl">
        <div className="flex h-16 items-center justify-between md:h-[4.5rem]">
          <button type="button" onClick={() => scrollToSection('hero')} className="shrink-0">
            <LogoMark size="lg" variant="light" showText={true} />
          </button>

          <div className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => (
              <button key={item.id} type="button" onClick={() => handleNav(item)} className={navLink}>
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('contact')} className="btn-secondary !py-2.5 !text-sm">
              <Phone className="h-4 w-4" />
              Байланыш
            </button>
            <button type="button" onClick={openEnroll} className="btn-primary !py-2.5 !text-sm">
              <Send className="h-4 w-4" />
              Жазылуу
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 text-white hover:bg-white/10 xl:hidden"
            aria-label="Меню"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-1 border-t border-white/10 py-4 xl:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item)}
                className="block w-full rounded-xl px-4 py-3 text-left font-medium text-white/90 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => scrollToSection('contact')} className="btn-secondary mt-2 w-full">
              <Phone className="h-4 w-4" />
              Байланыш
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openEnroll();
              }}
              className="btn-primary mt-2 w-full"
            >
              <Send className="h-4 w-4" />
              Жазылуу
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
