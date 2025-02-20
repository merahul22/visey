import prisma from "@/lib/db";

async function getAllOpportunities() {
  try {
    return await prisma.opportunity.findMany();
  } catch (error) {
    console.log(error);
  }
}

export default getAllOpportunities;
