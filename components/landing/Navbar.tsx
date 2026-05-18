'use client';

import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import LogoMark from './LogoMark';
import { useData } from '@/context/DataContext';

export default function Navbar() {
  const { courses, teachers, students, publicDataLoaded } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappNumber = '+996500677798';
  const whatsappMessage = 'Салам! Окурмен Kids курстары жөнүндө маалымат алгым келет.';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLink =
    'relative text-sm font-medium text-white/90 transition-colors hover:text-brand-gold-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-brand-gold-400 after:transition-all hover:after:w-full';

  const navItems = [
    publicDataLoaded && courses.length > 0 && { id: 'courses', label: 'Курстар' },
    publicDataLoaded && teachers.length > 0 && { id: 'teachers', label: 'Мугалимдер' },
    publicDataLoaded && students.length > 0 && { id: 'students', label: 'Студенттер' },
    { id: 'contact', label: 'Байланыш' },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <nav
      className={`nav-luxury fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'shadow-luxury backdrop-blur-xl' : 'backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-[4.5rem]">
          <button onClick={() => scrollToSection('hero')} className="shrink-0">
            <LogoMark size="lg" variant="light" showText={true} />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={navLink}>
                {item.label}
              </button>
            ))}
            <button onClick={handleWhatsAppClick} className="btn-primary !py-2.5 !text-sm">
              <MessageCircle className="h-4 w-4" />
              Жазылуу
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label="Меню"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-1 border-t border-white/10 py-4 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full rounded-xl px-4 py-3 text-left font-medium text-white/90 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
            <button onClick={handleWhatsAppClick} className="btn-primary mt-2 w-full">
              <MessageCircle className="h-4 w-4" />
              WhatsApp жазылуу
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
