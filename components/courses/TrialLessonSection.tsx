'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarCheck, Send, CheckCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { getFirestoreErrorMessage } from '@/lib/firestoreAdmin';

type TrialLessonSectionProps = {
  /** Pre-select course in the form */
  defaultCourseInterest?: string;
};

export default function TrialLessonSection({ defaultCourseInterest }: TrialLessonSectionProps) {
  const { addTrialLesson, courses, firebaseConfigured } = useData();
  const [form, setForm] = useState({
    childName: '',
    parentPhone: '',
    childAge: '',
    courseInterest: defaultCourseInterest ?? '',
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const courseOptions =
    courses.length > 0 ? courses.map((c) => c.title) : ['Frontend', 'Scratch', 'Python', 'Web Design'];

  useEffect(() => {
    if (defaultCourseInterest) {
      setForm((f) => ({ ...f, courseInterest: defaultCourseInterest }));
    }
  }, [defaultCourseInterest]);

  useEffect(() => {
    const prefill = sessionStorage.getItem('okurmen_prefill_course');
    if (prefill) {
      setForm((f) => ({ ...f, courseInterest: prefill }));
      sessionStorage.removeItem('okurmen_prefill_course');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.childName.trim() || !form.parentPhone.trim() || !form.childAge.trim() || !form.courseInterest) {
      setError('Милдеттүү талааларды толтуруңуз');
      return;
    }
    if (!firebaseConfigured) {
      setError('Firebase орнотулган эмес');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await addTrialLesson(form);
      setSuccess(true);
      setForm({
        childName: '',
        parentPhone: '',
        childAge: '',
        courseInterest: defaultCourseInterest ?? '',
        comment: '',
      });
      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      setError(getFirestoreErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="trial-lesson" className="section-layer border-t border-white/[0.08]">
      <div className="site-container">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-badge mb-4">
              <CalendarCheck className="h-4 w-4" />
              Пробный сабак
            </p>
            <h2 className="section-headline max-w-lg">Пробный сабакка жазылыңыз</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Бул программа сизге ылайыктуу экенин биринчи сабакта көрүңүз. Менеджер сиз менен байланышып, ылайыктуу
              убакыт дайындайт.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-400">
              <li>— Жашына ылайык программа менен таанышуу</li>
              <li>— Мугалим жана класс атмосферасы</li>
              <li>— Кийинки кадам боюнча жеке сунуш</li>
            </ul>

            <div className="mt-8 lg:mt-10">
              {success && (
                <div className="mb-6 flex items-start gap-3 text-green-400">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium sm:text-base">
                    Рахмат! Арыз кабыл алынды. Менеджер жакынкы убакта байланышат.
                  </p>
                </div>
              )}
              {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Баланын аты *</label>
                  <input
                    className="input-brand"
                    value={form.childName}
                    onChange={(e) => setForm({ ...form, childName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Ата-эненин телефону *</label>
                  <input
                    type="tel"
                    className="input-brand"
                    value={form.parentPhone}
                    onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Баланын жашы *</label>
                  <input
                    className="input-brand"
                    value={form.childAge}
                    onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Курс кызыгуусу *</label>
                  <select
                    className="input-brand"
                    value={form.courseInterest}
                    onChange={(e) => setForm({ ...form, courseInterest: e.target.value })}
                    required
                  >
                    <option value="">Тандаңыз</option>
                    {courseOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-300">Комментарий</label>
                  <textarea
                    className="input-brand resize-none"
                    rows={3}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={loading} className="btn-primary w-full py-4 sm:w-auto sm:min-w-[220px]">
                    <Send className="h-5 w-5" />
                    {loading ? 'Жөнөтүлүүдө...' : 'Жазылуу'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)]"
          >
            <div className="relative flex items-end justify-center lg:justify-end" aria-hidden>
              <Image
                src="/images/trial-lesson-mentor.png"
                alt=""
                width={360}
                height={360}
                className="mentor-cutout h-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none lg:w-[min(100%,400px)]"
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
