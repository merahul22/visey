import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from '@/components/Provider';
import HelpAndSupport from '@/components/HelpAndSupport';
import { Toaster } from "@/components/ui/sonner"
import React from 'react';

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const degularDisplay = localFont({
  src: "./fonts/DegularDisplayVF.ttf",
  variable: "--font-degular",
  weight: "100 200 300 400 500 600 700 800 900",
});

const geist = localFont({
  src: "./fonts/GeistVF.ttf",
  variable: "--font-geist",
  weight: "100 200 300 400 500 700 800 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.ttf",
  variable: "--font-geistMono",
  weight: "100 200 300 400 500 700 800 900",
});

const gothic = localFont({
  src: "./fonts/GothicA1VF.ttf",
  variable: "--font-gothic",
  weight: "100 200 300 400 500 700 800 900",
});

export const metadata: Metadata = {
  title: "Visey - India's Premier Marketplace Connecting Startups with Resource Providers",
  description:
    "Visey is India's first marketplace designed to connect startups and SMEs with businesses offering essential resources. Simplify your search and find the right match in just three clicks.",
  keywords: "Visey, startup resources, SME services, business marketplace, India startups, resource providers, business solutions"
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geist.variable} ${gothic.variable} ${geistMono.variable} ${degularDisplay.variable} antialiased text-base-black`}>
        <Provider>
          {children}
        </Provider>
        <HelpAndSupport />
        <Toaster />
      </body>
    </html>
  );
}
