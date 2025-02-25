"use server";

import prisma from "@/lib/db";

export default async function saveBusiness(businessId: string, userId: string) {
  try {
    await prisma.savedBusiness.create({
      data: {
        businessId,
        userId,
      },
    });

    return { success: "Saved Business successfully" };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
}
