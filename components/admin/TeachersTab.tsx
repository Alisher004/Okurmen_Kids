'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X, User, Mail, Phone, GraduationCap, Briefcase, FileText } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Teacher } from '@/context/DataContext';

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
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      updateTeacher(editingTeacher.id, formData);
    } else {
      addTeacher(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      experience: '',
      education: '',
      bio: '',
      image: '',
      phone: '',
      email: '',
    });
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
      phone: teacher.phone,
      email: teacher.email,
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
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{teacher.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingTeacher ? 'Өзгөртүү' : 'Жаңы мугалим'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Phone & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Телефон *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+996 555 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold mb-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="teacher@okurmen.kg"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold mb-2">Сүрөт URL *</label>
                <input
                  type="text"
                  placeholder="/teacher-name.png"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Сүрөттү public/ папкасына коюңуз</p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-shadow"
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
