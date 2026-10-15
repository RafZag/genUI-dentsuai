'use client';

import Image from 'next/image';
import PlusIcon from '@/components/PlusIcon';
import audi from '@/assets/clientsLogos/audi.png';
import michelin from '@/assets/clientsLogos/michelin.png';
import reckitt from '@/assets/clientsLogos/reckitt.png';
import pg from '@/assets/clientsLogos/P&G.png';
import mcdonalds from '@/assets/clientsLogos/McDonalds.png';
import skoda from '@/assets/clientsLogos/skoda.png';
import mastercard from '@/assets/clientsLogos/MC.png';
import { useLanguage } from '@/hooks/useLanguage';

const logos = [
  { name: 'Audi', src: audi, height: 47 },
  { name: 'Michelin', src: michelin, height: 66 },
  { name: 'Reckitt', src: reckitt, height: 64 },
  { name: 'P&G', src: pg, height: 50 },
  { name: "McDonald's", src: mcdonalds, height: 60 },
  { name: 'Skoda', src: skoda, height: 26 },
  { name: 'Mastercard', src: mastercard, height: 52 },
];

export default function ClientsLogosSection() {
  const { t } = useLanguage();
  const repeatedSet = [...logos, ...logos, ...logos];
  const doubled = [...repeatedSet, ...repeatedSet];

  return (
    <section className="w-full text-left bg-linear-to-b from-[#141414] to-transparent pt-12 mt-20 mb-20">
      <div className="container max-w-6xl px-4 lg:px-0 mx-auto">
        <h2 className="text-3xl lg:text-4xl font-semibold  text-[#00FF84] inline-flex items-center gap-5 mb-4">
          <PlusIcon size={25} className="text-[#ADADAD] shrink-0" />
          {t('clientsSection.title')}
        </h2>
      </div>

      <div className="w-full overflow-hidden py-10">
        <div
          className="animate-marquee flex items-center w-max"
          style={{ willChange: 'transform' }}
          aria-label={t('clientsSection.ariaLabel')}>
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="px-10 shrink-0 opacity-50 hover:opacity-75 transition-opacity duration-300">
              <Image
                src={logo.src}
                alt={logo.name}
                height={logo.height}
                width={0}
                unoptimized
                style={{ width: 'auto', height: logo.height, filter: 'grayscale(1) brightness(1.4)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
