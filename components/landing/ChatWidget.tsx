'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/whatsapp';

const quickReplies = [
  { label: 'Курстар жөнүндө', message: 'Салам! Курстар жөнүндө толук маалымат бере аласызбы?' },
  { label: 'Катталуу', message: 'Салам! Баланды каттоо үчүн кайрылдым.' },
  { label: 'Баа жана убакыт', message: 'Салам! Курстардын баасы жана графиги кандай?' },
] as const;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    openWhatsApp(trimmed);
    setMessage('');
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 z-[60] w-[min(calc(100vw-2rem),380px)] overflow-hidden rounded-2xl border border-brand-navy-100/80 bg-white shadow-luxury sm:right-6"
          >
            <div className="gradient-brand flex items-center justify-between px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="" width={40} height={40} className="rounded-full bg-white/20 p-1" />
                <div>
                  <p className="font-bold leading-tight">Окурмен Kids</p>
                  <p className="text-xs text-white/80">Онлайн жардам — WhatsApp</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 transition-colors hover:bg-white/15"
                aria-label="Жабуу"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <div className="rounded-2xl rounded-tl-sm bg-brand-navy-50 px-4 py-3 text-sm leading-relaxed text-brand-navy-700">
                Салам! Окурменге кош келиниз. Кантип жардам берели? Тез жооп WhatsApp аркылуу.
              </div>

              <div className="flex flex-wrap gap-2">
                {quickReplies.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => sendMessage(item.message)}
                    className="rounded-full border border-brand-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy-700 transition-colors hover:border-brand-gold-400 hover:bg-brand-gold-50"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(message)}
                  placeholder="Сурооңузду жазыңыз..."
                  className="input-brand flex-1 py-2.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(message)}
                  className="btn-whatsapp !w-auto shrink-0 px-4"
                  aria-label="Жөнөтүү"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => sendMessage('Салам! Окурмен Kids сайтынан жаздым.')}
                className="btn-whatsapp w-full py-3 text-sm"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp ачуу
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-luxury ring-4 ring-brand-gold-400/40 sm:right-6"
        aria-label={open ? 'Чатты жабуу' : 'Чатты ачуу'}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-gold-400/25" />
        <Image
          src="/logo.svg"
          alt="Окурмен Kids чат"
          width={48}
          height={48}
          className="relative rounded-full object-contain"
        />
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366] ring-2 ring-white" />
        )}
      </motion.button>
    </>
  );
}
