import prisma from "@/lib/db";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";

export const getOpportunityDetails = async (id: string) => {
  try {
    const session = await auth();
    const user = session?.user;
    const businessId = user?.business?.id;

    // Get the opportunity with all its details
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
        isDraft: true,
        businessId: true,
      } as Prisma.OpportunitySelect,
    });

    // If opportunity is a draft and not owned by the current user's business, don't return it
    if (opportunity && 'isDraft' in opportunity && opportunity.isDraft && opportunity.businessId !== businessId) {
      return null;
    }

    return opportunity;
  } catch (error) {
    console.error("Error fetching opportunity details:", error);
    return null;
  }
};
