import { collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { normalizeCourseSlugs } from '@/lib/courseSlug';
import type { Course } from '@/lib/types';

export async function fetchPublicCourses(): Promise<Course[]> {
  if (!isFirebaseConfigured() || !db) return [];
  try {
    const snap = await getDocs(collection(db, 'courses'));
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Course);
    return normalizeCourseSlugs(items);
  } catch (error) {
    console.error('fetchPublicCourses:', error);
    return [];
  }
}
