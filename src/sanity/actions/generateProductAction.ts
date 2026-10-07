import { useState } from 'react';
import { DocumentActionProps } from 'sanity';
import { Sparkles } from 'lucide-react';

export function GenerateProductAction(props: DocumentActionProps) {
  const { id, type, draft, published } = props;
  const [isGenerating, setIsGenerating] = useState(false);

  // Akcja dostępna tylko dla typu 'product'
  if (type !== 'product') return null;

  const doc = draft || published;
  const productName = doc?.name as string;
  const currentDescription = doc?.description as string;
  const targetId = draft?._id || published?._id || id;

  return {
    label: isGenerating ? 'Generowanie przez AI...' : 'Wygeneruj sekcje z AI',
    icon: Sparkles,
    disabled: isGenerating || !productName,
    onHandle: async () => {
      setIsGenerating(true);

      try {
        const response = await fetch('/api/generate-product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: targetId,
            productName: productName,
            rawInput: currentDescription || '',
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || `Błąd serwera (${response.status})`);
        }

        alert('Sukces! Sekcje produktu zostały wygenerowane i zapisane.');
      } catch (err: any) {
        alert(`Błąd: ${err.message}`);
      } finally {
        setIsGenerating(false);
      }
    },
  };
}