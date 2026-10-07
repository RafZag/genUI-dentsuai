import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeader } from '@/components/ui/section-header';

interface FaqItem {
  _key?: string;
  question?: string;
  answer?: string;
}

interface FaqAccordionBlockProps {
  items?: FaqItem[];
  defaultOpenFirst?: boolean;
}

export function FaqAccordionBlock({ items, defaultOpenFirst }: FaqAccordionBlockProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10 w-full text-left">
      <div className="mb-8">
        <SectionHeader colorClass="text-white" plusIconColor="text-[#adadad]">
          Często zadawane pytania
        </SectionHeader>
      </div>

      <Accordion
        className="w-full"
        defaultValue={defaultOpenFirst && items.length > 0 ? ['item-0'] : undefined}
      >
        {items.map((item, idx) => (
          <AccordionItem key={item._key || idx} value={`item-${idx}`}>
            <AccordionTrigger>
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}