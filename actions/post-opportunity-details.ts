'use server';

import * as z from 'zod';
import { fundingOpportunitySchema } from '@/schemas';
import prisma from '@/lib/db';

export const postOpportunityDetails = async (
  values: z.infer<typeof fundingOpportunitySchema>
) => {
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
    targetProductStage,
    targetFundingStage,
    description,
    eligibilityCriteria,
    registration,
    registrationFormLink,
    startDate,
    endDate,
    noOfRegistrationsAllowed,
  } = validatedFields.data;

  try {
  } catch (err) {
    console.log(err);
    return { error: 'Failed to post opportunity!' };
  }

  return { success: 'Opportunity posted successfully!' };
};
