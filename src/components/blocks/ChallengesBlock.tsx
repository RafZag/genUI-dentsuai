import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';

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
    <section className="py-12 border-t border-white/10">
      <div className="mb-8">
        <SectionHeader colorClass="text-white" plusIconColor="text-[#adadad]">
          Z jakimi wyzwaniami się mierzysz?
        </SectionHeader>
      </div>

      {variant === 'minimal-list' ? (
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li
              key={item._key || idx}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-4 border-b border-white/10"
            >
              {item.header && (
                <span className="font-medium text-white text-lg min-w-[220px]">
                  {item.header}
                </span>
              )}
              {item.body && (
                <span className="text-base text-[#adadad] font-light leading-relaxed">
                  {item.body}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        /* Domyślny oraz cards-alert: eleganckie ciemne karty z obwódką w stylu dentsuai */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <Card
              key={item._key || idx}
              className="bg-almostBlack/85 border border-white/15 p-6 sm:p-8"
            >
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2.5">
                  <span className="text-rose-400 font-normal">/</span>
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}