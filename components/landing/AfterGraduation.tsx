'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, GraduationCap, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';

const paths = [
  {
    icon: GraduationCap,
    tag: 'Кийинки этап',
    title: 'Чоңдор академиясына өтүү',
    lead: 'Kids программасын бүткөндөн кийин окуучу терең багытка өтө алат — бир технологияны системалуу үйрөнөт.',
    points: [
      'Жашына ылайык деңгээл жана темп',
      'Тереңдетилген долбоор жана сертификат',
      'Карьерага жана кийинки курстарга даярдык',
    ],
  },
  {
    icon: Code2,
    tag: 'Практика',
    title: 'IT Club — чыныгы долбоорлор',
    lead: 'Академиядан кийин IT Club: команда менен иштөө, бизнес-логика жана чыныгы тапшырмалар.',
    points: [
      'Командада иштөө жана коммуникация',
      'Problem solving жана код review маданияты',
      'Иштеп чыгуучу компаниялардагы workflowго жакын тажрыйба',
    ],
  },
];

export default function AfterGraduation() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `${window.location.pathname}#courses`);
  };

  return (
    <section id="after-course" className="section-layer">
      <div className="container relative z-[1] mx-auto px-4 sm:px-6">
        <SectionHeading
          badgeIcon={Users}
          badge="Келечек"
          title="Окууну бүткөндөн кийин эмне болот?"
          subtitle="Биздин максат — узак мөөнөттүү IT жолун ачуу"
        />

        <div className="mx-auto max-w-5xl space-y-12 md:space-y-16">
          {paths.map((path, index) => (
            <motion.article
              key={path.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-8 border-l-2 border-brand-gold-500/60 pl-6 sm:pl-8 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-400">{path.tag}</p>
                <path.icon className="mt-4 h-6 w-6 text-slate-400" />
                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{path.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{path.lead}</p>
              </div>
              <ul className="space-y-4 lg:col-span-7 lg:pt-8">
                {path.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-slate-300 sm:text-base">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-white/[0.08] pt-10 text-center"
          >
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Көп IT компаниялар{' '}
              <strong className="font-semibold text-slate-200">команда менен иштөө</strong> маданиятын күтөт.
              Ошондуктан биз Kids этабында эле долбоордук тажрыйба жана коммуникацияны өстүрөбүз.
            </p>
            <button type="button" onClick={scrollToCourses} className="btn-primary mt-6">
              Баштапкы кадамды талкуулаңыз
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
