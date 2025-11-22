import { z } from 'zod'
import { IOffering, TOffering } from '../offering'
import { TPaginationData } from '../get-list'
import { TPromo } from '../promo'

export type PurchaseTokensFormInput = { offering: IOffering | null }

export const TPayment = z.object({
  _id: z.string(),
  user: z.string(),
  promo: TPromo.nullable(),
  offering: TOffering.nullable(),
  paidAmountGel: z.number(),
  tokens: z.number(),
  invoicedTo: z.object({ name: z.string(), taxId: z.string(), address: z.string().nullable().optional() }).optional(),
  expiresOn: z.string(),
  status: z.string(),
  createdAt: z.string()
})

export type IPayment = z.infer<typeof TPayment>

export const TPaymentsListResponse = z.object({ data: z.array(TPayment) }).merge(TPaginationData)

export const TCheckoutUrlResponse = z.object({
  data: z.object({ checkout_url: z.string().url(), payment_id: z.string() })
})

export const TPaymentDetailsResponse = z.object({ data: TPayment })
