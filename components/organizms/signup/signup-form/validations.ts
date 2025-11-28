import { emailSchema, passwordSchema, TFunction } from '@/lib'

import { z } from 'zod'

export const signupFormSchema = (t: TFunction) =>
  z
    .object({
      fullName: z
        .string()
        .min(5, { message: t('validation_min_symbols', { min: 5 }) }),
      companyName: z
        .string()
        .max(100, { message: t('validation_max_symbols', { max: 100 }) }),
      email: emailSchema(t),
      phoneNumber: z
        .string()
        .max(50, { message: t('validation_max_symbols', { max: 50 }) }),
      password: passwordSchema(t),
      confirmPassword: passwordSchema(t),
      agreeTerms: z.boolean().refine((value) => value),
      consent: z.boolean(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword
      },
      {
        message: t('error_passwords_dont_match'),
        path: ['confirmPassword'],
      },
    )
