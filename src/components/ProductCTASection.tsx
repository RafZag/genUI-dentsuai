'use client';

import React from 'react';
import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductCTASectionProps {
  brandHex: string;
  colorClass?: string;
  downloadLink?: string;
  downloadTitle?: string;
}

export default function ProductCTASection({
  brandHex,
  colorClass,
  downloadLink,
  downloadTitle,
}: ProductCTASectionProps) {
  const { t } = useLanguage();
  const { openContactModal } = useContactModal();

  return (
    <section className="w-full flex flex-col lg:flex-row container mx-auto items-center justify-center mt-20 lg:mt-30 gap-6 sm:gap-8 px-6">
      <button
        type="button"
        onClick={openContactModal}
        className="px-6 py-3 backdrop-blur-sm text-white rounded-lg border font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white w-full sm:w-56 text-center"
        style={{
          backgroundColor: brandHex,
          borderColor: brandHex,
        }}
      >
        {t('common.bookDemo') || 'Umów Demo'}
      </button>

      {downloadLink && (
        <a
          href={downloadLink}
          download
          className="px-6 py-3 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:text-black cursor-pointer w-full sm:w-56 text-center"
          style={
            {
              '--btn-hover-bg': brandHex,
            } as React.CSSProperties
          }
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = brandHex;
            (e.currentTarget as HTMLElement).style.borderColor = brandHex;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }}
        >
          {downloadTitle || t('common.download') || 'Pobierz one-pager'}
        </a>
      )}
    </section>
  );
}
