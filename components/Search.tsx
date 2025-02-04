"use client";

import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchBoxProps {
  divClassName?: string;
  formClassName?: string;
}

const SearchBox = ({ divClassName, formClassName }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <div className={`${divClassName}`}>
      <form onSubmit={handleSearchSubmit} className={`${formClassName}`}>
        <Input
          className="flex-1 pr-10 border-none py-6 bg-white"
          type="text"
          placeholder="Type to Search.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
        </span>
      </form>
    </div>
  );
};

export default SearchBox;
