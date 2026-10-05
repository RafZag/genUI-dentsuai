import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ProductCarouselBlockProps } from '@/types/blocks';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProductCarouselBlock({
  heading = 'Nasze rozwiązania',
  subheading,
  displayMode = 'auto',
  selectedProducts = [],
  allProducts = [],
}: ProductCarouselBlockProps) {
  // Wybór produktów w zależności od trybu ustawionego w Sanity
  const products =
    displayMode === 'manual' && selectedProducts.length > 0
      ? selectedProducts
      : allProducts;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">
      {/* Nagłówek sekcji */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          {/* <Badge variant="outline" className="mb-3 text-xs tracking-wider uppercase">
            Portfolio SaaS
          </Badge> */}
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              {subheading}
            </p>
          )}
        </div>
      </div>

      {/* Karuzela shadcn/ui */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full relative"
      >
        <div className="flex items-center justify-end gap-2 mb-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>

        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full p-1">
                <Card className="flex h-full flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      {/* Logo produktu */}
                      {product.logo?.asset?.url ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-muted/30 p-1">
                          <Image
                            src={product.logo.asset.url}
                            alt={product.logo.alt || product.name}
                            fill
                            sizes="40px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                          {product.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      {product.websiteUrl && (
                        <a
                          href={product.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Odwiedź stronę ${product.name}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <CardTitle className="text-xl font-semibold">
                      {product.name}
                    </CardTitle>

                    {product.tagline && (
                      <CardDescription className="line-clamp-2 mt-2 text-sm leading-relaxed">
                        {product.tagline}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent />

                  <CardFooter className="pt-0">
                    <Link
                      href={`/produkty/${product.slug}`}
                      className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-between group")}
                    >
                      <span>Zobacz szczegóły</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}