import React from 'react';
import Image from 'next/image';

export default function AuthLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Image on the left side */}
      <div className="hidden lg:block lg:w-[565px] h-screen relative">
        <Image
          src={"/img/signup_banner.png"}
          alt={"Signup Banner"}
          fill={true}
          objectFit="cover"
          priority
        />
      </div>
      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
