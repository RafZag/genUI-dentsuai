'use client';

import React from 'react';
import SectionHeading from '@/components/SectionHeading';

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
  colorClass = 'text-white',
  brandHex = '#00ff84',
}: SolutionsBlockProps) {
  if (!items || items.length === 0) return null;

  // The first item can serve as the prominent headline box if appropriate
  const [firstItem, ...restItems] = items;

  return (
    <section className="w-full flex flex-col my-6 lg:my-10 overflow-visible">
      {/* Featured solution card with brand background tint and glass reflection */}
      <div
        className="container mx-auto w-full max-w-6xl px-6 sm:px-10 rounded-2xl pt-10 pb-12 relative overflow-visible border border-white/10"
        style={{
          background: `radial-gradient(circle at 10% 20%, ${brandHex}40 0%, rgba(25, 25, 25, 0.95) 70%)`,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 relative">
          <div className="w-full">
            <SectionHeading colorClass="text-white" plusIconColor="text-white/75">
              Rozwiązanie
            </SectionHeading>

            {firstItem && (
              <div className="mt-8 lg:ml-12">
                {firstItem.header && (
                  <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                    {firstItem.header}
                  </h3>
                )}
                {firstItem.body && (
                  <p className="text-white/90 text-base font-normal lg:text-lg leading-relaxed whitespace-pre-line max-w-3xl">
                    {firstItem.body}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subsequent Solution Items rendered in lp-dentsu-ai clean grid */}
      {restItems.length > 0 && (
        <div className="container mx-auto mt-4 px-6 sm:px-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 pb-6">
          {restItems.map((item, idx) => (
            <div key={item._key || idx} className="lg:ml-12">
              {item.header && (
                <h3 className="text-xl lg:text-2xl font-light text-white mt-4">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base font-light lg:text-lg text-lightGray mt-2 leading-relaxed whitespace-pre-line">
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