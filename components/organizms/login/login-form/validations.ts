import { z } from 'zod'
import { emailSchema, TFunction } from '@/lib'

export const loginFormSchema = (t: TFunction) =>
  z.object({
    email: emailSchema(t),
    password: z
      .string()
      .min(8, { message: t('validation_min_symbols', { min: 8 }) })
      .max(50, { message: t('validation_max_symbols', { max: 50 }) }),
  })
