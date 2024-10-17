'use server';

import { signIn } from '@/auth';
import prisma from '@/lib/db';
import { loginSchema } from '@/schemas';
import { compare } from 'bcryptjs';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const signin = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { identifier, password } = validatedFields.data;

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const isPhoneNumber = /^\d{10}$/.test(identifier);

  if (!isEmail && !isPhoneNumber) {
    return { error: 'Invalid email or phone number!' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { phoneNumber: identifier },
    });

    if (!user || !user.password) {
      return { error: 'User not found!' };
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return { error: 'Invalid credientials!' };
    }

    console.log(user);

    await signIn('credentials', {
      identifier,
      password,
      redirectTo: '/home',
    });

    return { success: 'Logged in successfully!' };
  } catch (err) {
    // console.log(err);
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credientials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw err;
  }
};
