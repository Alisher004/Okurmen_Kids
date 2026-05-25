'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import EnrollModal from '@/components/landing/EnrollModal';

type EnrollModalContextValue = {
  openEnroll: () => void;
  closeEnroll: () => void;
};

const EnrollModalContext = createContext<EnrollModalContextValue | null>(null);

export function EnrollModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openEnroll = useCallback(() => setOpen(true), []);
  const closeEnroll = useCallback(() => setOpen(false), []);

  return (
    <EnrollModalContext.Provider value={{ openEnroll, closeEnroll }}>
      {children}
      <EnrollModal open={open} onClose={closeEnroll} />
    </EnrollModalContext.Provider>
  );
}

export function useEnrollModal() {
  const ctx = useContext(EnrollModalContext);
  if (!ctx) {
    throw new Error('useEnrollModal must be used within EnrollModalProvider');
  }
  return ctx;
}
