import React, { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Search, GeorgianLari, type LucideIcon, Brain } from 'lucide-react'
import { IContentBlockToolCall } from '@/services'
import clsx from 'clsx'

type Props = { contentBlock: IContentBlockToolCall }

export const ToolCallBlock = memo(({ contentBlock }: Props) => {
  const t = useTranslations()

  let Icon: LucideIcon

  switch (contentBlock.name) {
    case 'fetch_exchange_rates':
      Icon = GeorgianLari
      break
    case 'retrieve_context':
      Icon = Search
      break
    default:
      Icon = Brain
  }

  return (
    <div
      className={clsx(
        'mt-2 rounded-t-md bg-blue-10/70 p-2 text-sm font-medium',
        'border-x border-t',
      )}
    >
      <div className="flex items-center gap-1 text-xs">
        <Icon size={16} />
        <span>{t(`tool_name.${contentBlock.name}`)}</span>
      </div>
    </div>
  )
})

ToolCallBlock.displayName = 'ToolCallBlock'
