'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { LoginFormInput } from '@/services'
import { Controller, useForm } from 'react-hook-form'
import { Link } from '@/i18n/navigation'
import { InputPassword, SocialAuth } from '@/components/molecules'
import { useTranslations } from 'next-intl'
import { loginFormSchema } from './validations'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  defaultValues: LoginFormInput
  onSubmit: (values: LoginFormInput) => void
  isPending: boolean
}

export function LoginForm({ defaultValues, onSubmit, isPending }: Props) {
  const t = useTranslations()
  const { handleSubmit, control } = useForm<LoginFormInput>({
    defaultValues,
    resolver: zodResolver(loginFormSchema(t)),
    mode: 'onSubmit',
  })

  return (
    <form
      className={cn('flex flex-col gap-6')}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
              <div>
                <Input {...field} id="email" placeholder="m@example.com" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  {t('forgot_password')}
                </a>
              </div>
              <div>
                <InputPassword {...field} id="password" />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={isPending}>
            {t('login')}
          </Button>
        </Field>
        <FieldSeparator>{t('or_continue_with')}</FieldSeparator>
        <Field>
          <SocialAuth />
          <FieldDescription className="text-center">
            {t('dont_have_account')}{' '}
            <Link href="/signup" className="underline underline-offset-4">
              {t('get_registered')}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
