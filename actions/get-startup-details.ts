"use server";

import prisma from "@/lib/db";

const getStartupDetails = async (userId: string) => {
  try {
    const startupDetails = await prisma.startup.findFirst({
      where: {
        userId,
      },
    });

    return {
      success: "Startup Details fetched successfully",
      data: startupDetails,
    };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export default getStartupDetails;
