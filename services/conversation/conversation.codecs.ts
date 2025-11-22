import { z } from 'zod'
import { TPaginationData } from '../get-list'

const TContentBlockText = z.object({
  type: z.literal('text'),
  text: z.string()
})

const TContentBlockToolCall = z.object({
  type: z.literal('tool_call'),
  name: z.string(),
  id: z.string()
})

const TContentBlockToolCallChunk = z.object({
  type: z.literal('tool_call_chunk'),
  args: z.string()
})

export const TContentBlock = z.union([TContentBlockText, TContentBlockToolCall, TContentBlockToolCallChunk])

export const TMessageContext = z.object({
  pageContent: z.string().optional(),
  metadata: z
    .object({
      chunkId: z.string(),
      articleName: z.string(),
      chapterTitle: z.string(),
      sectionTitle: z.string(),
      articleNumber: z.number()
    })
    .partial()
    .optional()
})

export type IMessageContext = z.infer<typeof TMessageContext>

const TExtendedModelMessage = z.object({
  role: z.union([z.literal('user'), z.literal('assistant'), z.literal('system'), z.literal('tool')]),
  content: z.array(TContentBlock),
  redactedContent: z.array(TContentBlock),
  context: z.array(TMessageContext).nullable(),
  resourceChunkIds: z.array(z.string()).nullable(),
  feedback: z.object({ isPositive: z.boolean(), comment: z.string() }).nullable(),
  date: z.string().nullable().optional()
})

export type IExtendedModelMessage = z.infer<typeof TExtendedModelMessage>

const TBaseModelUsage = z.object({
  inputTokens: z.number(),
  outputTokens: z.number(),
  cacheCreationInputTokens: z.number().optional(),
  cacheReadInputTokens: z.number().optional()
})

export const TConversationStyle = z.union([
  z.literal('normal'),
  z.literal('concise'),
  z.literal('explanatory'),
  z.literal('formal')
])

export const TBaseModel = z.union([
  z.literal('claude_3_7_sonnet'),
  z.literal('claude_4_5_sonnet'),
  z.literal('gemini_2_5_pro'),
  z.literal('gemini_2_5_flash'),
  z.literal('gpt_4_1')
])

export type IBaseModel = z.infer<typeof TBaseModel>

export type IConversationStyle = z.infer<typeof TConversationStyle>

export const TConversation = z.object({
  _id: z.string().nullable(),
  messages: z.array(TExtendedModelMessage),
  user: z.string().nullable(),
  title: z.string().nullable(),
  baseModelUsage: TBaseModelUsage,
  priveUsage: z.number(),
  style: TConversationStyle,
  createdAt: z.string(),
  updatedAt: z.string()
})

export type IBaseModelUsage = z.infer<typeof TBaseModelUsage>

export type IConversation = z.infer<typeof TConversation>

export type IContentBlockText = z.infer<typeof TContentBlockText>
export type IContentBlockToolCall = z.infer<typeof TContentBlockToolCall>
export type IContentBlockToolCallChunk = z.infer<typeof TContentBlockToolCallChunk>
export type IContentBlock = z.infer<typeof TContentBlock>

export const TConversationResponse = z.object({ data: TConversation })

export type IConversationResponse = z.infer<typeof TConversationResponse>

export const TConversationsResponse = z
  .object({
    data: z.array(TConversation.omit({ messages: true }))
  })
  .merge(TPaginationData)
