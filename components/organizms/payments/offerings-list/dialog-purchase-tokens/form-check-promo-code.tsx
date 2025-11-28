import React from 'react'
import { useTranslations } from 'next-intl'
import { CheckPromoCodeInput } from '@/services'

import { CornerDownLeft } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms'

type Props = {
  onSubmit: (values: CheckPromoCodeInput) => void
  defaultValues: CheckPromoCodeInput
  isPending: boolean
}

export const FormCheckPromoCode = ({
  onSubmit,
  defaultValues,
  isPending,
}: Props) => {
  const t = useTranslations()
  const { handleSubmit, control } = useForm<CheckPromoCodeInput>({
    defaultValues,
  })

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="code">{t('promo_code')}</FieldLabel>
            <Input {...field} />
          </Field>
        )}
      />
      <Button disabled={isPending} type="submit">
        <CornerDownLeft color="white" size={16} />
      </Button>
    </form>
  )
}
