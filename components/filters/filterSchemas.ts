import { z } from "zod";

export const homePageFilterSchema = z.object({
  categories: z.array(z.string()),
  ratings: z.string(),
  promotions: z.array(z.string()),
  locations: z.array(z.string()),
});

export const productFilterSchema = z.object({
  brands: z.array(z.string()), 
  availability: z.string(),    
  ratings: z.array(z.string()),
});