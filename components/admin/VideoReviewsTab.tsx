'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { VideoReview } from '@/lib/types';
import ImageUploadField, { FormUploadSpinner } from './ImageUploadField';
import OrderControls from '@/components/ui/OrderControls';
import { resolveOptionalImageUrl } from '@/lib/cloudinary';

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
  const [pendingThumbnail, setPendingThumbnail] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setForm(empty);
    setPendingThumbnail(null);
    setSaveError('');
  };

  const openEdit = (v: VideoReview) => {
    setEditing(v);
    setForm({
      title: v.title,
      studentName: v.studentName,
      videoUrl: v.videoUrl,
      thumbnail: v.thumbnail ?? '',
      order: v.order,
      isActive: v.isActive,
    });
    setPendingThumbnail(null);
    setSaveError('');
    setShowModal(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);
    try {
      const thumbnail = (await resolveOptionalImageUrl(form.thumbnail, pendingThumbnail)) ?? '';
      const payload = { ...form, thumbnail };
      if (editing) await updateVideoReview(editing.id, payload);
      else await addVideoReview(payload);
      closeModal();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Сактоо ийгиликсиз болду');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">Видео пикирлер ({videoReviews.length})</h2>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setForm(empty);
            setPendingThumbnail(null);
            setSaveError('');
            setShowModal(true);
          }}
          className="rounded-xl bg-brand-gold-500 px-5 py-2.5 font-semibold text-white"
        >
          <Plus className="inline h-5 w-5" /> Кошуу
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {videoReviews.map((v) => (
          <div key={v.id} className="rounded-xl bg-white p-4 shadow">
            {v.thumbnail && (
              <img src={v.thumbnail} alt="" className="mb-3 h-24 w-full rounded-lg object-cover" />
            )}
            <p className="font-bold">{v.title}</p>
            <p className="text-sm text-gray-500">{v.studentName}</p>
            <p className="mt-1 truncate text-xs text-blue-600">{v.videoUrl}</p>
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => openEdit(v)}>
                <Edit2 className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => deleteVideoReview(v.id)}>
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 p-4 sm:flex sm:items-center sm:justify-center"
          onClick={closeModal}
        >
          <form
            onSubmit={submit}
            className="w-full max-w-lg rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex justify-between">
              <h3 className="font-bold">{editing ? 'Өзгөртүү' : 'Жаңы видео'}</h3>
              <button type="button" onClick={closeModal}>
                <X />
              </button>
            </div>
            <div className="space-y-3">
              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                disabled={saving}
              />
              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Student name"
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                required
                disabled={saving}
              />
              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Видео шилтеме (YouTube, Vimeo, mp4, Google Drive...)"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                required
                disabled={saving}
              />
              <p className="text-xs text-gray-500">
                YouTube (Shorts кошумча), Vimeo, Rutube, түз mp4/webm шилтеме же башка embed URL.
              </p>
              <ImageUploadField
                label="Thumbnail"
                value={form.thumbnail || ''}
                onChange={(thumbnail) => setForm({ ...form, thumbnail })}
                onPendingFileChange={setPendingThumbnail}
                optional
                disabled={saving}
              />
              <OrderControls order={form.order} onOrderChange={(order) => setForm({ ...form, order })} />
              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  disabled={saving}
                />
                Активдүү
              </label>
              {saveError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {saveError}
                </p>
              )}
              {saving ? (
                <FormUploadSpinner />
              ) : (
                <button type="submit" className="w-full rounded-xl bg-brand-gold-500 py-3 text-white">
                  Сактоо
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
