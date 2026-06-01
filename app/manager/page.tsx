'use client';

import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { LogOut, Users, ClipboardCheck, CalendarCheck, ShieldCheck, Menu, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { auth } from '@/lib/firebase';
import AdminLoginScreen from '@/components/admin/AdminLoginScreen';
import LeadsTab from '@/components/admin/LeadsTab';
import TestResultsTab from '@/components/admin/TestResultsTab';
import TrialLessonsTab from '@/components/admin/TrialLessonsTab';

type ManagerTab = 'leads' | 'trials' | 'tests';

export default function ManagerPanel() {
  const { leads, trialLessons, testResults, authUser, authLoading, isStaff, userRole } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<ManagerTab>('leads');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError('Firebase Auth жок.');
      return;
    }
    setIsSigningIn(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err instanceof FirebaseError && err.code === 'auth/invalid-credential' ? 'Туура эмес логин же пароль' : 'Кирүү мүмкүн эмес');
    } finally {
      setIsSigningIn(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#001A3D] text-slate-300">
        Жүктөлүүдө...
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
        title="Manager Panel"
        subtitle="Менеджер кабинети — лиддер жана тесттер"
      />
    );
  }

  if (!isStaff) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#001A3D] px-4 text-center text-white">
        <ShieldCheck className="mb-4 h-12 w-12 text-amber-400" />
        <h1 className="text-xl font-bold">Уруксат жок</h1>
        <p className="mt-2 max-w-md text-slate-400">
          Firestore&apos;до users/{authUser.uid} документин role: manager же admin кылып түзүңүз.
        </p>
        <button type="button" onClick={() => auth && signOut(auth)} className="mt-6 text-brand-gold-400">
          Чыгуу
        </button>
      </div>
    );
  }

  const tabs: { id: ManagerTab; label: string; count: number }[] = [
    { id: 'leads', label: 'Жазылуулар', count: leads.length },
    { id: 'trials', label: 'Пробный урок', count: trialLessons.length },
    { id: 'tests', label: 'Тесттер', count: testResults.length },
  ];
  const activeTabConfig = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-[#001A3D] text-white">
      <header className="border-b border-white/10 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-gold-300">Manager</p>
            <h1 className="text-2xl font-bold">Менеджер кабинети</h1>
            <p className="text-sm text-slate-400">{userRole === 'admin' ? 'Админ (толук көрүү)' : 'Менеджер'}</p>
          </div>
          <button
            type="button"
            onClick={() => auth && signOut(auth)}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Чыгуу
          </button>
        </div>
        <div className="mx-auto mt-4 hidden max-w-5xl gap-2 overflow-x-auto sm:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${
                activeTab === tab.id ? 'bg-brand-gold-500' : 'bg-white/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        <div className="mx-auto mt-4 sm:hidden">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 px-3 py-2">
            <span className="text-sm font-semibold">
              {activeTabConfig?.label} ({activeTabConfig?.count ?? 0})
            </span>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              className="rounded-lg border border-white/10 bg-white/10 p-2 text-slate-200 hover:bg-white/20"
              aria-label={isMobileNavOpen ? 'Жабуу' : 'Меню ачуу'}
            >
              {isMobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
          {isMobileNavOpen && (
            <div className="mt-2 rounded-xl border border-white/10 bg-white/10 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`mb-1 w-full rounded-xl px-4 py-2 text-left text-sm font-semibold last:mb-0 ${
                    activeTab === tab.id ? 'bg-brand-gold-500' : 'bg-white/10'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8 admin-dashboard">
        <div className="admin-content">
          {activeTab === 'leads' && <LeadsTab />}
          {activeTab === 'trials' && <TrialLessonsTab />}
          {activeTab === 'tests' && <TestResultsTab />}
        </div>
      </main>
    </div>
  );
}
