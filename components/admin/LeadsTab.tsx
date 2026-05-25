'use client';

import { Trash2, Users } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { LeadStatus } from '@/lib/types';
import { LEAD_STATUS_LABELS } from '@/lib/statusLabels';

const statuses = (Object.keys(LEAD_STATUS_LABELS) as LeadStatus[]).map((value) => ({
  value,
  label: LEAD_STATUS_LABELS[value],
}));

export default function LeadsTab() {
  const { leads, updateLead, deleteLead, isAdmin } = useData();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">Жазылуулар ({leads.length})</h2>
      </div>
      {leads.length === 0 ? (
        <div className="p-12 text-center">
          <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <p className="text-gray-500">Азырынча жазылуулар жок</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Аты</th>
                <th className="px-4 py-3 text-left">Телефон</th>
                <th className="px-4 py-3 text-left">Жаш</th>
                <th className="px-4 py-3 text-left">Курс</th>
                <th className="px-4 py-3 text-left">Статус</th>
                <th className="px-4 py-3 text-left">Эскертүү</th>
                {isAdmin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.age}</td>
                  <td className="px-4 py-3">{lead.course}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
                      className="rounded-lg border px-2 py-1 text-xs font-semibold"
                    >
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full min-w-[140px] rounded border px-2 py-1"
                      defaultValue={lead.notes || ''}
                      onBlur={(e) => updateLead(lead.id, { notes: e.target.value })}
                      placeholder="Эскертүү"
                    />
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => deleteLead(lead.id)} className="text-red-600">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
