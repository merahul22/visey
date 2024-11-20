'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  CaretRight,
  RowsPlusTop,
  HandCoins,
  CoinVertical,
  ClipboardText,
  HeartStraight,
  Bag,
} from '@phosphor-icons/react/dist/ssr';

import { ExitIcon, GearIcon } from '@radix-ui/react-icons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Business, Startup } from '@prisma/client';

interface User {
  type?: 'BUSINESS' | 'STARTUP';
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
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
              src={user?.image || ''}
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

        {user?.type === 'STARTUP' && !isComplete && (
          <div className="bg-neutrals-100 px-6 py-2 rounded-lg">
            <p className="text-xl font-semibold">You&apos;re missing out</p>
            <p>on recommendations</p>
            <Button
              className="bg-white border-2 mt-2 border-neutrals-200 rounded-full"
              variant="outline"
            >
              <Link href={`/startup-details`}>Complete Profile</Link>
            </Button>
          </div>
        )}

        <div className="px-2 py-2 space-y-1">
          {user?.type === 'BUSINESS' && (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <span className="">
                  <Link href={'/account'} className="flex gap-x-2 items-center">
                    <div>
                      <Bag className="w-4 h-4" />
                    </div>
                    <span>My Account</span>
                  </Link>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="">
                  <Link className="flex gap-x-2 items-center" href={"/opportunities"}>
                    <RowsPlusTop />
                    <span>Manage Opportunities</span>
                  </Link>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="flex gap-x-2 items-center">
                  <HandCoins />
                  <span>Leads</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="flex gap-x-2 items-center">
                  <CoinVertical />
                  <span>Plans & Billing</span>
                </span>
              </DropdownMenuItem>
            </>
          )}

          {user?.type === 'STARTUP' && (
            <>
              <DropdownMenuItem className="cursor-pointer">
                <span className="flex gap-x-2 items-center">
                  <ClipboardText />
                  <span>Applications</span>
                </span>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem className="cursor-pointer">
            <span className="flex gap-x-2 items-center">
              <Link className="flex gap-x-2 items-center" href={"/saved"}>
                <HeartStraight />
                <span>Saved</span>
              </Link>
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <span className="flex gap-x-2 items-center">
              <GearIcon className="" />
              <Link href={`/settings`}>
                <span>Settings</span>
              </Link>
            </span>
          </DropdownMenuItem>

          {/* Logout functionality */}
          <DropdownMenuItem
            className="flex justify-center border cursor-pointer"
            onClick={() => signOut()}
          >
            <span className="flex gap-x-2 items-center">
              <ExitIcon className="" />
              <span>Logout</span>
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
