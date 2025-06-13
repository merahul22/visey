'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PostFundingOpportunityForm from '@/components/form/PostFundingOpportunity';
import { Opportunity } from '@prisma/client';

interface OpportunityFormProps {
  initialData?: Opportunity;
  businessId: string;
}

const OpportunityForm = ({ initialData, businessId }: OpportunityFormProps) => {
  const router = useRouter();

  // Transform initialData to match form structure if it exists
  const formattedInitialData = initialData ? {
    ...initialData,
    targetProductStageList: initialData.targetProductStage || [],
    targetFundingStageList: initialData.targetFundingStage || [],
  } : undefined;

  return (
    <PostFundingOpportunityForm 
      business={{ id: businessId } as any}
      initialData={formattedInitialData}
    />
  );
};

export default OpportunityForm;
