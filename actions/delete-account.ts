'use server';

import prisma from '@/lib/db';

export const deleteAccount = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return { success: 'Account deleted successfully' };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while deleting the account' };
  }
};
