import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { productBySlugQuery } from '@/sanity/lib/queries';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  // W trybie podglądu pobieramy szkice robocze z tokenem i włączonym Stega
  const activeClient = isDraftMode
    ? client.withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: 'previewDrafts',
        useCdn: false,
        stega: true,
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

  // Funkcja mapująca klocki z Sanity na komponenty React
  const renderSection = (section: any) => {
    switch (section._type) {
      case 'challengesBlock':
        return (
          <ChallengesBlock
            key={section._key}
            items={product.challenges}
            variant={section.variant}
          />
        );
      case 'solutionsBlock':
        return (
          <SolutionsBlock
            key={section._key}
            items={product.solutions}
            variant={section.variant}
          />
        );
      case 'gainsBlock':
        return (
          <GainsBlock
            key={section._key}
            items={product.gains}
            columns={section.columns}
            promotedIndex={section.promotedIndex}
          />
        );
      case 'usageBlock':
        return (
          <UsageBlock
            key={section._key}
            items={product.usage}
            style={section.style}
          />
        );
      case 'faqAccordionBlock':
        return (
          <FaqAccordionBlock
            key={section._key}
            items={product.faq}
            defaultOpenFirst={section.defaultOpenFirst}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Nawigacja powrotna */}
        <div className="mb-6">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-2')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Wróć do listy produktów</span>
          </Link>
        </div>

        {/* Stały nagłówek / Hero z danymi produktu */}
        <header className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {product.logo?.asset?.url ? (
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border bg-muted/30 p-2">
                <Image
                  src={product.logo.asset.url}
                  alt={product.logo.alt || product.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl font-bold text-primary">
                {product.name.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div>
              <Badge variant="outline" className="mb-2 text-xs uppercase tracking-wider">
                Produkt SaaS
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="mt-2 text-lg text-muted-foreground">
                  {product.tagline}
                </p>
              )}
            </div>
          </div>

          {product.description && (
            <>
              <hr className="my-6 border-border" />
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </>
          )}
        </header>

        {/* Dynamiczny układ sekcji (wygenerowany przez AI lub ułożony ręcznie) */}
        {product.sections && product.sections.length > 0 ? (
          product.sections.map((section: any) => renderSection(section))
        ) : (
          /* Awaryjny układ domyślny, gdy sections jest jeszcze puste */
          <>
            <ChallengesBlock items={product.challenges} />
            <SolutionsBlock items={product.solutions} />
            <GainsBlock items={product.gains} />
            <UsageBlock items={product.usage} />
            <FaqAccordionBlock items={product.faq} />
          </>
        )}
      </div>
    </main>
  );
}