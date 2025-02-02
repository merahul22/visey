import React from 'react';
import HeroNav from '@/components/navigation/hero-nav';
import Footer from '@/components/navigation/footer';


// export const metadata={
//   title:"Visey | Indian Startup Growth | Funding, Mentorship, AI Tools",
//   description:"Join Visey, India's leading startup platform. Access mentorship, funding, resources, and AI tools to scale your startup. Be part of India's startup ecosystem."
// }
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
