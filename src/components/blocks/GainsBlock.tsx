import Image from 'next/image';
import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';

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

export function GainsBlock({ items }: GainsBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10">
      <div className="mb-8">
        <SectionHeader colorClass="text-white" plusIconColor="text-[#adadad]">
          Wartość dla Twojej organizacji
        </SectionHeader>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Card
            key={item._key || idx}
            className="bg-black/40 border border-white/15 p-6 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-colors"
          >
            <div>
              {item.icon?.asset?.url && (
                <div className="relative mb-6 h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2">
                  <Image
                    src={item.icon.asset.url}
                    alt={item.icon.alt || item.header || 'Gain icon'}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              )}
              {item.header && (
                <h3 className="text-xl font-medium text-white mb-3">
                  {item.header}
                </h3>
              )}
              {item.body && (
                <p className="text-base text-[#adadad] font-light leading-relaxed whitespace-pre-line">
                  {item.body}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}