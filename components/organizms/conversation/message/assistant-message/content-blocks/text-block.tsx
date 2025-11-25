import React, { memo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = { text: string }

export const TextBlock = memo(({ text }: Props) => {
  return (
    <div className="markdown mt-3">
      <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
    </div>
  )
})

TextBlock.displayName = 'TextBlock'
