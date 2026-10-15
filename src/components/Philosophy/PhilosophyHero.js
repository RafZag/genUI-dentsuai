'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function PhilosophyHero() {
  const { language, changeLanguage, t } = useLanguage();
  return (
    <>
      <div className="text-5xl lg:text-7xl font-medium pb-2 bg-linear-to-t from-[#B6B6B6] to-white bg-clip-text text-transparent inline-block">
        <h1>{t('philosophy.header')}</h1>
      </div>
      {/* <div className="text-xl font-light text-white">{t('philosophy.subtitle')}</div> */}
    </>
  );
}
