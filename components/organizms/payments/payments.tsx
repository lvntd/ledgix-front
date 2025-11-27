'use client'
import React from 'react'
import { PaymentsHeader } from './payments-header'
import { AccountVerificationAlert } from '@/components/molecules'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card'
import { useTranslations } from 'next-intl'
import { OfferingsList } from './offerings-list'
import { useAuth } from '@/hooks'

export const Payments = () => {
  const t = useTranslations()
  const { user } = useAuth()
  return (
    <main className="relative  max-h-dvh flex flex-col">
      <PaymentsHeader />
      <div className="overflow-y-scroll mt-10 px-5 flex flex-col gap-5">
        {!user?.isVerified && <AccountVerificationAlert />}
        <OfferingsList />
        <Card>
          <CardHeader>
            <CardTitle>{t('what_is_token.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t('what_is_token.content')}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
