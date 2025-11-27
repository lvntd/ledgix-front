'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { Handshake } from 'lucide-react'
import { Button } from '@/components/atoms'

export const BusinessOfferingCard = () => {
  const t = useTranslations()
  const router = useRouter()

  return (
    <div className="group relative flex h-full w-full flex-1 flex-col gap-3 rounded-2xl border text-popover-foreground bg-popover p-6 ">
      <div className="flex items-center gap-3">
        <p className="text-sm font-normal">{t(`offerings.business`)}</p>
      </div>

      <div className="flex flex-1 flex-col items-center gap-2 text-center">
        <Handshake className="size-14" />
        <p className="text-sm ">{t('offer_tailored_to_your_company')}</p>
      </div>
      <Button onClick={() => router.push('/contact')}>{t('contact_us')}</Button>
    </div>
  )
}
