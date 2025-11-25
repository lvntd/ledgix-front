import { Button } from '@/components/atoms'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogFooter,
  DialogHeader,
} from '@/components/atoms/dialog'
import { Textarea } from '@/components/atoms/textarea'
import { useTranslations } from 'next-intl'

import React, { memo } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  onClear: () => void
  isLoading: boolean
  isPositive: boolean | null
  comment: string
  onChangeComment: (newComment: string) => void
}

export const FeedbackModal = memo(
  ({
    isOpen,
    onClose,
    isLoading,
    onSubmit,
    onClear,
    onChangeComment,
    comment,
  }: Props) => {
    const t = useTranslations()
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{t('i_didnt_like_the_answer')}</DialogTitle>
            <DialogDescription>
              {t('chat_feedback_disclaimer')}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Textarea
              className="resize-none max-h-20"
              value={comment}
              onChange={(e) => onChangeComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClear}>
              {t('delete')}
            </Button>
            <Button disabled={isLoading} type="submit" onClick={onSubmit}>
              {t('save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)

FeedbackModal.displayName = 'FeedbackModal'
