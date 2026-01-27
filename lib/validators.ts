import { z } from 'zod';

const emptyStringToNull = (val: unknown) => {
  if (typeof val !== 'string') return val;
  return val.trim() === '' ? null : val;
};

export const insertProductSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 chars')
    .max(255),

  slug: z
    .string()
    .min(3, 'Slug must be at least 3 chars')
    .max(255),

  category: z
    .string()
    .min(3, 'Category must be at least 3 chars')
    .max(80),

  brand: z
    .string()
    .min(3, 'Brand must be at least 3 chars')
    .max(80),

  description: z
    .string()
    .min(3, 'Description must be at least 3 chars')
    .max(500),

  images: z
    .array(z.string())
    .min(1, 'At least one image is required'),

  price: z
    .number()
    .nonnegative('Price must be >= 0'),

  stock: z
    .number()
    .int('Stock must be an integer')
    .nonnegative('Stock must be >= 0'),

  rating: z
    .number()
    .min(0)
    .max(5)
    .optional()
    .default(0),

  numReviews: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .default(0),

  isFeatured: z
    .boolean()
    .optional()
    .default(false),

  banner: z
    .string()
    .pipe(z.url())
    .nullable()
    .optional()
    .default(null),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must be at least 3 chars')
      .max(100, 'Name is too long'),

    password: z
      .string()
      .min(8, 'Password must have 8 chars')
      .regex(/[A-Z]/, 'Password must have one capital letter at least')
      .regex(/[0-9]/, 'Password must have one digit at least'),

    confirmPassword: z
      .string(),

    email: z
      .email('Invalid email')
      .trim()
      .toLowerCase(),

    phone: z.preprocess(
      emptyStringToNull,
      z
        .string()
        .min(7)
        .max(20)
        .nullable()
        .optional(),
    ),

    terms: z.literal(true, { message: 'Terms and Conditions must be accepted' }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords don\'t match',
    path: ['confirmPassword'],
  });

