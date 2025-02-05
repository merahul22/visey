"use server";

import z from "zod";
import { addServiceSchema } from "@/schemas";
import prisma from "@/lib/db";
import { auth } from "@/auth";

const addService = async (values: z.infer<typeof addServiceSchema>) => {
  const session = await auth();
  const user = session?.user;

  const businessId = user?.business?.id;

  if (!businessId) {
    return { error: "No business found!" };
  }

  const validatedFields = addServiceSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Input Fields!" };
  }

  const { name, price, description } = validatedFields.data;

  try {
    await prisma.services.create({
      data: {
        name,
        price,
        description,
        businessId,
      },
    });

    return {
      success: "Service successfully added!",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! Try again later." };
  }
};

export default addService;
