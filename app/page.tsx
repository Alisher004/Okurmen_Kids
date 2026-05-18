'use client';

import Background3D from '@/components/Background3D';
import Hero from '@/components/landing/Hero';
import Courses from '@/components/landing/Courses';
import Teachers from '@/components/landing/Teachers';
import TopStudents from '@/components/landing/TopStudents';
import Testimonials from '@/components/landing/Testimonials';
import Contact from '@/components/landing/Contact';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ChatWidget from '@/components/landing/ChatWidget';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background3D variant="bold" />
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <Teachers />
        <TopStudents />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
