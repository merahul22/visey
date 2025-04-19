import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardSmallProps {
  category: string;
  imageUrl?: string;
  onClick?: () => void;
  selected?: boolean;
}

// Define the routes for each category
const categoryRoutes: Record<string, string> = {
  "Marketing Tools": "/business?tags=marketing",
  "App Development": "/business?tags=app-development",
  "Prototype Builders": "/business?tags=prototype",
  "Legal & Compliance Support": "/business?tags=legal",
  "Crowdfunding Platforms": "/business?tags=crowdfunding",
};

export function CategoryCardSmall({
  category,
  imageUrl,
  onClick,
  selected,
}: CategoryCardSmallProps) {
  const defaultImageUrl = "https://via.placeholder.com/150";
  const route = categoryRoutes[category] || "/";

  return (
    <Link href={route} passHref>
      <article
        className={`flex flex-col shrink-0 gap-y-2 items-center justify-center w-32 p-4 border rounded-md md:w-64 md:flex-row md:p-1.5 ${selected ? "border-blue-500" : ""}`}
        onClick={onClick}
      >
        <div className="h-20 w-20 rounded-full bg-gray-500 md:rounded-md md:w-full">
          <Image
            src={imageUrl || defaultImageUrl}
            alt={category}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="w-full">
          <p className="text-center md:text-left md:w-1/2 md:ml-4">{category}</p>
        </div>
      </article>
    </Link>
  );
}
