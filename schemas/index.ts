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
  category: z.string().min(1, 'This field cannot be left empty'),
  tags: z.optional(z.string()),
  tagsList: z.optional(z.array(z.string())),
  stdCode: z.string(),
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid mobile number'),
  location: z.string().min(1, 'This field cannot be left empty'),
});

export const listBusinessSchema = listBusinessFirstStepSchema.merge(
  listBusinessSecondStepSchema
);

// First step schema
export const basicStartupFirstStepSchema = z.object({
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
});

// Second step schema
export const basicStartupSecondStepSchema = z
  .object({
    industry: z.string().min(1, 'This field cannot be left empty'),
    industryOthers: z.string().optional(),
    sector: z.string().min(1, 'This field cannot be left empty'),
    sectorOthers: z.string().optional(),
    trlLevel: z.string().min(1, 'This field cannot be left empty'),
  })
  .refine(
    (data) => {
      // Make industryOthers required if industry is 'others'
      if (data.industry === 'Others') {
        return data.industryOthers && data.industryOthers.trim().length > 0;
      }
      return true;
    },
    {
      message: 'This cannot be left empty when "Others" is selected',
      path: ['industryOthers'], // Error path for industryOthers
    }
  )
  .refine(
    (data) => {
      // Make sectorOthers required if sector is 'others'
      if (data.sector === 'Others') {
        return data.sectorOthers && data.sectorOthers.trim().length > 0;
      }
      return true;
    },
    {
      message: 'This cannot be left empty when "Others" is selected',
      path: ['sectorOthers'], // Error path for sectorOthers
    }
  );

export const basicStartupDetailsSchema = z.object({
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

export const startupDetailsSchema = z.object({
  name: z.string().min(2, 'Minimum 2 characters'),
  image: z.string().optional(),
  description: z
    .string()
    .min(1, 'This field cannot be left empty')
    .max(50, 'Maximum 50 characters'),
  registeredName: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'Minimum 2 characters',
    }),
  registrationDate: z.date().optional(),
  dpiitRecognized: z.boolean(),
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
  productStage: z.string().min(1, 'This field cannot be left empty'),
  fundingStage: z.string().min(1, 'This field cannot be left empty'),
  idea: z
    .string()
    .min(1, 'This field cannot be left empty')
    .max(150, 'Maximum 150 characters'),
  problem: z
    .string()
    .min(1, 'This field cannot be left empty')
    .max(300, 'Maximum 300 characters'),
  marketSize: z.string().min(1, 'This field cannot be left empty'),
  twoMajorCompetitors: z.string().min(1, 'This field cannot be left empty'),
  demoVideoUrl: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
      message: 'Enter a valid URL',
    }),
  pitchDeckUrl: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
      message: 'Enter a valid URL',
    }),
  foundersDetail: z.string().min(1, 'This field cannot be left empty'),
  teamSize: z.string().min(1, 'This field cannot be left empty'),
  noOfFte: z.string().min(1, 'This field cannot be left empty'),
  noOfInterns: z.string().min(1, 'This field cannot be left empty'),
  email: z.string().email('Enter a valid email'),
});

export const fundingOpportunitySchema = z.object({
  imageUrl: z.string().optional(),
  type: z.string().min(1, 'This field cannot be left empty'),
  subtype: z.string().min(1, 'This field cannot be left empty'),
  title: z
    .string()
    .min(2, 'Minimum 2 characters')
    .max(190, 'Maximum 190 characters'),
  websiteUrl: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
      message: 'Enter a valid URL',
    }),
  fundingAmount: z.number(),
  targetIndustry: z.string().min(1, 'This field cannot be left empty'),
  targetSector: z.string().min(1, 'This field cannot be left empty'),
  targetWomenFounder: z.boolean(),
  targetProductStage: z.optional(z.string()),
  targetFundingStage: z.optional(z.string()),
  description: z.string().min(2, 'Minimum 2 characters'),
  eligibilityCriteria: z.string().min(2, 'Minimum 2 characters'),
  registrationOnVisey: z.boolean(),
  startDate: z.optional(z.date()),
  endDate: z.optional(z.date()),
  noOfRegistrationsAllowed: z.optional(z.number()),
  registrationFormLink: z.optional(z.string()),
});

export const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 1, {
        message: 'This field cannot be left empty',
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Points to confirmPassword field for error message
  });

export const identifierChangeSchema = z.object({
  identifier: z
    .string()
    .refine((value) => /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value), {
      message: 'Must be a valid email or phone number (10 digits)',
    }),
});
