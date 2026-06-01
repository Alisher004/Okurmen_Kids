'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import SectionHeading from './SectionHeading';

const reasons = [
  {
    num: '01',
    title: 'Практика менен башталат',
    text: 'Окуучу теорияны эле эмес, долбоор түзүп, натыжаны көрүп үйрөнөт. Ар бир модуль — портфолиого кошулуучу иш.',
  },
  {
    num: '02',
    title: 'Менторлук маданияты',
    text: 'Мугалимдер сабакты окуу эмес, жеке темп жана мотивацияны сактоо деп түшүнөт. Кичи топ — ар бир окуучуга көнүл бурулат.',
  },
  {
    num: '03',
    title: 'Ата-эне үчүн ачыктык',
    text: 'Бала эмне үйрөнгөнүн, кандай прогресске жеткенин түшүнүү оңой. Сиз процессте, бала эле эмес.',
  },
  {
    num: '04',
    title: 'IT жолунун негизи',
    text: 'Логика, алгоритм, команда менен иштөө — бул чоң IT академияга жана кийинки этапка даярдык.',
  },
];

const parentProblems = [
  'Бала компьютерде убакыт өткөрөт, бирок пайдалуу багыт жок',
  'Кайсы курс ылайыктуу экенин билүү кыйын',
  'Прогрессти көзөмөлдөө жана ишеним түзүү',
];

export default function AboutStory() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-us" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={Heart}
          badge="Okurmen Kids"
          title="Эмне үчүн Okurmen Kids?"
          subtitle="Бишкекте балдар үчүн IT билим берүү — практика, менторлук жана ачык прогресске негизделген"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
              Биз баланы IT дүйнөсүнө ишенимдүү киргизебиз — ата-эне болсо коопсуз сезет
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            Okurmen Kids — Okurmen брендинин балдар багыты. Биз структураланган программа, практикалык долбоорлор жана менторлук аркылуу IT негиздерин үйрөтөбүз. Максатыбыз — балдардын келечегине салым кошуп, алардын IT тармагындагы өсүшүнө жол ачуу.
            </p>
            <div className="mt-6 border-l-2 border-brand-gold-500/50 pl-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-400">
                Ата-энелер кайсы көйгөйдү чечебиз
              </p>
              <ul className="mt-3 space-y-2">
                {parentProblems.map((item) => (
                  <li key={item} className="text-sm text-slate-300">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={scrollToCourses} className="btn-primary mt-8">
              Курстарды көрүү
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-white/10 pt-6"
              >
                <p className="text-3xl font-bold tracking-tight text-white/15 sm:text-4xl">{item.num}</p>
                <h4 className="mt-2 text-base font-bold uppercase tracking-wide text-white sm:text-lg">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
