import React from 'react'
import { editProfileFormSchema } from './validations'
import { useTranslations } from 'next-intl'
import { EditProfileFormValues } from '@/services'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms'

type Props = {
  defaultValues: EditProfileFormValues
  onSubmit: (values: EditProfileFormValues) => void
  isPending: boolean
  email: string
}

export const EditProfileForm = ({
  defaultValues,
  onSubmit,
  isPending,
  email,
}: Props) => {
  const t = useTranslations()
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: zodResolver(editProfileFormSchema(t)),
  })

  return (
    <div className="flex w-full max-w-96 flex-col gap-2">
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <FieldLabel>{t('email')}</FieldLabel>
          <Input disabled value={email} />
        </Field>
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="fullName">{t('full_name')}</FieldLabel>
              <div>
                <Input id="fullName" {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="phoneNumber">{t('phone_number')}</FieldLabel>
              <div>
                <Input id="phoneNumber" {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="companyName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="companyName">{t('company_name')}</FieldLabel>
              <div>
                <Input id="companyName" {...field} />
                <FieldError>{fieldState.error?.message}</FieldError>
              </div>
            </Field>
          )}
        />
        <Button disabled={isPending} type="submit">
          {t('save')}
        </Button>
      </form>
    </div>
  )
}
