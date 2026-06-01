'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { FaqItem } from '@/lib/types';
import OrderControls from '@/components/ui/OrderControls';

const empty: Omit<FaqItem, 'id'> = { question: '', answer: '', order: 0, isActive: true };

export default function FaqTab() {
  const { faqItems, addFaq, updateFaq, deleteFaq } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState(empty);

  const sorted = [...faqItems].sort((a, b) => a.order - b.order);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await updateFaq(editing.id, form);
    else await addFaq(form);
    setShowModal(false);
    setEditing(null);
    setForm(empty);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">FAQ ({faqItems.length})</h2>
        <button type="button" onClick={() => setShowModal(true)} className="rounded-xl bg-brand-gold-500 px-5 py-2.5 font-semibold text-white"><Plus className="inline h-5 w-5" /> Кошуу</button>
      </div>
      <div className="space-y-3">
        {sorted.map((f) => (
          <div key={f.id} className="rounded-xl bg-white p-4 shadow">
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-bold">{f.question}</p>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{f.answer}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => { setEditing(f); setForm(f); setShowModal(true); }} className="text-blue-600"><Edit2 className="h-4 w-4" /></button>
                <button type="button" onClick={() => deleteFaq(f.id)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 sm:flex sm:items-center sm:justify-center" onClick={() => setShowModal(false)}>
          <form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="mb-4 text-xl font-bold">{editing ? 'Өзгөртүү' : 'Жаңы суроо'}</h3>
            <input className="mb-3 w-full rounded-xl border px-4 py-2" placeholder="Суроо" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
            <textarea className="mb-3 w-full rounded-xl border px-4 py-2" rows={4} placeholder="Жооп" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
            <OrderControls order={form.order} onOrderChange={(order) => setForm({ ...form, order })} />
            <label className="mb-4 flex gap-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Активдүү</label>
            <button type="submit" className="w-full rounded-xl bg-brand-gold-500 py-3 text-white font-semibold">Сактоо</button>
          </form>
        </div>
      )}
    </div>
  );
}
