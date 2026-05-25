import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Колдонуу шарттары',
  description: `${SITE_NAME} колдонуу шарттары`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-navy-50 to-white">
      <div className="container mx-auto max-w-3xl px-4 py-24">
        <Link href="/" className="text-sm font-semibold text-brand-navy-600 hover:text-brand-gold-600">
          ← Башкы бетке
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-brand-navy-700">Колдонуу шарттары</h1>
        <p className="mt-2 text-sm text-brand-navy-500">Акыркы жаңыртуу: {new Date().getFullYear()}</p>

        <div className="mt-8 space-y-6 text-brand-navy-600">
          <section>
            <h2 className="text-xl font-bold text-brand-navy-700">1. Кызматтын максаты</h2>
            <p>
              {SITE_NAME} сайты IT академиясынын курстары, мугалимдери жана катталуу жөнүндө маалымат
              берүү үчүн түзүлгөн.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy-700">2. Колдонуучунун милдеттери</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Туура жана чыныгы маалымат берүү</li>
              <li>Сайтты мыйзамсыз максатта колдонбоо</li>
              <li>Спам пикирлерди жана жалаң жаңылыктарды жөнөтпөө</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy-700">3. Академиянын укуктары</h2>
            <p>
              Биз сайттын мазмунун, курстарды жана бааларды алдын ала эскертпестен өзгөртүүгө укуктуубуз.
              Катталуу формасы — маалыматты алуу үчүн, каттоо келишим эмес.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy-700">4. Жоопкерчилик</h2>
            <p>
              Сайт «кандай болсо ошондой» принциби менен берилет. Техникалык үзгүлтүккө байланыштуу убактылуу
              иштебей калуу үчүн жоопкерчилик тартпайбыз.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-brand-navy-700">5. Байланыш</h2>
            <p>
              okurmen2022@gmail.com | +996 500 677 798 | Бишкек, Табышалиева 29
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
