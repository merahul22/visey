"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import { House, MagnifyingGlass, Bell } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    label: "Home",
    icon: <House size={18} />,
    route: "/home",
  },
  {
    label: "Search",
    icon: <MagnifyingGlass size={18} />,
    route: "/search",
  },
  {
    label: "Notifications",
    icon: <Bell size={18} />,
    route: "/notifications",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-[calc(100vh-4rem)] pt-24 pb-4 flex-grow md:flex flex-col justify-between z-10 shrink-0 w-52 border-r fixed bg-base-white px-4">
      <div className="flex flex-col gap-y-4">
        {sidebarItems.map((item) => (
          <Button key={item.route}  variant="ghost" className="justify-start" asChild>
            <Link
              href={item.route}
              className={cn(
                "flex items-center gap-x-4",
                pathname == item.route && "bg-neutrals-100"
              )}
            >
              <span className="-translate-y-0.5">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
      <div className="mx-auto">
        <Button size="lg" className="rounded-full">Promote</Button>
      </div>
    </aside>
  );
}
