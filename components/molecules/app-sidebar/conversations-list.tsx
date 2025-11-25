'use client'

import {
  ArrowUpRight,
  MoreHorizontal,
  StarOff,
  Trash2,
  Link as LinkIcon,
} from 'lucide-react'

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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/atoms/sidebar'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getConversations, IConversation, qk } from '@/services'
import { useQueryState } from 'nuqs'
import Link from 'next/link'

type Props = { favorites: true }

export function ConversationsList({ favorites }: Props) {
  const [conversationId, setConversationId] = useQueryState('conversationId')
  const { isMobile } = useSidebar()

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
        {conversations.map((item) => (
          <SidebarMenuItem key={item._id}>
            <SidebarMenuButton asChild isActive={item._id === conversationId}>
              <Link href={`/dashboard?conversationId=${item._id}`}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
              >
                <DropdownMenuItem>
                  <StarOff className="text-muted-foreground" />
                  <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon className="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {hasNextPage && (
          <SidebarMenuItem onClick={() => fetchNextPage()}>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
