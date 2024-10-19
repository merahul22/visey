'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';

export const listPreferences = async (values: Array<string>) => {
  const session = await auth();

  const user = session?.user;

  if (!user) {
    return { error: 'Unauthorized' };
  }

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        preferences: values,
      },
    });

    return { success: 'Preferences listed successfully!' };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong' };
  }
};
