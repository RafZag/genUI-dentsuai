import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Wątpliwości i odpowiedzi
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Często zadawane pytania
        </h2>
      </div>

      <Accordion
        className="w-full"
        defaultValue={defaultOpenFirst && items.length > 0 ? ['item-0'] : undefined}
      >
        {items.map((item, idx) => (
          <AccordionItem key={item._key || idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}