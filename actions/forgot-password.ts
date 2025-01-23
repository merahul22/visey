"use server";

import { z } from "zod";
import { hash } from "bcryptjs";
import { forgotPasswordSchema } from "@/schemas";
import isUserExists from "@/actions/check-user-exists";
import prisma from "@/lib/db";

const forgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
  const validatedFields = forgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { newPassword, confirmNewPassword } = validatedFields.data;

  if (newPassword !== confirmNewPassword) {
    return { error: "Passwords do not match!" };
  }

  const hashedPassword = await hash(newPassword, 10);

  const res = await isUserExists(values);

  if (res?.error) {
    return { error: res.error };
  }

  if (res?.success) {
    await prisma.user.update({
      where: {
        id: res.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: "User Password updated!" };
  }

  try {
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

export default forgotPassword;
