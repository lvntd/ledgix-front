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
import { Field, FieldError, FieldLabel } from '@/components/atoms/field'
import { Switch } from '@/components/atoms/switch'
import { PersonalInformationCard } from './personal-information-card/personal-information-card'

export const Settings = () => {
  const t = useTranslations()
  return (
    <main className="relative  max-h-dvh flex flex-col">
      <SettingsHeader />
      <PersonalInformationCard />
      <Card className="flex flex-col gap-7 max-w-3xl m-auto bg-card w-full  mb-5">
        <CardHeader>
          <CardTitle>უსაფრთხოება</CardTitle>
          <CardDescription>
            უსაფრთხოების მიზნით რეკომენდირებულია, პაროლი შეიცვალოს 3 თვეში
            ერთხელ მაინც
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 items-center justify-center">
          <Field>
            <FieldLabel></FieldLabel>
            <Input type="password" placeholder="მიმდინარე პაროლი" />
          </Field>
          <Input type="password" placeholder="ახალი პაროლი" />
          <Input type="password" placeholder="გაიმეორე ახალი პაროლი" />
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button>{t('save')}</Button>
          </CardAction>
        </CardFooter>
      </Card>
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
    </main>
  )
}
