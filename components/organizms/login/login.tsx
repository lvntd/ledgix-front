'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useMemo } from 'react'
import { login, LoginFormInput } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { getRandomWallpaper } from '@/lib/get-random-wallpaper'
import { GalleryVerticalEnd } from 'lucide-react'
import { LoginForm } from './login-form'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export const Login = () => {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const wallpaper = useMemo(() => getRandomWallpaper(), [])

  // TODO. Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return
    }

    const token = await executeRecaptcha('login')

    return token

    // Do whatever you want with the token
  }, [executeRecaptcha])

  const $login = useMutation({
    mutationFn: login,
  })

  const handleSubmit = async (input: LoginFormInput) => {
    const token = await handleReCaptchaVerify()

    $login.mutate(
      { token, body: input },
      {
        onSuccess: () => {
          if (searchParams.get('returnUrl')) {
            router.push(searchParams.get('returnUrl') as string)
          } else {
            router.push('/app')
          }
        },
        onError: (error) => {
          toast.error(t(error.message))
        },
      },
    )
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Prive AI
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              defaultValues={{ email: '', password: '' }}
              isPending={$login.isPending}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={wallpaper.path}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
        />
        <a
          className="absolute bottom-1 right-1 text-sm text-white/60"
          target="_blank"
          href={wallpaper.url}
        >{`Author: ${wallpaper.author}`}</a>
      </div>
    </div>
  )
}
