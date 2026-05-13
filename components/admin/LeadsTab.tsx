'use client';

import { Trash2, Users } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Lead } from '@/context/DataContext';

export default function LeadsTab() {
  const { leads, updateLeadStatus, deleteLead } = useData();

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'enrolled': return 'bg-green-100 text-green-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Катталуулар ({leads.length})</h2>
      </div>

      {leads.length === 0 ? (
        <div className="p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Азырынча катталуулар жок</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Аты-жөнү</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Телефон</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Жашы</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Курс</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Статус</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Аракеттер</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.age}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{lead.course}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(lead.status)} border-0 cursor-pointer`}
                    >
                      <option value="new">Жаңы</option>
                      <option value="contacted">Байланышылды</option>
                      <option value="enrolled">Катталды</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
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
