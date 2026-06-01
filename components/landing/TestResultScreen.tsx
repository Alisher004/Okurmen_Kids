'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getTestFeedback } from '@/lib/testResultFeedback';

type TestResultScreenProps = {
  percentage: number;
  score: number;
  total: number;
  onRetry: () => void;
  onEnroll: () => void;
};

export default function TestResultScreen({
  percentage,
  score,
  total,
  onRetry,
  onEnroll,
}: TestResultScreenProps) {
  const feedback = getTestFeedback(percentage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden"
    >
      <div className="border-b border-white/10 pb-8 sm:pb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Жыйынтык</p>
            <h3 className="max-w-xl text-xl font-bold leading-tight text-white sm:text-2xl">
              {feedback.headline}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {feedback.summary}
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <p className="text-4xl font-extrabold tabular-nums tracking-tight text-white sm:text-5xl">
              {percentage}
              <span className="text-2xl text-slate-400">%</span>
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {score} / {total} туура жооп
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 py-8 sm:grid-cols-2 sm:gap-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gold-400">Күчтүү жактар</p>
          <ul className="space-y-2.5">
            {feedback.strengths.map((s) => (
              <li key={s} className="flex gap-2.5 text-sm text-slate-300">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Өнүктүрүү багыты</p>
          <p className="text-sm leading-relaxed text-slate-400">{feedback.growth}</p>
          <p className="mt-4 border-l-2 border-brand-gold-500/50 pl-4 text-sm text-slate-300">{feedback.nextStep}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
        <button type="button" onClick={onRetry} className="btn-secondary px-6 py-3">
          Кайра тапшыруу
        </button>
        <button type="button" onClick={onEnroll} className="btn-primary px-6 py-3">
          Пробный сабакка жазылуу
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
