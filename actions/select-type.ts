"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export const selectType = async (type: "STARTUP" | "BUSINESS") => {
  const session = await auth();

  const user = session?.user;
  console.log("user from select-type:", user);

  try {
    await prisma.user.update({
      where: { email: user?.email },
      data: { type },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong!" };
  }
};
