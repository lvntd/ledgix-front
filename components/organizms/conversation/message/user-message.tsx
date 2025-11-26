import React from 'react'
import { IExtendedModelMessage } from '@/services'
import { MessageDate } from './message-date'
import clsx from 'clsx'

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
    <div className="group flex flex-col items-end">
      <div
        className={clsx(
          'relative mb-2 h-fit  justify-self-end whitespace-pre-line rounded-[14px]  p-4 text-sm  md:max-w-[80%]',
          'min-w-24 max-w-[95%]',
          'bg-accent text-accent-foreground',
        )}
      >
        <p>{text}</p>
      </div>
      <MessageDate date={message.date} />
    </div>
  )
}
