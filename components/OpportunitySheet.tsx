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

interface OpportunitySheetProps {
  opportunity: z.infer<typeof fundingOpportunitySchema>;
  business: Business;
  children: React.ReactNode;
}

const OpportunitySheet = ({ 
  opportunity, 
  business, 
  children 
}: OpportunitySheetProps) => {
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
        <PreviewOpportunityApply opportunity={opportunity} business={business} isInSheet={true} />
      </SheetContent>
    </Sheet>
  );
};

export default OpportunitySheet;