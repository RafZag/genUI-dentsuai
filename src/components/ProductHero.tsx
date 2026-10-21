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
  heroImageUrl?: string;
  heroImageAlt?: string;
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
  heroImageUrl,
  heroImageAlt,
  websiteUrl,
  downloadLink,
  downloadTitle,
}: ProductHeroProps) {
  const { openContactModal } = useContactModal();
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-140 lg:h-180 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image from CMS (with dark tint & vignette matching reference) */}
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt={heroImageAlt || `${name} background`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover filter-[saturate(0.25)] brightness-75"
        />
      ) : (
        /* Fallback dark radial glow when no background image is uploaded */
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${brandHex}30 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Dark overlay matching reference bg-black/45 */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Hero content aligned exactly like reference HeroBanner */}
      <div className="relative z-10 container flex flex-col gap-8 mx-auto max-w-6xl items-center justify-center">
        {logoUrl ? (
          <div className="relative w-[clamp(18rem,32vw,24.5rem)] h-24 sm:h-32 flex items-center justify-center">
            <Image
              src={logoUrl}
              alt={logoAlt || `${name} logo`}
              fill
              sizes="(max-width: 1280px) 32vw, 392px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        ) : (
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-center"
            style={{ color: brandHex }}
          >
            {name}
          </h1>
        )}

        {tagline && (
          <p className="px-6 text-3xl lg:text-4xl text-white font-light text-center max-w-4xl leading-snug">
            {tagline}
          </p>
        )}

        {/* Buttons matching reference HeroBanner styling */}
        <div className="flex gap-6 flex-wrap justify-center">
          <button
            type="button"
            onClick={openContactModal}
            className="px-6 py-3 backdrop-blur-sm text-white rounded-lg border font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white"
            style={{
              backgroundColor: brandHex,
              borderColor: brandHex,
            }}
          >
            {t('common.bookDemo') || 'Umów demo'}
          </button>

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 backdrop-blur-sm bg-black/20 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white text-center"
            >
              Strona produktu
            </a>
          )}

          {downloadLink && (
            <a
              href={downloadLink}
              download
              className="px-6 py-3 backdrop-blur-sm bg-black/20 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:text-black cursor-pointer w-54 text-center"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = brandHex;
                (e.currentTarget as HTMLElement).style.borderColor = brandHex;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
            >
              {downloadTitle || 'Pobierz one-pager'}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
