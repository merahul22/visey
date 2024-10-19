import * as z from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .refine((value) => /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value), {
      message: 'Must be a valid email or phone number (10 digits)',
    }),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  type: z.enum(['STARTUP', 'BUSINESS']),
  name: z.string().min(1, 'Name is required'),
  identifier: z
    .string()
    .refine((value) => /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value), {
      message: 'Must be a valid email or phone number (10 digits)',
    }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
  verificationCode: z.optional(z.string()),
});

export const listBusinessFirstStepSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
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
});

export const listBusinessSecondStepSchema = z.object({
  category: z.string().min(1, { message: 'This field cannot be left empty' }),
  tags: z.optional(z.string()),
  tagsList: z.optional(z.array(z.string())),
  stdCode: z.string(),
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid mobile number'),
  location: z.string().min(1, { message: 'This field cannot be left empty' }),
});

export const listBusinessSchema = listBusinessFirstStepSchema.merge(
  listBusinessSecondStepSchema
);
