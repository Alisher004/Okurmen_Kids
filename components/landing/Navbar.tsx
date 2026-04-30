'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '+996500677798';
  const whatsappMessage = 'Салам! Окурмен Kids курстары жөнүндө маалымат алгым келет.';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-slate-900/70 backdrop-blur-xl border-b border-white/10 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">OK</span>
            </div>
            <span className="text-xl font-bold text-white">Okurmen Kids</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('courses')} className="text-white/80 hover:text-white transition-colors font-medium">
              Курстар
            </button>
            <button onClick={() => scrollToSection('teachers')} className="text-white/80 hover:text-white transition-colors font-medium">
              Мугалимдер
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-white transition-colors font-medium">
              Байланыш
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
            >
              📱 Жазылуу
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/10">
            <button onClick={() => scrollToSection('courses')} className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors">
              Курстар
            </button>
            <button onClick={() => scrollToSection('teachers')} className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors">
              Мугалимдер
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors">
              Байланыш
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              📱 Жазылуу
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
