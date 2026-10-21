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
    <section className="w-full flex-1 flex flex-col items-center lg:-mt-30 relative z-20">
      <div className="container flex flex-col w-full max-w-6xl pl-10 pr-12 bg-almostBlack/85 backdrop-blur-sm rounded-2xl py-12">
        <SectionHeading colorClass={colorClass} plusIconColor="text-lightGray">
          Wyzwanie
        </SectionHeading>

        {variant === 'minimal-list' ? (
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li
                key={item._key || idx}
                className="flex flex-col sm:items-baseline gap-2 sm:gap-6 py-4"
              >
                {item.header && (
                  <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8">
                    {item.header}
                  </h3>
                )}
                {item.body && (
                  <p className="text-base font-light lg:ml-12 lg:text-lg text-[#ADADAD] mt-4">
                    {item.body}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full">
            {items.map((item, idx) => (
              <div key={item._key || idx} className={idx > 0 ? 'mt-8' : ''}>
                {item.header && (
                  <h3 className="text-xl lg:text-2xl font-light text-white lg:ml-12 mt-8">
                    {item.header}
                  </h3>
                )}
                {item.body && (
                  <p className="text-base font-light lg:ml-12 lg:text-lg text-[#ADADAD] mt-4">
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
