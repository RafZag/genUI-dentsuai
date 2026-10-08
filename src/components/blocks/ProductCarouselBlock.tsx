'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCarouselBlockProps } from '@/types/blocks';
import { getProductBrandColor } from '@/lib/productColors';
import { SectionHeader } from '@/components/SectionHeader';
import { DentsuArrowIcon } from '@/components/icons/DentsuArrowIcon';

export function ProductCarouselBlock({
  heading = 'Nasze rozwiązania',
  subheading = 'Samodzielne aplikacje. Jeden zintegrowany ekosystem AI.',
  displayMode = 'auto',
  selectedProducts = [],
  allProducts = [],
}: ProductCarouselBlockProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const products =
    displayMode === 'manual' && selectedProducts.length > 0
      ? selectedProducts
      : allProducts;

  if (!products || products.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
      {/* Nagłówek sekcji w stylu dentsuai.com */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <SectionHeader colorClass="text-white">
            {heading}
          </SectionHeader>
          {subheading && (
            <p className="mt-3 text-base lg:text-lg text-lightGray font-light max-w-2xl pl-10 sm:pl-11">
              {subheading}
            </p>
          )}
        </div>

        {/* Przyciski przewijania karuzeli w stylu dentsuai.com */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer"
            aria-label="Przewiń w lewo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer"
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Kontener kart produktów z oryginalnymi stylami dentsuai.com */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-none scroll-smooth select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          const brandColor = getProductBrandColor(product.slug || product.name);

          return (
            <div
              key={product._id}
              className="group relative overflow-visible backdrop-blur-sm w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-white/15 pl-8 pr-6 pt-7 pb-7 text-left text-white/90 flex flex-col justify-between"
              style={{
                background: `radial-gradient(farthest-corner at 40px 40px, ${brandColor.hex}50 0%, rgba(16,16,16,0.7) 50%)`,
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Efekt poświaty hover */}
              <div
                className="mobile-grow-overlay pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background: `radial-gradient(farthest-corner at 40px 40px, ${brandColor.hex}50 0%, transparent 60%)`,
                  backgroundRepeat: 'no-repeat',
                }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  {/* Logo i nazwa produktu z animacją hover */}
                  <Link
                    className="flex items-center gap-4 h-24 mb-3"
                    href={`/produkty/${product.slug}`}
                  >
                    {product.logo?.asset?.url ? (
                      <div className="relative h-14 w-14 shrink-0">
                        <Image
                          src={product.logo.asset.url}
                          alt={`${product.name} logo`}
                          fill
                          sizes="56px"
                          className="mobile-grow-logo object-contain drop-shadow-[10px_8px_4px_rgba(0,0,0,0.25)]"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 text-xl font-bold"
                        style={{
                          color: brandColor.hex,
                          backgroundColor: `${brandColor.hex}20`,
                        }}
                      >
                        {product.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <h3
                      className="mobile-grow-title text-2xl sm:text-3xl font-semibold leading-tight"
                      style={{ color: brandColor.hex }}
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {product.tagline && (
                    <p className="mt-3 text-base sm:text-lg font-light text-white leading-snug line-clamp-3">
                      {product.tagline}
                    </p>
                  )}
                </div>

                {/* Stopka karty z linkiem Learn More */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    className="inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
                    style={{ color: brandColor.hex }}
                    href={`/produkty/${product.slug}`}
                  >
                    <span>Dowiedz się więcej</span>
                    <DentsuArrowIcon color={brandColor.hex} className="relative top-px h-3.5 w-2.5" />
                  </Link>

                  {product.websiteUrl && (
                    <a
                      href={product.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition-colors"
                      aria-label={`Odwiedź stronę ${product.name}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}