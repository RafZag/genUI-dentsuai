'use client';

import { createContext, useCallback, useEffect, useMemo, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const ContactModalContext = createContext();

function isContactTrigger(searchParams, hash) {
  if (searchParams) {
    if (searchParams.has('contact')) {
      const contactVal = searchParams.get('contact')?.toLowerCase();
      // ?contact, ?contact=true, ?contact=open, ?contact=1, ?contact=yes, etc.
      if (
        contactVal === '' ||
        contactVal === null ||
        contactVal === 'true' ||
        contactVal === 'open' ||
        contactVal === '1' ||
        contactVal === 'yes'
      ) {
        return true;
      }
    }
    const modalParam = searchParams.get('modal')?.toLowerCase();
    const openParam = searchParams.get('open')?.toLowerCase();
    if (modalParam === 'contact' || openParam === 'contact') {
      return true;
    }
  }

  if (hash) {
    const normalizedHash = hash.toLowerCase();
    if (
      normalizedHash === '#contact' ||
      normalizedHash === '#contact-modal' ||
      normalizedHash === '#contact-form' ||
      normalizedHash === '#contactmodal' ||
      normalizedHash === '#contactform'
    ) {
      return true;
    }
  }

  return false;
}

function ContactUrlListener({ openContactModal }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const checkUrl = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (isContactTrigger(searchParams, hash)) {
        openContactModal();
      }
    };

    checkUrl();

    const handleHashChange = () => {
      checkUrl();
    };

    const handlePopState = () => {
      checkUrl();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [searchParams, pathname, openContactModal]);

  return null;
}

export function ContactModalProvider({ children }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isContactModalOpen,
      openContactModal,
      closeContactModal,
    }),
    [isContactModalOpen, openContactModal, closeContactModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      <Suspense fallback={null}>
        <ContactUrlListener openContactModal={openContactModal} />
      </Suspense>
      {children}
    </ContactModalContext.Provider>
  );
}
