"use server";

import z from "zod";
import { editProfileHeaderBusinessSchema } from "@/schemas";
import prisma from "@/lib/db";
import { auth } from "@/auth";

const editProfileHeaderBusiness = async (
  values: z.infer<typeof editProfileHeaderBusinessSchema>,
) => {
  const session = await auth();
  const user = session?.user;

  const businessId = user?.business?.id;

  if (!businessId) {
    return { error: "No business found!" };
  }

  const validatedFields = editProfileHeaderBusinessSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Input Fields!" };
  }

  const {
    name,
    companyRegisteredName,
    description,
    websiteUrl,
    phoneNumber,
    email,
  } = validatedFields.data;

  try {
    await prisma.business.update({
      where: {
        id: businessId,
      },
      data: {
        name,
        registeredName: companyRegisteredName,
        contactNumber: phoneNumber,
        description,
        websiteUrl,
        email,
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

export default editProfileHeaderBusiness;
