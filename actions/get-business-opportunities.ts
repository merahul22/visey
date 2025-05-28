import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getBusinessOpportunities(businessId: string) {
  try {
    return await prisma.opportunity.findMany({
      where: {
        businessId: businessId,
        isDraft: false // Only return published opportunities
      },
      include: {
        business: {
          select: {
            name: true,
            image: true,
            location: true
          }
        }
      },
      orderBy: [
        {
          endDatetime: 'desc' // Sort by end date
        }
      ]
    });
  } catch (error) {
    console.error("Error fetching business opportunities:", error);
    return [];
  }
}

export default getBusinessOpportunities;
