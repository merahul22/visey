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
});
