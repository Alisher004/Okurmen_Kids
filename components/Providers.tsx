'use client';

import { DataProvider } from '@/context/DataContext';
import { EnrollModalProvider } from '@/context/EnrollModalContext';
import ScrollPreservation from '@/components/ScrollPreservation';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <EnrollModalProvider>
        <ScrollPreservation />
        {children}
      </EnrollModalProvider>
    </DataProvider>
  );
}
