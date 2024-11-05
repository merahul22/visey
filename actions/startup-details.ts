'use server';

import { auth } from '@/auth';
import prisma from '@/lib/db';
import * as z from 'zod';

const startupDetailsSchema = z.object({
  name: z.string().min(2, 'Minimum 2 characters'),
  registeredName: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'Minimum 2 characters',
    }),
  websiteUrl: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
      message: 'Enter a valid URL',
    }),
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid mobile number'),
  location: z.string().min(1, 'This field cannot be left empty'),
  industry: z.string().min(1, 'This field cannot be left empty'),
  industryOthers: z.string().optional(),
  sector: z.string().min(1, 'This field cannot be left empty'),
  sectorOthers: z.string().optional(),
  trlLevel: z.string().min(1, 'This field cannot be left empty'),
});

export const startupdetails = async (
  values: z.infer<typeof startupDetailsSchema>
) => {
  const session = await auth();
  const validatedFields = startupDetailsSchema.safeParse(values);

  const userId = session?.user.id as string;

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const {
    name,
    registeredName,
    websiteUrl,
    contactNumber,
    location,
    industry,
    industryOthers,
    sector,
    sectorOthers,
    trlLevel,
  } = validatedFields.data;

  const finalIndustry = industry === 'Others' ? industryOthers : industry;
  const finalSector = sector === 'Others' ? sectorOthers : sector;

  try {
    // Insert the data into the database
    await prisma.startup.create({
      data: {
        name,
        registeredName,
        websiteUrl,
        contactNumber,
        location,
        industry: finalIndustry as string,
        sector: finalSector as string,
        trlLevel,
        userId,
      },
    });

    return { success: 'Startup details added successfully!' };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong' };
  }
};
