'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import { ContactModalProvider } from '@/context/ContactModalContext';
import CookieConsentBanner from '@/components/CookieConsentBanner';

export function Providers({ children }) {
  return (
    <LanguageProvider>
      <ContactModalProvider>
        {children}
        <CookieConsentBanner />
      </ContactModalProvider>
    </LanguageProvider>
  );
}
