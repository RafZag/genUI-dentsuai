'use client';

import Image from 'next/image';

import HP_logo from '@/assets/HP/HP_logo.svg';
import paternBG from '@/assets/HP/patern_bg.png';
import { useLanguage } from '@/hooks/useLanguage';

const sectionStyle = {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

export default function ComingSoon() {
  const { t } = useLanguage();
  const content = t('productPages.hydePark');

  return (
    <section
      className="w-full h-140 lg:h-180 flex items-center justify-center pt-20 lg:pt-12"
      style={{
        backgroundImage: `url(${paternBG.src})`,
        ...sectionStyle,
      }}>
      <div className="container flex flex-col gap-8 mx-auto max-w-6xl items-center justify-center">
        <Image
          src={HP_logo}
          alt={content.hero.logoAlt}
          className="h-auto w-[clamp(18rem,32vw,24.5rem)]"
          sizes="(max-width: 1280px) 32vw, 392px"
        />
        <h2 className="px-6 text-3xl lg:text-4xl text-white font-light text-center mt-8">{t('common.comingSoon')}</h2>
        <p className="px-6 max-w-4xl text-lg lg:text-xl text-lightGray font-light text-center">{content.commingSoon}</p>
      </div>
    </section>
  );
}
