import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Табышалиева 29',
      addressLocality: 'Бишкек',
      addressCountry: 'KG',
    },
    telephone: '+996500677798',
    email: 'okurmen2022@gmail.com',
    sameAs: [
      'https://www.instagram.com/okurmen_kids/',
      'https://www.youtube.com/@OKURMENKIDS',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
