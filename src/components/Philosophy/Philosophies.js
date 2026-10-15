'use client';

import SectionHeading from '@/components/SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import { useContactModal } from '@/hooks/useContactModal';

import Image from 'next/image';

import icon1 from '@/assets/philosophy/philo_icon1.png';
import icon2 from '@/assets/philosophy/philo_icon2.png';
import icon3 from '@/assets/philosophy/philo_icon3.png';
import icon4 from '@/assets/philosophy/philo_icon4.png';

export default function Philosophies() {
  const { t } = useLanguage();
  const { openContactModal } = useContactModal();
  const content = t('philosophy');

  return (
    <>
      <section className="w-full flex ">
        <div className="container flex items-center lg:flex-nowrap mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col lg:flex-row mb-20">
          <div className="flex-1/2 text-left">
            <SectionHeading colorClass="text-ctMainColor" plusIconColor="text-white/70">
              {content.sections[1].title}
            </SectionHeading>
            <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8 mb-4">
              {content.sections[1].subtitle}
            </h3>
            <p className="text-base font-light lg:text-lg text-lightGray lg:ml-12">{content.sections[1].description}</p>
          </div>
          <div className="flex-1/2 bg-[url(../assets/philosophy/icon_bg.png)] bg-cover bg-center items-center justify-center flex">
            <Image src={icon1} alt="Philosophy Icon 1" width={420} height={420} className="philosophy-icon-hover" />
          </div>
        </div>
      </section>
      <section className="w-full flex">
        <div className="container flex flex-col-reverse items-center lg:flex-nowrap mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 lg:flex-row mb-20">
          <div className="flex-1/2 bg-[url(../assets/philosophy/icon_bg.png)] bg-cover bg-center items-center justify-center flex">
            <Image src={icon3} alt="Philosophy Icon 2" width={420} height={420} className="philosophy-icon-hover" />
          </div>
          <div className="flex-1/2 text-left">
            <SectionHeading colorClass="text-ctMainColor" plusIconColor="text-white/70">
              {content.sections[2].title}
            </SectionHeading>
            <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8 mb-4">
              {content.sections[2].subtitle}
            </h3>
            <p className="text-base font-light lg:text-lg text-lightGray lg:ml-12">{content.sections[2].description}</p>
          </div>
        </div>
      </section>
      <div className="w-full bg-[url(../assets/team_bg.png)] bg-center unoptimized bg-no-repeat">
        <section className="w-full flex ">
          <div className="container flex items-center lg:flex-nowrap mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col lg:flex-row mb-20">
            <div className="flex-1/2 text-left">
              <SectionHeading colorClass="text-ctMainColor" plusIconColor="text-white/70">
                {content.sections[3].title}
              </SectionHeading>
              <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8 mb-4">
                {content.sections[3].subtitle}
              </h3>
              <p className="text-base font-light lg:text-lg text-lightGray lg:ml-12">
                {content.sections[3].description}
              </p>
            </div>
            <div className="flex-1/2 bg-[url(../assets/philosophy/icon_bg.png)] bg-cover bg-center items-center justify-center flex">
              <Image src={icon2} alt="Philosophy Icon 3" width={420} height={420} className="philosophy-icon-hover" />
            </div>
          </div>
        </section>
        <section className="w-full flex mb-12">
          <div className="container flex flex-col-reverse items-center lg:flex-nowrap mx-auto w-full max-w-6xl pl-10 pr-12 lg:px-0 flex-col lg:flex-row ">
            <div className="flex-1/2 bg-[url(../assets/philosophy/icon_bg.png)] bg-cover bg-center items-center justify-center flex">
              <Image src={icon4} alt="Philosophy Icon 4" width={420} height={420} className="philosophy-icon-hover" />
            </div>
            <div className="flex-1/2 text-left">
              <SectionHeading colorClass="text-ctMainColor" plusIconColor="text-white/70">
                {content.sections[4].title}
              </SectionHeading>
              <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8 mb-4">
                {content.sections[4].subtitle}
              </h3>
              <p className="text-base font-light lg:text-lg text-lightGray lg:ml-12">
                {content.sections[4].description}
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="w-full flex mb-20 mt-12">
        <div className="container flex flex-col items-center mx-auto w-full max-w-6xl px-0 gap-8">
          <h2 className={`text-xl lg:text-2xl font-light text-white inline-flex items-center`}>{content.CTA}</h2>

          <button
            type="button"
            onClick={openContactModal}
            className="rounded-xl border border-[#00FF84] px-10 py-5 text-[#00FF84] leading-none font-light transition-colors duration-300 hover:bg-[#00FF84] hover:text-black cursor-pointer">
            {content.bookDemo}
          </button>
        </div>
      </section>
    </>
  );
}
