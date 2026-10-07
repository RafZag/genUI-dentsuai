import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";

import { VisualEditingComponent } from '@/components/VisualEditing';

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dentsu AI Stack",
  description: "A collection of AI tools and resources for creative professionals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${sora.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#101010] text-[#adadad] selection:bg-[#00ff84] selection:text-black">
        {children}
        {isDraftMode && <VisualEditingComponent />}
      </body>
    </html>
  );
}
