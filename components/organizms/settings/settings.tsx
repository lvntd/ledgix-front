'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { parseAsString, useQueryState } from 'nuqs'
import { SettingsHeader } from './settings-header'
import { PersonalInformationCard } from './personal-information-card'
import { SecurityCard } from './security-card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs'
import { InterfaceCard } from './interface-card'

export const Settings = () => {
  const t = useTranslations()
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('account'),
  )

  return (
    <main className="relative  max-h-dvh flex flex-col">
      <SettingsHeader />
      <div className="overflow-y-scroll mt-10">
        <Tabs
          value={tab}
          defaultValue="account"
          onValueChange={(value) => setTab(value)}
          className="flex flex-col  md:flex-row m-auto max-w-4xl px-5"
        >
          <TabsList className="flex md:flex-col gap-1 h-fit min-w-[200px] max-w-full overflow-x-scroll bg-transparent">
            <TabsTrigger
              className="w-full justify-start data-[state=active]:bg-secondary hover:bg-secondary/30"
              value="account"
            >
              {t('personal_information')}
            </TabsTrigger>
            <TabsTrigger
              className="w-full justify-start data-[state=active]:bg-secondary hover:bg-secondary/30"
              value="security"
            >
              {t('security')}
            </TabsTrigger>
            <TabsTrigger
              className="w-full justify-start data-[state=active]:bg-secondary hover:bg-secondary/30"
              value="interface"
            >
              {t('interface')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <PersonalInformationCard />
          </TabsContent>
          <TabsContent value="security">
            <SecurityCard />
          </TabsContent>
          <TabsContent value="interface">
            <InterfaceCard />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
