'use client'
import { BusinessOfferingCard, OfferingCard } from '@/components/molecules'
import { IPromo, qk } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useQueryState } from 'nuqs'
import React, { useState } from 'react'

export const OfferingsList = () => {
  const t = useTranslations()
  const [offeringId, setOfferingId] = useQueryState('offeringId')
  const [promo, setPromo] = useState<IPromo | null>(null)
  const [isAutomatic, setIsAutomatic] = useState(true)

  const $offerings = useQuery(qk.offering.list)

  if ($offerings.data === undefined) {
    return null
  }

  const offerings = $offerings.data.data

  return (
    <div className="grid w-full items-center gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
      {offerings.map((offering, idx) => {
        return (
          <OfferingCard
            buttonText={t('buy_package')}
            isPopular={idx === 2}
            key={offering._id}
            offering={offering}
            onSelect={setOfferingId}
          />
        )
      })}
      <BusinessOfferingCard />
    </div>
  )
}
