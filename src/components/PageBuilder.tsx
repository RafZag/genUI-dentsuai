import React from 'react';
import { ProductCarouselBlock } from './ui/blocks/ProductCarouselBlock';

// Słownik zawierający wyłącznie obsługiwany w teście blok karuzeli
const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  productCarouselBlock: ProductCarouselBlock,
};

interface PageBuilderProps {
  sections?: Array<{
    _key?: string;
    _type: string;
    [key: string]: any;
  }>;
}

export function PageBuilder({ sections }: PageBuilderProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-16">
      {sections.map((section, index) => {
        const Component = BLOCK_COMPONENTS[section._type];

        // Bezpieczny fallback: jeśli w Sanity dodano inny blok niż karuzela
        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            return (
              <div
                key={section._key || index}
                className="mx-auto my-4 max-w-4xl rounded-lg border border-dashed border-amber-500 bg-amber-50 p-4 text-sm text-amber-900"
              >
                <strong>PageBuilder (Wersja testowa):</strong> Pominięto nieobsługiwany typ <code>{section._type}</code>. Dostępny jest tylko <code>productCarouselBlock</code>.
              </div>
            );
          }
          return null;
        }

        // Przekazanie propsów do karuzeli
        return <Component key={section._key || index} {...section} />;
      })}
    </div>
  );
}