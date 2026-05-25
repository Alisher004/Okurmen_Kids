'use client';

import { HelpCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
import PremiumFaq from '@/components/ui/PremiumFaq';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeading from './SectionHeading';

export default function FaqSection() {
  const { faqItems, publicDataLoaded } = useData();
  const active = faqItems.filter((f) => f.isActive !== false);

  return (
    <section id="faq" className="section-layer">
      <div className="site-container">
        <SectionHeading
          badgeIcon={HelpCircle}
          badge="FAQ"
          title="Көп берилүүчү суроолор"
          subtitle="Ачык жооптор — жазылуу чечимин кабыл алуу оңой болушу үчүн"
        />
        {!publicDataLoaded ? (
          <div className="mx-auto max-w-4xl animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 border-b border-white/10" />
            ))}
          </div>
        ) : active.length === 0 ? (
          <div className="mx-auto max-w-xl">
            <EmptyState icon={HelpCircle} title="Суроолор жакында кошулат" />
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <PremiumFaq
              items={active.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
            />
          </div>
        )}
      </div>
    </section>
  );
}
