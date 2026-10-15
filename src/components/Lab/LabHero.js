'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function LabHero() {
  const { language, changeLanguage, t } = useLanguage();
  return (
    <>
      <div className="text-5xl lg:text-7xl font-medium pb-2 bg-linear-to-t from-[#B6B6B6] to-white bg-clip-text text-transparent inline-block">
        <h1>{t('lab.header')}</h1>
      </div>
      <div className="text-xl font-light mt-10 text-white">
        <h3 className="text-lg lg:text-xl font-light text-white lg:ml-12">{t('lab.subtitle')}</h3>
      </div>
    </>
  );
}
