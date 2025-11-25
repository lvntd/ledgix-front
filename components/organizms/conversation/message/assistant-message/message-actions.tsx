import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToggle } from 'react-use'
import { FeedbackModal } from './feedback-modal'
import { Button } from '@/components/atoms'
import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react'
import { IExtendedModelMessage, qk, saveConversationFeedback } from '@/services'
import { toast } from 'sonner'
import copy from 'copy-to-clipboard'
import clsx from 'clsx'

type Props = {
  message: IExtendedModelMessage
  conversationId: string
  fullText?: string
  messageId: number
}

export const MessageActions = ({
  message,
  conversationId,
  messageId,
  fullText,
}: Props) => {
  const t = (val: string) => val
  const [isDialogOpen, toggleDialog] = useToggle(false)
  const [comment, setComment] = useState(message.feedback?.comment || '')
  const [isPositive, setIsPositive] = useState<boolean | null>(null)

  const $saveConversationFeedback = useMutation({
    mutationFn: saveConversationFeedback,
  })
  const queryClient = useQueryClient()

  const handleSubmit = (isPositive: boolean | null, comment: string) => {
    $saveConversationFeedback.mutate(
      { conversationId, isPositive, comment, messageId },
      {
        onSuccess: () => {
          toast.success(t('alert_feedback_received'))
          queryClient.invalidateQueries(
            qk.conversation.details({ conversationId }),
          )
          toggleDialog(false)
          setComment(comment)
        },
        onError: () => {
          toast.error(t('error_something_went_wrong'))
        },
      },
    )
  }

  return (
    <>
      <FeedbackModal
        comment={comment}
        isLoading={$saveConversationFeedback.isPending}
        isOpen={isDialogOpen}
        isPositive={isPositive}
        onChangeComment={(newComment: string) => setComment(newComment)}
        onClear={() => handleSubmit(null, '')}
        onClose={() => toggleDialog(false)}
        onSubmit={() => handleSubmit(isPositive, comment)}
      />
      <div
        className={clsx(
          'flex gap-[2px] group-hover:opacity-100 md:opacity-0',
          'transition-all duration-200 ease-in-out delay-75',
        )}
      >
        <Button
          onClick={() => {
            setIsPositive(true)

            if (message.feedback?.isPositive) {
              handleSubmit(null, '')
            } else {
              handleSubmit(true, '')
            }
          }}
          size="icon-sm"
          variant="ghost"
        >
          <ThumbsUp />
        </Button>

        <Button
          onClick={() => {
            setIsPositive(false)
            toggleDialog()
          }}
          size="icon-sm"
          variant="ghost"
        >
          <ThumbsDown />
        </Button>
        {fullText && (
          <Button
            variant="ghost"
            onClick={() => {
              copy(fullText)
              toast.success(t('text_copied'))
            }}
            size="icon-sm"
          >
            <Copy />
          </Button>
        )}
      </div>
    </>
  )
}
