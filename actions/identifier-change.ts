'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import { identifierChangeSchema } from '@/schemas';
import * as z from 'zod';

export const identifierChange = async (
  values: z.infer<typeof identifierChangeSchema>
) => {
  const validatedFields = identifierChangeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }

  const { identifier } = validatedFields.data;

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const isPhoneNumber = /^\d{10}$/.test(identifier);

  if (!isEmail && !isPhoneNumber) {
    return { error: 'Invalid email or phone number!' };
  }

  const session = await auth();
  const user = session?.user;

  try {
    const existingUser = await prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { phoneNumber: identifier },
    });

    if (existingUser) {
      return { error: 'User already exists with this Email/ Phone Number' };
    }

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        email: isEmail ? identifier : undefined,
        phoneNumber: isPhoneNumber ? identifier : undefined,
      },
    });

    return { success: 'Email/ Phone number updated successfully' };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};
