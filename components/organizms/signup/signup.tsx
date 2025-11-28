'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useMemo } from 'react'
import { GalleryVerticalEnd } from 'lucide-react'
import { SignupForm } from './signup-form'
import { getRandomWallpaper } from '@/lib/get-random-wallpaper'
import { signup, SignupFormValues } from '@/services'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export const Signup = () => {
  const t = useTranslations()
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return
    }

    const token = await executeRecaptcha('signup')

    return token

    // Do whatever you want with the token
  }, [executeRecaptcha])

  const $signup = useMutation({ mutationFn: signup })

  const signupDefaultValues = {
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    consent: false,
  }

  const handleSignup = async (input: SignupFormValues) => {
    const token = await handleReCaptchaVerify()

    $signup.mutate(
      { token, body: input },
      {
        onSuccess: () => {
          toast.success(t('alert_signed_up_successfully'))
          router.push({
            pathname: '/app',
          })
        },
        onError: (error: unknown) => {
          console.error(error)
          toast.error(t('error_something_went_wrong'))
        },
      },
    )
  }

  const wallpaper = useMemo(() => getRandomWallpaper(1), [])

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Prive AI
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm
              defaultValues={signupDefaultValues}
              isPending={$signup.isPending}
              onSubmit={handleSignup}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={wallpaper.path}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover  dark:brightness-[0.8] dark:grayscale"
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
