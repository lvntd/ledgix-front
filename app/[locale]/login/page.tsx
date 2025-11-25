'use client'
import { Login } from '@/components/organizms/login/login'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function LoginPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''}
    >
      <Login />
    </GoogleReCaptchaProvider>
  )
}
