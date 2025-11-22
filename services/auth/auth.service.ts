import { pipe } from 'fp-ts/lib/function'
import {
  ChangePasswordFormInput,
  LoginFormInput,
  SignupFormValues,
  TChangePasswordResponse,
  TUserResponse,
  VerifyAccountInput,
  UpdatePasswordInput
} from './auth.codecs'
import { post, get, put } from '../request'
import { decodeJson } from '../decodeJson'

const auth = '/api/auth'

type SignupInput = { token?: string; body: SignupFormValues }
export const signup = async ({ token, body }: SignupInput) => {
  if (!token) {
    throw new Error('reCAPTCHA was not generated')
  }
  const query = new URLSearchParams({ token })

  return pipe(await post(`${auth}/signup`, { body, query }), decodeJson(TUserResponse))
}

type LoginInput = { token?: string; body: LoginFormInput }
type ResetPasswordInput = {
  email: string
}

export const login = async ({ body, token }: LoginInput) => {
  if (!token) {
    throw new Error('reCAPTCHA was not generated')
  }

  const query = new URLSearchParams({ token })

  return pipe(await post(`${auth}/login`, { body, query }))
}

export const getUserInfo = async () => {
  return pipe(await get(`${auth}/me`, {}), decodeJson(TUserResponse))
}

export const changePassword = async (input: ChangePasswordFormInput) => {
  return pipe(await put(`${auth}/change-password`, { body: input }), decodeJson(TChangePasswordResponse))
}

export const verifyAccount = async (input: VerifyAccountInput) => {
  return pipe(await post(`${auth}/account-verification`, { body: input }))
}

export const getAccountVerificationEmail = async () => {
  return pipe(await get(`${auth}/account-verification`, {}))
}

export const resetPassword = async ({ email }: ResetPasswordInput) => {
  const body = { email }

  return pipe(await post(`${auth}/password-reset`, { body }))
}

export const updatePassword = async ({ token, newPassword, confirmPassword }: UpdatePasswordInput) => {
  return pipe(
    await put(`${auth}/password-reset`, {
      body: { token, newPassword, confirmPassword }
    })
  )
}

export type LoginWithGoogleInput = { credential?: string; clientId?: string; select_by?: string }

export const loginWithGoogle = async (values: LoginWithGoogleInput) => {
  return pipe(await post(`${auth}/google`, { body: values }))
}

export type EditProfileFormValues = { fullName: string; phoneNumber: string; companyName: string }
export const editProfile = async (values: EditProfileFormValues) => {
  return pipe(await post(`${auth}/me`, { body: values }), decodeJson(TUserResponse))
}
