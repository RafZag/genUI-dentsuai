import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { Sora } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactComponent from '@/components/ContactComponent';
import { Providers } from '@/app/providers';
import { VisualEditingComponent } from '@/components/VisualEditing';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'dentsu AI Stack',
  description: 'A collection of AI tools and resources for creative professionals.',
  icons: {
    icon: '/greenPlus.svg',
    shortcut: '/greenPlus.svg',
    apple: '/greenPlus.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#101010] text-[#adadad] selection:bg-[#00ff84] selection:text-black">
        <Script id="gtm-datalayer" data-cookieconsent="ignore" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted'
});
window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});`}
        </Script>
        <Script
          id="gtm-src"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-WRW9Q22V"
          data-cookieconsent="ignore"
          strategy="afterInteractive"
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRW9Q22V"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>
          <Navbar />
          <ContactComponent />
          {children}
          <Footer />
        </Providers>
        {isDraftMode && <VisualEditingComponent />}
      </body>
    </html>
  );
}
