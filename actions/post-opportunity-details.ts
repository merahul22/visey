'use server';

import * as z from 'zod';
import { fundingOpportunitySchema } from '@/schemas';

export const postOpportunityDetails = async (
  values: z.infer<typeof fundingOpportunitySchema>
) => {
  const validatedFields = fundingOpportunitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  return { success: 'Opportunity posted successfully!' };
};
