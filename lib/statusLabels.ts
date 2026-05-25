import type { LeadStatus, TrialLesson, TrialLessonStatus } from '@/lib/types';

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Жаңы',
  contacted: 'Байланышылды',
  trial_scheduled: 'Пробный сабак дайындалды',
  enrolled: 'Катталды',
  rejected: 'Баш тартты',
};

export const TRIAL_STATUS_LABELS: Record<TrialLessonStatus, string> = {
  new: 'Жаңы',
  contacted: 'Байланышылды',
  scheduled: 'Дайындалды',
  completed: 'Аяктады',
  cancelled: 'Жокко чыгарылды',
};

export function getLeadStatusLabel(status: LeadStatus): string {
  return LEAD_STATUS_LABELS[status] ?? status;
}

export function getTrialStatusLabel(status: TrialLessonStatus): string {
  return TRIAL_STATUS_LABELS[status] ?? status;
}
