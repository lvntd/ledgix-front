'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { LoginFormInput } from '@/services'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import { SocialAuth } from '@/components/molecules'

type Props = {
  defaultValues: LoginFormInput
  onSubmit: (values: LoginFormInput) => void
  isPending: boolean
}

export function LoginForm({ defaultValues, onSubmit, isPending }: Props) {
  const { handleSubmit, control } = useForm<LoginFormInput>({
    defaultValues,
  })

  return (
    <form
      className={cn('flex flex-col gap-6')}
      onSubmit={handleSubmit(onSubmit)}
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
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                placeholder="m@example.com"
                required
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input {...field} id="password" type="password" required />
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={isPending}>
            Login
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <SocialAuth />
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
