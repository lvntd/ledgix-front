'use client'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getConversations, IConversation, qk } from '@/services'
import { useQueryState } from 'nuqs'

import { ConversationsListItem } from './conversations-list-item'
import { Spinner } from '@/components/atoms/spinner'

type Props = { favorites: boolean }

export function ConversationsList({ favorites }: Props) {
  const t = (val: string) => val
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

  console.log(conversations)

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
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
