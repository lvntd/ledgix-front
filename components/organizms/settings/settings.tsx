import React from 'react'
import { SettingsHeader } from './settings-header'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { LanguageSwitch } from './language-switch'
import { NightModeSwitch } from './night-mode-switch'
import { Button } from '@/components/atoms'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/atoms/input'
import { Field, FieldLabel } from '@/components/atoms/field'
import { PersonalInformationCard } from './personal-information-card'
import { SecurityCard } from './security-card'

export const Settings = () => {
  const t = useTranslations()
  return (
    <main className="relative  max-h-dvh flex flex-col">
      <SettingsHeader />
      <div className="overflow-y-scroll">
        <PersonalInformationCard />
        <SecurityCard />
        <Card className="flex flex-col gap-7 max-w-3xl m-auto bg-card w-full  mb-5">
          <CardHeader>
            <CardTitle>ინტერფეისი</CardTitle>
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
      </div>
    </main>
  )
}
