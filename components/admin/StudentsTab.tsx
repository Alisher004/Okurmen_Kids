'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Trophy } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Student } from '@/context/DataContext';

export default function StudentsTab() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({ name: '', course: '', achievement: '', avatar: '👦' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', course: '', achievement: '', avatar: '👦' });
    setEditingStudent(null);
    setShowModal(false);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ name: student.name, course: student.course, achievement: student.achievement, avatar: student.avatar });
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Мыкты студенттер ({students.length})</h2>
        <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5" />
          <span>Кошуу</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div key={student.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-200 relative">
            {index === 0 && (
              <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="text-6xl mb-4 text-center">{student.avatar}</div>
            <h3 className="text-xl font-bold text-center mb-2">{student.name}</h3>
            <div className="bg-white rounded-lg p-3 mb-2">
              <p className="text-sm text-gray-600">Курс</p>
              <p className="font-semibold text-blue-600">{student.course}</p>
            </div>
            <div className="bg-white rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">Жетишкендик</p>
              <p className="font-semibold">{student.achievement}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(student)} className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => deleteStudent(student.id)} className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editingStudent ? 'Өзгөртүү' : 'Жаңы студент'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Аты-жөнү" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <input type="text" placeholder="Курс" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <input type="text" placeholder="Жетишкендик" value={formData.achievement} onChange={(e) => setFormData({...formData, achievement: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <input type="text" placeholder="Эмодзи (👦 же 👧)" value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" required />
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                {editingStudent ? 'Сактоо' : 'Кошуу'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
