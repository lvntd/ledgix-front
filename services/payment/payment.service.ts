import { pipe } from 'fp-ts/lib/function'
import { get, post, put } from '../request'
import { decodeJson } from '../decodeJson'
import { TCheckoutUrlResponse, TPaymentDetailsResponse, TPaymentsListResponse } from './payment.codecs'
import { createListQueryParams, PaginationInput, SearchInput, SortInput } from '../get-list'

const payments = '/api/payment' as const
const checkoutUrl = `${payments}/get-checkout-url` as const
const payment = `${payments}/:paymentId` as const

export type PurchaseTokensInput = { offeringId: string }
export const purchaseTokens = async (input: PurchaseTokensInput) => {
  return pipe(await post(payments, { body: input }))
}

export type GetCheckoutPageUrlInput = { offeringId: string; promoId: string | null; isAutomatic: boolean }
export const getCheckoutPageUrl = async (input: GetCheckoutPageUrlInput) => {
  return pipe(await post(checkoutUrl, { body: input }), decodeJson(TCheckoutUrlResponse))
}

export type GetPaymentsInput = PaginationInput & SearchInput & SortInput

export const getPayments = async (input: GetPaymentsInput) => {
  const query = createListQueryParams(input)

  return pipe(await get(`${payments}/me`, { query }), decodeJson(TPaymentsListResponse))
}

export type GetPaymentDetailsInput = { paymentId: string }

export const getPaymentDetails = async (input: GetPaymentDetailsInput) => {
  return pipe(await get(payment, { params: { paymentId: input.paymentId } }), decodeJson(TPaymentDetailsResponse))
}

export type GenerateInvoiceFormValues = { name: string; address: string; taxId: string }

export type GenerateInvoiceInput = { params: { paymentId: string }; body: GenerateInvoiceFormValues }

export const generateInvoice = async ({ params, body }: GenerateInvoiceInput) => {
  return pipe(await put(payment, { params, body }))
}
