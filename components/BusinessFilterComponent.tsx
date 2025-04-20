"use client";

import { Business } from "@prisma/client";
import { useState, useEffect, useCallback } from "react";
import { BusinessCard } from "@/components/cards/business-card";
import { useRouter, useSearchParams } from "next/navigation";

type BusinessFilterComponentProps = {
  initialBusinesses: Business[];
};

export default function BusinessFilterComponent({ initialBusinesses }: BusinessFilterComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Common business categories
  const categories = ["Marketing", "Legal", "Technology", "Finance", "Consulting"];

  // Define filterBusinesses as a memoized callback to use in useEffect
  const filterBusinesses = useCallback((category: string) => {
    if (!category) {
      setBusinesses(initialBusinesses);
      return;
    }

    const filteredBusinesses = initialBusinesses.filter(business => {
      // Case-insensitive search in categoryTags
      return business.categoryTags.some(tag => 
        tag.toLowerCase().includes(category.toLowerCase()) || 
        category.toLowerCase().includes(tag.toLowerCase())
      );
    });

    setBusinesses(filteredBusinesses);
  }, [initialBusinesses]);

  // Handle initial URL parameters for category filtering
  useEffect(() => {
    const tagsParam = searchParams?.get('tags');
    if (tagsParam) {
      setSelectedCategory(tagsParam);
      filterBusinesses(tagsParam);
    }
  }, [searchParams, filterBusinesses]);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    const newCategory = category === selectedCategory ? "" : category;
    setSelectedCategory(newCategory);
    filterBusinesses(newCategory);
    
    // Update URL for bookmarking and sharing
    if (newCategory) {
      router.push(`/business?tags=${newCategory}`);
    } else {
      router.push('/business');
    }
  };

  return (
    <>
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => handleCategoryClick("")}
          className={`px-3 py-1 rounded-full transition-colors ${
            selectedCategory === "" 
            ? "bg-primary-600 text-white" 
            : "bg-primary-50 text-primary-800 hover:bg-primary-100"
          }`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-1 rounded-full transition-colors ${
              selectedCategory === category 
              ? "bg-primary-600 text-white" 
              : "bg-primary-50 text-primary-800 hover:bg-primary-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Business cards grid */}
      {businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <p>No businesses found for the selected category.</p>
      )}
    </>
  );
}