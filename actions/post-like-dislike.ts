"use server";

import prisma from '@/lib/db';

export async function postLikeDislike(
  action: string | null,
  reviewId: string | undefined,
  increment: boolean
) {
  try {
    if (action === null || !reviewId) {
      return { error: "Not a valid reaction!" };
    }

    const fieldToUpdate = action === 'like' ? 'likes' : 'dislikes';

    // Dynamically decide between increment or decrement
    const operation = increment ? { increment: 1 } : { decrement: 1 };

    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        [fieldToUpdate]: operation,
      },
    });

    return { success: "Reaction updated!", increment: increment };
  } catch (error) {
    console.error(error);
    return { error: 'Cannot like/dislike the review' };
  }
}
