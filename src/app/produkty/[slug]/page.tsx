import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { productBySlugQuery } from '@/sanity/lib/queries';

import { SiteHeader } from '@/components/SiteHeader';
import { getProductBrandColor } from '@/lib/productColors';

import { ChallengesBlock } from '@/components/blocks/ChallengesBlock';
import { SolutionsBlock } from '@/components/blocks/SolutionsBlock';
import { GainsBlock } from '@/components/blocks/GainsBlock';
import { UsageBlock } from '@/components/blocks/UsageBlock';
import { FaqAccordionBlock } from '@/components/blocks/FaqAccordionBlock';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  const activeClient = isDraftMode
    ? client.withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: 'previewDrafts',
        useCdn: false,
        stega: {
          enabled: true,
          studioUrl: '/studio', 
        },
      })
    : client.withConfig({
        perspective: 'published',
        useCdn: false,
      });

  const product = await activeClient.fetch(
    productBySlugQuery,
    { slug },
    { cache: 'no-store' }
  );

  if (!product) {
    notFound();
  }

  const brandColor = getProductBrandColor(product.slug || product.name);

  // Funkcja mapująca klocki z Sanity na komponenty React z przekazaniem kolorów produktu
  const renderSection = (section: any) => {
    switch (section._type) {
      case 'challengesBlock':
        return (
          <ChallengesBlock
            key={section._key}
            items={product.challenges}
            variant={section.variant}
            colorClass={brandColor.className}
          />
        );
      case 'solutionsBlock':
        return (
          <SolutionsBlock
            key={section._key}
            items={product.solutions}
            variant={section.variant}
            colorClass={brandColor.className}
            brandHex={brandColor.hex}
          />
        );
      case 'gainsBlock':
        return (
          <GainsBlock
            key={section._key}
            items={product.gains}
            columns={section.columns}
            promotedIndex={section.promotedIndex}
            colorClass={brandColor.className}
            brandHex={brandColor.hex}
          />
        );
      case 'usageBlock':
        return (
          <UsageBlock
            key={section._key}
            items={product.usage}
            style={section.style}
            colorClass={brandColor.className}
            brandHex={brandColor.hex}
          />
        );
      case 'faqAccordionBlock':
        return (
          <FaqAccordionBlock
            key={section._key}
            items={product.faq}
            defaultOpenFirst={section.defaultOpenFirst}
            colorClass={brandColor.className}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Nawigacja powrotna */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-light text-[#adadad] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Wróć do wszystkich produktów</span>
            </Link>
          </div>

          {/* Hero produktu w oryginalnym stylu lp-dentsu-ai */}
          <div
            className="group relative overflow-visible rounded-2xl border border-white/15 p-8 sm:p-12 backdrop-blur-sm shadow-2xl"
            style={{
              background: `radial-gradient(farthest-corner at 40px 40px, ${brandColor.hex}40 0%, rgba(16,16,16,0.85) 50%)`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              {product.logo?.asset?.url ? (
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-3 shadow-xl">
                  <Image
                    src={product.logo.asset.url}
                    alt={product.logo.alt || product.name}
                    fill
                    sizes="96px"
                    className="object-contain drop-shadow-[10px_8px_4px_rgba(0,0,0,0.25)]"
                  />
                </div>
              ) : (
                <div
                  className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 text-3xl font-bold shadow-xl"
                  style={{
                    color: brandColor.hex,
                    backgroundColor: `${brandColor.hex}20`,
                  }}
                >
                  {product.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="space-y-3">
                <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-white/80 font-light backdrop-blur-sm">
                  Dentsu AI Stack
                </span>
                <h1
                  className="text-3xl sm:text-5xl font-semibold tracking-tight"
                  style={{ color: brandColor.hex }}
                >
                  {product.name}
                </h1>
                {product.tagline && (
                  <p className="text-xl sm:text-2xl font-light text-white leading-snug">
                    {product.tagline}
                  </p>
                )}
              </div>
            </div>

            {product.description && (
              <>
                <div className="my-8 border-t border-white/10" />
                <p className="text-base sm:text-lg text-[#adadad] font-light leading-relaxed whitespace-pre-line max-w-3xl">
                  {product.description}
                </p>
              </>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer shadow-md"
                style={{
                  backgroundColor: brandColor.hex,
                  color: '#000000',
                }}
              >
                Umów Prezentację
              </button>

              {product.websiteUrl && (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-light text-sm backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span>Strona produktu</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Dynamiczny układ sekcji z kolorami produktu */}
          {product.sections && product.sections.length > 0 ? (
            product.sections.map((section: any) => renderSection(section))
          ) : (
            <div className="space-y-8">
              <ChallengesBlock
                items={product.challenges}
                colorClass={brandColor.className}
              />
              <SolutionsBlock
                items={product.solutions}
                colorClass={brandColor.className}
                brandHex={brandColor.hex}
              />
              <GainsBlock
                items={product.gains}
                colorClass={brandColor.className}
                brandHex={brandColor.hex}
              />
              <UsageBlock
                items={product.usage}
                colorClass={brandColor.className}
                brandHex={brandColor.hex}
              />
              <FaqAccordionBlock
                items={product.faq}
                colorClass={brandColor.className}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}