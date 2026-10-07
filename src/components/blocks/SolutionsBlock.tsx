interface SolutionItem {
  _key?: string;
  header?: string;
  body?: string;
}

export type SolutionsVariant = 'grid-checkmarks' | 'timeline-steps' | string;

export interface SolutionsBlockProps {
  items?: SolutionItem[];
  variant?: SolutionsVariant;
}

export function SolutionsBlock({
  items,
  variant = 'grid-checkmarks',
}: SolutionsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Nasza odpowiedź
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Jak rozwiązujemy te trudności
        </h2>
      </div>

      {variant === 'timeline-steps' ? (
        <div className="relative border-l-2 border-emerald-500/30 ml-4 pl-6 space-y-8">
          {items.map((item, idx) => (
            <div key={item._key || idx} className="relative">
              <span className="absolute -left-[33px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold ring-4 ring-background">
                {idx + 1}
              </span>
              {item.header && (
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Domyślny: grid-checkmarks */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className="rounded-xl border border-emerald-200/60 bg-emerald-50/30 p-6 dark:border-emerald-950/50 dark:bg-emerald-950/10"
            >
              {item.header && (
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}