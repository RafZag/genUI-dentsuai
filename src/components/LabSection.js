'use client';

import Image from 'next/image';
import lablogo from '@/assets/lab_logo.png';
import labBG from '@/assets/lab_bg.png';
import PlusIcon from '@/components/PlusIcon';
import { useLanguage } from '@/hooks/useLanguage';

import Link from 'next/link';

export default function LabSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative z-10 -mt-40 bg-top border-b border-white/10 w-full pt-60 pb-24 mb-18"
      style={{
        backgroundImage: `url('${labBG.src}'), radial-gradient(rgba(0,0,0,0.2) 0%, rgba(102,102,102,.1) 100%)`,
        backgroundPosition: 'center top, center',
      }}>
      <div className="container flex lg:flex-row lg:w-6xl flex-col px-6 lg:px-0 mx-auto items-center justify-center gap-14 h-full font-light">
        <div className="h-full lg:px-0 px-6 flex flex-col items-center justify-center ">
          <Image src={lablogo} alt="Lab Logo" width={1200} height="auto" unoptimized className="mb-4" />
        </div>
        <div className="text-left">
          <h3 className="text-2xl font-light text-white mb-4 inline-flex items-center gap-5">
            <PlusIcon size={25} className="text-[#00FF84]" />
            {t('labSection.title')}
          </h3>
          <p className="lg:text-lg font-light mb-12 pl-10">{t('labSection.description')}</p>
          <Link href="/lab">
            <button className="self-start ml-10 rounded-xl border border-[#00FF84] px-10 py-5 text-[#00FF84] leading-none font-light transition-colors duration-300 hover:bg-[#00FF84] hover:text-black cursor-pointer">
              {t('labSection.readMore')}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
