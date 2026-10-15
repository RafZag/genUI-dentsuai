'use client';

import React from 'react';
import { useContactModal } from '@/hooks/useContactModal';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductBookingButtonProps {
  brandHex: string;
  productName: string;
}

export default function ProductBookingButton({
  brandHex,
  productName,
}: ProductBookingButtonProps) {
  const { openContactModal } = useContactModal();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={openContactModal}
      className="px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-300 hover:bg-white hover:text-black cursor-pointer shadow-md"
      style={{
        backgroundColor: brandHex,
        color: '#000000',
      }}
    >
      {t('common.bookDemo') || 'Umów Demo'}
    </button>
  );
}
