import React, { Dispatch, SetStateAction } from 'react'
import { useTranslations } from 'next-intl'
import { Switch } from '@/components/atoms/switch'

type Props = {
  isAutomatic: boolean
  setIsAutomatic: Dispatch<SetStateAction<boolean>>
}

export const AutomaticRenewalSwitch = ({
  isAutomatic,
  setIsAutomatic,
}: Props) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2 text-sm">
        <p className="font-semibold">{t('save_card')}</p>
        <Switch checked={isAutomatic} onCheckedChange={setIsAutomatic} />
      </div>
      <p className="block min-h-20 max-w-[350px] text-sm">
        {isAutomatic
          ? t('automatic_renewal_description')
          : t('single_payment_description')}
      </p>
    </div>
  )
}
