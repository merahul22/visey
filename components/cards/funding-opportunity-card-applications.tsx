import Image from 'next/image';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  CaretRight,
  HeartStraight,
  MapPin,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '../ui/button';
import { Opportunity } from '@prisma/client';

interface Props {
  opportunity: Opportunity & {
    business?: {
      name: string;
      image: string | null;
      location: string;
    } | null;
  };
  isPromoted?: boolean; // Temporarily commented out but kept in interface for future reintegration
  underReview: boolean;
}

const FundingOpportunityCardApplications = ({ opportunity, underReview, isPromoted = false }: Props) => {
  const endDate = opportunity.endDatetime ? new Date(opportunity.endDatetime) : null;
  const formattedEndDate = endDate ? endDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'No end date';

  return (
    <div className="flex items-center justify-center lg:justify-start flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
      <div className="border-2 rounded-xl px-4 py-4 space-y-2 max-w-fit">
        <div className="space-y-2 lg:flex gap-2">
          <div className="w-[300px] h-[135px] flex items-center relative overflow-hidden rounded-md">
            <Image
              src={opportunity.imageUrl || "/img/image-placeholder.png"}
              alt={opportunity.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">            <div className="flex gap-1">              <h1 className="text-lg font-medium">{opportunity.title}</h1>
              {/* Temporarily commented out for future reintegration
              {isPromoted && (
                <div className="bg-yellow-100 px-2 py-0.5 rounded-full text-xs inline-flex items-center">
                  Promoted
                </div>
              )}
              */}
              {underReview && (
                <div className="bg-primary-50 px-2 py-0.5 rounded-full text-xs inline-flex items-center">
                  Under Review
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span>{opportunity.business?.location || "Location not specified"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Ends: {formattedEndDate}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {opportunity.type && (
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">{opportunity.type}</span>
              )}
              {opportunity.subtype && (
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">{opportunity.subtype}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <CaretRight size={24} />
      </Button>
    </div>
  );
};

export default FundingOpportunityCardApplications;
