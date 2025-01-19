"use server";

import prisma from "@/lib/db";

export async function deleteBusinessReview(reviewId: string | null) {
  if (!reviewId) {
    return { error: "You can only delete your review." };
  }

  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return { success: "Review deleted Successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Cannot delete business review" };
  }
}
