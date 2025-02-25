"use server";

import prisma from "@/lib/db";

export default async function isSavedBusiness(
  userId: string,
  businessId: string,
) {
  try {
    const savedBusiness = await prisma.savedBusiness.findFirst({
      where: {
        userId,
        businessId,
      },
    });

    if (!savedBusiness) {
      return {
        success: false,
        msg: "No saved business found. Please try again.",
      };
    }

    return { success: true, msg: "Saved business exists." };
  } catch (err) {
    console.error("Error checking saved business:", err);
    return { error: "Something went wrong" };
  }
}
