'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type AccordionItemData = {
  id: string;
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItemData[];
  allowMultiple?: boolean;
};

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-brand-navy-100 bg-white shadow-card"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-brand-navy-700 transition-colors hover:bg-brand-navy-50/50 md:px-6 md:py-5"
              aria-expanded={open}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-gold-500 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="border-t border-brand-navy-100 px-5 py-4 text-sm leading-relaxed text-brand-navy-600 md:px-6 md:text-base">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
