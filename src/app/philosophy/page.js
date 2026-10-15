'use client';

import PhilosophyHero from '@/components/Philosophy/PhilosophyHero';
import Philosophies from '@/components/Philosophy/Philosophies';

import { useLanguage } from '@/hooks/useLanguage';

export default function Philosophy() {
  const { t } = useLanguage();
  const content = t('philosophy');

  return (
    <main className="flex-1 flex flex-col items-center pt-44 text-center bg-top bg-[url(../assets/philosophy/header_bg.jpg)] unoptimized bg-no-repeat">
      <PhilosophyHero />
      <section className="flex-1 flex flex-col items-center ">
        <div className="container text-left flex flex-col w-full max-w-6xl px-12 lg:px-0 pt-12 pb-20">
          <h3 className="text-lg text-pretty lg:text-xl font-light text-white lg:ml-12">
            {content.sections[0].subtitle}
          </h3>
          <p className="text-base text-balance font-light lg:ml-12 lg:text-lg text-[#ADADAD] mt-4">
            {content.sections[0].description}
          </p>
        </div>
      </section>
      <Philosophies />
    </main>
  );
}
