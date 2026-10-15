'use client';

import { createContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, ensureNamespace, hasNamespace } from '@/lib/i18n';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [namespaceVersion, setNamespaceVersion] = useState(0);
  const pathname = usePathname();
  const isProductRoute = pathname?.startsWith('/products/');
  const pageNamespace = ['/philosophy', '/team', '/podcast', '/blog', '/lab']
    .find((p) => pathname === p || pathname?.startsWith(`${p}/`))
    ?.slice(1);
  const shouldWaitForProductTranslations = isProductRoute && !hasNamespace(language, 'productPages');
  const shouldWaitForPageTranslations = pageNamespace && !hasNamespace(language, pageNamespace);

  useEffect(() => {
    // Get language from localStorage or use default
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function preloadRouteNamespaces() {
      const isProductRoute = pathname?.startsWith('/products/');
      const currentPageNamespace = ['/philosophy', '/team', '/podcast', '/blog', '/lab']
        .find((p) => pathname === p || pathname?.startsWith(`${p}/`))
        ?.slice(1);

      if (!isProductRoute && !currentPageNamespace) {
        return;
      }

      if (isProductRoute) {
        await ensureNamespace(language, 'productPages');
      }
      if (currentPageNamespace) {
        await ensureNamespace(language, currentPageNamespace);
      }

      if (!isCancelled) {
        // Trigger a rerender so components can read freshly loaded translations.
        setNamespaceVersion((version) => version + 1);
      }
    }

    preloadRouteNamespaces();

    return () => {
      isCancelled = true;
    };
  }, [language, pathname]);

  const changeLanguage = (newLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, namespaceVersion }}>
      {shouldWaitForProductTranslations || shouldWaitForPageTranslations ? null : children}
    </LanguageContext.Provider>
  );
}
