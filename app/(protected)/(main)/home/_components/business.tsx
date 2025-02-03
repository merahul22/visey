import React from 'react';
import { BusinessCard } from '@/components/cards/business-card';

interface Business {
  id: string;
  name: string;
  image: string;
  location: string;
  averageRating: number;
  promoted: boolean;
  services: { name: string }[];
}

const BusinessCardList = ({ businesses }: { businesses: Business[] }) => {
  return (
    <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 sm:gap-y-8 xl:grid-cols-3">
      {businesses.map((business: Business, idx: number) => (
        <BusinessCard key={idx} business={business} />
      ))}
    </div>
  );
};

export default BusinessCardList;
