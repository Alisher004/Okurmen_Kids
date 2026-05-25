import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';

export function stripUndefined<T extends Record<string, unknown>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as T;
}

export function requireSignedIn(): void {
  if (!auth?.currentUser) {
    throw new Error('Кирүү керек.');
  }
}

export function requireAdminRole(isAdmin: boolean): void {
  requireSignedIn();
  if (!isAdmin) {
    throw new Error('Уруксат жок. Админ гана бул аракетти аткара алат.');
  }
}

export function requireStaffRole(isStaff: boolean): void {
  requireSignedIn();
  if (!isStaff) {
    throw new Error('Уруксат жок. Менеджер же админ гана бул аракетти аткара алат.');
  }
}

export function getFirestoreErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    if (error.code === 'permission-denied') {
      return (
        'Firestore уруксаты жок. Firestore Rules жаңыртыңыз (npm run deploy:rules). ' +
        'users/{uid} документин role: admin же manager кылып түзүңүз.'
      );
    }
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return 'Белгисиз ката кетти';
}
