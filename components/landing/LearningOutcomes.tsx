'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code2, Lightbulb, Target } from 'lucide-react';
import SectionHeading from './SectionHeading';

const outcomes = [
  {
    icon: Code2,
    title: 'Программалоо негиздери',
    text: 'Scratch, Python же Frontend багытында — жашка ылайык синтаксис, логика жана алгоритм түшүнүгү.',
  },
  {
    icon: Lightbulb,
    title: 'Problem solving',
    text: 'Окуучу тапшырманы бөлүп, чечим табуу ыкмасын үйрөнөт. Бул IT эмес, жалпы ойлоо көндүмү.',
  },
  {
    icon: Target,
    title: 'Долбоорду аяктоо',
    text: 'Ар бир модуль — бүткөн иш: сайт, оюн же колдонмо. Бала натыжаны көрөт, портфолио түзөт.',
  },
  {
    icon: BookOpen,
    title: 'Кийинки этапка даярдык',
    text: 'Kids программасынан кийин терең багытка, IT Club же чоң академияга өтө алат.',
  },
];

export default function LearningOutcomes() {
  return (
    <section id="outcomes" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={Target}
          badge="Жыйынтык"
          title="Эмне үйрөнөт жана кандай натыжа алат"
          subtitle="Практика, логика жана көрүнүүчү долбоор — ар бир курсунун негизи"
        />

        <motion.div className="grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:gap-10">
          {outcomes.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4"
            >
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-400" />
              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
