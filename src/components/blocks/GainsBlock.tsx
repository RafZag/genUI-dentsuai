'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';

// Default product gain illustration icons from reference project
import compIcon from '@/assets/LLM_BA/comp_icon.png';
import cupIcon from '@/assets/LLM_BA/cup_icon.png';
import micIcon from '@/assets/LLM_BA/mic_icon.png';
import clockIcon from '@/assets/LLM_BA/clock_icon.png';

const DEFAULT_ICONS = [compIcon, cupIcon, micIcon, clockIcon];

interface GainItem {
  _key?: string;
  header?: string;
  body?: string;
  icon?: {
    asset: { url: string };
    alt?: string;
  };
}

export interface GainsBlockProps {
  items?: GainItem[];
  columns?: '2' | '3' | 'bento' | string;
  promotedIndex?: number;
  colorClass?: string;
  brandHex?: string;
}

export function GainsBlock({
  items,
  columns = '2',
  colorClass = 'text-white',
  brandHex = '#00ff84',
}: GainsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full flex mt-10 lg:mt-16">
      <div className="container flex flex-col mx-auto w-full max-w-6xl px-6 sm:px-10 lg:pl-0">
        <SectionHeading colorClass={colorClass} plusIconColor="text-lightGray">
          Wartość dla Twojej organizacji
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">
          {items.map((item, index) => {
            const defaultIcon = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
            const hasCustomIcon = Boolean(item.icon?.asset?.url);

            return (
              <div
                key={item._key || index}
                className="flex flex-col items-center justify-start text-center"
              >
                {hasCustomIcon ? (
                  <div className="relative h-48 w-48 mb-2 flex items-center justify-center">
                    <Image
                      src={item.icon!.asset.url}
                      alt={item.icon?.alt || item.header || 'Gain icon'}
                      width={190}
                      height={190}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Image
                    src={defaultIcon}
                    alt={item.header || 'Gain illustration'}
                    width={190}
                    height={190}
                    className="flex self-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                  />
                )}

                <div>
                  {item.header && (
                    <h3 className="text-xl lg:text-2xl font-light text-white mt-8">
                      {item.header}
                    </h3>
                  )}
                  {item.body && (
                    <p className="text-base font-light lg:text-lg text-lightGray mt-2 leading-relaxed max-w-md">
                      {item.body}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}