'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return {
    language: context.language,
    changeLanguage: context.changeLanguage,
    t: t(context.language),
  };
}
