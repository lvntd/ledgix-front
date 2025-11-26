import React from 'react'
import { Separator } from '@/components/atoms/separator'
import { SidebarTrigger } from '@/components/atoms/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/atoms/breadcrumb'
import { useTranslations } from 'next-intl'

export const SettingsHeader = () => {
  const t = useTranslations()
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-3 min-w-0 flex-1">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbPage className="text-sm">{t('settings')}</BreadcrumbPage>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{t('settings')}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
