import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getAllOpportunities() {
  try {
    // Only return published opportunities (not drafts)
    return await prisma.opportunity.findMany({
      where: {
        isDraft: false // Only fetch opportunities that aren't drafts
      } as Prisma.OpportunityWhereInput,
      include: {
        business: true, // Include business information for display
      },
      orderBy: [
        {
          endDatetime: 'asc' // Sort by deadline (earliest first) - most urgent opportunities first
        },
        {
          id: 'desc' // Fallback to id for same deadline
        }
      ]
    });
  } catch (error) {
    console.log(error);
  }
}

export default getAllOpportunities;
