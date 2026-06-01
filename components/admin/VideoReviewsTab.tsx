'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { VideoReview } from '@/lib/types';
import ImageUrlField from './ImageUrlField';
import OrderControls from '@/components/ui/OrderControls';

const empty: Omit<VideoReview, 'id'> = {
  title: '',
  studentName: '',
  videoUrl: '',
  thumbnail: '',
  order: 0,
  isActive: true,
};

export default function VideoReviewsTab() {
  const { videoReviews, addVideoReview, updateVideoReview, deleteVideoReview } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<VideoReview | null>(null);
  const [form, setForm] = useState(empty);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await updateVideoReview(editing.id, form);
    else await addVideoReview(form);
    setShowModal(false);
    setEditing(null);
    setForm(empty);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">Видео пикирлер ({videoReviews.length})</h2>
        <button type="button" onClick={() => setShowModal(true)} className="rounded-xl bg-brand-gold-500 px-5 py-2.5 text-white font-semibold"><Plus className="inline h-5 w-5" /> Кошуу</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {videoReviews.map((v) => (
          <div key={v.id} className="rounded-xl bg-white p-4 shadow">
            <p className="font-bold">{v.title}</p>
            <p className="text-sm text-gray-500">{v.studentName}</p>
            <p className="mt-1 truncate text-xs text-blue-600">{v.videoUrl}</p>
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => { setEditing(v); setForm(v); setShowModal(true); }}><Edit2 className="h-4 w-4" /></button>
              <button type="button" onClick={() => deleteVideoReview(v.id)}><Trash2 className="h-4 w-4 text-red-600" /></button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4 sm:flex sm:items-center sm:justify-center" onClick={() => setShowModal(false)}>
          <form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex justify-between"><h3 className="font-bold">Видео</h3><button type="button" onClick={() => setShowModal(false)}><X /></button></div>
            <div className="space-y-3">
              <input className="w-full rounded-xl border px-4 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <input className="w-full rounded-xl border px-4 py-2" placeholder="Student name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} required />
              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Видео шилтеме (YouTube, Vimeo, mp4, Google Drive...)"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500">
                YouTube (Shorts кошумча), Vimeo, Rutube, түз mp4/webm шилтеме же башка embed URL.
              </p>
              <ImageUrlField
                label="Thumbnail (optional)"
                value={form.thumbnail || ''}
                onChange={(thumbnail) => setForm({ ...form, thumbnail })}
                placeholder="https://example.com/thumb.jpg"
              />
              <OrderControls order={form.order} onOrderChange={(order) => setForm({ ...form, order })} />
              <label className="flex gap-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Активдүү</label>
              <button type="submit" className="w-full rounded-xl bg-brand-gold-500 py-3 text-white">Сактоо</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
