import { passwordSchema, TFunction } from '@/lib'
import { z } from 'zod'

export const changePasswordFormSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: passwordSchema(t),
      newPassword: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine(
      (values) => {
        return values.newPassword === values.confirmPassword
      },
      {
        message: t('error_passwords_dont_match'),
        path: ['confirmPassword'],
      },
    )
