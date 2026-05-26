const SCROLL_STORAGE_KEY = 'okurmen:scroll:v1';

export type SavedScroll = {
  y: number;
  path: string;
  hash: string;
};

export function saveScrollForReload(pathname: string) {
  if (typeof window === 'undefined') return;
  const payload: SavedScroll = {
    y: window.scrollY,
    path: pathname,
    hash: window.location.hash,
  };
  try {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

export function readSavedScroll(pathname: string): SavedScroll | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedScroll;
    if (parsed.path !== pathname) return null;
    if (!Number.isFinite(parsed.y) || parsed.y < 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSavedScroll() {
  try {
    sessionStorage.removeItem(SCROLL_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function restoreScrollY(y: number) {
  if (y <= 0) return;
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  requestAnimationFrame(() => {
    window.scrollTo(0, y);
    html.style.scrollBehavior = prev;
  });
}

export function scrollToElementId(id: string, behavior: ScrollBehavior = 'auto') {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset();
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = behavior === 'smooth' ? 'smooth' : 'auto';
  window.scrollTo({ top, behavior });
  requestAnimationFrame(() => {
    html.style.scrollBehavior = prev;
  });
  return true;
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = 'auto') {
  const id = hash.replace(/^#/, '');
  if (!id) return false;
  return scrollToElementId(id, behavior);
}

function getNavOffset() {
  if (typeof document === 'undefined') return 72;
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
  return Number.isFinite(nav) ? nav + 16 : 88;
}

/** Smooth in-page section scroll; updates hash without full navigation. */
export function scrollToSectionId(id: string, options?: { smooth?: boolean; updateHash?: boolean }) {
  const smooth = options?.smooth ?? true;
  const updateHash = options?.updateHash ?? true;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset();
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  requestAnimationFrame(() => {
    html.style.scrollBehavior = prev;
  });
  if (updateHash) {
    history.replaceState(null, '', `${window.location.pathname}#${id}`);
    saveScrollForReload(window.location.pathname);
  }
}
