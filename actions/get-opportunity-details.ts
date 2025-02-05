import prisma from '@/lib/db';

export const getOpportunityDetails = async (id: string) => {
  try {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
      select: {
        imageUrl: true,
        type: true,
        subtype: true,
        title: true,
        websiteUrl: true,
        fundingAmount: true,
        targetIndustry: true,
        targetSector: true,
        targetWomenFounder: true,
        targetProductStage: true,
        targetFundingStage: true,
        description: true,
        eligibility: true,
        startDatetime: true,
        endDatetime: true,
        noOfRegistrations: true,
        registration: true,
        registrationFormLink: true,
      },
    });
    return opportunity;
  } catch (error) {
    console.error('Error fetching opportunity details:', error);
    return null;
  }
};
