import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';

interface SolutionItem {
  _key?: string;
  header?: string;
  body?: string;
}

export type SolutionsVariant = 'grid-checkmarks' | 'timeline-steps' | 'hero-banner' | string;

export interface SolutionsBlockProps {
  items?: SolutionItem[];
  variant?: SolutionsVariant;
  colorClass?: string;
  brandHex?: string;
}

export function SolutionsBlock({
  items,
  variant = 'grid-checkmarks',
  colorClass = 'text-ctMainColor',
  brandHex = '#00ff84',
}: SolutionsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 w-full">
      <div className="mb-8">
        <SectionHeader colorClass={colorClass} plusIconColor="text-lightGray">
          Jak odpowiadamy na te potrzeby
        </SectionHeader>
      </div>

      {variant === 'timeline-steps' ? (
        <div className="relative border-l border-white/20 ml-4 pl-8 space-y-10">
          {items.map((item, idx) => (
            <div key={item._key || idx} className="relative">
              <span
                className="absolute -left-[45px] top-0 flex h-7 w-7 items-center justify-center rounded-full text-black text-xs font-bold ring-4 ring-[#101010]"
                style={{ backgroundColor: brandHex }}
              >
                {idx + 1}
              </span>
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-2">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Domyślny: grid-checkmarks */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-6 sm:p-8 hover:border-white/30 transition-colors"
            >
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-3">
                  <span className={`${colorClass} font-semibold text-lg`}>✓</span>
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed whitespace-pre-line">
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