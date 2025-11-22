import { pipe } from 'fp-ts/lib/function'
import { del, get, put } from '../request'
import { decodeJson } from '../decodeJson'
import { TChatResponse, TChatsResponse } from './chat.codecs'

const chats = '/api/chat' as const
const chat = `${chats}/:chatId` as const

export type GetChatInput = { chatId: string | null }

export const getChat = async ({ chatId }: GetChatInput) => {
  if (chatId === null) return

  return pipe(await get(chat, { params: { chatId } }), decodeJson(TChatResponse))
}

export type GetChatsInput = { pageParam: number }
export const getChats = async ({ pageParam }: GetChatsInput) => {
  const query = new URLSearchParams({ limit: '10', page: String(pageParam) })

  return pipe(await get(chats, { query }), decodeJson(TChatsResponse))
}

export type UpdateChatTitleInput = { chatId: string; title: string }

export const updateChatTitle = async ({ chatId, title }: UpdateChatTitleInput) => {
  return pipe(await put(`${chat}/title`, { params: { chatId }, body: { title } }))
}

export type DeleteChatInput = { chatId: string }

export const deleteChat = async ({ chatId }: DeleteChatInput) => {
  return pipe(await del(`${chat}`, { params: { chatId } }))
}

type SaveFeedbackInput = {
  chatId: string
  messageId: number
  isPositive: boolean | null
  comment: string
}

export const saveFeedback = async ({ chatId, isPositive, comment, messageId }: SaveFeedbackInput) => {
  return pipe(
    await put(`${chat}/feedback`, {
      params: { chatId },
      body: { isPositive, comment, messageId }
    })
  )
}
