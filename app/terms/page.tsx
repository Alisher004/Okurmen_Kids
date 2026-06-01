import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Колдонуу шарттары',
  description: `${SITE_NAME} колдонуу шарттары`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-navy-900">
      <div className="container mx-auto max-w-3xl px-4 py-24">
        <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-brand-gold-600">
          ← Башкы бетке
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-slate-300">Колдонуу шарттары</h1>
        <p className="mt-2 text-sm text-slate-400">Акыркы жаңыртуу: {new Date().getFullYear()}</p>

        <div className="mt-8 space-y-6 text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-slate-300">1. Кызматтын максаты</h2>
            <p>
              {SITE_NAME} сайты IT академиясынын курстары, мугалимдери жана катталуу жөнүндө маалымат
              берүү үчүн түзүлгөн.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">2. Колдонуучунун милдеттери</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Туура жана чыныгы маалымат берүү</li>
              <li>Сайтты мыйзамсыз максатта колдонбоо</li>
              <li>Спам пикирлерди жана жалаң жаңылыктарды жөнөтпөө</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">3. Академиянын укуктары</h2>
            <p>
              Биз сайттын мазмунун, курстарды жана бааларды алдын ала эскертпестен өзгөртүүгө укуктуубуз.
              Катталуу формасы — маалыматты алуу үчүн, каттоо келишим эмес.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">4. Жоопкерчилик</h2>
            <p>
              Сайт «кандай болсо ошондой» принциби менен берилет. Техникалык үзгүлтүккө байланыштуу убактылуу
              иштебей калуу үчүн жоопкерчилик тартпайбыз.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-300">5. Байланыш</h2>
            <p>
              okurmen2022@gmail.com | +996 500 677 798 | Бишкек, Табышалиева 29
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
