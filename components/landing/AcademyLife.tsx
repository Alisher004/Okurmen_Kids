'use client';

import { motion } from 'framer-motion';
import { Globe, Medal, MessageCircle, Trophy, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';

const activities = [
  {
    icon: Trophy,
    title: 'IT жарыштар',
    text: 'Hackathon, олимпиада жана командалык челлендждер — окуучулар билимин практикада сынашат.',
  },
  {
    icon: Medal,
    title: 'Спорттук иш-чаралар',
    text: 'Футбол, волейбол жана командалык оюндар — ден соолук жана бир команда болуу сезимин өстүрөт.',
  },
  {
    icon: Globe,
    title: 'English Speaking Club',
    text: 'Англисче сүйлөө клубу — IT терминдери жана презентация көндүмдөрүн өнүктүрүү.',
  },
  {
    icon: MessageCircle,
    title: 'Talk Club',
    text: 'Ачык пикир алмашуу, дебат жана коммуникация — ишенимдүү сүйлөө көндүмү.',
  },
  {
    icon: Users,
    title: 'Командалык активдүүлүк',
    text: "Долбоорлорду бирге иштөө, код review жана IT Club'та чыныгы тапшыруулар.",
  },
];

type AcademyLifeProps = {
  id?: string;
  showHeading?: boolean;
};

export default function AcademyLife({ id = 'academy-life', showHeading = true }: AcademyLifeProps) {
  return (
    <section id={id} className="section-layer">
      <div className="site-container">
        {showHeading && (
          <SectionHeading
            badgeIcon={Users}
            badge="Атмосфера"
            title="Академиядагы жашоо"
            subtitle="Окуу — тек гана класс эмес. Иш-чаралар, клубдар жана community маданияты"
          />
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {activities.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="border-t border-white/10 pt-6"
            >
              <item.icon className="h-5 w-5 text-brand-gold-400" />
              <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
