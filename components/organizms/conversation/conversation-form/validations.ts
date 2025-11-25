import { TBaseModel, TConversationStyle } from '@/services'
import { z } from 'zod'

export const conversationSchema = z.object({
  message: z.string().trim().min(1),
  conversationStyle: TConversationStyle,
  baseModel: TBaseModel
})
