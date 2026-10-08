import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';

interface ChallengeItem {
  _key?: string;
  header?: string;
  body?: string;
}

export type ChallengesVariant = 'two-columns' | 'cards-alert' | 'minimal-list' | string;

export interface ChallengesBlockProps {
  items?: ChallengeItem[];
  variant?: ChallengesVariant;
  colorClass?: string;
}

export function ChallengesBlock({
  items,
  variant = 'two-columns',
  colorClass = 'text-white',
}: ChallengesBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 w-full">
      <div className="mb-8">
        <SectionHeader colorClass={colorClass} plusIconColor="text-lightGray">
          Z jakimi wyzwaniami się mierzysz?
        </SectionHeader>
      </div>

      {variant === 'minimal-list' ? (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={item._key || idx}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-4 border-b border-white/10"
            >
              {item.header && (
                <span className={`font-medium text-lg min-w-[220px] ${colorClass}`}>
                  {item.header}
                </span>
              )}
              {item.body && (
                <span className="text-base text-[#adadad] font-light leading-relaxed">
                  {item.body}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        /* Kontenery bg-almostBlack/85 z backdrop-blur w stylu lp-dentsu-ai */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className="rounded-2xl border border-white/15 bg-almostBlack/85 backdrop-blur-sm p-6 sm:p-8"
            >
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2.5">
                  <span className={`${colorClass} font-normal`}>/</span>
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