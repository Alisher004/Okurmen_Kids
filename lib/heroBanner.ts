import type { Banner } from '@/lib/types';

export type NormalizedBanner = Banner & {
  desktopImage: string;
  mobileImage: string;
  textAlign: 'left' | 'center';
  overlayOpacity: number;
  valueProposition: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
};

export const FALLBACK_BANNERS: Omit<Banner, 'id'>[] = [

];

export function normalizeBanner(b: Banner): NormalizedBanner {
  const primaryText = b.ctaText?.trim() || 'Пробный сабакка жазылуу';
  const primaryLink = b.ctaLink?.trim() || '#courses';

  return {
    ...b,
    desktopImage: b.image,
    mobileImage: b.imageMobile?.trim() || b.image,
    textAlign: b.textAlign === 'center' ? 'center' : 'left',
    overlayOpacity:
      typeof b.overlayOpacity === 'number'
        ? Math.min(100, Math.max(0, b.overlayOpacity))
        : 25,
    valueProposition: b.valueProposition?.trim() || '',
    primaryCtaText: primaryText,
    primaryCtaLink: primaryLink,
    secondaryCtaText: b.secondaryCtaText?.trim() || '',
    secondaryCtaLink: b.secondaryCtaLink?.trim() || '',
  };
}

/** Hero shows a single primary CTA; secondary is stored for admin only. */
export function shouldShowHeroSecondaryCta(_banner: NormalizedBanner): boolean {
  return false;
}

export function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
