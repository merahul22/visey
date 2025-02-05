"use server";

import z from "zod";
import { addAchievementsSchema } from "@/schemas";
import prisma from "@/lib/db";
import { auth } from "@/auth";

const addAchievement = async (
  values: z.infer<typeof addAchievementsSchema>,
) => {
  const session = await auth();
  const user = session?.user;

  const businessId = user?.business?.id;

  if (!businessId) {
    return { error: "No business found!" };
  }

  const validatedFields = addAchievementsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Input Fields!" };
  }

  const { name, organization, year } = validatedFields.data;

  try {
    await prisma.achievement.create({
      data: {
        name,
        organization,
        year,
        businessId,
      },
    });

    return {
      success: "Achievement successfully added!",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! Try again later." };
  }
};

export default addAchievement;
