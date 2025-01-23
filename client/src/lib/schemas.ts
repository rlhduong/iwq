import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .refine(
      (value) => /[a-zA-Z]/.test(value),
      'Password must contain at least 1 letter'
    )
    .refine(
      (value) => /[0-9]/.test(value),
      'Password must contain at least 1 number'
    ),
  firstName: z.string().min(1, 'First name required'),
  lastName: z.string().min(1, 'Last name required'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
