'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactComponent from '@/components/ContactComponent';
import { Providers } from '@/app/providers';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <Providers>
      <Navbar />
      <ContactComponent />
      {children}
      <Footer />
    </Providers>
  );
}
