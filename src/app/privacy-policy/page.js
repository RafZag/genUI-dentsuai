'use client';

import LegalContentPage from '@/components/LegalContentPage';
import { useLanguage } from '@/hooks/useLanguage';

const CONTENT = {
  en: {
    title: 'Privacy Policy',
    lead: 'This page outlines the basic privacy principles for visitors who browse the website or contact Dentsu Polska through the contact form.',
    sections: [
      {
        heading: 'What data may be processed',
        paragraphs: [
          'When you contact the team through the website, the information you provide directly in the form may be processed to respond to your inquiry.',
          'Technical data required for secure website delivery may also be processed by hosting and analytics infrastructure.',
        ],
      },
      {
        heading: 'Why data is used',
        paragraphs: [
          'Data is used to operate the website, handle inquiries, maintain security, and improve the quality of the experience offered to visitors.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Depending on applicable law, you may have the right to request access, rectification, deletion, restriction, or objection regarding your personal data.',
        ],
      },
    ],
  },
  pl: {
    title: 'Polityka prywatności',
    lead: 'Ta strona opisuje podstawowe zasady prywatności dla osób odwiedzających serwis lub kontaktujących się z Dentsu Polska przez formularz kontaktowy.',
    sections: [
      {
        heading: 'Jakie dane mogą być przetwarzane',
        paragraphs: [
          'Jeżeli kontaktujesz się z zespołem przez stronę, dane wpisane bezpośrednio do formularza mogą być przetwarzane w celu odpowiedzi na zapytanie.',
          'Dane techniczne niezbędne do bezpiecznego dostarczania strony mogą być również przetwarzane przez infrastrukturę hostingową i analityczną.',
        ],
      },
      {
        heading: 'Cel wykorzystania danych',
        paragraphs: [
          'Dane są wykorzystywane do obsługi serwisu, prowadzenia korespondencji, utrzymania bezpieczeństwa oraz poprawy jakości doświadczenia użytkowników.',
        ],
      },
      {
        heading: 'Twoje prawa',
        paragraphs: [
          'W zależności od obowiązujących przepisów możesz mieć prawo żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania lub wniesienia sprzeciwu.',
        ],
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  return <LegalContentPage {...(CONTENT[language] || CONTENT.en)} />;
}
