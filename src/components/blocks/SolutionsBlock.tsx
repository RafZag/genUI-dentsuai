import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';

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
    <section className="py-12 border-t border-white/10">
      <div className="mb-8">
        <SectionHeader colorClass="text-[#00ff84]" plusIconColor="text-[#adadad]">
          Jak odpowiadamy na te potrzeby
        </SectionHeader>
      </div>

      {variant === 'timeline-steps' ? (
        <div className="relative border-l border-white/20 ml-4 pl-8 space-y-10">
          {items.map((item, idx) => (
            <div key={item._key || idx} className="relative">
              <span className="absolute -left-[45px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#00ff84] text-black text-xs font-bold ring-4 ring-[#101010]">
                {idx + 1}
              </span>
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-2">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed whitespace-pre-line">
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
            <Card
              key={item._key || idx}
              className="bg-black/40 border border-white/15 p-6 sm:p-8 hover:border-[#00ff84]/50 transition-colors"
            >
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-3">
                  <span className="text-[#00ff84] font-semibold text-lg">✓</span>
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