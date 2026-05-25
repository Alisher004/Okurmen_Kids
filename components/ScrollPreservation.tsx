'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useData } from '@/context/DataContext';

function restoreScroll(y: number) {
  if (y <= 0) return;
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  requestAnimationFrame(() => {
    html.style.scrollBehavior = prev;
  });
}

/** Keeps scroll position when Firebase data loads or layout shifts after first paint. */
export default function ScrollPreservation() {
  const pathname = usePathname();
  const { publicDataLoaded } = useData();
  const scrollYRef = useRef(0);
  const prevLoadedRef = useRef(publicDataLoaded);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      return;
    }

    const wasLoaded = prevLoadedRef.current;
    prevLoadedRef.current = publicDataLoaded;

    if (!wasLoaded && publicDataLoaded) {
      restoreScroll(scrollYRef.current);
    }
  }, [pathname, publicDataLoaded]);

  return null;
}
