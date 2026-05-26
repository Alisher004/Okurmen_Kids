'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';
import {
  clearSavedScroll,
  readSavedScroll,
  restoreScrollY,
  saveScrollForReload,
  scrollToHash,
} from '@/lib/scrollRestore';

/**
 * Refresh scroll fix: manual restoration + sessionStorage persist on pagehide.
 * Saved scrollY wins over stale URL hash (e.g. old #teachers links).
 */
export default function ScrollPreservation() {
  const pathname = usePathname() ?? '/';
  const { publicDataLoaded } = useData();
  const liveScrollRef = useRef(0);
  const restoredRef = useRef(false);
  const prevLoadedRef = useRef(publicDataLoaded);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    history.scrollRestoration = 'manual';

    const onScroll = () => {
      liveScrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const persist = () => saveScrollForReload(pathname);
    window.addEventListener('pagehide', persist);
    window.addEventListener('beforeunload', persist);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', persist);
      window.removeEventListener('beforeunload', persist);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      restoredRef.current = false;
      prevLoadedRef.current = publicDataLoaded;
      return;
    }

    if (!publicDataLoaded) return;

    const wasLoaded = prevLoadedRef.current;
    prevLoadedRef.current = publicDataLoaded;

    const applyRestore = () => {
      if (restoredRef.current) return;

      const saved = readSavedScroll(pathname);
      if (saved && saved.y > 0) {
        restoreScrollY(saved.y);
        restoredRef.current = true;
        clearSavedScroll();
        return;
      }

      if (window.location.hash) {
        if (scrollToHash(window.location.hash, 'auto')) {
          restoredRef.current = true;
          return;
        }
      }

      if (!wasLoaded && liveScrollRef.current > 0) {
        restoreScrollY(liveScrollRef.current);
        restoredRef.current = true;
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(applyRestore);
    });
  }, [pathname, publicDataLoaded]);

  return null;
}
