'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';

const benefits = [
  'IT логика жана ой жүгүртүүнү баалоо',
  'Жашка ылайык сунуш алуу',
  '3–5 мүнөт — тез жана жеңил формат',
];

export default function TestIntro() {
  return (
    <section id="skill-test-intro" className="section-layer">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative flex items-end justify-center lg:justify-start" aria-hidden>
              <Image
                src="/images/skill-test-mentor.png"
                alt="IT тестти өткөн окуучу ноутбук менен"
                width={360}
                height={360}
                className="mentor-cutout h-auto w-full max-w-[320px] sm:max-w-[360px]"
                sizes="(max-width: 1024px) 80vw, 360px"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="order-1 lg:order-2"
          >
            <p className="section-badge mb-4">
              <ClipboardCheck className="h-4 w-4" />
              IT тест
            </p>
            <h2 className="section-headline max-w-lg">Өзүңүздү сынап көрүңүз</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Баланын IT логикага болгон кызыгуусун жана баштапкы даярдыгын текшериңиз. Жыйынтыкта — жеке сунуш
              жана кийинки кадам.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/test" className="btn-primary mt-8 inline-flex">
              Тесттен өтүү
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
