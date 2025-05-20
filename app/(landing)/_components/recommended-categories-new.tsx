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
        {/* Big category cards */}
        <div className="hidden overflow-x-auto md:flex justify-center gap-4 mb-8">
          {bigCategories.slice(0, 4).map((category, idx) => (
            <Link key={idx} href={category.href || '#'} passHref>
              <article className="shrink-0 border rounded-md w-64 p-1.5 space-y-2 cursor-pointer">
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
        
        {/* Small category cards */}
        <div className="flex justify-center gap-4">
          {categories.slice(0, 4).map((category, idx) => (
            <Link key={idx} href={category.href || '#'} passHref>
              <article className="flex flex-col shrink-0 gap-y-2 items-center justify-center w-32 p-4 border rounded-md md:w-52 md:flex-row md:p-1.5">
                <div className="h-16 w-16 rounded-full bg-gray-50 md:rounded-md md:w-full">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="w-full">
                  <p className="text-center text-sm md:text-left md:w-1/2 md:ml-4">{category.name}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedCategories;
