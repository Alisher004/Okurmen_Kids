import type { Course } from '@/lib/types';
import { getCourseHighlights } from '@/lib/coursePresentation';

export type CourseDetailContent = {
  forWho: string;
  learns: string;
  outcome: string;
  program: string[];
  skills: string[];
  benefits: string[];
  academyAdvantage: string;
  faq: { question: string; answer: string }[];
};

const DEFAULT_BENEFITS = [
  'Кичи топ — ар бир окуучуга көңүл бурулат',
  'Практика менен окуу — теориядан кийин дароо колдонуу',
  'Ата-эне үчүн ачык прогресс жана байланыш',
];

const DEFAULT_ADVANTAGE =
  'Okurmen Kids — структураланган IT программасы, тажрыйбалуу менторлор жана премиум класс атмосферасы. Биз балдардын кызыгуусун сактап, натыйжага жеткиребиз.';

const DEFAULT_FAQ = [
  {
    question: 'Пробный сабак кантип өтөт?',
    answer:
      'Биринчи сабакта баланын деңгээлин көрөбүз, программа менен тааныштырабыз. Ата-эне үчүн кийинки кадам боюнча сунуш берилет.',
  },
  {
    question: 'Канча убакыт керек?',
    answer: 'Программанын узактыгы курска жараша айтылат — төмөнкү маалыматтарда көрсөтүлгөн.',
  },
];

export function getCourseDetailContent(course: Course): CourseDetailContent {
  const { forWho, learns, outcome, program } = getCourseHighlights(course);
  const title = course.title.toLowerCase();

  let skills = ['Логикалык ой жүгүртүү', 'Командада иштөө', 'Долбоордук ой жүгүртүү'];

  if (title.includes('frontend') || title.includes('веб')) {
    skills = ['HTML/CSS', 'Интерактивдүү UI', 'Веб-долбоор', 'Портфолио'];
  } else if (title.includes('scratch')) {
    skills = ['Визуалдык программалоо', 'Оюн логикасы', 'Алгоритм негиздери'];
  } else if (title.includes('python')) {
    skills = ['Python синтаксиси', 'Автоматташтыруу', 'Мини-долбоор'];
  } else if (title.includes('design')) {
    skills = ['Композиция', 'UI негиздери', 'Визуалдык ой жүгүртүү'];
  }

  return {
    forWho,
    learns,
    outcome,
    program,
    skills,
    benefits: DEFAULT_BENEFITS,
    academyAdvantage: DEFAULT_ADVANTAGE,
    faq: DEFAULT_FAQ.map((item) => ({
      ...item,
      answer: item.question.includes('убакыт')
        ? `Бул программа ${course.duration || '6 ай'} ичинде өтүүгө ылайыктуу.`
        : item.answer,
    })),
  };
}
