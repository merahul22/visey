import prisma from "@/lib/db";

export default async function getSavedFundingOpportunities(userId: string) {
  try {
    const savedOpportunities = await prisma.savedOpportunity.findMany({
      where: {
        userId,
      },
      include: {
        opportunity: true,
      },
    });

    return { success: true, data: savedOpportunities };
  } catch (e) {
    return { error: "Something went wrong" };
  }
}
