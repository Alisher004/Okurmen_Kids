'use client';

import HeroCarousel from '@/components/landing/HeroCarousel';
import AboutStory from '@/components/landing/AboutStory';
import Courses from '@/components/landing/Courses';
import LearningOutcomes from '@/components/landing/LearningOutcomes';
import TeachersPreview from '@/components/landing/TeachersPreview';
import TopStudents from '@/components/landing/TopStudents';
import AcademyLife from '@/components/landing/AcademyLife';
import VideoTestimonials from '@/components/landing/VideoTestimonials';
import TestIntro from '@/components/landing/TestIntro';
import FaqSection from '@/components/landing/FaqSection';
import TrialLessonCta from '@/components/landing/TrialLessonCta';
import Contact from '@/components/landing/Contact';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="relative z-[1]">
        <HeroCarousel />
        <AboutStory />
        <Courses />
        <LearningOutcomes />
        <TeachersPreview />
        <TopStudents />
        <AcademyLife />
        <VideoTestimonials />
        <TestIntro />
        <FaqSection />
        <TrialLessonCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
