import React from 'react'
import { useTranslations } from 'next-intl'
import { ThemeToggler } from '@/components/molecules'

export const NightModeSwitch = () => {
  const t = useTranslations()
  return (
    <div className="flex w-full items-center justify-between">
      <p>{t('night_mode')}</p>
      <ThemeToggler />
    </div>
  )
}
