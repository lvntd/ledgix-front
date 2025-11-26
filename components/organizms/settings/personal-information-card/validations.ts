import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editProfileFormSchema = (t: any) =>
  z.object({
    fullName: z
      .string()
      .min(5, { message: t('validation_min_symbols', { min: 5 }) }),
    phoneNumber: z
      .string()
      .min(9, { message: t('validation_min_symbols', { min: 9 }) }),
    companyName: z
      .string()
      .max(100, { message: t('validation_max_symbols', { max: 100 }) }),
  })
