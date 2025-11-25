'use client'

import React, { useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'next-i18next'
import { useQuery } from '@tanstack/react-query'
import { useAuth, useConversation } from '@/hooks'
import { IBaseModel, IConversationStyle, qk } from '@/services'
import {
  defaultBaseModel,
  defaultConversationStyle,
  lsConversationStyleKey,
} from '@/configs'
import { toast } from 'sonner'
import { Message } from './message'
import { ConversationForm } from './conversation-form'
import { ConversationHeader } from './conversation-header'
import { ConversationGreeting } from './conversation-greeting'
import { useTranslations } from 'next-intl'

export const Conversation = () => {
  const t = useTranslations()
  const { canChat } = useAuth()

  const [buyAlert, setBuyAlert] = useState(false) // Is buy tokens alert visible

  const conversationBottomRef = useRef<HTMLDivElement>(null)

  const {
    onSendMessage,
    isLoading,
    conversationId,
    initialData,
    currentState,
  } = useConversation({
    conversationBottomRef,
  })

  const $conversation = useQuery({
    ...qk.conversation.details({ conversationId }),
    enabled: conversationId !== null,
    initialData,
    placeholderData: (prevData) => prevData,
    staleTime: 0,
  })

  const conversation = $conversation.data?.data
  const messages = conversation?.messages || []

  const baseModel = (localStorage.getItem('baseModelName') ||
    defaultBaseModel) as IBaseModel
  const conversationStyle = (localStorage.getItem(lsConversationStyleKey) ||
    defaultConversationStyle) as IConversationStyle

  const defaultValues = {
    message: '',
    conversationStyle,
    baseModel,
  }

  useEffect(() => {
    conversationBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className="relative min-h-dvh max-h-dvh flex flex-col">
      <ConversationHeader title={conversation?.title || null} />
      {conversationId === null && messages.length === 0 && (
        <ConversationGreeting />
      )}
      <div className="grid flex-1 auto-rows-min gap-4 overflow-y-auto! py-4 pt-14 px-5 max-w-3xl w-full m-auto grow">
        {messages.map((message, idx) => (
          <Message
            conversationId={conversation?._id || ''}
            key={idx}
            message={message}
            messageId={idx}
          />
        ))}
      </div>
      <span ref={conversationBottomRef} />
      <ConversationForm
        defaultValues={defaultValues}
        disabledInput={isLoading}
        key={conversationId}
        onSubmit={(values) => {
          console.log({ values })
          if (canChat) {
            onSendMessage({
              conversationId,
              ...values,
            })
          } else {
            toast.error('TODO. Delete this')
            setBuyAlert(true)
          }
        }}
      />
    </div>
  )
}
