import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getAllOpportunities() {
  try {
    // Only return published opportunities (not drafts)
    return await prisma.opportunity.findMany({
      where: {
        isDraft: false // Only fetch opportunities that aren't drafts
      } as Prisma.OpportunityWhereInput,
      orderBy: {
        id: 'desc' // Most recent first (UUIDs are time-ordered)
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export default getAllOpportunities;
