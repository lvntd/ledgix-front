import React from 'react'
import { useTranslations } from 'next-intl'
import { useForm, Controller } from 'react-hook-form'
import { ChangePasswordFormInput } from '@/services'
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Button } from '@/components/atoms'
import { InputPassword } from '@/components/molecules'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordFormSchema } from './validations'

type Props = {
  defaultValues: ChangePasswordFormInput
  onSubmit: (values: ChangePasswordFormInput) => void
  isPending: boolean
}

export const ChangePasswordForm = ({
  onSubmit,
  defaultValues,
  isPending,
}: Props) => {
  const t = useTranslations()
  const { handleSubmit, control } = useForm<ChangePasswordFormInput>({
    defaultValues,
    resolver: zodResolver(changePasswordFormSchema(t)),
  })

  return (
    <div className="flex w-full max-w-96 flex-col gap-2">
      <h3 className="text-center font-semibold">{t('change_password')}</h3>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="currentPassword"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="currentPassword">
                {t('current_password')}
              </FieldLabel>
              <div>
                <InputPassword id="currentPassword" {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="newPassword">{t('new_password')}</FieldLabel>
              <div>
                <InputPassword id="newPassword" {...field} />
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
                <InputPassword id="confirmPassword" {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Button disabled={isPending} type="submit">
          {t('change_password')}
        </Button>
      </form>
    </div>
  )
}
