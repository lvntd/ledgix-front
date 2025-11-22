import { z } from 'zod'

export const TPromo = z.object({ _id: z.string(), code: z.string(), discountPercentage: z.number() })

export type IPromo = z.infer<typeof TPromo>
export const TPromoResponse = z.object({ data: TPromo })
