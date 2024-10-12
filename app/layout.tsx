import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import BreakpointIndicator from '@/components/breakpoint-indicator';
import Navbar from '@/components/navigation/navbar';
import BottomBar from '@/components/navigation/bottom-bar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Visey',
  description: 'promote your startup and small business and grow more with visey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BreakpointIndicator />
        <div className="flex flex-col -h-full w-full px-4 pt-4 pb-24 md:py-4 lg:px-10">
          <Navbar />
          <main className="mt-8">
            
            {children}
          </main>
          <BottomBar />
        </div>
      </body>
    </html>
  );
}
