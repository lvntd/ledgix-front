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
}

export const EditProfileForm = ({
  defaultValues,
  onSubmit,
  isPending,
}: Props) => {
  const t = useTranslations()
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: zodResolver(editProfileFormSchema(t)),
  })

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="fullName"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="fullName">{t('full_name')}</FieldLabel>
            <Input id="fullName" {...field} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="phoneNumber">{t('phone_number')}</FieldLabel>
            <Input id="phoneNumber" {...field} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="companyName"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="companyName">{t('company_name')}</FieldLabel>
            <Input id="companyName" {...field} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Button disabled={isPending} type="submit" className="w-fit">
        {t('save')}
      </Button>
    </form>
  )
}
