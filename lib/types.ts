export type UserRole = 'admin' | 'manager';

export interface Course {
  id: string;
  title: string;
  age: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  image?: string;
  /** URL slug for /courses/[slug]; auto-generated from title if omitted */
  slug?: string;
}

export interface Teacher {
  id: string;
  name: string;
  position: string;
  experience: string;
  education: string;
  bio: string;
  image: string;
  phone?: string;
  email?: string;
  order?: number;
}

export interface Student {
  id: string;
  name: string;
  course: string;
  image: string;
  achievement?: string;
  avatar?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'trial_scheduled' | 'enrolled' | 'rejected';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  age: string;
  course: string;
  comment?: string;
  notes?: string;
  status: LeadStatus;
  createdAt: Date;
}

export type TrialLessonStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';

export interface TrialLesson {
  id: string;
  childName: string;
  parentPhone: string;
  childAge: string;
  courseInterest: string;
  comment?: string;
  notes?: string;
  status: TrialLessonStatus;
  createdAt: Date;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  /** Desktop / default hero image */
  image: string;
  /** Optional mobile-optimized image */
  imageMobile?: string;
  valueProposition?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  textAlign?: 'left' | 'center';
  /** 0–100: dark overlay on visual panel */
  overlayOpacity?: number;
  order: number;
  isActive: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface VideoReview {
  id: string;
  title: string;
  studentName: string;
  videoUrl: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  order: number;
  isActive: boolean;
}

export interface TestResult {
  id: string;
  name: string;
  phone?: string;
  age?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: Date;
}
