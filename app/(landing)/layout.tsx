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
      <Footer className="rounded-3xl m-6" />
    </>
  );
}
