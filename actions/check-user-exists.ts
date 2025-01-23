"use server";

import prisma from "@/lib/db";
import { forgotPasswordSchemaFirstStep } from "@/schemas";
import z from "zod";

const isUserExists = async (
  values: z.infer<typeof forgotPasswordSchemaFirstStep>,
) => {
  const validatedFields = forgotPasswordSchemaFirstStep.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { identifier } = validatedFields.data;

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const isPhoneNumber = /^\d{10}$/.test(identifier);

  if (!isEmail && !isPhoneNumber) {
    return { error: "Invalid email or phone number!" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { phoneNumber: identifier },
    });

    if (!user) {
      return { error: "User not found!" };
    }

    return { success: "User Found!", userId: user.id };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

export default isUserExists;
