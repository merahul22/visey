"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Updated categories to match the dashboard style
const categories = [
  { 
    name: "Marketing Tools", 
    imageUrl: "/img/Category Images/Icon 1.png",
    href: "/business?tags=marketing"
  },
  { 
    name: "App Development", 
    imageUrl: "/img/Category Images/Icon 2.png",
    href: "/business?tags=app-development"
  },
  { 
    name: "Prototype Builders", 
    imageUrl: "/img/Category Images/Icon 3.png",
    href: "/business?tags=prototype"
  },
  {
    name: "Legal & Compliance Support",
    imageUrl: "/img/Category Images/Icon 4.png",
    href: "/business?tags=legal"
  },
  {
    name: "Crowdfunding Platforms",
    imageUrl: "/img/Category Images/Icon 5.png",
    href: "/business?tags=crowdfunding"
  },
];

// Add big categories
const bigCategories = [
  { name: "Curated Incubators for You", imageUrl: "/img/Category Images/Category 1- Visey.png", href: "/business?tags=incubation" },
  { name: "Funding Opportunities", imageUrl: "/img/Category Images/Category 2- Visey.png", href: "/opportunities2" },
  { name: "On Demand Mentorship Access", imageUrl: "/img/Category Images/Category 3- Visey.png", href: "/business?tags=mentor" },
  { name: "Curated Accelerators for You", imageUrl: "/img/Category Images/Category 4- Visey.png", href: "/business?tags=acceleration" },
];

function RecommendedCategories() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Big category cards - Scrollable on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-4 mb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {bigCategories.slice(0, 4).map((category, idx) => (
            <Link key={idx} href={category.href || '#'} passHref className="snap-center">
              <article className="shrink-0 border rounded-md w-[280px] md:w-full p-1.5 space-y-2 cursor-pointer">
                <div className="relative w-full" style={{ paddingBottom: '65.76%' }}>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {/* Small category cards - Grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 px-2">
          {categories.slice(0, 4).map((category, idx) => (
            <Link key={idx} href={category.href || '#'} passHref>
              <article className="flex flex-col items-center p-2 border rounded-md w-full">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gray-50">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-center text-xs sm:text-sm mt-2 line-clamp-2">{category.name}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedCategories;
