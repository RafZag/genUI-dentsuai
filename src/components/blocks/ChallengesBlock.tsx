'use client';

import React from 'react';
import SectionHeading from '@/components/SectionHeading';

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
    <section className="w-full flex flex-col items-center my-6 lg:my-10">
      <div className="container flex flex-col w-full max-w-6xl px-6 sm:px-10 py-10 sm:py-12 bg-almostBlack/85 backdrop-blur-sm rounded-2xl border border-white/10">
        <SectionHeading colorClass={colorClass} plusIconColor="text-lightGray">
          Z jakimi wyzwaniami się mierzysz?
        </SectionHeading>

        {variant === 'minimal-list' ? (
          <ul className="space-y-4 mt-8 lg:ml-12">
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
                  <span className="text-base text-lightGray font-light leading-relaxed">
                    {item.body}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:ml-12">
            {items.map((item, idx) => (
              <div key={item._key || idx} className="space-y-3">
                {item.header && (
                  <h3 className="text-xl lg:text-2xl font-light text-white">
                    {item.header}
                  </h3>
                )}
                {item.body && (
                  <p className="text-base font-light lg:text-lg text-lightGray leading-relaxed whitespace-pre-line">
                    {item.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}