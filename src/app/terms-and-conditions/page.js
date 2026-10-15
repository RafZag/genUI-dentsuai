'use client';

import LegalContentPage from '@/components/LegalContentPage';
import { useLanguage } from '@/hooks/useLanguage';

const CONTENT = {
  en: {
    title: 'Terms and Conditions',
    lead: 'These terms describe the general rules for using the Dentsu AI Visual System website and the way visitors can contact the team through the site.',
    sections: [
      {
        heading: 'Website use',
        paragraphs: [
          'The website is provided for informational purposes. You may browse, read, and share publicly available materials for non-deceptive purposes.',
          'You must not misuse the site, attempt to interfere with its operation, or use its content in a way that infringes third-party rights.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Unless stated otherwise, the content, visuals, and branding presented on this website remain the property of Dentsu Polska or its licensors.',
          'Any reuse beyond standard quotation or sharing requires prior written consent from the owner of the relevant materials.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions regarding these terms or the services presented on this website can be submitted through the contact form available on the site.',
        ],
      },
    ],
  },
  pl: {
    title: 'Regulamin',
    lead: 'Niniejszy regulamin opisuje ogólne zasady korzystania ze strony Dentsu AI Visual System oraz sposób kontaktu z zespołem za pośrednictwem serwisu.',
    sections: [
      {
        heading: 'Korzystanie ze strony',
        paragraphs: [
          'Strona ma charakter informacyjny. Mozesz przeglądać, czytać i udostępniać publicznie dostępne materiały w sposób zgodny z prawem i bez wprowadzania w błąd.',
          'Nie wolno nadużywać serwisu, zakłócać jego działania ani wykorzystywać treści w sposób naruszający prawa osób trzecich.',
        ],
      },
      {
        heading: 'Własność intelektualna',
        paragraphs: [
          'O ile nie wskazano inaczej, treści, materiały wizualne i oznaczenia prezentowane na stronie pozostają własnością Dentsu Polska lub jej licencjodawców.',
          'Każde wykorzystanie wykraczające poza dozwolony cytat lub zwykłe udostępnianie wymaga uprzedniej pisemnej zgody właściciela danych materiałów.',
        ],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          'Pytania dotyczące regulaminu lub usług prezentowanych na stronie można przesyłać przez formularz kontaktowy dostępny w serwisie.',
        ],
      },
    ],
  },
};

export default function TermsAndConditionsPage() {
  const { language } = useLanguage();

  return <LegalContentPage {...(CONTENT[language] || CONTENT.en)} />;
}
