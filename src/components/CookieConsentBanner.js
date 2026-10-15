'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

const STORAGE_KEY = 'cookie-consent-v1';

const DENIED_CONSENT = {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
};

const GRANTED_CONSENT = {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  functionality_storage: 'granted',
  security_storage: 'granted',
};

function updateConsent(consentPayload) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('consent', 'update', consentPayload);
  window.dataLayer.push({ event: 'cookie_consent_updated', consent: consentPayload });
}

export default function CookieConsentBanner() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const copy = useMemo(() => {
    if (language === 'pl') {
      return {
        title: 'Ustawienia cookies',
        description:
          'Używamy cookie, aby poprawić działanie serwisu i analitykę. GTM działa zawsze, ale zgoda decyduje, czy tagi mogą zapisywać cookie.',
        accept: 'Akceptuj wszystkie',
        reject: 'Odrzuc dodatkowe',
        manage: 'Ustawienia cookies',
        policy: 'Polityka prywatności',
      };
    }

    return {
      title: 'Cookie settings',
      description:
        'We use cookies to improve the site and analytics. GTM always runs, but your consent controls whether tags can store cookies.',
      accept: 'Accept all',
      reject: 'Reject non-essential',
      manage: 'Cookie settings',
      policy: 'Privacy policy',
    };
  }, [language]);

  useEffect(() => {
    const savedConsent = localStorage.getItem(STORAGE_KEY);

    if (!savedConsent) {
      setIsBannerOpen(true);
      setIsLoaded(true);
      return;
    }

    if (savedConsent === 'granted') {
      updateConsent(GRANTED_CONSENT);
    } else {
      updateConsent(DENIED_CONSENT);
    }

    setIsLoaded(true);
  }, []);

  function handleConsent(choice) {
    const payload = choice === 'granted' ? GRANTED_CONSENT : DENIED_CONSENT;

    localStorage.setItem(STORAGE_KEY, choice);
    updateConsent(payload);
    setIsBannerOpen(false);
  }

  if (!isLoaded) return null;

  return (
    <>
      {isBannerOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-almostBlack/60 p-5 text-white shadow-2xl backdrop-blur">
            <h2 className="text-lg font-semibold">{copy.title}</h2>
            <p className="mt-2 text-sm text-lightGray">{copy.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleConsent('granted')}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
                {copy.accept}
              </button>
              <button
                type="button"
                onClick={() => handleConsent('denied')}
                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                {copy.reject}
              </button>
              <Link href="/privacy-policy" className="ml-auto text-sm underline underline-offset-4 hover:text-white/80">
                {copy.policy}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsBannerOpen(true)}
          className="fixed bottom-4 left-4 z-[110] rounded-full border border-white/30 bg-almostBlack/60 px-4 py-2 text-xs font-semibold text-lightGray backdrop-blur transition hover:bg-black/90">
          {copy.manage}
        </button>
      )}
    </>
  );
}
