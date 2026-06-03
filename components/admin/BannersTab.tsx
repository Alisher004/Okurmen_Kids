'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Banner } from '@/lib/types';
import ImageUploadField, { FormUploadSpinner } from './ImageUploadField';
import OrderControls from '@/components/ui/OrderControls';
import { resolveOptionalImageUrl, resolveRequiredImageUrl } from '@/lib/cloudinary';

const empty: Omit<Banner, 'id'> = {
  title: '',
  subtitle: '',
  valueProposition: '',
  image: '',
  imageMobile: '',
  ctaText: 'Пробный сабакка жазылуу',
  ctaLink: '#courses',
  secondaryCtaText: '',
  secondaryCtaLink: '',
  textAlign: 'left',
  overlayOpacity: 25,
  order: 0,
  isActive: true,
};

function bannerToForm(b: Banner): Omit<Banner, 'id'> {
  return {
    title: b.title,
    subtitle: b.subtitle,
    valueProposition: b.valueProposition ?? '',
    image: b.image,
    imageMobile: b.imageMobile ?? '',
    ctaText: b.ctaText,
    ctaLink: b.ctaLink,
    secondaryCtaText: b.secondaryCtaText ?? '',
    secondaryCtaLink: b.secondaryCtaLink ?? '',
    textAlign: b.textAlign ?? 'left',
    overlayOpacity: b.overlayOpacity ?? 25,
    order: b.order,
    isActive: b.isActive,
  };
}

export default function BannersTab() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(empty);
  const [pendingDesktop, setPendingDesktop] = useState<File | null>(null);
  const [pendingMobile, setPendingMobile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const sorted = [...banners].sort((a, b) => a.order - b.order);

  const clearPending = () => {
    setPendingDesktop(null);
    setPendingMobile(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);
    try {
      const image = await resolveRequiredImageUrl(form.image, pendingDesktop, 'Desktop сүрөт');
      const imageMobile = await resolveOptionalImageUrl(form.imageMobile, pendingMobile);

      const payload: Omit<Banner, 'id'> = {
        ...form,
        image,
        imageMobile: imageMobile || undefined,
        valueProposition: form.valueProposition?.trim() || undefined,
        overlayOpacity: form.overlayOpacity,
        secondaryCtaText: form.secondaryCtaText?.trim() || '',
        secondaryCtaLink: form.secondaryCtaLink?.trim() || '',
      };
      if (editing) await updateBanner(editing.id, payload);
      else await addBanner(payload);
      reset();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Сактоо ийгиликсиз болду');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setForm(empty);
    setEditing(null);
    setShowModal(false);
    clearPending();
    setSaveError('');
  };

  const edit = (b: Banner) => {
    setEditing(b);
    setForm(bannerToForm(b));
    clearPending();
    setSaveError('');
    setShowModal(true);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h2 className="text-2xl font-bold">Баннерлер ({banners.length})</h2>
        <button
          type="button"
          onClick={() => {
            clearPending();
            setSaveError('');
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-brand-gold-500 px-5 py-2.5 font-semibold text-white"
        >
          <Plus className="h-5 w-5" /> Кошуу
        </button>
      </div>
      <div className="space-y-4">
        {sorted.map((b) => (
          <div
            key={b.id}
            className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg sm:flex-row sm:items-center"
          >
            {b.image && (
              <img src={b.image} alt="" className="h-24 w-full rounded-xl object-cover sm:w-40" />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-bold">{b.title}</h3>
              <p className="line-clamp-1 text-sm text-gray-500">{b.subtitle}</p>
              <p className="mt-1 text-xs text-gray-400">
                Ирет: {b.order} • {b.isActive ? 'Активдүү' : 'Жашырылган'}
                {b.imageMobile ? ' • Mobile сүрөт бар' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => edit(b)} className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => deleteBanner(b.id)}
                className="rounded-lg bg-red-100 p-2 text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 sm:flex sm:items-center sm:justify-center"
          onClick={reset}
        >
          <form
            className="my-6 w-full max-w-lg rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
          >
            <div className="mb-4 flex justify-between">
              <h3 className="text-xl font-bold">{editing ? 'Өзгөртүү' : 'Жаңы баннер'}</h3>
              <button type="button" onClick={reset}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
              <ImageUploadField
                label="Desktop сүрөт"
                value={form.image}
                onChange={(image) => setForm({ ...form, image })}
                onPendingFileChange={setPendingDesktop}
                required
                disabled={saving}
              />
              <ImageUploadField
                label="Mobile сүрөт"
                value={form.imageMobile ?? ''}
                onChange={(imageMobile) => setForm({ ...form, imageMobile })}
                onPendingFileChange={setPendingMobile}
                optional
                disabled={saving}
              />
              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Headline (title)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                disabled={saving}
              />
              <input
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Subheadline (subtitle)"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                disabled={saving}
              />
              <textarea
                className="w-full rounded-xl border px-4 py-2"
                placeholder="Value proposition (optional)"
                rows={2}
                value={form.valueProposition ?? ''}
                onChange={(e) => setForm({ ...form, valueProposition: e.target.value })}
                disabled={saving}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Primary CTA текст"
                  value={form.ctaText}
                  onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                  disabled={saving}
                />
                <input
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Primary CTA шилтеме"
                  value={form.ctaLink}
                  onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                  disabled={saving}
                />
              </div>
              <p className="text-xs text-gray-500">
                Hero баннерде бир гана негизги CTA көрсөтүлөт. Экинчи CTA талаалары архив үчүн (сайтта жок).
              </p>
              <div className="grid grid-cols-2 gap-3 opacity-60">
                <input
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Secondary CTA (архив)"
                  value={form.secondaryCtaText ?? ''}
                  onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
                  disabled={saving}
                />
                <input
                  className="w-full rounded-xl border px-4 py-2"
                  placeholder="Secondary шилтеме"
                  value={form.secondaryCtaLink ?? ''}
                  onChange={(e) => setForm({ ...form, secondaryCtaLink: e.target.value })}
                  disabled={saving}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Текст alignment</label>
                <select
                  className="w-full rounded-xl border px-4 py-2"
                  value={form.textAlign ?? 'left'}
                  onChange={(e) =>
                    setForm({ ...form, textAlign: e.target.value as 'left' | 'center' })
                  }
                  disabled={saving}
                >
                  <option value="left">Сол</option>
                  <option value="center">Борбор</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Overlay күчү: {form.overlayOpacity ?? 25}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={form.overlayOpacity ?? 25}
                  onChange={(e) => setForm({ ...form, overlayOpacity: Number(e.target.value) })}
                  className="w-full"
                  disabled={saving}
                />
              </div>
              <OrderControls order={form.order} onOrderChange={(order) => setForm({ ...form, order })} />
              <label className="flex items-center gap-2">
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
                <FormUploadSpinner label="Сүрөт жүктөлүп, сакталууда..." />
              ) : (
                <button type="submit" className="w-full rounded-xl bg-brand-gold-500 py-3 font-semibold text-white">
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
