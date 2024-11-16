import React from 'react';
import HeroNav from '@/components/navigation/hero-nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeroNav className="mx-auto max-w-screen-xl" />
      {children}
    </>
  );
}
