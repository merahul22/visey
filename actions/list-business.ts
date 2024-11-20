'use server';

import * as z from 'zod';
import { listBusinessSchema } from '@/schemas';

import prisma from '@/lib/db';
import { auth } from '@/auth';

export const listBusiness = async (
  values: z.infer<typeof listBusinessSchema>
) => {
  const validatedFields = listBusinessSchema.safeParse(values);

  const session = await auth();

  const userId = session?.user.id as string;

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const {
    businessName,
    registeredName,
    websiteUrl,
    category,
    tagsList,
    description,
    contactNumber,
    location,
  } = validatedFields.data;

  try {
    await prisma.business.create({
      data: {
        name: businessName,
        registeredName,
        websiteUrl,
        category,
        categoryTags: tagsList,
        contactNumber,
        description,
        location,
        userId,
      },
    });

    return { success: 'Business listed successfully!' };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong' };
  }
};
