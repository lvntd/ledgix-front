'use client'
import React, { useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { useTranslations } from 'next-intl'
import { BusinessOfferingCard, OfferingCard } from '@/components/molecules'
import { getCheckoutPageUrl, IPromo, qk } from '@/services'
import { DialogPurchaseTokens } from './dialog-purchase-tokens'
import { toast } from 'sonner'

export const OfferingsList = () => {
  const t = useTranslations()
  const router = useRouter()
  const [offeringId, setOfferingId] = useQueryState('offeringId')
  const [promo, setPromo] = useState<IPromo | null>(null)
  const [isAutomatic, setIsAutomatic] = useState(true)

  const $offerings = useQuery(qk.offering.list)
  const $checkoutUrl = useMutation({ mutationFn: getCheckoutPageUrl })

  if ($offerings.data === undefined) {
    return null
  }

  const offerings = $offerings.data.data

  const selectedOffering =
    offerings.find((offering) => offering._id === offeringId) || null

  return (
    <>
      <DialogPurchaseTokens
        appliedPromo={promo}
        isAutomatic={isAutomatic}
        isLoading={$checkoutUrl.isPending}
        isOpen={offeringId !== null}
        onCheckPromo={setPromo}
        onClose={() => setOfferingId(null)}
        onSubmit={() => {
          if (offeringId === null) {
            return
          }
          $checkoutUrl.mutate(
            { offeringId, promoId: promo?._id || null, isAutomatic },
            {
              onSuccess: (data) => {
                const checkoutUrl = data.data.checkout_url
                router.push(checkoutUrl)
              },
              onError: (error) => {
                toast.error(t(error.message))
              },
            },
          )
        }}
        selectedOffering={selectedOffering}
        setIsAutomatic={setIsAutomatic}
      />
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
    </>
  )
}
