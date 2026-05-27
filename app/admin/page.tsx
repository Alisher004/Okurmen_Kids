'use client';

import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import {
  LogOut,
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  BarChart3,
  ClipboardCheck,
  CalendarDays,
  AlertTriangle,
  ImageIcon,
  HelpCircle,
  Video,
  Menu,
  X,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import LeadsTab from '@/components/admin/LeadsTab';
import CoursesTab from '@/components/admin/CoursesTab';
import TeachersTab from '@/components/admin/TeachersTab';
import StudentsTab from '@/components/admin/StudentsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import TestResultsTab from '@/components/admin/TestResultsTab';
import TrialLessonsTab from '@/components/admin/TrialLessonsTab';
import BannersTab from '@/components/admin/BannersTab';
import FaqTab from '@/components/admin/FaqTab';
import TestQuestionsTab from '@/components/admin/TestQuestionsTab';
import VideoReviewsTab from '@/components/admin/VideoReviewsTab';
import { auth } from '@/lib/firebase';
import AdminLoginScreen from '@/components/admin/AdminLoginScreen';
import Link from 'next/link';

type AdminTab =
  | 'analytics'
  | 'banners'
  | 'leads'
  | 'trials'
  | 'tests'
  | 'faq'
  | 'testQuestions'
  | 'videoReviews'
  | 'courses'
  | 'teachers'
  | 'students';

export default function AdminPanel() {
  const {
    leads,
    trialLessons,
    courses,
    teachers,
    students,
    testResults,
    banners,
    faqItems,
    videoReviews,
    authUser,
    authLoading,
    isAdmin,
    firebaseConfigured,
  } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('Firebase Auth конфигурациясы табылган жок.');
      return;
    }
    setIsSigningIn(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(
        err instanceof FirebaseError && err.code === 'auth/invalid-credential'
          ? 'Туура эмес логин же пароль'
          : 'Кирүү мүмкүн болбой жатат.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#171827]">
        <div className="font-semibold text-slate-300">Жүктөлүүдө...</div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <AdminLoginScreen
        email={email}
        password={password}
        error={error}
        isSigningIn={isSigningIn}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#171827] px-4 text-center text-white">
        <AlertTriangle className="mb-4 h-12 w-12 text-amber-400" />
        <h1 className="text-xl font-bold">Админ уруксаты жок</h1>
        <p className="mt-2 max-w-md text-slate-400">
          Firestore&apos;до users/{authUser.uid} документин role: admin кылып түзүңүз же менеджер катары{' '}
          <Link href="/manager" className="text-sky-400 underline">
            /manager
          </Link>{' '}
          кирүү.
        </p>
        <button type="button" onClick={() => auth && signOut(auth)} className="mt-6 text-sky-400">
          Чыгуу
        </button>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: typeof Users; count: number | null }[] = [
    { id: 'analytics', label: 'Аналитика', icon: BarChart3, count: null },
    { id: 'banners', label: 'Баннерлер', icon: ImageIcon, count: banners.length },
    { id: 'leads', label: 'Жазылуулар', icon: Users, count: leads.length },
    { id: 'trials', label: 'Пробный урок', icon: CalendarDays, count: trialLessons.length },
    { id: 'tests', label: 'Тест жыйынтыктары', icon: ClipboardCheck, count: testResults.length },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, count: faqItems.length },
    { id: 'testQuestions', label: 'Тест суроолору', icon: ClipboardCheck, count: null },
    { id: 'videoReviews', label: 'Видео пикирлер', icon: Video, count: videoReviews.length },
    { id: 'courses', label: 'Курстар', icon: BookOpen, count: courses.length },
    { id: 'teachers', label: 'Мугалимдер', icon: GraduationCap, count: teachers.length },
    { id: 'students', label: 'Студенттер', icon: TrendingUp, count: students.length },
  ];
  const overviewCards = [
    { label: 'Жазылуулар', value: leads.length, tab: 'leads' as AdminTab },
    { label: 'Пробный урок', value: trialLessons.length, tab: 'trials' as AdminTab },
    { label: 'Тесттер', value: testResults.length, tab: 'tests' as AdminTab },
  ];

  return (
    <div className="admin-dashboard min-h-screen bg-[#171827] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 px-6 py-7 lg:block">
          <div className="mb-8">
            <h1 className="text-lg font-bold">Okurmen Kids</h1>
            <p className="text-xs text-slate-400">Админ панель</p>
            <Link href="/manager" className="mt-2 inline-block text-xs text-sky-400 hover:underline">
              → Менеджер кабинети
            </Link>
          </div>
          <nav className="space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                  activeTab === tab.id ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </span>
                {tab.count !== null && <span className="text-xs opacity-80">{tab.count}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6">
          <header className="mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="lg:hidden">
                <h1 className="text-lg font-bold">Okurmen Kids</h1>
                <p className="text-xs text-slate-400">Админ панель</p>
              </div>
              <div className="hidden lg:block">
                <h2 className="text-2xl font-bold">Башкаруу</h2>
                <p className="text-xs uppercase tracking-wider text-sky-300">Admin</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="hidden text-sm text-slate-400 sm:inline">
                  {new Date().toLocaleDateString('ru-RU')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen((prev) => !prev)}
                  className="rounded-lg border border-white/10 bg-white/10 p-2 text-slate-200 hover:bg-white/20 lg:hidden"
                  aria-label={isMobileNavOpen ? 'Жабуу' : 'Меню ачуу'}
                >
                  {isMobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => auth && signOut(auth)}
                  className="hidden items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm lg:flex"
                >
                  <LogOut className="h-4 w-4" /> Чыгуу
                </button>
              </div>
            </div>
          </header>

          {isMobileNavOpen && (
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/10 p-2 lg:hidden">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileNavOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                      activeTab === tab.id ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </span>
                    {tab.count !== null && <span className="text-xs opacity-80">{tab.count}</span>}
                  </button>
                ))}
              </nav>
              <div className="mt-2 border-t border-white/10 pt-2">
                <button
                  type="button"
                  onClick={() => auth && signOut(auth)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Чыгуу
                </button>
              </div>
            </div>
          )}

          {!firebaseConfigured && (
            <p className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              Firebase конфигурациясы табылган жок.
            </p>
          )}

          {activeTab === 'analytics' && (
            <section className="mb-6 grid gap-4 sm:grid-cols-3">
              {overviewCards.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setActiveTab(c.tab)}
                  className="rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-5 text-left shadow-lg"
                >
                  <div className="text-3xl font-black">{c.value}</div>
                  <div className="text-sm font-semibold text-white/90">{c.label}</div>
                </button>
              ))}
            </section>
          )}

          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="admin-content">
            {activeTab === 'analytics' && <AnalyticsTab onNavigate={(t) => setActiveTab(t as AdminTab)} />}
            {activeTab === 'banners' && <BannersTab />}
            {activeTab === 'leads' && <LeadsTab />}
            {activeTab === 'trials' && <TrialLessonsTab />}
            {activeTab === 'tests' && <TestResultsTab />}
            {activeTab === 'faq' && <FaqTab />}
            {activeTab === 'testQuestions' && <TestQuestionsTab />}
            {activeTab === 'videoReviews' && <VideoReviewsTab />}
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'teachers' && <TeachersTab />}
            {activeTab === 'students' && <StudentsTab />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
