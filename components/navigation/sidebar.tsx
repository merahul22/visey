"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'


import { Button } from "../ui/button";
import { House, MagnifyingGlass, Bell } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    label: "Home",
    icon: <House size={16}/>,
    route: "/home",
  },
  {
    label: "Search",
    icon: <MagnifyingGlass size={16} />,
    route: "/search",
  },
  {
    label: "Notifications",
    icon: <Bell size={16} />,
    route: "/notifications",
  },
];


function Sidebar() {
  const pathname = usePathname();


  return (
    <div className="hidden md:flex z-10 shrink-0 h-screen w-52 border-r fixed top-14 bg-base-white pt-32 px-4 flex-col gap-y-4">
      {sidebarItems.map((item => (
        <Button key={item.route} variant="dropdown" asChild>
          <Link href={item.route} className={cn('flex items-center gap-x-4', pathname == item.route && 'bg-neutrals-100')}>
            <span className="-translate-y-0.5">{item.icon}</span> 
            <span>{item.label}</span>
          </Link>
        </Button>
      )))}
    </div>
  );
}
export default Sidebar;
