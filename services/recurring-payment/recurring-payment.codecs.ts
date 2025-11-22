import { z } from 'zod'
import { TPromo } from '../promo'
import { TOffering } from '../offering'

export const TRecurringPayment = z.object({
  _id: z.string(),
  promo: TPromo.nullable(),
  offering: TOffering,
  isActive: z.boolean()
})

export const TRecurringPaymentResponse = z.object({ data: TRecurringPayment })
