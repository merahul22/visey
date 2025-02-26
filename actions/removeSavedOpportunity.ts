"use server";

import prisma from "@/lib/db";

export default async function removeSavedOpportunity(
  opportunityId: string,
  userId: string,
) {
  try {
    await prisma.savedOpportunity.delete({
      where: {
        userId_opportunityId: { userId, opportunityId },
      },
    });

    return { success: "Removed saved opportunity" };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
}
