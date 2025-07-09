'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PostFundingOpportunityForm from '@/components/form/PostFundingOpportunity';

interface OpportunityFormProps {
  initialData?: any; // Using any for now to avoid Prisma type issues
  businessId: string;
}

const OpportunityForm = ({ initialData, businessId }: OpportunityFormProps) => {
  const router = useRouter();

  // Transform initialData to match form structure if it exists
  const formattedInitialData = initialData ? {
    ...initialData,
    // Convert arrays back to empty strings for form compatibility
    targetProductStage: '', // Form expects string, not array
    targetFundingStage: '', // Form expects string, not array
    // Use the array data for the actual stage lists
    targetProductStageList: Array.isArray(initialData.targetProductStage) 
      ? initialData.targetProductStage 
      : [],
    targetFundingStageList: Array.isArray(initialData.targetFundingStage) 
      ? initialData.targetFundingStage 
      : [],
    // Ensure dates are properly formatted
    startDate: initialData.startDatetime ? new Date(initialData.startDatetime) : new Date(),
    endDate: initialData.endDatetime ? new Date(initialData.endDatetime) : new Date(),
    // Map database fields to form fields
    eligibilityCriteria: initialData.eligibility || '',
    noOfRegistrationsAllowed: initialData.noOfRegistrations || '',
  } : undefined;

  return (
    <PostFundingOpportunityForm 
      business={{ id: businessId } as any}
      initialData={formattedInitialData}
    />
  );
};

export default OpportunityForm;
