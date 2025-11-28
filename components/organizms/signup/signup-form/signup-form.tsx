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
import { Link } from '@/i18n/navigation'
import { SignupFormValues } from '@/services'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { signupFormSchema } from './validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { InputPassword, SocialAuth } from '@/components/molecules'
import { Checkbox } from '@/components/atoms/checkbox'

type Props = {
  defaultValues: SignupFormValues
  onSubmit: (values: SignupFormValues) => void
  isPending: boolean
}

export function SignupForm({ defaultValues, isPending, onSubmit }: Props) {
  const t = useTranslations()
  const { handleSubmit, control } = useForm<SignupFormValues>({
    defaultValues,
    resolver: zodResolver(signupFormSchema(t)),
  })

  const agreeTerms = useWatch({ control, name: 'agreeTerms' })

  return (
    <form
      className={cn('flex flex-col gap-6')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{t('create_your_account')}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t('fill_simple_form')}
          </p>
        </div>
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="fullName">{t('full_name')}</FieldLabel>
              <div>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...field}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
              <div>
                <Input id="email" placeholder="m@example.com" {...field} />
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
              <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
              <div>
                <InputPassword
                  {...field}
                  id="password"
                  placeholder="Xjg8cH69"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                {t('confirm_password')}
              </FieldLabel>
              <div>
                <InputPassword
                  {...field}
                  id="confirmPassword"
                  placeholder="Xjg8cH69"
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />

        <div>
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <Field orientation={'horizontal'}>
                <Checkbox
                  id="consent"
                  checked={field.value}
                  onCheckedChange={(value) => {
                    if (value !== 'indeterminate') {
                      field.onChange(value)
                    }
                  }}
                />
                <FieldLabel htmlFor="consent" className="text-xs">
                  {t('agree_to_receive_marketing_notifications')}
                </FieldLabel>
              </Field>
            )}
          />

          <Controller
            control={control}
            name="agreeTerms"
            render={({ field }) => (
              <Field orientation={'horizontal'}>
                <Checkbox
                  id="agreeTerms"
                  checked={field.value}
                  onCheckedChange={(value) => {
                    if (value !== 'indeterminate') {
                      field.onChange(value)
                    }
                  }}
                />
                <FieldLabel htmlFor="agreeTerms" className="text-xs">
                  <p>
                    {t.rich('agree_terms_of_use', {
                      terms: (chunks) => (
                        <Link target="_blank" href="/terms-of-use">
                          {chunks}
                        </Link>
                      ),
                      refund: (chunks) => (
                        <Link target="_blank" href="/refund-policy">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </FieldLabel>
              </Field>
            )}
          />
        </div>
        <Field>
          <Button type="submit" disabled={isPending || !agreeTerms}>
            {t('signup')}
          </Button>
        </Field>
        <FieldSeparator>{t('or_continue_with')}</FieldSeparator>
        <Field>
          <SocialAuth />
          <FieldDescription className="px-6 text-center">
            {t('already_have_an_account')}{' '}
            <Link href="/login" className="underline underline-offset-4">
              {t('click_here')}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
