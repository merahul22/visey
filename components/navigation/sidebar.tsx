"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Bell, House, MagnifyingGlass, Plus } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userType: "BUSINESS" | "STARTUP";
}

const getSidebarItems = (userType: SidebarProps["userType"]) => [
  {
    label: "Home",
    icon: <House size={18} />,
    route: "/home",
  },
  {
    label: userType === "STARTUP" ? "Search" : "Post",
    icon: userType === "STARTUP" ? <MagnifyingGlass size={18} /> : <Plus size={18} />,
    route: userType === "STARTUP" ? "/search" : "/post-funding-opportunity",
  },
  {
    label: "Notifications",
    icon: <Bell size={18} />,
    route: "/notifications",
  },
];

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname();
  const sidebarItems = getSidebarItems(userType);

  return (
    <aside className="hidden h-[calc(100vh-4rem)] pt-16 pb-4 md:flex flex-col justify-between z-10 shrink-0 w-52 border-r fixed bg-base-white px-4">
      {/* Top Section */}
      <div className="flex flex-col gap-y-4 flex-grow">
        {sidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.route);

          return (
            <Button
              key={item.route}
              variant="ghost"
              className={cn(
                "justify-start w-full flex items-center gap-x-4",
                isActive && "bg-neutrals-100 text-primary font-medium"
              )}
              asChild
            >
              <Link href={item.route} aria-current={isActive ? "page" : undefined}>
                <span className="-translate-y-0.5">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 mt-4">
        <Button size="lg" className="rounded-full" variant="outline" asChild>
          <Link href="/settings">Settings</Link>
        </Button>
        <Button size="lg" className="rounded-full" asChild>
          <Link href="/promote-business">Promote</Link>
        </Button>
      </div>
    </aside>
  );
}
