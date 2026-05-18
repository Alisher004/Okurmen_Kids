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
  MessageSquare,
  Search,
  ShieldCheck,
  Bell,
  CalendarDays,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import LeadsTab from '@/components/admin/LeadsTab';
import CoursesTab from '@/components/admin/CoursesTab';
import TeachersTab from '@/components/admin/TeachersTab';
import StudentsTab from '@/components/admin/StudentsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import ReviewsTab from '@/components/admin/ReviewsTab';
import { auth } from '@/lib/firebase';
import AdminLoginScreen from '@/components/admin/AdminLoginScreen';

export default function AdminPanel() {
  const { leads, courses, teachers, students, reviews, authUser, authLoading } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'leads' | 'courses' | 'teachers' | 'students' | 'reviews'>('analytics');

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
      if (err instanceof FirebaseError && err.code === 'auth/invalid-credential') {
        setError('Туура эмес логин же пароль');
      } else {
        setError('Кирүү мүмкүн болбой жатат.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#171827] flex items-center justify-center">
        <div className="text-slate-300 font-semibold">Жүктөлүүдө...</div>
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


  const stats = {
    leads: leads.length,
    courses: courses.length,
    teachers: teachers.length,
    students: students.length,
    reviews: reviews.length,
  };

  const tabs = [
    { id: 'analytics', label: 'Аналитика', icon: BarChart3, count: null },
    { id: 'leads', label: 'Катталуулар', icon: Users, count: stats.leads },
    { id: 'courses', label: 'Курстар', icon: BookOpen, count: stats.courses },
    { id: 'teachers', label: 'Мугалимдер', icon: GraduationCap, count: stats.teachers },
    { id: 'students', label: 'Студенттер', icon: TrendingUp, count: stats.students },
    { id: 'reviews', label: 'Пикирлер', icon: MessageSquare, count: stats.reviews },
  ];

  type AdminTab = typeof activeTab;

  const overviewCards: {
    label: string;
    value: number;
    icon: typeof Users;
    gradient: string;
    delta: string;
    tab: AdminTab;
  }[] = [
    {
      label: 'Катталуулар',
      value: stats.leads,
      icon: Users,
      gradient: 'from-sky-500 to-blue-600',
      delta: '+12%',
      tab: 'leads',
    },
    {
      label: 'Курстар',
      value: stats.courses,
      icon: BookOpen,
      gradient: 'from-amber-400 to-orange-500',
      delta: '+4%',
      tab: 'courses',
    },
    {
      label: 'Пикирлер',
      value: stats.reviews,
      icon: MessageSquare,
      gradient: 'from-cyan-400 to-teal-500',
      delta: '+18%',
      tab: 'reviews',
    },
  ];

  return (
    <div className="admin-dashboard min-h-screen bg-[#171827] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 px-6 py-7 lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 shadow-lg shadow-sky-500/25">
              <span className="text-lg font-black">OK</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Okurmen Kids</h1>
              <p className="text-xs font-medium text-slate-400">Башкаруу панели</p>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </span>
                {tab.count !== null && (
                  <span className={`rounded-full px-2 py-0.5 text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-40 -mx-4 mb-6 border-b border-white/10 bg-[#171827]/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                    <ShieldCheck className="h-4 w-4" />
                    Admin Workspace
                  </p>
                  <h2 className="text-2xl font-bold sm:text-3xl">Окурмен Кидс</h2>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-300 transition-colors hover:bg-white/15 hover:text-white lg:hidden"
                  aria-label="Чыгуу"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
                  <CalendarDays className="h-4 w-4 text-sky-300" />
                  <span>{new Date().toLocaleDateString('ru-RU')}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/15 hover:text-white lg:flex"
                >
                  <LogOut className="h-4 w-4" />
                  Чыгуу
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {tab.count !== null && <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">{tab.count}</span>}
                </button>
              ))}
            </div>
          </header>

          <section className="mb-6 rounded-[26px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_2fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-sky-300">Жалпы көрүнүш</p>
                <h3 className="mt-2 text-2xl font-bold">Бүгүнкү башкаруу борбору</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                  Курстар, катталуулар, мугалимдер, студенттер жана пикирлер бир жерден башкарылат.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {overviewCards.map((card) => (
                  <button
                    key={card.label}
                    type="button"
                    onClick={() => setActiveTab(card.tab)}
                    className={`rounded-[22px] bg-gradient-to-br ${card.gradient} p-5 text-left shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/18">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-white/18 px-2 py-1 text-xs font-bold">{card.delta}</span>
                    </div>
                    <div className="text-3xl font-black">{card.value}</div>
                    <div className="mt-1 text-sm font-semibold text-white/85">{card.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="admin-content"
            >
            {activeTab === 'analytics' && (
              <AnalyticsTab
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}
            {activeTab === 'leads' && <LeadsTab />}
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'teachers' && <TeachersTab />}
            {activeTab === 'students' && <StudentsTab />}
            {activeTab === 'reviews' && <ReviewsTab />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
