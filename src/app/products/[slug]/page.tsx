import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';


import { client } from '@/sanity/lib/client';
import { productBySlugQuery } from '@/sanity/lib/queries';
import { getProductBrandColor } from '@/lib/productColors';

import ProductHero from '@/components/ProductHero';
import { ChallengesBlock } from '@/components/blocks/ChallengesBlock';
import { SolutionsBlock } from '@/components/blocks/SolutionsBlock';
import { GainsBlock } from '@/components/blocks/GainsBlock';
import { UsageBlock } from '@/components/blocks/UsageBlock';
import { FaqAccordionBlock } from '@/components/blocks/FaqAccordionBlock';
import ProductCTASection from '@/components/ProductCTASection';

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

  // Funkcja mapująca dynamiczne klocki z Sanity z przekazaniem kolorów produktu
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
    <main className="flex-1 mb-20 flex flex-col items-center">


      {/* Hero Banner w stylu dentsuai.com */}
      <ProductHero
        name={product.name}
        tagline={product.tagline}
        description={product.description}
        brandHex={brandColor.hex}
        logoUrl={product.logo?.asset?.url}
        logoAlt={product.logo?.alt}
        websiteUrl={product.websiteUrl}
      />

      {/* Klocki dynamiczne z Sanity lub domyślny układ sekcji */}
      <div className="w-full max-w-6xl flex flex-col items-center px-4 sm:px-6">
        {product.sections && product.sections.length > 0 ? (
          product.sections.map((section: any) => renderSection(section))
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Bottom CTA Section w stylu lp-dentsu-ai */}
      <ProductCTASection
        brandHex={brandColor.hex}
        colorClass={brandColor.className}
      />
    </main>
  );
}