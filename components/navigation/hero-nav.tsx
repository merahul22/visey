'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MagnifyingGlass, List } from '@phosphor-icons/react/dist/ssr';
import { ExitIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function HeroNav({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-30 bg-primary-landing px-4 py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full transition-all duration-300">
      <nav className={cn('flex items-center justify-between', className)}>
        <div className="shrink-0 lg:w-48 cursor-pointer transition-transform duration-300 hover:scale-105">
          <Link href="/home">
            <Image
              src="/logo-white.png"
              width={81}
              height={42}
              alt="visey logo"
            />
          </Link>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="hidden lg:flex relative items-center">
            <div
              className={cn(
                'overflow-hidden transition-all  duration-300 ease-in-out',
                isExpanded ? 'w-64 opacity-100' : 'w-0 opacity-0'
              )}
            >
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-white pr-12 w-full transition-all duration-300 "
                style={{
                  transform: isExpanded ? 'translateX(0)' : 'translateX(20px)',
                }}
              />
            </div>

            <button
              className={cn(
                'transition-all duration-300 ease-in-out',
                isExpanded ? 'absolute right-0 top-1/2 -translate-y-1/2' : ''
              )}
            >
              <MagnifyingGlass
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  'shrink-0 size-5 cursor-pointer transition-all duration-300',
                  isExpanded
                    ? 'mr-4 text-neutrals-600'
                    : 'mr-4 text-base-white hover:scale-110'
                )}
              />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-8">
            {['About', 'Pricing', 'Contact Us'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-semibold text-base-white transition-all duration-300 hover:opacity-80"
              >
                {item}
              </Link>
            ))}

            {['List Business Free', 'Log In/ Sign Up'].map((text) => (
              <Link key={text} href="#">
                <Button variant="nav" size="md">
                  {text}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <Button variant="nav" size="md">
            List Business Free
          </Button>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <List className="w-6 h-6 text-base-white" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[280px] bg-primary-100 flex flex-col gap-2 pt-2 pb-2 mr-4 ring-8 ring-[#f3f3f35a] text-base">
                <div className="px-4 flex flex-col gap-2">
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={'/#'}>
                        <span>About</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={'/#'}>
                        <span>Pricing</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={'/#'}>
                        <span>Contact Us</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      <Link href={'/#'}>
                        <span>List Business Free</span>
                      </Link>
                    </span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuItem className="flex justify-center cursor-pointer shadow-[0_0_10px_5px_#E27C9D]">
                  <span className="flex gap-x-2 items-center">
                    <ExitIcon className="" />
                    <span>Login/ Sign Up</span>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="relative z-10 mt-4 shadow-inner lg:hidden">
        <Input
          className="flex-1 pr-10 border-none py-6 bg-white"
          type="text"
          placeholder="Type to Search.."
        />
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
        </span>
      </div>
    </header>
  );
}
