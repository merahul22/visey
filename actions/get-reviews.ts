"use server";

import prisma from '@/lib/db';

export async function getReviews(id: string, page: number, limit: number = 3) {
  const skip = (page - 1) * limit;

  try {
    const ratings = await prisma.review.findMany({
      where: {
        businessId: id,
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
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
    });

    const totalRatings = await prisma.review.count({
      where: {
        businessId: id,
      },
    });

    return {
      success: "Ratings fetched successfully",
      data: {
        ratings,
        totalRatings,
        currentPage: page,
        totalPages: Math.ceil(totalRatings / limit),
      }
    }
  }
  catch (error) {
    console.error(error);
    return { error: "Could not get reviews! Please try again later" };
  }
}