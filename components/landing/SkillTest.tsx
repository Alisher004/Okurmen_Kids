'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, ChevronRight, User, Phone, Calendar } from 'lucide-react';
import TestResultScreen from '@/components/landing/TestResultScreen';
import { useData } from '@/context/DataContext';
import { getFirestoreErrorMessage } from '@/lib/firestoreAdmin';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

type Step = 'intro' | 'quiz' | 'form' | 'result';

export default function SkillTest() {
  const { testQuestions, addTestResult, firebaseConfigured, publicDataLoaded } = useData();
  const questions = useMemo(
    () => testQuestions.filter((q) => q.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [testQuestions]
  );
  const total = questions.length;

  const [step, setStep] = useState<Step>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [savedScore, setSavedScore] = useState<{ score: number; percentage: number } | null>(null);

  const score = answers.reduce((acc, ans, i) => {
    const q = questions[i];
    return acc + (q && ans === q.correctIndex ? 1 : 0);
  }, 0);
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const handleAnswer = (optionIndex: number) => {
    const next = [...answers];
    next[currentIndex] = optionIndex;
    setAnswers(next);
    if (currentIndex < total - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 280);
    } else {
      setTimeout(() => setStep('form'), 320);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Аты-жөнүңүздү жазыңыз');
      return;
    }
    if (!firebaseConfigured) {
      setError('Firebase орнотулган эмес.');
      return;
    }
    if (total === 0) {
      setError('Тест суроолору жок.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await addTestResult({
        name: name.trim(),
        phone: phone.trim() || undefined,
        age: age.trim() || undefined,
        score,
        totalQuestions: total,
        percentage,
      });
      setSavedScore({ score, percentage });
      setStep('result');
    } catch (err) {
      setError(getFirestoreErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTest = () => {
    setStep('intro');
    setCurrentIndex(0);
    setAnswers([]);
    setName('');
    setPhone('');
    setAge('');
    setSavedScore(null);
    setError('');
  };

  const question = questions[currentIndex];
  const progress = total > 0 ? ((currentIndex + (step === 'form' || step === 'result' ? 1 : 0)) / total) * 100 : 0;

  return (
    <section id="skill-test" className="section-layer">
      <div className="container relative z-[1] mx-auto px-4 sm:px-6">
        <SectionHeading
          badgeIcon={ClipboardCheck}
          badge="IT тест"
          title="IT даярдык тести"
          subtitle="Жөнөкөй суроолор — балдарыңыздын IT багытына кызыгуусун текшериңиз"
        />

        <div className={`mx-auto ${step === 'result' ? 'max-w-3xl' : 'max-w-2xl'}`}>
          {!publicDataLoaded ? (
            <div className="animate-pulse rounded-lg bg-white/5 p-16" />
          ) : total === 0 ? (
            <EmptyState
              icon={ClipboardCheck}
              title="Тест жакында ачылат"
              description="Админ панелден суроолорду кошуңуз."
            />
          ) : (
            <>
              <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-brand-gold-500"
                  animate={{ width: `${step === 'intro' ? 0 : Math.min(progress, 100)}%` }}
                />
              </div>

              <AnimatePresence mode="wait">
                {step === 'intro' && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-6 text-center sm:p-8"
                  >
                    <p className="mb-6 text-slate-400">
                      {total} жөнөкөй суроо. Акырында пайыз жана балл көрсөтүлөт.
                    </p>
                    <button type="button" onClick={() => setStep('quiz')} className="btn-primary px-8 py-4">
                      Тестти баштоо
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}

                {step === 'quiz' && question && (
                  <motion.div
                    key={`q-${question.id}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-5 sm:p-8"
                  >
                    <p className="mb-2 text-sm font-semibold text-brand-gold-600">
                      Суроо {currentIndex + 1} / {total}
                    </p>
                    <h3 className="mb-6 text-xl font-bold text-white">{question.question}</h3>
                    <div className="space-y-3">
                      {question.options.map((opt, idx) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswer(idx)}
                          className="w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3.5 text-left font-medium text-slate-200 transition hover:border-brand-gold-400/40 hover:bg-white/[0.06]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 'form' && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 rounded-lg border border-white/[0.08] bg-white/[0.03] p-5 sm:p-8"
                  >
                    <p className="text-center text-lg font-bold text-white">
                      Жыйынтык: {score}/{total} ({percentage}%)
                    </p>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                        <User className="h-4 w-4" /> Аты-жөнү *
                      </label>
                      <input className="input-brand" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                        <Phone className="h-4 w-4" /> Телефон
                      </label>
                      <input className="input-brand" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                        <Calendar className="h-4 w-4" /> Жашы
                      </label>
                      <input className="input-brand" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    {error && (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 whitespace-pre-line">
                        {error}
                      </p>
                    )}
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4">
                      {isSubmitting ? 'Сакталууда...' : 'Жыйынтыкты сактоо'}
                    </button>
                  </motion.form>
                )}

                {step === 'result' && savedScore && (
                  <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <TestResultScreen
                      percentage={savedScore.percentage}
                      score={savedScore.score}
                      total={total}
                      onRetry={resetTest}
                      onEnroll={() => {
                        document.getElementById('trial-lesson')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
