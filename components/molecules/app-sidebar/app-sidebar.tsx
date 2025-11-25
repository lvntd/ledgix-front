'use client'
import * as React from 'react'
import {
  AudioWaveform,
  Blocks,
  Calendar,
  CirclePlus,
  Command,
  MessageCircleQuestion,
  Search,
  Settings2,
  Trash2,
} from 'lucide-react'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'

import { TeamSwitcher } from './team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/atoms/sidebar'
import { ConversationsList } from '../conversations-list'
import { useMemo } from 'react'
import { useQueryState } from 'nuqs'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'

// This is sample data.
const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: Command,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations()
  const router = useRouter()
  const [conversationId] = useQueryState('conversationId')

  const navMain = useMemo(
    () => [
      {
        title: t('new_chat'),
        onClick: () => router.push('/app'),
        icon: CirclePlus,
        isActive: conversationId === null,
        isPrimary: true,
      },
      {
        title: t('search'),
        onClick: () => null,
        icon: Search,
      },
    ],
    [conversationId, router, t],
  )

  const navSecondary = useMemo(
    () => [
      {
        title: t('calendar'),
        url: '#',
        icon: Calendar,
      },
      {
        title: t('settings'),
        url: '/app/settings',
        icon: Settings2,
      },
      {
        title: t('templates'),
        url: '#',
        icon: Blocks,
      },
      {
        title: t('trash'),
        url: '#',
        icon: Trash2,
      },
      {
        title: t('help'),
        url: '#',
        icon: MessageCircleQuestion,
      },
    ],
    [t],
  )
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        <div className="flex-1 overflow-y-scroll">
          <ConversationsList favorites />
        </div>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
