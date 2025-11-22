import { pipe } from 'fp-ts/lib/function'
import { get, put } from '../request'
import { decodeJson } from '../decodeJson'
import { TRecurringPaymentResponse } from './recurring-payment.codecs'

const recurringPayments = '/api/recurring-payment' as const

export const getRecurringPayment = async () => {
  return pipe(await get(`${recurringPayments}/me`, {}), decodeJson(TRecurringPaymentResponse))
}

export const updateRecurringPaymentStatus = async () => {
  return await put(`${recurringPayments}/update-status`, {})
}
