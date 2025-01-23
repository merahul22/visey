"use client";

import { Bell } from "@phosphor-icons/react/dist/ssr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationsDropdown() {
  return (
    <div className="cursor-pointer relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-1 sm:p-2 border rounded-full hover:bg-neutrals-100">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>This is new notification.</DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>This is new notification.</DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>This is new notification.</DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>This is new notification.</DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center justify-center absolute -top-1 -right-1 rounded-full w-4 h-4 sm:w-5 sm:h-5 bg-primary">
        <p className="text-xs text-white">10+</p>
      </div>
    </div>
  );
}
