import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { getChat, GetChatInput } from './chat'
import { getOfferings } from './offering'
import { getUserInfo } from './auth'
import { getPaymentDetails, GetPaymentDetailsInput, getPayments, GetPaymentsInput } from './payment'
import { getRecurringPayment } from './recurring-payment/recurring-payment.service'
import { getConversation, GetConversationInput } from './conversation'
import { getResourceChunks, GetResourceChunksInput } from './resource-chunks'

export const qk = createQueryKeyStore({
  user: {
    details: { queryKey: null, queryFn: getUserInfo }
  },
  chat: {
    details: (input: GetChatInput) => ({
      queryKey: [input],
      queryFn: () => getChat(input)
    })
  },
  conversation: {
    details: (input: GetConversationInput) => ({
      queryKey: [input],
      queryFn: () => getConversation(input)
    })
  },
  offering: {
    list: { queryKey: null, queryFn: getOfferings }
  },
  payment: {
    list: (input: GetPaymentsInput) => ({
      queryKey: [input],
      queryFn: () => getPayments(input)
    }),
    details: (input: GetPaymentDetailsInput) => ({ queryKey: [input], queryFn: () => getPaymentDetails(input) })
  },
  recurringPayment: { details: { queryKey: null, queryFn: getRecurringPayment } },
  resourceChunks: {
    list: (input: GetResourceChunksInput) => ({ queryKey: [input], queryFn: () => getResourceChunks(input) })
  }
})
