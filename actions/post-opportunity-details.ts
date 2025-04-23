'use server';

import * as z from 'zod';
import { fundingOpportunitySchema } from '@/schemas';
import prisma from '@/lib/db';
import { auth } from '@/auth';
import { Prisma } from "@prisma/client";

export const postOpportunityDetails = async (
  values: z.infer<typeof fundingOpportunitySchema> & { isDraft?: boolean }
) => {
  const session = await auth();
  const user = session?.user;

  const business = user?.business;

  if (!business) {
    return { error: 'Business not found!' };
  }

  const validatedFields = fundingOpportunitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const {
    imageUrl,
    type,
    subtype,
    title,
    websiteUrl,
    fundingAmount,
    targetIndustry,
    targetSector,
    targetWomenFounder,
    description,
    eligibilityCriteria,
    registration,
    registrationFormLink,
    startDate,
    endDate,
    noOfRegistrationsAllowed,
    targetProductStageList,
    targetFundingStageList,
  } = validatedFields.data;
  
  // Check if this is a draft
  const isDraft = values.isDraft || false;

  try {
    await prisma.opportunity.create({
      data: {
        imageUrl,
        type,
        subtype,
        title,
        websiteUrl,
        fundingAmount,
        targetIndustry,
        targetSector,
        targetWomenFounder,
        targetProductStage: targetProductStageList,
        targetFundingStage: targetFundingStageList,
        description,
        eligibility: eligibilityCriteria,
        registration,
        registrationFormLink,
        startDatetime: startDate,
        endDatetime: endDate,
        noOfRegistrations: noOfRegistrationsAllowed,
        businessId: business?.id,
        isDraft: isDraft, // Add the isDraft field
      } as Prisma.OpportunityCreateInput,
    });

    return { 
      success: isDraft 
        ? 'Opportunity saved as draft successfully!' 
        : 'Opportunity posted successfully!' 
    };
  } catch (err) {
    console.log(err);
    return { error: 'Failed to post opportunity!' };
  }
};
