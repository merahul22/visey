import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardBigProps {
  category: string;
  imageUrl: string;
}

// Define the category names corresponding to each image
const categoryMapping: Record<string, string> = {
  "/img/Category Images/Category 1- Visey.png": "Curated Incubators for You",
  "/img/Category Images/Category 2- Visey.png": "Funding Opportunities",
  "/img/Category Images/Category 3- Visey.png": "On Demand Mentorship Access",
  "/img/Category Images/Category 4- Visey.png": "Curated Accelerators for You",
};

const categoryRoutes: Record<string, string> = {
  "Curated Incubators for You": "/business?tags=incubation",
  "Funding Opportunities": "/opportunities2",
  "On Demand Mentorship Access": "/business?tags=mentor",
  "Curated Accelerators for You": "/business?tags=acceleration",
};

export function CategoryCardBig({ category, imageUrl }: CategoryCardBigProps) {
  // Use the mapping to get the correct category name
  const actualCategory = categoryMapping[imageUrl] || category || "";
  const route = categoryRoutes[actualCategory] || "/";

  return (
    <Link href={route} passHref>
      <article className="shrink-0 border rounded-md w-80 p-1.5 space-y-2 cursor-pointer">
        <div className="relative w-full" style={{ paddingBottom: '65.76%' }}>
          <Image
            src={imageUrl}
            alt={actualCategory}
            fill
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
        {/* Removed the subtitle text display */}
      </article>
    </Link>
  );
}
