import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import { ExitIcon, GearIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white px-4 py-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full">
      <nav className="flex items-center justify-between">
        <div className="shrink-0 lg:w-48">
          <Image src="/logo-black.png" width={71} height={32} alt="visey logo" />
        </div>
        <div className="flex-1 px-8 flex justify-center">
          <p className="text-center text-linkBlue md:hidden">List Buissness Free</p>
          <div className="hidden lg:block w-8/12">
            <div className="relative shadow-inner w-full">
              <Input
                className="flex-1 pr-10  border-none py-6"
                type="text"
                placeholder="Type to Search.."
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-6 items-center">
          <button className="hidden md:block font-semibold text-sm border rounded-full px-4 py-2">
            Promote
          </button>
          <button className="hidden md:block font-semibold text-sm border rounded-full px-4 py-2">
            List Buisness Free
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent  align="end">
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Promote</DropdownMenuItem>
              <DropdownMenuItem>List a new business</DropdownMenuItem>
              <DropdownMenuItem>Saved</DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex gap-x-2 items-center">
                  <GearIcon className="" />
                  <span>Settings</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex gap-x-2 items-center">
                  <ExitIcon className="" />
                  <span>Logout</span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="relative z-10 mt-4 shadow-inner lg:hidden">
        <Input
          className="flex-1 pr-10  border-none py-6"
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
export default Navbar;
