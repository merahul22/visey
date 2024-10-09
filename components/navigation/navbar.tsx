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
    <div>
      <nav className="flex items-center justify-between">
        <div className="shrink-0">
          <Image src="/logo2.png" width={71} height={32} alt="visey logo" />
        </div>
        <div>
          <p className="text-linkBlue">List Buissness Free</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
      </nav>
      <div className="relative mt-4 shadow-inner">
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
  );
}
export default Navbar;
