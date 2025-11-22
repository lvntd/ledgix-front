import { pipe } from 'fp-ts/lib/function'
import { post } from '../request'

const emailService = 'api/services/email' as const

export type ContactFormInput = {
  name: string
  email: string
  subject: string
  text: string
}

type SubmitContactFormInput = { token?: string; body: ContactFormInput }

export const submitContactForm = async ({ token, body }: SubmitContactFormInput) => {
  if (!token) {
    throw new Error('reCAPTCHA was not generated')
  }

  const query = new URLSearchParams({ token })

  return pipe(await post(`${emailService}/contact`, { query, body }))
}
