import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .refine(
      (value) => /[A-Z]/.test(value),
      'Password must contain at least 1 capital letter'
    )
    .refine(
      (value) => /[a-z]/.test(value),
      'Password must contain at least 1 lowercase letter'
    )
    .refine(
      (value) => /[0-9]/.test(value),
      'Password must contain at least 1 number'
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
