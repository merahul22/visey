"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Bag,
  CaretRight,
  ClipboardText,
  CoinVertical,
  HandCoins,
  HeartStraight,
  RowsPlusTop,
} from "@phosphor-icons/react/dist/ssr";

import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Business, Startup } from "@prisma/client";
import { toast } from "sonner";
import { useState } from "react";

interface User {
  type?: "BUSINESS" | "STARTUP";
  image?: string | null;
  business?: Business;
  startup?: Startup;
  email?: string;
  phoneNumber?: string;
  name?: string;
}

interface UserDropdownProps {
  user?: User | null;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const isComplete = !!user?.startup?.idea;

  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    setShowLogoutWarning(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              <div>
                <p>{user?.name?.charAt(0).toUpperCase()}</p>
              </div>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 w-[300px] text-base" align="end">
          <div className="flex items-center gap-x-3 h-[90px]">
            <div>
              <Image
                src={user?.image || ""}
                alt="Profile Photo"
                width={72}
                height={72}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div>
                <p className="text-xl font-semibold">{user?.name}</p>
                <p className="text-sm text-neutrals-500">
                  {user?.email || user?.phoneNumber}
                </p>
              </div>

              <Link
                href={`/profile/${user?.type?.toLowerCase()}`}
                className="flex items-center gap-x-2"
              >
                View Profile
                <div>
                  <CaretRight />
                </div>
              </Link>
            </div>
          </div>

          {user?.type === "STARTUP" && !isComplete && (
            <div className="bg-neutrals-100 px-6 py-2 rounded-lg">
              <p className="text-xl font-semibold">You&apos;re missing out</p>
              <p>on recommendations</p>
              <Link href={`/startup-details`}>
                <Button
                  className="bg-white border-2 mt-2 border-neutrals-200 rounded-full"
                  variant="outline"
                >
                  Complete Profile
                </Button>
              </Link>
            </div>
          )}

          <div className="px-2 py-2 space-y-1">
            {user?.type === "BUSINESS" && (
              <>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href={"/account"} className="flex gap-x-2 items-center">
                    <Bag className="w-4 h-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    className="flex gap-x-2 items-center"
                    href={"/opportunities"}
                  >
                    <RowsPlusTop />
                    <span>Manage Opportunities</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <span className="flex gap-x-2 items-center">
                    <HandCoins />
                    <span>Leads</span>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <span className="flex gap-x-2 items-center">
                    <CoinVertical />
                    <span>Plans & Billing</span>
                  </span>
                </DropdownMenuItem>
              </>
            )}

            {user?.type === "STARTUP" && (
              <>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <span className="flex gap-x-2 items-center">
                    <ClipboardText />
                    <span>Applications</span>
                  </span>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link className="flex gap-x-2 items-center" href={"/saved"}>
                <HeartStraight />
                <span>Saved</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link className="flex gap-x-2 items-center" href={"/settings"}>
                <GearIcon />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>

            {/* Logout functionality */}
            <DropdownMenuItem
              className="flex justify-center border cursor-pointer"
              onClick={() => setShowLogoutWarning(true)}
            >
              <span className="flex gap-x-2 items-center">
                <ExitIcon className="" />
                <span>Logout</span>
              </span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {showLogoutWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </p>
            <div className="">
              <Image
                src="/img/warning.png"
                alt="Warning Photo"
                width={200}
                height={200}
              />
            </div>
            <div className="flex justify-center gap-x-4">
              <Button
                className="bg-primary-landing text-white"
                size="md"
                onClick={handleLogout}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowLogoutWarning(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
