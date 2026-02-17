import { z } from 'zod';

function normalizePhone(phone: string) {
  if (phone.trim() === '') return null;
  return phone.replaceAll(' ', '');
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

const baseSignUpSchema = z.object({
  name: z.string().trim().min(3, 'Name must contain at least 3 chars').max(100, 'Name too long'),
  password: z.string().min(8, 'Password must contain at least 8 chars').regex(/[A-Z]/, 'Password must contain one uppercase letter').regex(/[0-9]/, 'Password must contain one capital letter'),
  confirmPassword: z.string(),
  email: z.email().trim().toLowerCase(),
  phone: z.preprocess(normalizePhone, z.string().min(7, 'Phone must contain at least 7 digits').max(20, 'Phone number too long').nullable().optional()),
  contactOption: z.enum(['email', 'phone']),
  terms: z.literal(true, 'Read Terms and Conditions and tick the box'),
});

type SignUpInput = z.infer<typeof baseSignUpSchema>;

export const signUpSchema = baseSignUpSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords don't match",
    path: ['confirmPassword'],
  })
  .superRefine((data: SignUpInput, ctx) => {
    if (data.contactOption === 'phone' && !data.phone) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'Phone number is required when phone contact is selected',
      });
    }
  });
