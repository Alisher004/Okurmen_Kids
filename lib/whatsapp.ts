/** WhatsApp номери (эл аралык формат, + жок) */
export const WHATSAPP_PHONE = '996500677798';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildLeadWhatsAppMessage(data: {
  name: string;
  phone: string;
  age: string;
  course: string;
}): string {
  return [
    'Салам! Окурмен Kids сайтынан катталуу өтүнүчү:',
    '',
    `Аты-жөнү: ${data.name.trim()}`,
    `Телефон: ${data.phone.trim()}`,
    `Жашы: ${data.age.trim()}`,
    `Курс: ${data.course}`,
  ].join('\n');
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}
