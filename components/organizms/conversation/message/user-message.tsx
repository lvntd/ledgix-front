import React from 'react'
import { IExtendedModelMessage } from '@/services'
import { MessageDate } from './message-date'

type Props = { message: IExtendedModelMessage }

export const UserMessage = ({ message }: Props) => {
  let text = ''

  if (typeof message.content === 'string') {
    text = message.content
  } else {
    text = message.content
      .filter((item) => item.type === 'text')
      .map((contentItem) => contentItem.text)
      .join('')
  }

  return (
    <div className="group relative mb-2 h-fit min-w-24 max-w-[95%] justify-self-end whitespace-pre-line rounded-[14px] bg-[#7963E6] p-4 text-sm text-white shadow-chat-message md:max-w-[80%]">
      <p>{text}</p>
      <MessageDate className="right-2" date={message.date} />
    </div>
  )
}
