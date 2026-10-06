interface UsageItem {
  _key?: string;
  header?: string;
  body?: string;
}

interface UsageBlockProps {
  items?: UsageItem[];
}

export function UsageBlock({ items }: UsageBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Zastosowanie
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Kiedy warto po to sięgnąć?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <div
            key={item._key || idx}
            className="rounded-xl border bg-muted/40 p-6 flex flex-col justify-start"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {idx + 1}
              </span>
              {item.header && (
                <h3 className="text-base font-semibold text-foreground">
                  {item.header}
                </h3>
              )}
            </div>
            {item.body && (
              <p className="text-sm text-muted-foreground leading-relaxed pl-9 whitespace-pre-line">
                {item.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}