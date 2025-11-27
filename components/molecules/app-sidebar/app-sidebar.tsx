'use client'
import * as React from 'react'
import { useMemo } from 'react'
import { useQueryState } from 'nuqs'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { useAuth } from '@/hooks'
import {
  AudioWaveform,
  Calendar,
  CirclePlus,
  Coins,
  Command,
  MessageCircleQuestion,
  Search,
  Settings2,
  ShieldCheck,
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
import { ConversationsList } from './conversations-list'
import { cn } from '@/lib/utils'
import numeral from 'numeral'

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
  const { user } = useAuth()

  const remainingTokens = user?.remainingTokens || 0

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
        title: t('ai_audit'),
        url: '/app/audit',
        icon: ShieldCheck,
        badge: (
          <span className="px-1 rounded-full bg-secondary text-secondary-foreground opacity-80">
            {t('soon')}
          </span>
        ),
      },
      {
        title: t('calendar'),
        url: '/app/calendar',
        icon: Calendar,
      },
      {
        title: t('tokens'),
        url: '/app/payments',
        icon: Coins,
        badge: (
          <span
            className={cn(
              'px-1 rounded-full text-primary-foreground opacity-80',
              remainingTokens < 0 ? 'bg-destructive' : 'bg-primary',
            )}
          >
            {numeral(remainingTokens).format('0,0')}
          </span>
        ),
      },
      {
        title: t('settings'),
        url: '/app/settings',
        icon: Settings2,
      },
      {
        title: t('trash'),
        url: '/app/trash',
        icon: Trash2,
      },
      {
        title: t('help'),
        url: '/app/help',
        icon: MessageCircleQuestion,
      },
    ],
    [t, remainingTokens],
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
