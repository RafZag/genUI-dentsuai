'use client';
import PlusIcon from '@/components/PlusIcon';
import { PRODUCTS } from '@/data/products';

import { useLanguage } from '@/hooks/useLanguage';
import { useContactModal } from '@/hooks/useContactModal';
import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Image from 'next/image';
import contactPhoto from '@/public/contact_photo.png';

const CONTACT_SUCCESS_KEYS = {
  SENT: 'contactSection.successMessage',
};

const CONTACT_ERROR_KEYS = {
  REQUIRED_FIELDS: 'contactSection.requiredFieldsMessage',
  INVALID_EMAIL: 'contactSection.invalidEmailMessage',
  NOT_CONFIGURED: 'contactSection.notConfiguredMessage',
  SEND_FAILED: 'contactSection.sendFailedMessage',
  INTERNAL: 'contactSection.internalErrorMessage',
};

export default function ContactComponent() {
  const { t } = useLanguage();
  const { isContactModalOpen, closeContactModal } = useContactModal();
  const pathname = usePathname();
  const [formState, setFormState] = useState({ email: '', message: '', agreeToTerms: false });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseModal = useCallback(() => {
    setStatus({ type: '', message: '' });
    closeContactModal();
  }, [closeContactModal]);

  const currentProduct = PRODUCTS.find(
    (product) => pathname === `/products/${product.slug}` || pathname.startsWith(`/products/${product.slug}/`),
  );
  const modalAccentColor = currentProduct?.tint || '#00FF84';

  useEffect(() => {
    if (!isContactModalOpen) return;

    const initialOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = initialOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isContactModalOpen, handleCloseModal]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const messageKey = CONTACT_ERROR_KEYS[payload.errorCode] || 'contactSection.errorMessage';
        setStatus({ type: 'error', message: t(messageKey) });
        return;
      }

      const messageKey = CONTACT_SUCCESS_KEYS[payload.code] || 'contactSection.successMessage';
      setStatus({ type: 'success', message: t(messageKey) });
      setFormState({ email: '', message: '', agreeToTerms: true });
    } catch (error) {
      setStatus({ type: 'error', message: t('contactSection.errorMessage') });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isContactModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-start justify-center overflow-y-auto bg-black/70 px-3 py-4 sm:items-center sm:px-4 sm:py-6"
      style={{ '--contact-accent-color': modalAccentColor }}
      role="dialog"
      aria-modal="true"
      aria-label={t('contactSection.title')}
      onMouseDown={handleCloseModal}>
      <div
        className="my-auto w-full max-w-5xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-white/15 bg-[#0E0E0E] px-4 py-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:max-h-[calc(100dvh-3rem)] sm:px-5 sm:py-8 md:px-10 md:py-10"
        onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between gap-3 sm:mb-8 sm:gap-4">
          <h2 className="inline-flex items-center gap-3 text-xl font-light text-(--contact-accent-color) sm:gap-5 sm:text-2xl lg:text-4xl">
            <PlusIcon size={25} className="text-[#ADADAD] shrink-0" />
            {t('contactSection.title')}
          </h2>
          <button
            type="button"
            onClick={handleCloseModal}
            className="group -mt-2 w-10 h-10 inline-flex items-center justify-center cursor-pointer"
            aria-label="Close contact form">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 1.8C18 0.8 17.2 0 16.2 0H13.8C12.8 0 12 0.8 12 1.8V4.2C12 5.1 11.2 5.8 10.4 5.8H7.6C6.7 5.8 6 5.1 6 4.2V1.8C6 0.8 5.2 0 4.2 0H1.8C0.8 0 0 0.8 0 1.8V4.2C0 5.2 0.8 6 1.8 6H4.2C5.1 6 5.8 6.8 5.8 7.6V10.4C5.8 11.3 5.1 12 4.2 12H1.8C0.8 12 0 12.8 0 13.8V16.2C0 17.2 0.8 18 1.8 18H4.2C5.2 18 6 17.2 6 16.2V13.8C6 12.9 6.8 12.2 7.6 12.2H10.4C11.3 12.2 12 12.9 12 13.8V16.2C12 17.2 12.8 18 13.8 18H16.2C17.2 18 18 17.2 18 16.2V13.8C18 12.8 17.2 12 16.2 12H13.8C12.9 12 12.2 11.2 12.2 10.4V7.6C12.2 6.7 12.9 6 13.8 6H16.2C17.2 6 18 5.2 18 4.2V1.8Z"
                className="fill-lightGray/40 transition-all duration-200 group-hover:fill-(--contact-accent-color)"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-5 lg:pr-12">
            <Image
              src={contactPhoto}
              alt="Contact Us"
              width={320}
              height={320}
              className="h-44 w-44 rounded-full bg-(--contact-accent-color) object-cover sm:h-56 sm:w-56 md:h-72 md:w-72"
            />
            <p className="max-w-130 text-center text-white font-light md:pl-10 md:text-left">
              {t('contactSection.description')}
            </p>
          </div>
          <form className="flex w-full flex-col gap-5 sm:gap-8" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder={t('contactSection.emailPlaceholder')}
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/25 bg-[#141414] px-4 py-3 leading-none font-light text-white placeholder:text-[#C9C9C9] placeholder:font-light outline-none focus:border-(--contact-accent-color) sm:px-6 sm:py-4"
            />

            <textarea
              name="message"
              placeholder={t('contactSection.questionPlaceholder')}
              rows={5}
              value={formState.message}
              onChange={handleChange}
              required
              className="w-full min-h-40 resize-none rounded-xl border border-white/25 bg-[#141414] px-4 py-4 leading-none font-light text-white placeholder:text-[#C9C9C9] placeholder:font-light outline-none focus:border-(--contact-accent-color) sm:min-h-56 sm:px-6 sm:py-6"
            />

            <label className="flex items-start gap-3 text-sm font-light text-[#D7D7D7] leading-relaxed">
              <input
                name="agreeToTerms"
                type="checkbox"
                checked={formState.agreeToTerms}
                onChange={handleChange}
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/35 bg-[#141414] accent-(--contact-accent-color)"
              />
              <span className="text-xs">{t('contactSection.termsConsent')}</span>
            </label>

            {status.message ? (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-xl border px-4 py-3 text-sm font-light leading-relaxed ${
                  status.type === 'success'
                    ? 'border-[#00FF84]/40 bg-[#00FF84]/10 text-[#B9FFD6]'
                    : 'border-red-500/40 bg-red-500/10 text-red-200'
                }`}>
                {status.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start rounded-xl border border-(--contact-accent-color) px-7 py-3 text-(--contact-accent-color) leading-none font-light transition-colors duration-300 hover:bg-(--contact-accent-color) hover:text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-(--contact-accent-color) sm:px-10 sm:py-5">
              {isSubmitting ? t('contactSection.sendingQuestion') : t('contactSection.submitQuestion')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
