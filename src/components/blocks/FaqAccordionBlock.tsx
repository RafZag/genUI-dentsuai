'use client';

import React, { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';

interface FaqItem {
  _key?: string;
  question?: string;
  answer?: string;
}

interface FaqAccordionBlockProps {
  items?: FaqItem[];
  defaultOpenFirst?: boolean;
  colorClass?: string;
}

export function FaqAccordionBlock({
  items,
  defaultOpenFirst,
  colorClass = 'text-white',
}: FaqAccordionBlockProps) {
  const [openItem, setOpenItem] = useState<number | null>(
    defaultOpenFirst && items && items.length > 0 ? 0 : null
  );

  if (!items || items.length === 0) return null;

  return (
    <section className="container w-full max-w-6xl px-4 lg:px-0 text-left py-12 border-t border-white/10">
      <SectionHeader colorClass={colorClass} plusIconColor="text-[#ADADAD]">
        Często zadawane pytania
      </SectionHeader>

      <div className="w-full text-left mt-8">
        {items.map((item, idx) => {
          const isOpen = openItem === idx;
          const contentId = `faq-content-${idx}`;

          return (
            <div
              key={item._key || idx}
              className={`border-white/20 ${isOpen ? 'border-b-0' : 'border-b'}`}
            >
              <button
                type="button"
                onClick={() => setOpenItem((prev) => (prev === idx ? null : idx))}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full py-8 flex items-center justify-between gap-4 text-left group cursor-pointer"
              >
                <span
                  className={`text-lg lg:text-2xl font-light leading-tight transition-colors duration-300 ${
                    isOpen ? colorClass : 'text-lightGray group-hover:text-white'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`text-[#ADADAD] text-2xl font-light leading-none transition-transform duration-300 shrink-0 ${
                    isOpen ? `rotate-45 ${colorClass}` : ''
                  }`}
                >
                  +
                </span>
              </button>

              <div
                id={contentId}
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="text-base lg:text-lg rounded-2xl bg-[#141414] px-8 py-10 leading-relaxed text-[#ADADAD]">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}