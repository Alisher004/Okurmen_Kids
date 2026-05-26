import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { fetchPublicCourses } from '@/lib/firestorePublic';
import { getCourseSlug } from '@/lib/courseSlug';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const courses = await fetchPublicCourses();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/test`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/teachers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${base}/courses/${getCourseSlug(course)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...courseRoutes];
}
