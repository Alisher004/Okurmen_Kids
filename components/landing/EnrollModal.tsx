'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send, X } from 'lucide-react';
import { useData } from '@/context/DataContext';

type EnrollModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function EnrollModal({ open, onClose }: EnrollModalProps) {
  const { addLead } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setPhone('');
    setDone(false);
    setError('');
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(reset, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Аты-жөнү жана телефон толтурулушу керек');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        age: '—',
        course: 'Жазылуу (сайт)',
      });
      setDone(true);
    } catch {
      setError('Жиберүү мүмкүн болгон жок. Кайра аракет кылыңыз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Жабуу"
            onClick={handleClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enroll-modal-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="relative z-[1] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Жабуу"
            >
              <X className="h-5 w-5" />
            </button>

            {done ? (
              <motion.div className="py-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-brand-gold-400" />
                <h2 id="enroll-modal-title" className="text-xl font-bold text-white">
                  Рахмат!
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Биз сиз менен жакын арада байланышабыз.
                </p>
                <button type="button" onClick={handleClose} className="btn-primary mt-6 w-full">
                  Жакшы
                </button>
              </motion.div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-400">Жазылуу</p>
                <h2 id="enroll-modal-title" className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Курсга жазылуу
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Атыңызды жана телефонуңузду калтырыңыз — менеджер сиз менен байланышат.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <motion.div>
                    <label htmlFor="enroll-name" className="mb-1.5 block text-xs font-medium text-slate-400">
                      Аты-жөнү
                    </label>
                    <input
                      id="enroll-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-brand"
                      placeholder="Мисалы: Айгерим К."
                      autoComplete="name"
                    />
                  </motion.div>
                  <motion.div>
                    <label htmlFor="enroll-phone" className="mb-1.5 block text-xs font-medium text-slate-400">
                      Телефон
                    </label>
                    <input
                      id="enroll-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-brand"
                      placeholder="+996 ..."
                      autoComplete="tel"
                    />
                  </motion.div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    <Send className="h-4 w-4" />
                    {submitting ? 'Жиберилүүдө...' : 'Жазылуу'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
