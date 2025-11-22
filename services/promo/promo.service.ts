import { pipe } from 'fp-ts/lib/function'
import { get } from '../request'
import { decodeJson } from '../decodeJson'
import { TPromoResponse } from './promo.codecs'

const promos = '/api/promo'

export type CheckPromoCodeInput = { code: string }

export const checkPromoCode = async ({ code }: CheckPromoCodeInput) => {
  const query = new URLSearchParams({ code })

  return pipe(await get(promos, { query }), decodeJson(TPromoResponse))
}
