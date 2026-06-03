'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Student } from '@/context/DataContext';
import ImageUploadField, { FormUploadSpinner } from './ImageUploadField';
import { resolveRequiredImageUrl } from '@/lib/cloudinary';

export default function StudentsTab() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ name: '', course: '', image: '' });
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);
    try {
      const image = await resolveRequiredImageUrl(formData.image, pendingImage, 'Сүрөт');
      const payload = { ...formData, image };
      if (editingStudent) {
        await updateStudent(editingStudent.id, payload);
      } else {
        await addStudent(payload);
      }
      resetForm();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Сактоо ийгиликсиз болду');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', course: '', image: '' });
    setPendingImage(null);
    setSaveError('');
    setEditingStudent(null);
    setShowModal(false);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ name: student.name, course: student.course, image: student.image || '' });
    setPendingImage(null);
    setSaveError('');
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Мыкты студенттер ({students.length})</h2>
        <button
          onClick={() => {
            setPendingImage(null);
            setSaveError('');
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>Кошуу</span>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {students.map((student) => (
          <div key={student.id} className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
            <div className="aspect-[4/5]">
              <img
                src={student.image}
                alt={student.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = '/teachers.png'; }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="text-xl font-bold leading-tight">{student.name}</h3>
              <p className="mt-1 text-sm font-semibold text-yellow-300">{student.course}</p>
            </div>
            <div className="absolute right-3 top-3 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(student)} className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteStudent(student.id)} className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto p-4 sm:flex sm:items-center sm:justify-center" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full my-6 mx-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingStudent ? 'Өзгөртүү' : 'Жаңы студент'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Аты-жөнү" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required disabled={saving} />
              <input type="text" placeholder="Группа / курс" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required disabled={saving} />
              <ImageUploadField
                value={formData.image}
                onChange={(image) => setFormData({ ...formData, image })}
                onPendingFileChange={setPendingImage}
                required
                disabled={saving}
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
                  {editingStudent ? 'Сактоо' : 'Кошуу'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
