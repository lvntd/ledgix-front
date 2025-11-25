import React from 'react'
import { IExtendedModelMessage } from '@/services'
import { UserMessage } from './user-message'
import { AssistantMessage } from './assistant-message'

type Props = {
  message: IExtendedModelMessage
  conversationId: string
  messageId: number
}

export const Message = ({ message, conversationId, messageId }: Props) => {
  if (message.role === 'assistant') {
    return (
      <AssistantMessage
        conversationId={conversationId}
        message={message}
        messageId={messageId}
      />
    )
  } else {
    return <UserMessage message={message} />
  }
}
