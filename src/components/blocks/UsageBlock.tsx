import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { DentsuArrowIcon } from '@/components/icons/DentsuArrowIcon';

interface UsageItem {
  _key?: string;
  header?: string;
  body?: string;
}

export interface UsageBlockProps {
  items?: UsageItem[];
  style?: 'numbered-cards' | 'horizontal-strip' | 'list' | string;
  colorClass?: string;
  brandHex?: string;
}

export function UsageBlock({
  items,
  style = 'list',
  colorClass = 'text-white',
  brandHex = '#00ff84',
}: UsageBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 w-full">
      <div className="mb-8">
        <SectionHeader colorClass={colorClass} plusIconColor="text-lightGray">
          Kiedy warto po to sięgnąć?
        </SectionHeader>
      </div>

      {style === 'numbered-cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-start hover:border-white/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-medium text-black"
                  style={{ backgroundColor: brandHex }}
                >
                  {idx + 1}
                </span>
                {item.header && (
                  <h3 className="text-xl font-medium text-white">
                    {item.header}
                  </h3>
                )}
              </div>
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed pl-10 whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Oryginalny styl lp-dentsu-ai UseCasesSection */
        <div className="grid lg:grid-cols-2 gap-8 mt-6 lg:ml-6">
          {items.map((item, idx) => (
            <div key={item._key || idx}>
              <h3 className="font-light text-white text-xl lg:text-2xl inline-flex items-center gap-3 my-4">
                <DentsuArrowIcon color="#363636" className="relative top-px h-5 w-4 shrink-0" />
                <span>{item.header}</span>
              </h3>
              {item.body && (
                <p className="ml-7 text-base font-light lg:text-lg text-lightGray leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}