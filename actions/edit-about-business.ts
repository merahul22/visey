"use server";

import z from "zod";
import { editAboutBusinessSchema } from "@/schemas";
import prisma from "@/lib/db";
import { auth } from "@/auth";

const editAboutBusiness = async (
  values: z.infer<typeof editAboutBusinessSchema>,
) => {
  const session = await auth();
  const user = session?.user;

  const businessId = user?.business?.id;

  if (!businessId) {
    return { error: "No business found!" };
  }

  const validatedFields = editAboutBusinessSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Input Fields!" };
  }

  const { location, description } = validatedFields.data;

  try {
    await prisma.business.update({
      where: {
        id: businessId,
      },
      data: {
        location,
        description,
      },
    });

    return {
      success: "Business Updated Successfully!",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! Try again later." };
  }
};

export default editAboutBusiness;
