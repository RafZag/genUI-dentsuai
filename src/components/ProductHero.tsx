'use client';

import React from 'react';
import Image from 'next/image';
import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductHeroProps {
  name: string;
  tagline?: string;
  description?: string;
  brandHex: string;
  logoUrl?: string;
  logoAlt?: string;
  websiteUrl?: string;
  downloadLink?: string;
  downloadTitle?: string;
}

export default function ProductHero({
  name,
  tagline,
  description,
  brandHex,
  logoUrl,
  logoAlt,
  websiteUrl,
  downloadLink,
  downloadTitle,
}: ProductHeroProps) {
  const { openContactModal } = useContactModal();
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[480px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-black rounded-b-3xl border-b border-white/10">
      {/* Background subtle radial glow with product tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${brandHex}35 0%, transparent 65%)`,
        }}
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 container flex flex-col gap-6 mx-auto max-w-5xl items-center justify-center text-center px-6 py-20">
        {/* Product Logo */}
        {logoUrl ? (
          <div className="relative h-28 w-28 sm:h-36 sm:w-36 mb-2">
            <Image
              src={logoUrl}
              alt={logoAlt || `${name} logo`}
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        ) : (
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 text-3xl font-bold shadow-xl mb-2"
            style={{
              color: brandHex,
              backgroundColor: `${brandHex}20`,
            }}
          >
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* Product Title / Tagline in dentsuai.com style */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight"
          style={{ color: brandHex }}
        >
          {name}
        </h1>

        {tagline && (
          <p className="px-6 text-2xl sm:text-3xl lg:text-4xl text-white font-light max-w-3xl leading-snug">
            {tagline}
          </p>
        )}

        {description && (
          <p className="max-w-2xl text-base sm:text-lg text-lightGray font-light leading-relaxed whitespace-pre-line mt-2">
            {description}
          </p>
        )}

        {/* CTA Buttons in exact lp-dentsu-ai button styling */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
          <button
            type="button"
            onClick={openContactModal}
            className="px-6 py-3 rounded-lg font-light text-white text-base transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer shadow-md"
            style={{
              backgroundColor: brandHex,
              borderColor: brandHex,
              color: '#000000',
              fontWeight: 500,
            }}
          >
            {t('common.bookDemo') || 'Umów Demo'}
          </button>

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 backdrop-blur-sm bg-black/40 text-white rounded-lg border border-white/30 font-light text-base transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              Strona produktu
            </a>
          )}

          {downloadLink && (
            <a
              href={downloadLink}
              download
              className="px-6 py-3 backdrop-blur-sm bg-black/40 text-white rounded-lg border border-white/30 font-light text-base transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
            >
              {downloadTitle || 'Pobierz one-pager'}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
