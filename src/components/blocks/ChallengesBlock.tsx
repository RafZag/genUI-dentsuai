interface ChallengeItem {
  _key?: string;
  header?: string;
  body?: string;
}

interface ChallengesBlockProps {
  items?: ChallengeItem[];
}

export function ChallengesBlock({ items }: ChallengesBlockProps) {
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
    </section>
  );
}