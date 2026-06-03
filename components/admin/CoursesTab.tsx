'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Course } from '@/context/DataContext';
import ImageUploadField, { FormUploadSpinner } from './ImageUploadField';
import { resolveOptionalImageUrl } from '@/lib/cloudinary';

export default function CoursesTab() {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    age: '',
    description: '',
    duration: '',
    icon: 'book',
    color: 'from-blue-500 to-blue-600',
    image: '',
    slug: '',
  });

  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);
    try {
      const image = (await resolveOptionalImageUrl(formData.image, pendingImage)) ?? '';
      const payload = { ...formData, image };
      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
      } else {
        await addCourse(payload);
      }
      resetForm();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Сактоо ийгиликсиз болду');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      age: '',
      description: '',
      duration: '',
      icon: 'book',
      color: 'from-blue-500 to-blue-600',
      image: '',
      slug: '',
    });
    setPendingImage(null);
    setSaveError('');
    setEditingCourse(null);
    setShowModal(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      age: course.age,
      description: course.description,
      duration: course.duration,
      icon: course.icon || 'book',
      color: course.color || 'from-blue-500 to-blue-600',
      image: course.image || '',
      slug: course.slug || '',
    });
    setPendingImage(null);
    setSaveError('');
    setShowModal(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Курстар ({courses.length})</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 px-6 py-3 font-semibold text-white transition-shadow hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Кошуу</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
            {course.image && (
              <img src={course.image} alt={course.title} className="mb-4 h-32 w-full rounded-xl object-cover" />
            )}
            <div className="absolute right-4 top-4 flex space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors hover:bg-blue-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteCourse(course.id)}
                className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mb-2 pr-20 text-xl font-bold">{course.title}</h3>
            <p className="mb-2 text-sm text-gray-600">
              {course.age} • {course.duration}
            </p>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4 sm:flex sm:items-center sm:justify-center"
          onClick={resetForm}
        >
          <div
            className="my-6 mx-auto w-full max-w-md rounded-2xl bg-white p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">{editingCourse ? 'Өзгөртүү' : 'Жаңы курс'}</h3>
              <button onClick={resetForm} className="rounded-lg p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUploadField
                value={formData.image}
                onChange={(image) => setFormData({ ...formData, image })}
                onPendingFileChange={setPendingImage}
                optional
                disabled={saving}
              />
              <input
                type="text"
                placeholder="Аталышы"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Жашы (мис: 12-16 жаш)"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
              <textarea
                placeholder="Сүрөттөмө"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                rows={3}
                required
              />
              <input
                type="text"
                placeholder="Узактыгы (мис: 6 ай)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Slug (URL, мис: frontend) — бош болсо автоматтык"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Иконка ID (мис: book)"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
              {saveError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{saveError}</p>
              )}
              {saving ? (
                <FormUploadSpinner />
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 py-3 font-semibold text-white transition-shadow hover:shadow-lg"
                >
                  {editingCourse ? 'Сактоо' : 'Кошуу'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
