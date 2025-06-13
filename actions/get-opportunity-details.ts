import { Opportunity } from "@prisma/client";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export const getOpportunityDetails = async (id: string) => {
  try {
    const session = await auth();
    const user = session?.user;
    const businessId = user?.business?.id;

    // Get the opportunity with all its details
    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
      include: {
        business: {
          select: {
            name: true,
            image: true,
            location: true,
          },
        },
      },
    });

    // If opportunity is a draft and not owned by the current user's business, don't return it
    if (opportunity && "isDraft" in opportunity && opportunity.isDraft && opportunity.businessId !== businessId) {
      return null;
    }

    return opportunity;
  } catch (error) {
    console.error("Error fetching opportunity details:", error);
    return null;
  }
};
