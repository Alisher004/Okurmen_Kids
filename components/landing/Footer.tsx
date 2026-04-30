'use client';

import { Instagram, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OK</span>
              </div>
              <span className="text-xl font-bold">Okurmen Kids</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Балдар үчүн IT билим берүү борбору. Келечектин программисттерин тарбиялайбыз.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Курстар</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#courses" className="hover:text-white transition-colors">Frontend Development</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Scratch Programming</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Python Basics</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Web Design</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Байланыш</h3>
            <ul className="space-y-2 text-gray-400">
              <li>+996 500 677 798</li>
              <li>okurmen2022@gmail.com</li>
              <li>Бишкек шаары, Табышалиева 29</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Социалдык тармактар</h3>
            <div className="flex space-x-4">
              <a href="https://2gis.kg/bishkek/firm/70000001078008057" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/okurmen_kids/" target='_blank' rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@OKURMENKIDS" target='_blank' rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:okurmen2022@gmail.com" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; Okurmen Kids. Бардык укуктар корголгон.</p>
        </div>
      </div>
    </footer>
  );
}
