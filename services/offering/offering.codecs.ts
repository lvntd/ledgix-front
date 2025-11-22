import { z } from 'zod'

export const TOffering = z.object({
  _id: z.string(),
  title: z.string(),
  priceGel: z.number(),
  tokens: z.number(),
  validityPeriod: z.number(),
  isActive: z.boolean()
})

export type IOffering = z.infer<typeof TOffering>

export const TOfferingResponse = z.object({ data: z.array(TOffering) })
