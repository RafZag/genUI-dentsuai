import { useState } from 'react';
import { DocumentActionProps } from 'sanity';
import { SparklesIcon } from 'lucide-react';

export function ComposeLayoutAction(props: DocumentActionProps) {
  const { id, type, draft, published } = props;
  const [loading, setLoading] = useState(false);

  if (type !== 'product') return null;

  return {
    label: loading ? 'AI projektuje układ...' : 'Zaprojektuj układ z AI',
    icon: SparklesIcon,
    disabled: loading,
    onHandle: async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/compose-layout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: id }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Błąd podczas generowania');
        }

        alert('Układ został zaprojektowany przez AI!');
      } catch (e: any) {
        alert(`Błąd: ${e.message}`);
      } finally {
        setLoading(false);
      }
    },
  };
}