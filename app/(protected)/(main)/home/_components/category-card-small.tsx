import React from "react";
//import Image from 'next/image';

interface CategoryCardSmallProps {
  category: string;
  imageUrl?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function CategoryCardSmall({
  category,
  imageUrl,
  onClick,
  selected,
}: CategoryCardSmallProps) {
  const defaultImageUrl = "https://via.placeholder.com/150"; // Default image URL

  return (
    <article
      className={`flex flex-col shrink-0 gap-y-2 items-center justify-center w-32 p-4 border rounded-md md:w-64 md:flex-row md:p-1.5 ${selected ? "border-blue-500" : ""}`}
      onClick={onClick}
    >
      <div className="h-20 w-20 rounded-full bg-gray-500 md:rounded-md md:w-full">
        <img
          src={imageUrl || defaultImageUrl}
          alt={category}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="w-full">
        <p className="text-center md:text-left md:w-1/2 md:ml-4">{category}</p>
      </div>
    </article>
  );
}
