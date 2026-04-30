'use client';

import Hero from '@/components/landing/Hero';
import Courses from '@/components/landing/Courses';
import Teachers from '@/components/landing/Teachers';
import TopStudents from '@/components/landing/TopStudents';
import Testimonials from '@/components/landing/Testimonials';
import Contact from '@/components/landing/Contact';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Courses />
      <Teachers />
      <TopStudents />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
