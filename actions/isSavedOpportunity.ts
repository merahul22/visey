"use server";

import prisma from "@/lib/db";

export default async function isSavedOpportunity(
  userId: string,
  opportunityId: string,
) {
  try {
    const savedOpportunity = await prisma.savedOpportunity.findFirst({
      where: {
        userId,
        opportunityId,
      },
    });

    console.log("savedOpportunity", savedOpportunity);

    if (!savedOpportunity) {
      return {
        success: false,
        msg: "No saved opportunity found. Please try again.",
      };
    }

    return { success: true, msg: "Saved opportunity exists." };
  } catch (err) {
    console.error("Error checking saved opportunity:", err);
    return { error: "Something went wrong" };
  }
}
