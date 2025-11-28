'use client'
import { Signup } from '@/components/organizms'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function SignupPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''}
    >
      <Signup />
    </GoogleReCaptchaProvider>
  )
}
