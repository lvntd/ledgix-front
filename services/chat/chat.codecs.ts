import { z } from 'zod'
import { TPaginationData } from '../get-list'

export const TTextBlockParam = z.object({ type: z.literal('text'), text: z.string() })
const TThinkingBlockParam = z.object({ type: z.literal('thinking'), thinking: z.string(), signature: z.string() })

const TMessage = z.object({
  role: z.union([z.literal('user'), z.literal('assistant')]),
  content: z.array(z.union([TTextBlockParam, TThinkingBlockParam])), // ჯერჯერობით მხოლოდ ტექსტს ვასაპორტებთ
  redactedContent: z.array(TTextBlockParam), // ჯერჯერობით მხოლოდ ტექსტს ვასაპორტებთ
  feedback: z.object({ isPositive: z.boolean(), comment: z.string() }).nullable(),
  date: z.string().nullable().optional()
})

export type IMessage = z.infer<typeof TMessage>

const TUsage = z.object({
  inputTokens: z.number(),
  outputTokens: z.number(),
  cacheCreationInputTokens: z.number().optional(),
  cacheReadInputTokens: z.number().optional()
})

const TChatType = z.union([
  z.literal('general'),
  z.literal('profit_tax'),
  z.literal('income_tax'),
  z.literal('vat'),
  z.literal('property_tax'),
  z.literal('excise_and_import'),
  z.literal('tax_agent'),
  z.literal('small_business')
])

export type IChatType = z.infer<typeof TChatType>

export const TChatStyle = z.union([
  z.literal('normal'),
  z.literal('concise'),
  z.literal('explanatory'),
  z.literal('formal')
])

export type IChatStyle = z.infer<typeof TChatStyle>

export const TChat = z.object({
  _id: z.string().nullable(),
  messages: z.array(TMessage),
  user: z.string().nullable(),
  title: z.string().nullable(),
  anthropicUsage: TUsage,
  priveUsage: z.number(),
  type: TChatType.nullable(),
  style: TChatStyle,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type IAnthropicUsage = z.infer<typeof TUsage>

export type IChat = z.infer<typeof TChat>

export type ITextBlockParam = z.infer<typeof TTextBlockParam>

export const TChatResponse = z.object({ data: TChat })

export type IChatResponse = z.infer<typeof TChatResponse>

export const TChatsResponse = z
  .object({
    data: z.array(TChat.omit({ messages: true }))
  })
  .merge(TPaginationData)
