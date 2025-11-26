'use client'
import React from 'react'
import { useAuth } from '@/hooks'
import { useTranslations } from 'next-intl'
import { Switch } from '@/components/atoms/switch'

export const ConsentsSwitch = () => {
  const t = useTranslations()
  const { user } = useAuth()

  return (
    <div className="flex w-full items-center justify-between">
      <p>{t('agree_to_receive_marketing_notifications')}</p>
      <Switch checked={Boolean(user?.consent)} />
    </div>
  )
}
