import prisma from "@/lib/db";

export async function deleteOpportunity(opportunityId: string) {
  try {
    await prisma.opportunity.delete({
      where: {
        id: opportunityId
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    return { success: false, error: "Failed to delete opportunity" };
  }
}
