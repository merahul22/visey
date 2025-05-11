"use client";

import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from '@/components/ui/sheet';
import PreviewOpportunityApply from '@/components/PreviewOpportunityApply';
import { Business } from '@prisma/client';
import * as z from 'zod';
import { fundingOpportunitySchema } from '@/schemas';

// Define a complete interface instead of extending to avoid type conflicts
interface ExtendedOpportunity {
  id?: string;
  type: string;
  subtype: string;
  title: string;
  fundingAmount: string;
  targetWomenFounder: boolean;
  description: string;
  eligibilityCriteria: string;
  registration: string;
  endDate: Date;
  startDate?: Date;
  targetProductStage?: string;
  targetFundingStage?: string;
  targetProductStageList?: string[];
  targetFundingStageList?: string[];
  targetIndustry?: string;
  targetSector?: string;
  websiteUrl?: string;
  registrationFormLink?: string;
  noOfRegistrationsAllowed?: string;
  // Explicitly define these properties with types compatible with PreviewOpportunityApply
  imageUrl: string | null;
  bannerUrl: string | null;
}

interface OpportunitySheetProps {
  opportunity: z.infer<typeof fundingOpportunitySchema> & { id?: string, imageUrl?: string | null };
  business: Business;
  children: React.ReactNode;
}

const OpportunitySheet = ({ 
  opportunity, 
  business, 
  children 
}: OpportunitySheetProps) => {
  // Adapt the opportunity object to include the required properties
  const extendedOpportunity: ExtendedOpportunity = {
    // Copy all properties from the original opportunity
    id: opportunity.id,
    type: opportunity.type,
    subtype: opportunity.subtype,
    title: opportunity.title,
    fundingAmount: opportunity.fundingAmount,
    targetWomenFounder: opportunity.targetWomenFounder,
    description: opportunity.description,
    eligibilityCriteria: opportunity.eligibilityCriteria, 
    registration: opportunity.registration,
    endDate: opportunity.endDate,
    startDate: opportunity.startDate,
    targetProductStage: opportunity.targetProductStage,
    targetFundingStage: opportunity.targetFundingStage,
    targetProductStageList: opportunity.targetProductStageList,
    targetFundingStageList: opportunity.targetFundingStageList,
    targetIndustry: opportunity.targetIndustry,
    targetSector: opportunity.targetSector,
    websiteUrl: opportunity.websiteUrl,
    registrationFormLink: opportunity.registrationFormLink,
    noOfRegistrationsAllowed: opportunity.noOfRegistrationsAllowed,
    // Ensure these properties have the correct types
    imageUrl: opportunity.imageUrl || null,
    bannerUrl: opportunity.imageUrl || null  // Use imageUrl as fallback for bannerUrl
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">
            {opportunity.title || "Funding Opportunity Details"}
          </SheetTitle>
        </SheetHeader>
        <PreviewOpportunityApply 
          opportunity={extendedOpportunity} 
          business={business} 
          isInSheet={true} 
        />
      </SheetContent>
    </Sheet>
  );
};

export default OpportunitySheet;