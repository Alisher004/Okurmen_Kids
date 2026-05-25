'use client';

import { Trash2, CalendarCheck } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { TrialLesson } from '@/lib/types';
import { TRIAL_STATUS_LABELS } from '@/lib/statusLabels';

const statuses = (Object.keys(TRIAL_STATUS_LABELS) as TrialLesson['status'][]).map((value) => ({
  value,
  label: TRIAL_STATUS_LABELS[value],
}));

export default function TrialLessonsTab() {
  const { trialLessons, updateTrialLesson, deleteTrialLesson, isAdmin } = useData();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">Пробный урок ({trialLessons.length})</h2>
      </div>
      {trialLessons.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <CalendarCheck className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          Азырынча арыз жок
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Бала</th>
                <th className="px-4 py-3 text-left">Телефон</th>
                <th className="px-4 py-3 text-left">Жаш</th>
                <th className="px-4 py-3 text-left">Курс</th>
                <th className="px-4 py-3 text-left">Статус</th>
                <th className="px-4 py-3 text-left">Эскертүү</th>
                {isAdmin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y">
              {trialLessons.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 font-medium">{t.childName}</td>
                  <td className="px-4 py-3">{t.parentPhone}</td>
                  <td className="px-4 py-3">{t.childAge}</td>
                  <td className="px-4 py-3">{t.courseInterest}</td>
                  <td className="px-4 py-3">
                    <select
                      value={t.status}
                      onChange={(e) => updateTrialLesson(t.id, { status: e.target.value as TrialLesson['status'] })}
                      className="rounded-lg border px-2 py-1"
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
                      className="w-full min-w-[120px] rounded border px-2 py-1"
                      defaultValue={t.notes || ''}
                      onBlur={(e) => updateTrialLesson(t.id, { notes: e.target.value })}
                      placeholder="Эскертүү"
                    />
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => deleteTrialLesson(t.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
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
