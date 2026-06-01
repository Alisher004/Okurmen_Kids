'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { TestQuestion } from '@/lib/types';
import OrderControls from '@/components/ui/OrderControls';

const empty: Omit<TestQuestion, 'id'> = {
  question: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  order: 0,
  isActive: true,
};

export default function TestQuestionsTab() {
  const { testQuestions, addTestQuestion, updateTestQuestion, deleteTestQuestion } = useData();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = [...testQuestions].sort((a, b) => a.order - b.order);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, options: form.options.filter(Boolean) };
    if (payload.options.length < 2) return;
    if (editingId) await updateTestQuestion(editingId, payload);
    else await addTestQuestion(payload);
    setForm(empty);
    setEditingId(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Тест суроолору ({testQuestions.length})</h2>
        <div className="max-h-[60vh] space-y-3 overflow-y-auto">
          {sorted.map((q) => (
            <div key={q.id} className="rounded-xl bg-white p-4 shadow">
              <p className="font-bold">{q.question}</p>
              <p className="text-xs text-gray-500 mt-1">Туура: {q.options[q.correctIndex]}</p>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => { setEditingId(q.id); setForm(q); }} className="text-blue-600 text-sm">Өзгөртүү</button>
                <button type="button" onClick={() => deleteTestQuestion(q.id)} className="text-red-600 text-sm">Өчүрүү</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-lg h-fit">
        <h3 className="mb-4 font-bold">{editingId ? 'Өзгөртүү' : 'Жаңы суроо'}</h3>
        <textarea className="mb-3 w-full rounded-xl border px-4 py-2" rows={2} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Суроо" required />
        {form.options.map((opt, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input type="radio" name="correct" checked={form.correctIndex === i} onChange={() => setForm({ ...form, correctIndex: i })} />
            <input className="flex-1 rounded-lg border px-3 py-2" value={opt} placeholder={`Вариант ${i + 1}`} onChange={(e) => {
              const options = [...form.options];
              options[i] = e.target.value;
              setForm({ ...form, options });
            }} />
          </div>
        ))}
        <OrderControls order={form.order} onOrderChange={(order) => setForm({ ...form, order })} />
        <label className="mb-4 flex gap-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Активдүү</label>
        <button type="submit" className="w-full rounded-xl bg-brand-gold-500 py-3 text-white font-semibold">Сактоо</button>
      </form>
    </div>
  );
}
