import React, { memo, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { IContentBlockToolCallChunk } from '@/services'
import clsx from 'clsx'

type Props = { contentBlock: IContentBlockToolCallChunk }

export const ToolCallChunkBlock = memo(({ contentBlock }: Props) => {
  const t = useTranslations()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [args, setArgs] = useState<Record<string, any>>({}) // Arguments of the tool call, like { query: "მცირე ბიზნესის დაბეგვრა"}

  useEffect(() => {
    try {
      const parsedArgs = JSON.parse(contentBlock.args)

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArgs(parsedArgs)
    } catch (error) {
      console.error(error)
    }
  }, [contentBlock.args])

  return (
    <div
      className={clsx(
        'w-full rounded-b-md px-2 py-3 pl-4 text-xs',
        'border-x border-b',
      )}
    >
      {Object.entries(args).map(([key, value]) => {
        return (
          <div className="flex items-center gap-1" key={key}>
            <span className="font-medium">{t(`tool_param.${key}`)}:</span>
            <span className="italic">{value}</span>
          </div>
        )
      })}
    </div>
  )
})

ToolCallChunkBlock.displayName = 'ToolCallChunkBlock'
