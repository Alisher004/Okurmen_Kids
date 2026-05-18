import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase';

export function stripUndefined<T extends Record<string, unknown>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as T;
}

export function requireSignedIn(): void {
  if (!auth?.currentUser) {
    throw new Error('Админ панелге кирүү керек.');
  }
}

export function getFirestoreErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    if (error.code === 'permission-denied') {
      return (
        'Firestore уруксаты жок. Firebase Console → Firestore → Rules бөлүмүнө ' +
        'firestore.rules файлындагы эрежелерди коюп Publish кылыңыз. ' +
        'Андан кийин /admin бетине кайра кириңиз.'
      );
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Белгисиз ката кетти';
}
