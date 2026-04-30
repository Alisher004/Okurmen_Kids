'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Course } from '@/context/DataContext';

export default function CoursesTab() {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    age: '',
    description: '',
    duration: '',
    icon: 'Code',
    color: 'from-blue-500 to-blue-600',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      updateCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', age: '', description: '', duration: '', icon: 'Code', color: 'from-blue-500 to-blue-600' });
    setEditingCourse(null);
    setShowModal(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({ title: course.title, age: course.age, description: course.description, duration: course.duration, icon: course.icon, color: course.color });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Курстар ({courses.length})</h2>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5" />
          <span>Кошуу</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button onClick={() => handleEdit(course)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteCourse(course.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2 pr-20">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{course.age} • {course.duration}</p>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingCourse ? 'Өзгөртүү' : 'Жаңы курс'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Аталышы" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <input type="text" placeholder="Жашы (мис: 12-16 жаш)" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <textarea placeholder="Сүрөттөмө" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none resize-none" rows={3} required />
              <input type="text" placeholder="Узактыгы (мис: 6 ай)" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                {editingCourse ? 'Сактоо' : 'Кошуу'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
