'use client';

import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

export default function CTASection() {
  const { t } = useLanguage();
  const { openContactModal } = useContactModal();
  const content = t('productPages.sniffer');
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  const downloadHref = `${basePath}/download/${content.download.link}`;

  return (
    <section className="w-full flex flex-col lg:flex-row container mx-auto items-center justify-center mt-30 gap-8">
      <button
        type="button"
        onClick={openContactModal}
        className="px-6 py-3 backdrop-blur-sm bg-SNmainColor text-white rounded-lg border border-SNmainColor font-light transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer hover:border-white w-54">
        {content.bookDemo.title}
      </button>
      <a
        href={downloadHref}
        download
        className="px-6 py-3 text-white rounded-lg border border-white/40 font-light transition-colors duration-300 hover:bg-SNmainColor hover:text-black cursor-pointer hover:border-SNmainColor w-54 text-center">
        {content.download.title}
      </a>
    </section>
  );
}
