import Image from 'next/image';

interface GainItem {
  _key?: string;
  header?: string;
  body?: string;
  icon?: {
    asset: { url: string };
    alt?: string;
  };
}

export interface GainsBlockProps {
  items?: GainItem[];
  columns?: '2' | '3' | 'bento' | string;
  promotedIndex?: number;
}

export function GainsBlock({ items, columns = '3', promotedIndex }: GainsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Wartość dla Ciebie
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Co zyskujesz dzięki wdrożeniu?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={item._key || idx}
            className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              {item.icon?.asset?.url && (
                <div className="relative mb-4 h-10 w-10 overflow-hidden rounded-lg bg-primary/10 p-2">
                  <Image
                    src={item.icon.asset.url}
                    alt={item.icon.alt || item.header || 'Gain icon'}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              )}
              {item.header && (
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}