'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { NightModeSwitch } from './night-mode-switch'
import { LanguageSwitch } from './language-switch'
import { useTranslations } from 'next-intl'

export const InterfaceCard = () => {
  const t = useTranslations()

  return (
    <Card className="flex flex-col gap-7 m-auto bg-card w-full  mb-5">
      <CardHeader>
        <CardTitle>{t('interface')}</CardTitle>
        <CardDescription>
          აკონტროლეთ აპლიკაციის ვიზუალი თქვენი გემოვნებისა და საჭიროებების
          მიხედვით
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 items-center justify-center">
        <NightModeSwitch />
        <LanguageSwitch />
      </CardContent>
    </Card>
  )
}
