"use server";

import prisma from "@/lib/db";

export default async function saveOpportunity(
  opportunityId: string,
  userId: string,
) {
  try {
    await prisma.savedOpportunity.create({
      data: {
        opportunityId,
        userId,
      },
    });

    return { success: "Saved Opportunity successfully" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}
