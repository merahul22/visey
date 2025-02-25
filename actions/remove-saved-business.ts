"use server";

import prisma from "@/lib/db";

export default async function removeSavedBusiness(
  businessId: string,
  userId: string,
) {
  try {
    await prisma.savedBusiness.delete({
      where: {
        userId_businessId: { userId, businessId },
      },
    });

    return { success: "Removed saved business" };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
}
