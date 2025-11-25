import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { DialogDeleteConversation } from './dialog-delete-conversation'
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/atoms/sidebar'
import { deleteConversation, IConversation } from '@/services'
import { Link } from '@/i18n/navigation'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

type Props = {
  conversation: Omit<IConversation, 'messages'>
  isActive: boolean
}

export const ConversationsListItem = ({ conversation, isActive }: Props) => {
  const t = useTranslations()
  const [isDeleting, setIsDeleting] = useState(false)
  const [conversationId, setConversationId] = useQueryState('conversationId', {
    shallow: true,
  })
  const { isMobile } = useSidebar()

  const queryClient = useQueryClient()

  const $deleteConversation = useMutation({ mutationFn: deleteConversation })

  const handleDeleteConversation = () => {
    if (conversation._id === null) {
      return
    }
    $deleteConversation.mutate(
      { conversationId: conversation._id },
      {
        onSuccess: () => {
          if (conversation._id === conversationId) {
            setConversationId(null)
          }
          setIsDeleting(false)
          queryClient.invalidateQueries({ queryKey: ['conversation', 'list'] })
          toast.success(t('alert_chat_deleted'))
        },
        onError: () => {
          toast.error(t('error_something_went_wrong'))
        },
      },
    )
  }

  return (
    <>
      <DialogDeleteConversation
        isLoading={$deleteConversation.isPending}
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onDelete={handleDeleteConversation}
      />
      <SidebarMenuItem key={conversation._id}>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href={`/dashboard?conversationId=${conversation._id}`}>
            <span>{conversation.title}</span>
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
            <DropdownMenuItem onClick={() => setIsDeleting(true)}>
              <Trash2 className="text-muted-foreground" />
              <span>{t('delete')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </>
  )
}
