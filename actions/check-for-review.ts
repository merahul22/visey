"use server";

import prisma from '@/lib/db';

export async function checkForReview(userId: string | undefined, businessId: string | undefined) {
  try {
    const review = await prisma.review.findFirst({
      where: {
        userId,
        businessId
      }
    })

    if (!review) {
      return { success: "Operation completed!", result: false };
    }

    return { success: "Operation completed!", result: true };

  }catch (e) {
    console.log(e);
    return { error: "Something went wrong" };
  }
}