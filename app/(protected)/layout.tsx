import { Navbar } from "@/components/navigation/navbar";
import { BottomBar } from "@/components/navigation/bottom-bar";
import { Sidebar } from "@/components/navigation/sidebar";
import React from 'react';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session || !session.user) {
    return <div>
      <p>Not Logged in!</p>
      <Link href="/login">
        <Button>
          Login
        </Button>
      </Link>
    </div>
  }

  const user = session.user;

  const userType = user.type;

  return (
    <div className="flex flex-col min-h-screen w-full pb-24 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Sidebar userType={userType} />
        <div className="p-4 md:p-6 md:ml-52">
          <div className="max-w-screen-2xl mx-auto">{children}</div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
}
