import React from 'react';
import Footer from '@/components/navigation/footer';

export default function ProtectedLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Footer className="rounded-xl" />
    </div>
  );
}
