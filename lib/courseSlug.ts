import type { Course } from '@/lib/types';

export function courseSlugFromTitle(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'course';
}

export function getCourseSlug(course: Pick<Course, 'title' | 'slug'>): string {
  const custom = course.slug?.trim();
  if (custom) return custom;
  return courseSlugFromTitle(course.title);
}

export function findCourseBySlug(courses: Course[], slug: string): Course | undefined {
  const normalized = slug.trim().toLowerCase();
  return courses.find((c) => getCourseSlug(c).toLowerCase() === normalized);
}

export function courseDetailPath(course: Pick<Course, 'title' | 'slug'>): string {
  return `/courses/${getCourseSlug(course)}`;
}
