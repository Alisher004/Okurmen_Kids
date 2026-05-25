import type { Course } from '@/lib/types';

export type CourseHighlight = {
  label: string;
  value: string;
};

export function getCourseHighlights(course: Course): {
  forWho: string;
  learns: string;
  outcome: string;
  program: string[];
} {
  const title = course.title.toLowerCase();
  let outcome =
    'Практикалык долбоорлор, логикалык ой жүгүртүү жана портфолиого кошулуучу жыйынтыктар.';
  let learns = course.description || 'Заманбап IT көндүмдөрү практика менен.';

  const program: string[] = [];

  if (title.includes('frontend') || title.includes('веб')) {
    outcome = 'Веб-сайт түзүү, дизайн негиздери жана чыныгы долбоор портфолиосу.';
    program.push('HTML/CSS негиздери', 'Интерактивдүү интерфейс', 'Жеке веб-долбоор');
  } else if (title.includes('scratch') || title.includes('скретч')) {
    outcome = 'Оюн жана анимация түзүү, логика жана чыгармачылык ой жүгүртүү.';
    program.push('Визуалдык программалоо', 'Оюн логикасы', 'Жеке оюн долбоору');
  } else if (title.includes('python')) {
    outcome = 'Python негиздери, автоматташтыруу ойлонуу жана долбоордук тапшырмалар.';
    program.push('Синтаксис жана логика', 'Практикалык тапшырмалар', 'Мини-долбоор');
  } else if (title.includes('design') || title.includes('дизайн')) {
    outcome = 'Визуалдык ой жүгүртүү, UI негиздери жана дизайн портфолиосу.';
    program.push('Композиция жана түстөр', 'UI/UX негиздери', 'Дизайн долбоору');
  } else {
    program.push('IT негиздери', 'Практикалык сабактар', 'Долбоордук жыйынтык');
  }

  return {
    forWho: course.age || '9–15 жаш',
    learns,
    outcome,
    program,
  };
}
