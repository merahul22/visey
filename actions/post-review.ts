"use server";

import prisma from '@/lib/db';

export async function postReview(userId: string | undefined, businessId: string | undefined, review: string, rating: number) {
  if (!userId || !businessId || !review) {
    return;
  }

  try {
    const newReview = await prisma.review.create({
      data: {
        userId,
        businessId,
        comment: review,
        rating,
      }
    })

    const finalReview = await prisma.review.findFirst({
      where: {
        id: newReview.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return {success: "Review posted successfully.", review: finalReview};
  }catch(err) {
    console.error(err);
    return { error: "Cannot post review! Please try again later." };
  }
}