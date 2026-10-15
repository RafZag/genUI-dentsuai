'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useContactModal } from '@/hooks/useContactModal';

export default function HomepageHero() {
  const { language, changeLanguage, t } = useLanguage();
  const { openContactModal } = useContactModal();
  return (
    <>
      <div className="text-5xl lg:text-7xl font-medium pb-2 px-2 bg-linear-to-t from-[#B6B6B6] to-white bg-clip-text text-transparent inline-block">
        <span dangerouslySetInnerHTML={{ __html: t('HomepageHero.title') }} />
      </div>
      <div className="text-xl px-2 font-light text-white">{t('HomepageHero.subtitle')}</div>
      <div className="flex gap-6 ">
        <button
          type="button"
          onClick={openContactModal}
          className="px-6 py-3 backdrop-blur-sm bg-white/20 text-white rounded-lg border border-white/40  font-light transition-colors duration-300 hover:bg-ctMainColor hover:text-black cursor-pointer">
          {t('common.bookDemo')}
        </button>
        {/* <button className="px-6 py-3 backdrop-blur-sm bg-black/20 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-ctMainColor hover:text-black cursor-pointer">
          {t('common.playVideo')}
        </button> */}
      </div>
    </>
  );
}
