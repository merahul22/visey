import { Navbar } from "@/components/navigation/navbar";
import { BottomBar } from "@/components/navigation/bottom-bar";
import { Sidebar } from "@/components/navigation/sidebar";
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full pb-24 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Sidebar userType="BUSINESS" />
        <div className="p-4 md:p-6 md:ml-52">
          <div className="max-w-screen-xl mx-auto">{children}</div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
}
