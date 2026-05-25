'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export type FaqItemData = {
  id: string;
  question: string;
  answer: string;
};

type PremiumFaqProps = {
  items: FaqItemData[];
};

export default function PremiumFaq({ items }: PremiumFaqProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const scrollLockRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (scrollLockRef.current === null) return;
    const y = scrollLockRef.current;
    scrollLockRef.current = null;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, y);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = '';
    });
  }, [openId]);

  return (
    <div>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-white/[0.08] last:border-0">
            <button
              type="button"
              onClick={() => {
                scrollLockRef.current = window.scrollY;
                setOpenId(isOpen ? null : item.id);
              }}
              className="flex w-full items-start justify-between gap-4 py-5 text-left sm:py-6"
              aria-expanded={isOpen}
            >
              <span
                className={`flex-1 text-base font-semibold leading-snug sm:text-lg ${
                  isOpen ? 'text-white' : 'text-slate-200'
                }`}
              >
                {item.question}
              </span>
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-slate-400">
                {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-5 text-sm leading-relaxed text-slate-400 sm:pb-6 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
