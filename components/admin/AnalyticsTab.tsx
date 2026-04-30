'use client';

import { motion } from 'framer-motion';
import { Users, FileText, Star, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useEffect, useState } from 'react';

// Animated Counter for Analytics
function AnimatedCounter({ end, duration = 1.5 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

export default function AnalyticsTab() {
  const { students, leads, teachers, courses } = useData();
  const [reviews, setReviews] = useState<any[]>([]);

  // Load reviews from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReviews = localStorage.getItem('okurmen_reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    }
  }, []);

  const stats = [
    {
      label: 'Жалпы Студенттер',
      value: students.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      label: 'Жалпы Арыздар',
      value: leads.length,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      label: 'Жалпы Пикирлер',
      value: reviews.length,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Жалпы Курстар',
      value: courses.length,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      label: 'Жалпы Мугалимдер',
      value: teachers.length,
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
    },
  ];

  // Calculate lead status breakdown
  const leadsByStatus = {
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    enrolled: leads.filter(l => l.status === 'enrolled').length,
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Аналитика</h2>
          <p className="text-gray-600">Системанын жалпы статистикасы</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
          <Calendar className="w-5 h-5" />
          <span className="font-semibold">{new Date().toLocaleDateString('ru-RU')}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.color}`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>
                <AnimatedCounter end={stat.value} />
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Арыздардын статусу</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="font-semibold text-gray-700">Жаңы</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                <AnimatedCounter end={leadsByStatus.new} />
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="font-semibold text-gray-700">Байланышылды</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">
                <AnimatedCounter end={leadsByStatus.contacted} />
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="font-semibold text-gray-700">Катталды</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                <AnimatedCounter end={leadsByStatus.enrolled} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Пикирлердин жыйынтыгы</h3>
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="text-5xl font-bold text-yellow-600 mb-2">
                {averageRating}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(parseFloat(averageRating))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {reviews.length} пикир негизинде
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Тез иш-аракеттер</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-semibold text-gray-700">Студенттерди көрүү</span>
          </button>
          <button className="p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-semibold text-gray-700">Арыздарды көрүү</span>
          </button>
          <button className="p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-semibold text-gray-700">Пикирлерди көрүү</span>
          </button>
          <button className="p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-semibold text-gray-700">Курстарды көрүү</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
