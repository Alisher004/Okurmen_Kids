'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-navy-900 px-4 text-center">
      <h1 className="mb-2 text-2xl font-bold text-slate-300">Бир нерсе туура эмес болду</h1>
      <p className="mb-6 max-w-md text-slate-400">Ката кетти. Кайра аракет кылыңыз же башкы бетке кайтыңыз.</p>
      <div className="flex gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Кайра аракет
        </button>
        <Link href="/" className="btn-secondary">
          Башкы бет
        </Link>
      </div>
    </div>
  );
}
