import Image from "next/image";
import { Button } from "../ui/button";
import { UserDropdown } from "@/components/UserDropdown";
import Link from "next/link";
import { Business, Startup } from "@prisma/client";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import React from "react";
import Search from "@/components/Search";
import { auth } from "@/auth";

export async function Navbar({ className }: { className?: string }) {
  const session = await auth();
  const user = session?.user;

  const userDropDownProps = {
    type: user?.type as "BUSINESS" | "STARTUP",
    id: user?.id,
    image: user?.image,
    business: user?.business as Business,
    startup: user?.startup as Startup,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    name: user?.name,
  };

  return (
    <header className="sticky top-0 z-40 bg-base-white px-4 py-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
      <nav className={cn("flex items-center justify-between", className)}>
        <div className="shrink-0 lg:w-48 cursor-pointer">
          <Link href="/home">
            <Image
              src="/logo-black.webp"
              width={71}
              height={32}
              alt="visey logo"
            />
          </Link>
        </div>

        <div className="flex px-8 flex-1 justify-center">
          {user?.type === "BUSINESS" && !user.business && (
            <Link
              href="/list-business"
              className="text-center text-linkBlue md:hidden"
            >
              List Business Free
            </Link>
          )}
          {user?.type === "BUSINESS" && user.business && (
            <Link
              href="/promote-business"
              className="text-center text-linkBlue md:hidden"
            >
              Promote
            </Link>
          )}
          {user?.type === "STARTUP" && !user.startup && (
            <Link
              href="/basic-startup-details"
              className="text-center text-linkBlue md:hidden"
            >
              Add Startup Details
            </Link>
          )}
          <Search
            divClassName="hidden lg:block w-full"
            formClassName="relative shadow-inner w-[30rem] xl:w-[40rem]"
          />
        </div>

        <div className="flex gap-x-6 items-center">
          {user?.type === "STARTUP" && !user.startup && (
            <Link href="/basic-startup-details">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                Add Startup Details
              </Button>
            </Link>
          )}
          {user?.type === "BUSINESS" && (
            <Link href="/promote-business">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                Promote
              </Button>
            </Link>
          )}
          {user?.type === "BUSINESS" && !user?.business && (
            <Link href="/list-business">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:block rounded-full"
              >
                List Business Free
              </Button>
            </Link>
          )}

          <div className="flex gap-1 sm:gap-4 items-center">
            <div>
              <NotificationsDropdown />
            </div>
            <div>
              <UserDropdown user={userDropDownProps} />
            </div>
          </div>
        </div>
      </nav>

      <Search divClassName="relative z-10 mt-4 shadow-inner lg:hidden" />
    </header>
  );
}
