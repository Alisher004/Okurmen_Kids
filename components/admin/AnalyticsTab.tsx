'use client';

import { motion } from 'framer-motion';
import { Users, FileText, ClipboardCheck, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useEffect, useState } from 'react';
import type { LeadStatus } from '@/lib/types';
import { LEAD_STATUS_LABELS } from '@/lib/statusLabels';

function AnimatedCounter({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number;
    let frame: number;
    const animate = (t: number) => {
      if (!startTime) startTime = t;
      const p = (t - startTime) / (duration * 1000);
      if (p < 1) {
        setCount(Math.floor(end * p));
        frame = requestAnimationFrame(animate);
      } else setCount(end);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);
  return <span>{count}</span>;
}

type AdminTab =
  | 'analytics'
  | 'leads'
  | 'trials'
  | 'tests'
  | 'courses'
  | 'teachers'
  | 'students';

type AnalyticsTabProps = {
  onNavigate?: (tab: AdminTab) => void;
};

export default function AnalyticsTab({ onNavigate }: AnalyticsTabProps) {
  const { students, leads, teachers, courses, testResults, trialLessons } = useData();

  const leadsByStatus = {
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    trial_scheduled: leads.filter((l) => l.status === 'trial_scheduled').length,
    enrolled: leads.filter((l) => l.status === 'enrolled').length,
    rejected: leads.filter((l) => l.status === 'rejected').length,
  };

  const stats = [
    { label: 'Мыкты студенттер', value: students.length, icon: Users, color: 'from-blue-500 to-blue-600', tab: 'students' as AdminTab },
    { label: 'Жазылуулар', value: leads.length, icon: FileText, color: 'from-purple-500 to-purple-600', tab: 'leads' as AdminTab },
    { label: 'Пробный урок', value: trialLessons.length, icon: Calendar, color: 'from-violet-500 to-purple-600', tab: 'trials' as AdminTab },
    { label: 'Тест жыйынтыктары', value: testResults.length, icon: ClipboardCheck, color: 'from-brand-gold-500 to-brand-gold-400', tab: 'tests' as AdminTab },
    { label: 'Курстар', value: courses.length, icon: BookOpen, color: 'from-green-500 to-green-600', tab: 'courses' as AdminTab },
    { label: 'Мугалимдер', value: teachers.length, icon: TrendingUp, color: 'from-pink-500 to-pink-600', tab: 'teachers' as AdminTab },
  ];

  const statusLabels = LEAD_STATUS_LABELS;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Аналитика</h2>
          <p className="text-gray-600">Системанын жалпы статистикасы</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-blue-700">
          <Calendar className="w-5 h-5" />
          <span className="font-semibold">{new Date().toLocaleDateString('ru-RU')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.button
            key={stat.label}
            type="button"
            onClick={() => onNavigate?.(stat.tab)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-lg hover:ring-2 hover:ring-blue-200"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
            <div className="p-6">
              <stat.icon className="mb-4 h-8 w-8 text-gray-400" />
              <div className="text-4xl font-bold text-gray-900">
                <AnimatedCounter end={stat.value} />
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold text-gray-900">Жазылуулардын статусу</h3>
        <div className="space-y-3">
          {(Object.keys(leadsByStatus) as LeadStatus[]).map((key) => (
            <div key={key} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
              <span className="font-semibold text-gray-700">{statusLabels[key]}</span>
              <span className="text-xl font-bold text-blue-600">
                <AnimatedCounter end={leadsByStatus[key]} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
