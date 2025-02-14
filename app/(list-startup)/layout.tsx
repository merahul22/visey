import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Image on the left side */}
      <div className="hidden lg:block lg:w-[565px] h-screen relative">
        <Image
          src={"/img/signup_banner.webp"}
          alt={"Signup Banner"}
          fill={true}
          objectFit="cover"
          priority
        />
      </div>
      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <div className="shrink-0 lg:w-48 cursor-pointer absolute left-[40px] top-[20px]">
        <Link href="/public">
          <Image
            src="/logo-black.webp"
            width={71}
            height={32}
            alt="visey logo"
          />
        </Link>
      </div>
    </div>
  );
}
