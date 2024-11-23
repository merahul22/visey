import React from 'react';
import HeroNav from '@/components/navigation/hero-nav';
import Footer from '@/components/navigation/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeroNav className="mx-auto max-w-screen-xl" />
      {children}
      <Footer className="shadow-[0_-8px_10px_rgba(0,0,0,0.1)] rounded-3xl mb-2" />
    </>
  );
}
