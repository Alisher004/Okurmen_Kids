'use client';

import { Trash2, ClipboardCheck } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function TestResultsTab() {
  const { testResults, deleteTestResult } = useData();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Тест жыйынтыктары ({testResults.length})</h2>
        <p className="mt-1 text-sm text-gray-500">Лиддердин IT даярдык тестинин натыйжалары</p>
      </div>

      {testResults.length === 0 ? (
        <div className="p-12 text-center">
          <ClipboardCheck className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <p className="text-lg text-gray-500">Азырынча тест жыйынтыктары жок</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Аты-жөнү</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Телефон</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Жашы</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Балл</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Пайыз</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Дата</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Аракет</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testResults.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{row.phone || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">{row.age || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-brand-navy-700">
                      {row.score} / {row.totalQuestions}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${
                        row.percentage >= 70
                          ? 'bg-green-100 text-green-700'
                          : row.percentage >= 40
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {row.percentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(row.createdAt).toLocaleString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => deleteTestResult(row.id)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Өчүрүү"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
