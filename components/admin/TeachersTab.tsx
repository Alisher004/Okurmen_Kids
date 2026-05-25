'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X, User, GraduationCap, Briefcase, FileText } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Teacher } from '@/context/DataContext';
import ImageUrlField from './ImageUrlField';
import OrderControls from '@/components/ui/OrderControls';
import { getFirestoreErrorMessage } from '@/lib/firestoreAdmin';

export default function TeachersTab() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    experience: '',
    education: '',
    bio: '',
    image: '',
    order: 0,
  });
  const [saveError, setSaveError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    try {
      if (editingTeacher) {
        await updateTeacher(editingTeacher.id, formData);
      } else {
        await addTeacher(formData);
      }
      resetForm();
    } catch (err) {
      setSaveError(getFirestoreErrorMessage(err));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      experience: '',
      education: '',
      bio: '',
      image: '',
      order: 0,
    });
    setSaveError('');
    setEditingTeacher(null);
    setShowModal(false);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      position: teacher.position,
      experience: teacher.experience,
      education: teacher.education,
      bio: teacher.bio,
      image: teacher.image,
      order: teacher.order ?? 0,
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Мугалимдер ({teachers.length})</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span>Кошуу</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
            <div className="relative h-64">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/api/placeholder/400/300'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-bold">{teacher.name}</h3>
                <p className="text-sm text-yellow-300">{teacher.position}</p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTeacher(teacher.id)}
                  className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{teacher.experience}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>{teacher.education}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={resetForm}
        >
          <div
            className="flex max-h-[min(92vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-2xl font-bold">{editingTeacher ? 'Өзгөртүү' : 'Жаңы мугалим'}</h3>
              <button type="button" onClick={resetForm} className="rounded-lg p-2 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-6 py-4">
              {/* Name */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Аты-жөнү *</span>
                </label>
                <input
                  type="text"
                  placeholder="Мисалы: Айгүл Токтосунова"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Position */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Кызматы *</span>
                </label>
                <input
                  type="text"
                  placeholder="Мисалы: Senior Frontend Developer"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Experience & Education */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                    <Briefcase className="w-4 h-4 text-yellow-600" />
                    <span>Тажрыйба *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Мисалы: 5 жыл"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                    <GraduationCap className="w-4 h-4 text-yellow-600" />
                    <span>Билими *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Мисалы: КТУ, Программалоо"
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Жөнүндө *</span>
                </label>
                <textarea
                  placeholder="Мугалим жөнүндө кыскача маалымат..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  required
                />
              </div>

              <ImageUrlField
                value={formData.image}
                onChange={(image) => setFormData({ ...formData, image })}
                placeholder="https://example.com/teacher.jpg"
                required
              />

              <OrderControls
                order={formData.order}
                onOrderChange={(order) => setFormData({ ...formData, order })}
              />

              {saveError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 whitespace-pre-line">
                  {saveError}
                </div>
              )}

              <button
                type="submit"
                className="w-full shrink-0 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 py-4 font-semibold text-white transition-shadow hover:shadow-lg"
              >
                {editingTeacher ? 'Сактоо' : 'Кошуу'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
