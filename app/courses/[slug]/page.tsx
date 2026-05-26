import type { Metadata } from 'next';
import CourseDetailPage from '@/components/courses/CourseDetailPage';
import { fetchPublicCourses } from '@/lib/firestorePublic';
import { findCourseBySlug, getCourseSlug } from '@/lib/courseSlug';
import { SITE_NAME } from '@/lib/site';

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const courses = await fetchPublicCourses();
  return courses.map((course) => ({ slug: getCourseSlug(course) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const courses = await fetchPublicCourses();
  const course = findCourseBySlug(courses, params.slug);

  if (!course) {
    return { title: `Курс табылган жок | ${SITE_NAME}` };
  }

  return {
    title: `${course.title} — IT курс`,
    description: course.description,
    openGraph: {
      title: `${course.title} | ${SITE_NAME}`,
      description: course.description,
      images: course.image ? [{ url: course.image, alt: course.title }] : undefined,
    },
  };
}

export default function CoursePage({ params }: PageProps) {
  return <CourseDetailPage slug={params.slug} />;
}
