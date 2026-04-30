'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Users, BookOpen, GraduationCap, TrendingUp, BarChart3 } from 'lucide-react';
import { useData } from '@/context/DataContext';
import LeadsTab from '@/components/admin/LeadsTab';
import CoursesTab from '@/components/admin/CoursesTab';
import TeachersTab from '@/components/admin/TeachersTab';
import StudentsTab from '@/components/admin/StudentsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';

export default function AdminPanel() {
  const { leads, courses, teachers, students } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'leads' | 'courses' | 'teachers' | 'students'>('analytics');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'okurmenadmin@gmail.com' && password === 'okurmen312') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Туура эмес логин же пароль');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">OK</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Окурмен Кидс башкаруу панели</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Email жазыңыз"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Паролду жазыңыз"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Кирүү
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  const stats = {
    leads: leads.length,
    courses: courses.length,
    teachers: teachers.length,
    students: students.length,
  };

  const tabs = [
    { id: 'analytics', label: 'Аналитика', icon: BarChart3, count: null },
    { id: 'leads', label: 'Арыздар', icon: Users, count: stats.leads },
    { id: 'courses', label: 'Курстар', icon: BookOpen, count: stats.courses },
    { id: 'teachers', label: 'Мугалимдер', icon: GraduationCap, count: stats.teachers },
    { id: 'students', label: 'Студенттер', icon: TrendingUp, count: stats.students },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Окурмен Кидс</p>
              </div>
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Чыгуу</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'leads' && <LeadsTab />}
          {activeTab === 'courses' && <CoursesTab />}
          {activeTab === 'teachers' && <TeachersTab />}
          {activeTab === 'students' && <StudentsTab />}
        </motion.div>
      </div>
    </div>
  );
}
