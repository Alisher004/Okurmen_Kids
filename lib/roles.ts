import type { UserRole } from '@/lib/types';

export function isAdminRole(role: UserRole | null | undefined): boolean {
  return role === 'admin';
}

export function isManagerRole(role: UserRole | null | undefined): boolean {
  return role === 'manager';
}

export function isStaffRole(role: UserRole | null | undefined): boolean {
  return role === 'admin' || role === 'manager';
}
