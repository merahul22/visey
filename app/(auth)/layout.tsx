import React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="bg-base-primary lg:w-[555px]"></div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
