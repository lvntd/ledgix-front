import { useTranslations } from 'next-intl'
import { z } from 'zod'

export type TFunction = ReturnType<typeof useTranslations>

export const passwordSchema = (t: TFunction) =>
  z
    .string()
    .min(8, { message: t('validation_min_symbols', { min: 8 }) })
    .max(50, { message: t('validation_max_symbols', { max: 50 }) })

export const emailSchema = (t: TFunction) =>
  z.string().email({ message: t('validation_wrong_email') })
