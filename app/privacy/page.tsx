import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Купуялык саясаты',
  description: `${SITE_NAME} купуялык саясаты`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-navy-900">
      <div className="container mx-auto max-w-3xl px-4 py-24">
        <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-brand-gold-600">
          ← Башкы бетке
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-slate-300">Купуялык саясаты</h1>
        <p className="mt-2 text-sm text-slate-400">Акыркы жаңыртуу: {new Date().getFullYear()}</p>

        <div className="prose prose-brand mt-8 space-y-6 text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-slate-300">1. Жалпы маалымат</h2>
            <p>
              {SITE_NAME} («биз») колдонуучулардын жеке маалыматтарын коргоого милдеттүүбүз. Бул саясат
              сайтты жана катталуу формасын колдонгонуңузда кандай маалымат чогултулаарыбызды түшүндүрөт.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">2. Чогултула турган маалымат</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Аты-жөнү, телефон номери, жашы (катталуу формасы)</li>
              <li>IT тест жыйынтыктары (аты, байланыш, балл)</li>
              <li>Пикирлер (аты, текст, баа)</li>
              <li>Техникалык маалымат (браузер, cookie — стандарттык аналитика кошулса)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">3. Маалыматты колдонуу максаты</h2>
            <p>
              Маалыматтарды курстарга каттоо, байланышуу, тест жыйынтыктарын көрүү жана сайттын ишин
              жакшыртуу үчүн гана колдонобуз.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">4. Сактоо жана коопсуздук</h2>
            <p>
              Маалымат Firebase (Google Cloud) серверлеринде сакталат. Админ панелге уруксат берилген
              адамдар гана катталууларды жана тест жыйынтыктарын көрө алат.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">5. Байланыш</h2>
            <p>
              Суроолор үчүн:{' '}
              <a href="mailto:okurmen2022@gmail.com" className="font-semibold text-brand-gold-600">
                okurmen2022@gmail.com
              </a>{' '}
              же +996 500 677 798
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
