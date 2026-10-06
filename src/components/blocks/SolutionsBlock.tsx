interface SolutionItem {
  _key?: string;
  header?: string;
  body?: string;
}

interface SolutionsBlockProps {
  items?: SolutionItem[];
}

export function SolutionsBlock({ items }: SolutionsBlockProps) {
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
    </section>
  );
}