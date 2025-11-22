import { pipe } from 'fp-ts/lib/function'
import { get } from '../request'
import { decodeJson } from '../decodeJson'
import { TOfferingResponse } from './offering.codecs'

const offerings = '/api/offering' as const

export const getOfferings = async () => {
  return pipe(await get(offerings, {}), decodeJson(TOfferingResponse))
}
