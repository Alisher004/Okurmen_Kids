import type { Course } from '@/lib/types';

export function courseSlugFromTitle(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0400-\u04ff]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'course';
}

/** Ensures every course has a unique, URL-safe slug (fixes collisions & bad admin slugs). */
export function normalizeCourseSlugs(courses: Course[]): Course[] {
  const used = new Set<string>();

  return courses.map((course) => {
    let slug = course.slug?.trim() || courseSlugFromTitle(course.title);
    slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\u0400-\u04ff-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!slug) slug = `course-${course.id.slice(-6)}`;

    let candidate = slug;
    let n = 2;
    while (used.has(candidate)) {
      candidate = `${slug}-${n}`;
      n += 1;
    }
    used.add(candidate);

    return { ...course, slug: candidate };
  });
}

export function getCourseSlug(course: Pick<Course, 'slug' | 'title' | 'id'>): string {
  const slug = course.slug?.trim();
  if (slug) return slug;
  return courseSlugFromTitle(course.title);
}

export function normalizeSlugParam(slugParam: string): string {
  try {
    return decodeURIComponent(slugParam).trim().toLowerCase();
  } catch {
    return slugParam.trim().toLowerCase();
  }
}

export function findCourseBySlug(courses: Course[], slugParam: string): Course | undefined {
  const normalized = normalizeSlugParam(slugParam);
  if (!normalized) return undefined;

  const normalizedCourses = normalizeCourseSlugs(courses);

  const bySlug = normalizedCourses.find((c) => getCourseSlug(c).toLowerCase() === normalized);
  if (bySlug) return bySlug;

  const byId = normalizedCourses.find((c) => c.id === slugParam || c.id.toLowerCase() === normalized);
  if (byId) return byId;

  return normalizedCourses.find((c) => courseSlugFromTitle(c.title).toLowerCase() === normalized);
}

export function courseDetailPath(course: Pick<Course, 'slug' | 'title' | 'id'>): string {
  const slug = getCourseSlug(course);
  return `/courses/${encodeURIComponent(slug)}`;
}
