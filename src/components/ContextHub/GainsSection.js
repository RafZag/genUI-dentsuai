'use client';

import Image from 'next/image';
import SectionHeading from '../SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';

export default function GainsSection({ chatIcon, faceIcon, checkIcon, decisionIcon, efficiencyIcon, stackIcon }) {
  const { t } = useLanguage();
  const content = t('productPages.contextHub');

  return (
    <section className="w-full flex mt-10 lg:mt-16">
      <div className="container flex flex-col lg:flex-nowrap mx-auto w-full max-w-6xl px-10 lg:pl-0">
        <SectionHeading colorClass="text-CHmainColor" plusIconColor="text-lightGray">
          {content.gains.title}
        </SectionHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">
          {content.gains.items.map((item, index) => {
            const icons = [chatIcon, decisionIcon, faceIcon, stackIcon];
            return (
              <div key={item.title} className="flex flex-col items-center justify-start text-center">
                <Image src={icons[index]} alt={item.iconAlt} width={200} height={200} className="flex self-center" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-light text-white mt-8">{item.title}</h3>
                  <p className="text-base font-light lg:text-lg text-lightGray mt-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
