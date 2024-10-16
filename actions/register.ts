'use server';

import prisma from '@/lib/db';
import { signUpSchema } from '@/schemas';
import * as z from 'zod';
import { hash } from 'bcryptjs';

export const register = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { identifier, password, type } = validatedFields.data;

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const isPhoneNumber = /^\d{10}$/.test(identifier);

  if (!isEmail && !isPhoneNumber) {
    return { error: 'Invalid email or phone number!' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { phoneNumber: identifier },
    });

    if (existingUser) {
      return { error: 'User already exists!' };
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email: isEmail ? identifier : undefined,
        phoneNumber: isPhoneNumber ? identifier : undefined,
        password: hashedPassword,
        type,
      },
    });

    return { success: 'User created successfully!' };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong' };
  }
};
