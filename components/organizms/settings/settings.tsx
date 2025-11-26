import React from 'react'
import { SettingsHeader } from './settings-header'
import { Card, CardContent } from '@/components/atoms/card'
import { ThemeToggler } from '@/components/molecules'
import { Separator } from '@/components/atoms/separator'
import { ConsentsSwitch } from './consents-switch'

export const Settings = () => {
  return (
    <main className="relative min-h-dvh max-h-dvh flex flex-col">
      <SettingsHeader />
      <Card className="max-w-3xl m-auto bg-card w-full h-full mb-5">
        <CardContent className="flex flex-col gap-5">
          <p>გამარჯობა, ჯიგარო</p>
          <Separator />
          <div className="flex w-full justify-between">
            <p>ფერების რეჟიმი</p>
            <ThemeToggler />
          </div>
          <ConsentsSwitch />
        </CardContent>
      </Card>
    </main>
  )
}
