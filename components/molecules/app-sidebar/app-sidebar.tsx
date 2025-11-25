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

  navSecondary: [
    {
      title: 'კალენდარი',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'პარამეტრები',
      url: '#',
      icon: Settings2,
    },
    {
      title: 'შაბლონები',
      url: '#',
      icon: Blocks,
    },
    {
      title: 'ურნა',
      url: '#',
      icon: Trash2,
    },
    {
      title: 'დახმარება',
      url: '#',
      icon: MessageCircleQuestion,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [conversationId, setConversationId] = useQueryState('conversationId')

  const navMain = useMemo(
    () => [
      {
        title: 'ახალი ჩათი',
        onClick: () => setConversationId(null),
        icon: CirclePlus,
        isActive: conversationId === null,
        isPrimary: true,
      },
      {
        title: 'Search',
        onClick: () => null,
        icon: Search,
      },
    ],
    [conversationId, setConversationId],
  )
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
        <ConversationsList favorites />
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
