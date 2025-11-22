import { pipe } from 'fp-ts/lib/function'
import { del, get, put } from '../request'
import { decodeJson } from '../decodeJson'
import { TConversationResponse, TConversationsResponse } from './conversation.codecs'

const conversations = '/api/conversation' as const
const conversation = `${conversations}/:conversationId` as const

export type GetConversationInput = { conversationId: string | null }

export const getConversation = async ({ conversationId }: GetConversationInput) => {
  if (conversationId === null) return

  return pipe(await get(conversation, { params: { conversationId } }), decodeJson(TConversationResponse))
}

export type GetConversationsInput = { pageParam: number }
export const getConversations = async ({ pageParam }: GetConversationsInput) => {
  const query = new URLSearchParams({ limit: '10', page: String(pageParam) })

  return pipe(await get(conversations, { query }), decodeJson(TConversationsResponse))
}

export type UpdateConversationTitleInput = { conversationId: string; title: string }

export const updateConversationTitle = async ({ conversationId, title }: UpdateConversationTitleInput) => {
  return pipe(await put(`${conversation}/title`, { params: { conversationId }, body: { title } }))
}

export type DeleteConversationInput = { conversationId: string }

export const deleteConversation = async ({ conversationId }: DeleteConversationInput) => {
  return pipe(await del(`${conversation}`, { params: { conversationId } }))
}

type SaveFeedbackInput = {
  conversationId: string
  messageId: number
  isPositive: boolean | null
  comment: string
}

export const saveConversationFeedback = async ({
  conversationId,
  isPositive,
  comment,
  messageId
}: SaveFeedbackInput) => {
  return pipe(
    await put(`${conversation}/feedback`, {
      params: { conversationId },
      body: { isPositive, comment, messageId }
    })
  )
}
