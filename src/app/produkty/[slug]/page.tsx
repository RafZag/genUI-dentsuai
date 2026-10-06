import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { productBySlugQuery } from '@/sanity/lib/queries';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen py-16 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Przycisk powrotu do strony głównej */}
        <div className="mb-8">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-2')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Wróć do listy produktów</span>
          </Link>
        </div>

        {/* Sekcja główna produktu (Testowy nagłówek / Hero) */}
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            {/* Logo produktu */}
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
              {/* <Badge variant="outline" className="mb-2 text-xs uppercase tracking-wider">
                Produkt SaaS
              </Badge> */}
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

          <hr className="my-6 border-border" />

          {/* Opis */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground">O produkcie</h2>
            {product.description ? (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            ) : (
              <p className="text-sm italic text-muted-foreground">Brak opisu dla tego produktu.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}