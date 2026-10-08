import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/SectionHeader';

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
  columns = '3',
  colorClass = 'text-white',
  brandHex = '#00ff84',
}: GainsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 w-full">
      <div className="mb-8">
        <SectionHeader colorClass={colorClass} plusIconColor="text-lightGray">
          Wartość dla Twojej organizacji
        </SectionHeader>
      </div>

      <div
        className={`grid grid-cols-1 ${
          columns === '2' ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
        } gap-6`}
      >
        {items.map((item, idx) => (
          <div
            key={item._key || idx}
            className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-colors"
          >
            <div>
              {item.icon?.asset?.url && (
                <div
                  className="relative mb-6 h-12 w-12 overflow-hidden rounded-xl border border-white/10 p-2"
                  style={{ backgroundColor: `${brandHex}15` }}
                >
                  <Image
                    src={item.icon.asset.url}
                    alt={item.icon.alt || item.header || 'Gain icon'}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              )}
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-3">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}