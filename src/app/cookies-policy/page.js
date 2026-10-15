'use client';

import LegalContentPage from '@/components/LegalContentPage';
import { useLanguage } from '@/hooks/useLanguage';

const CONTENT = {
  en: {
    title: 'Cookies Policy',
    lead: 'This page explains, at a high level, how cookies and similar technologies may be used to keep the website functional and understand aggregate usage.',
    sections: [
      {
        heading: 'Essential cookies',
        paragraphs: [
          'Some cookies or storage mechanisms may be required for core website functionality, security, and language or session preferences.',
        ],
      },
      {
        heading: 'Analytics and performance',
        paragraphs: [
          'Cookies or similar tools may be used to understand how visitors use the website and to improve performance, usability, and content relevance over time.',
        ],
      },
      {
        heading: 'Managing preferences',
        paragraphs: [
          'You can usually control cookies through your browser settings, including blocking or deleting previously stored data.',
        ],
      },
    ],
  },
  pl: {
    title: 'Polityka cookies',
    lead: 'Ta strona wyjaśnia na poziomie ogólnym, jak pliki cookies i podobne technologie mogą być używane do utrzymania działania serwisu i analizy zbiorczych statystyk.',
    sections: [
      {
        heading: 'Niezbędne cookies',
        paragraphs: [
          'Część plików cookies lub mechanizmów pamięci może być potrzebna do podstawowego działania strony, bezpieczeństwa oraz zapamiętywania ustawień języka lub sesji.',
        ],
      },
      {
        heading: 'Analityka i wydajność',
        paragraphs: [
          'Cookies lub podobne narzędzia mogą być wykorzystywane do analizy sposobu korzystania ze strony oraz do poprawy wydajności, użyteczności i trafności treści.',
        ],
      },
      {
        heading: 'Zarządzanie ustawieniami',
        paragraphs: [
          'W większości przypadków możesz zarządzać plikami cookies z poziomu ustawień przeglądarki, w tym je blokować lub usuwać wcześniej zapisane dane.',
        ],
      },
    ],
  },
};

export default function CookiesPolicyPage() {
  const { language } = useLanguage();

  return <LegalContentPage {...(CONTENT[language] || CONTENT.en)} />;
}
