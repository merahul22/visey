'use server';

import * as z from 'zod';
import { startupDetailsSchema } from '@/schemas';
import { auth } from '@/auth';
import prisma from '@/lib/db';

export const completeStartupDetails = async (
  values: z.infer<typeof startupDetailsSchema>
) => {
  const valuesWithStrings = {
    ...values,
    teamSize: values.teamSize.toString(),
    noOfFte: values.noOfFte.toString(),
    noOfInterns: values.noOfInterns.toString(),
  };

  const validatedFields = startupDetailsSchema.safeParse(valuesWithStrings);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }

  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return { error: 'Unauthorized user!' };
  }

  const userId = user.id;
  const {
    name,
    image,
    description,
    registeredName,
    registrationDate,
    dpiitRecognized,
    websiteUrl,
    contactNumber,
    location,
    industry,
    industryOthers,
    sector,
    sectorOthers,
    trlLevel,
    productStage,
    fundingStage,
    idea,
    problem,
    marketSize,
    twoMajorCompetitors,
    demoVideoUrl,
    pitchDeckUrl,
    foundersDetail,
    teamSize,
    noOfFte,
    noOfInterns,
    email,
  } = validatedFields.data;

  const finalIndustry = industry === 'Others' ? industryOthers : industry;
  const finalSector = sector === 'Others' ? sectorOthers : sector;

  try {
    await prisma.startup.upsert({
      where: { userId },
      update: {
        name,
        image,
        description,
        registeredName,
        registrationDate,
        dpiitRecognized,
        websiteUrl,
        contactNumber,
        location,
        industry: finalIndustry,
        sector: finalSector,
        trlLevel,
        productStage,
        fundingStage,
        idea,
        problem,
        marketSize,
        twoMajorCompetitors,
        demoVideoUrl,
        pitchDeckUrl,
        foundersDetail,
        teamSize,
        noOfFte,
        noOfInterns,
        email,
      },
      create: {
        userId,
        name,
        image,
        description,
        registeredName,
        registrationDate,
        dpiitRecognized,
        websiteUrl,
        contactNumber,
        location,
        industry: finalIndustry as string,
        sector: finalSector as string,
        trlLevel,
        productStage,
        fundingStage,
        idea,
        problem,
        marketSize,
        twoMajorCompetitors,
        demoVideoUrl,
        pitchDeckUrl,
        foundersDetail,
        teamSize,
        noOfFte,
        noOfInterns,
        email,
      },
    });

    return { success: 'Startup details updated successfully!' };
  } catch (err) {
    console.error(err);
    return { error: 'Something went wrong!' };
  }
};
