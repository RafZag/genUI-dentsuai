import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';

interface UsageItem {
  _key?: string;
  header?: string;
  body?: string;
}

export interface UsageBlockProps {
  items?: UsageItem[];
  style?: 'numbered-cards' | 'horizontal-strip' | string;
}

export function UsageBlock({ items }: UsageBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10">
      <div className="mb-8">
        <SectionHeader colorClass="text-white" plusIconColor="text-[#adadad]">
          Kiedy warto po to sięgnąć?
        </SectionHeader>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <Card
            key={item._key || idx}
            className="bg-black/40 border border-white/15 p-6 sm:p-8 flex flex-col justify-start hover:border-white/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-medium text-white">
                {idx + 1}
              </span>
              {item.header && (
                <h3 className="text-xl font-medium text-white">
                  {item.header}
                </h3>
              )}
            </div>
            {item.body && (
              <p className="text-base text-[#adadad] font-light leading-relaxed pl-10 whitespace-pre-line">
                {item.body}
              </p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}