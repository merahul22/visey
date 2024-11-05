'use server';

import * as z from 'zod';
import { resetPasswordSchema } from '@/schemas';
import { auth } from '@/auth';
import { compare, hash } from 'bcryptjs';
import prisma from '@/lib/db';

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: 'Not authenticated' };
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      return { error: 'User does not exist' };
    }

    const { currentPassword, password } = validatedFields.data;

    if (!currentPassword && !dbUser.password) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: await hash(password, 10),
        },
      });

      return { success: 'Password updated successfully' };
    }

    if (!dbUser.password) {
      return { error: 'User does not have a password' };
    }

    if (!currentPassword) {
      return { error: 'Current password is required' };
    }

    if (currentPassword === password) {
      return {
        error: 'New password cannot be the same as the current password',
      };
    }

    const passwordMatch = await compare(currentPassword, dbUser?.password);

    if (!passwordMatch) {
      return { error: 'Invalid credientials' };
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: 'Password updated successfully' };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong' };
  }
};
