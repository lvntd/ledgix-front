import { z } from 'zod'

export type LoginFormInput = { email: string; password: string }
export type VerifyAccountInput = { token: string }

const TUser = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().nullable(),
  remainingTokens: z.number(),
  tokensExpireOn: z.string(),
  isVerified: z.boolean(),
  consent: z.boolean(),
  companyName: z.string().nullable().optional(),
  role: z.string(),
})

export type IUser = z.infer<typeof TUser>

export const TUserResponse = z.object({
  data: TUser,
})

export type IUserResponse = z.infer<typeof TUserResponse>

export type SignupFormValues = {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
  consent: boolean
  companyName: string
}

export type ChangePasswordFormInput = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type ResetPasswordInput = {
  email: string
}
export type UpdatePasswordInput = {
  token: string
  newPassword: string
  confirmPassword: string
}

export const TChangePasswordResponse = z.object({
  data: z.object({
    message: z.string(),
  }),
})
