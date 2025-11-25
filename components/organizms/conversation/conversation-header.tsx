import React from 'react'
import { Separator } from '@/components/atoms/separator'
import { SidebarTrigger } from '@/components/atoms/sidebar'
import { NavActions } from '@/components/molecules/app-sidebar'

type Props = { title: string | null }

export const ConversationHeader = ({ title }: Props) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-3 min-w-0 flex-1">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {title && (
          <h1 className="text-sm text-left truncate max-w-[120px] sm:max-w-xs md:max-w-sm lg:max-w-md">
            {title}
          </h1>
        )}
      </div>

      <div className="ml-auto px-3">
        <NavActions />
      </div>
    </header>
  )
}
