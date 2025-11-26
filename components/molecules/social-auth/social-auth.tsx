'use client'

import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '@/services'
import { Button } from '@/components/atoms'
import { GoogleIcon } from '@/assets'
import { toast } from 'sonner'

export const SocialAuth = () => {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()

  const $loginWithGoogle = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      if (searchParams.get('returnUrl')) {
        router.push(searchParams.get('returnUrl') as string)
      } else {
        router.push('/app')
      }
    },
    onError: () => {
      toast.error(t('error_something_went_wrong'))
    },
  })

  const login = useGoogleLogin({
    onSuccess: (credentials) => toast(JSON.stringify(credentials)),
  })

  return (
    <>
      <Button variant="outline" type="button" onClick={() => login()}>
        <GoogleIcon />
        Login with Google
      </Button>
      <GoogleLogin
        locale={'ka'} // TODO. handle locale
        onSuccess={(credentials) => $loginWithGoogle.mutate(credentials)}
        size="medium"
        theme="filled_blue"
        useOneTap
      />
    </>
  )
}
