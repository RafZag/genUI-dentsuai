interface ChallengeItem {
  _key?: string;
  header?: string;
  body?: string;
}

export type ChallengesVariant = 'two-columns' | 'cards-alert' | 'minimal-list' | string;

export interface ChallengesBlockProps {
  items?: ChallengeItem[];
  variant?: ChallengesVariant;
}

export function ChallengesBlock({
  items,
  variant = 'two-columns',
}: ChallengesBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Wyzwania rynku
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Z jakimi problemami się mierzysz?
        </h2>
      </div>

      {variant === 'minimal-list' ? (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={item._key || idx}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-3 border-b border-border/50"
            >
              {item.header && (
                <span className="font-semibold text-foreground min-w-[200px]">
                  {item.header}
                </span>
              )}
              {item.body && (
                <span className="text-sm text-muted-foreground">
                  {item.body}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : variant === 'cards-alert' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className="rounded-xl border-2 border-rose-300 bg-rose-50/70 p-6 dark:border-rose-900 dark:bg-rose-950/30"
            >
              {item.header && (
                <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-sm text-rose-800/90 dark:text-rose-300/90 leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Domyślny: two-columns */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className="rounded-xl border border-rose-200/60 bg-rose-50/30 p-6 dark:border-rose-950/50 dark:bg-rose-950/10"
            >
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
          ))}
        </div>
      )}
    </section>
  );
}