'use client';

import MarketingContentPage from '@/components/MarketingContentPage';
import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

export default function PodcastPage() {
  const { t } = useLanguage();
  const { openContactModal } = useContactModal();
  const content = t('podcast');

  return (
    <MarketingContentPage
      title={content.header}
      subtitle={content.subtitle}
      sections={content.sections}
      actionLabel={t('nav.contact')}
      onAction={openContactModal}
    />
  );
}
