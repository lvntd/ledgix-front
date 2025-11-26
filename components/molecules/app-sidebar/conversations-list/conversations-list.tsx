'use client'
import { useTranslations } from 'next-intl'
import { useQueryState } from 'nuqs'
import { useInfiniteQuery } from '@tanstack/react-query'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar'
import { getConversations, IConversation } from '@/services'
import { ConversationsListItem } from './conversations-list-item'
import { Spinner } from '@/components/atoms/spinner'
import { MoreHorizontal } from 'lucide-react'

type Props = { favorites: boolean }

export function ConversationsList({ favorites }: Props) {
  const t = useTranslations()
  const [conversationId] = useQueryState('conversationId')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['conversation', 'list'],
      queryFn: (args) => getConversations(args),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page === lastPage.lastPage || lastPage.lastPage === 0) {
          return null
        } else {
          return lastPage.page + 1
        }
      },
    })

  const conversations: Omit<IConversation, 'messages'>[] =
    data?.pages.map((page) => page.data).flat() || []

  console.log(favorites)

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t('chat_history')}</SidebarGroupLabel>
      <SidebarMenu>
        {conversations.map((conversation) => (
          <ConversationsListItem
            key={conversation._id}
            conversation={conversation}
            isActive={conversation._id === conversationId}
          />
        ))}
        {hasNextPage && (
          <SidebarMenuItem onClick={() => fetchNextPage()}>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              {isFetchingNextPage ? <Spinner /> : <MoreHorizontal />}
              <span>{t('load_more')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
