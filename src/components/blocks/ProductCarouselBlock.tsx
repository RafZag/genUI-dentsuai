import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ProductCarouselBlockProps } from '@/types/blocks';
import { getProductBrandColor } from '@/lib/productColors';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';

export function ProductCarouselBlock({
  heading = 'Nasze rozwiązania',
  subheading = 'Samodzielne aplikacje. Jeden zintegrowany ekosystem AI.',
  displayMode = 'auto',
  selectedProducts = [],
  allProducts = [],
}: ProductCarouselBlockProps) {
  const products =
    displayMode === 'manual' && selectedProducts.length > 0
      ? selectedProducts
      : allProducts;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
      {/* Nagłówek sekcji w stylu dentsuai.com */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <SectionHeader colorClass="text-white">
            {heading}
          </SectionHeader>
          {subheading && (
            <p className="mt-3 text-base lg:text-lg text-[#adadad] font-light max-w-2xl pl-10 sm:pl-11">
              {subheading}
            </p>
          )}
        </div>
      </div>

      {/* Karuzela shadcn/ui z dark glass controls */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full relative"
      >
        <div className="flex items-center justify-end gap-3 mb-6">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>

        <CarouselContent className="-ml-6">
          {products.map((product) => {
            const brandColor = getProductBrandColor(product.slug || product.name);

            return (
              <CarouselItem
                key={product._id}
                className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <Card
                    glowColor={brandColor.hex}
                    className="flex h-full min-h-[420px] flex-col justify-between p-8"
                  >
                    <div>
                      {/* Górna belka karty: Logo i Zewnętrzny link */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <Link
                          href={`/produkty/${product.slug}`}
                          className="flex items-center gap-4 group/logo"
                        >
                          {product.logo?.asset?.url ? (
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-2 shadow-lg transition-transform duration-300 group-hover/card:scale-105">
                              <Image
                                src={product.logo.asset.url}
                                alt={product.logo.alt || product.name}
                                fill
                                sizes="56px"
                                className="object-contain drop-shadow-[10px_8px_4px_rgba(0,0,0,0.25)]"
                              />
                            </div>
                          ) : (
                            <div
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 text-xl font-bold shadow-lg"
                              style={{
                                color: brandColor.hex,
                                backgroundColor: `${brandColor.hex}20`,
                              }}
                            >
                              {product.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </Link>

                        {product.websiteUrl && (
                          <a
                            href={product.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#adadad] hover:text-white transition-colors"
                            aria-label={`Odwiedź stronę ${product.name}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {/* Tytuł produktu z kolorem marki */}
                      <Link href={`/produkty/${product.slug}`}>
                        <h3
                          className="text-2xl lg:text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover/card:translate-x-1"
                          style={{ color: brandColor.hex }}
                        >
                          {product.name}
                        </h3>
                      </Link>

                      {/* Tagline produktu */}
                      {product.tagline && (
                        <p className="mt-4 text-base lg:text-lg font-light text-white leading-snug line-clamp-3">
                          {product.tagline}
                        </p>
                      )}
                    </div>

                    {/* Stopka karty z linkiem szczegółów */}
                    <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={`/produkty/${product.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-100 opacity-80"
                        style={{ color: brandColor.hex }}
                      >
                        <span>Dowiedz się więcej</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-1" />
                      </Link>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}