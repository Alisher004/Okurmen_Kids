'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import LogoMark from '@/components/landing/LogoMark';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-navy-900 px-4">
      <motion.div
        className="relative z-10 w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-center">
          <LogoMark size="xl" showText variant="light" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          404 — Бет табылган жок
        </p>

        <h1 className="mb-4 text-7xl font-black leading-none gradient-brand-text md:text-8xl">404</h1>

        <p className="mb-10 text-lg leading-relaxed text-slate-400">
          Сиз издеген бет жок же жылдырылган болушу мүмкүн. Башкы бетке кайтып, курстар жана байланыш
          бөлүмдөрүн көрүңүз.
        </p>

        <motion.div
          className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/" className="btn-primary inline-flex justify-center px-8 py-4">
            <Home className="h-5 w-5" />
            Башкы бетке
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex justify-center px-8 py-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Артка
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
