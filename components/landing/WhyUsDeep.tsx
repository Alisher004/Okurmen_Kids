'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Heart, Shield, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';

const pillars = [
  {
    icon: Users,
    title: 'Менторлук, жөн гана сабак эмес',
    text: 'Мугалим ар бир окуучунун темпин билет — кыйынчылыкты чогуу чечип, мотивацияны сактайт.',
  },
  {
    icon: Shield,
    title: 'Коопсуз жана көзөмөлдүү чөйрө',
    text: 'Кичи топ, ачык прогресс жана ата-эне менен туруктуу байланыш — сиз ар дайым сүрөттө.',
  },
  {
    icon: Heart,
    title: 'Ата-эне үчүн ачыктык',
    text: 'Окуучу эмне үйрөнгөнүн, кандай долбоор түзгөнүн жана кийинки кадамды түшүнүктүү көрөсүз.',
  },
];

const trustStats = [
  { value: '8–12', label: 'окуучудан ашык топ жок — жеке көзөмөл' },
  { value: '100%', label: 'практика — теориядан кийин дароо долбоор' },
  { value: 'IT', label: 'негиздери, логика жана портфолио' },
];

export default function WhyUsDeep() {
  const scrollToTrial = () => {
    document.getElementById('trial-lesson')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-us" className="section-layer">
      <div className="container relative z-[1] mx-auto px-4 sm:px-6">
        <SectionHeading
          badgeIcon={Heart}
          badge="Ата-энелер жана окуучулар үчүн"
          title="Бул академия сиздер үчүн иштелген"
          subtitle="Ишеним — сөздөн эмес, процесстен башталат"
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.06] md:grid-cols-12">
            <div className="editorial-surface p-6 sm:p-8 md:col-span-5 md:p-10">
              <h3 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
                Балдар IT дүйнөсүнө ишенимдүү кадам ташайт — сиз болсо коопсуз сезесиз
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Okurmen Kids — структураланган IT билим берүү. Окуучу практикадан натыжаны көрөт; ата-эне
                прогрессди түшүнөт.
              </p>
              <button type="button" onClick={scrollToTrial} className="btn-primary mt-6">
                Пробный сабакка жазылуу
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-2 md:col-span-7">
              {trustStats.map((stat) => (
                <div key={stat.label} className="editorial-surface p-5 sm:p-6">
                  <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="editorial-surface bg-brand-navy-900/80 p-6 sm:p-8 md:col-span-12 lg:col-span-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-400">Эмне күтө аласыз</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  'Жашка ылайык программа',
                  'Портфолиого кошулуучу долбоорлор',
                  'Кийинки IT этапына даярдык',
                ].map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-10 md:grid-cols-3 md:gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <pillar.icon className="mb-3 h-5 w-5 text-brand-gold-400" />
                <h4 className="text-base font-semibold text-white sm:text-lg">{pillar.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
