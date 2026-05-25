import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Балдар үчүн IT курстар`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Okurmen Kids',
    'IT курстар Бишкек',
    'балдар программалоо',
    'Scratch',
    'Python',
    'Frontend',
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: 'website',
    locale: 'ky_KG',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Балдар үчүн IT курстар`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/icon.svg', width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Балдар үчүн IT курстар`,
    description: SITE_DESCRIPTION,
    images: ['/icon.svg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/icon.svg',
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ky" className={jakarta.variable}>
      <body className={`${jakarta.className} text-brand-navy-700`}>
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
