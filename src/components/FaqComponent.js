'use client';

import { useState } from 'react';
import PlusIcon from '@/components/PlusIcon';
import { useLanguage } from '@/hooks/useLanguage';

export default function FaqComponent({
  colorClass = 'text-white',
  translationKey = 'faqSection',
  title = undefined,
  items = undefined,
}) {
  const { t } = useLanguage();
  const translatedFaqs = t(`${translationKey}.items`);
  const faqs = Array.isArray(items) ? items : Array.isArray(translatedFaqs) ? translatedFaqs : [];
  const heading = title || t(`${translationKey}.title`);

  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };

  if (!faqs.length) {
    return null;
  }

  return (
    <section className="container w-full max-w-6xl px-4 lg:px-0 text-left">
      <h2 className={`text-3xl lg:text-4xl font-semibold ${colorClass} inline-flex items-center gap-5`}>
        <PlusIcon size={25} className="text-[#ADADAD] shrink-0" />
        {heading}
      </h2>

      <div className="w-full text-left mt-8">
        {faqs.map((item, index) => {
          const isOpen = openItem === index;
          const contentId = `faq-content-${index}`;

          return (
            <div
              key={item.question || `faq-item-${index}`}
              className={`border-white/20 ${isOpen ? 'border-b-0' : 'border-b'}`}>
              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full py-8 flex items-center justify-between gap-4 text-left group cursor-pointer">
                <span
                  className={`text-lg lg:text-2xl font-light leading-tight transition-colors duration-300 ${
                    isOpen ? `${colorClass}` : `text-lightGray group-hover:text-white`
                  }`}>
                  {item.question}
                </span>
                <span
                  className={`text-[#ADADAD] text-2xl font-light leading-none transition-transform duration-300 ${
                    isOpen ? `rotate-45 ${colorClass}` : ''
                  }`}>
                  +
                </span>
              </button>

              <div
                id={contentId}
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'
                }`}>
                <div className="overflow-hidden">
                  <div className="text-medium lg:text-lg rounded-2xl bg-[#141414] px-8 py-10 leading-relaxed text-[#ADADAD]">
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
