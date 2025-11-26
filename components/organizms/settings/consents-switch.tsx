'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Switch } from '@/components/atoms/switch'
import { Label } from '@/components/atoms/label'

export const ConsentsSwitch = () => {
  const t = useTranslations()

  return (
    <div className="flex w-full items-center justify-between">
      <Label htmlFor="agree_consents_check">
        {t('agree_to_receive_marketing_notifications')}
      </Label>
      <Switch id="agree_consents_check" />
    </div>
  )
}
