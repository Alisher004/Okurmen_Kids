'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Calendar, CheckCircle2, Lightbulb } from 'lucide-react';
import TestResultScreen from '@/components/landing/TestResultScreen';
import { useData } from '@/context/DataContext';
import { getFirestoreErrorMessage } from '@/lib/firestoreAdmin';
import EmptyState from '@/components/ui/EmptyState';
import { ClipboardCheck } from 'lucide-react';

type Step = 'quiz' | 'form' | 'result';
type FeedbackKind = 'correct' | 'hint';

const FEEDBACK_DELAY_MS = 1300;

export default function SkillTestFlow() {
  const { testQuestions, addTestResult, firebaseConfigured, publicDataLoaded } = useData();
  const questions = useMemo(
    () => testQuestions.filter((q) => q.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [testQuestions]
  );
  const total = questions.length;

  const [step, setStep] = useState<Step>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<FeedbackKind | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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

  const question = questions[currentIndex];
  const progressPercent = total > 0 ? ((currentIndex + (feedback ? 0.5 : 0)) / total) * 100 : 0;

  const handleAnswer = (optionIndex: number) => {
    if (feedback || !question) return;

    const isCorrect = optionIndex === question.correctIndex;
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = optionIndex;
    setAnswers(nextAnswers);
    setSelectedIdx(optionIndex);
    setFeedback(isCorrect ? 'correct' : 'hint');

    window.setTimeout(() => {
      setFeedback(null);
      setSelectedIdx(null);
      setCurrentIndex((i) => {
        if (i < total - 1) return i + 1;
        setStep('form');
        return i;
      });
    }, FEEDBACK_DELAY_MS);
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
    setStep('quiz');
    setCurrentIndex(0);
    setAnswers([]);
    setFeedback(null);
    setSelectedIdx(null);
    setName('');
    setPhone('');
    setAge('');
    setSavedScore(null);
    setError('');
  };

  if (!publicDataLoaded) {
    return <div className="animate-pulse rounded-lg bg-white/5 p-16" />;
  }

  if (total === 0) {
    return (
      <EmptyState
        icon={ClipboardCheck}
        title="Тест жакында ачылат"
        description="Админ панелден суроолорду кошуңуз."
      />
    );
  }

  return (
    <div className={`mx-auto w-full ${step === 'result' ? 'max-w-3xl' : 'max-w-xl'}`}>
      {step !== 'result' && (
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>
              {step === 'quiz' ? `Суроо ${currentIndex + 1} / ${total}` : 'Жыйынтык формасы'}
            </span>
            <span className="tabular-nums">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-brand-gold-500"
              animate={{ width: `${step === 'form' ? 100 : progressPercent}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'quiz' && question && (
          <motion.div
            key={`q-${question.id}-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">{question.question}</h3>

            <div className="mt-6 space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                const showCorrect = feedback && isSelected && feedback === 'correct';
                const showHint = feedback && isSelected && feedback === 'hint';

                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={!!feedback}
                    onClick={() => handleAnswer(idx)}
                    className={`relative w-full rounded-lg px-4 py-4 text-left text-base font-medium transition sm:py-4 ${
                      showCorrect
                        ? 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-500/40'
                        : showHint
                          ? 'bg-amber-500/10 text-amber-100 ring-1 ring-amber-500/30'
                          : 'bg-white/[0.04] text-slate-200 hover:bg-white/[0.07] active:scale-[0.99]'
                    } ${feedback && !isSelected ? 'opacity-50' : ''}`}
                  >
                    {opt}
                    {showCorrect && (
                      <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Туура!
                      </span>
                    )}
                    {showHint && (
                      <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-amber-400/90">
                        <Lightbulb className="h-4 w-4" />
                        ката
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 'form' && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div>
              <p className="text-sm text-slate-400">Тест аяктады</p>
              <p className="mt-1 text-2xl font-bold text-white">
                {score}/{total} · {percentage}%
              </p>
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <User className="h-4 w-4" /> Аты-жөнү *
              </label>
              <input className="input-brand" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Phone className="h-4 w-4" /> Телефон
              </label>
              <input className="input-brand" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300">
                <Calendar className="h-4 w-4" /> Жашы
              </label>
              <input className="input-brand" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            {error && <p className="text-sm text-red-400 whitespace-pre-line">{error}</p>}
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
                window.location.href = '/#trial-lesson';
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
