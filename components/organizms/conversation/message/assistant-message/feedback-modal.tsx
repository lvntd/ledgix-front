import { Button } from '@/components/atoms'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogFooter,
  DialogHeader,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'

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
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>TODO. შეაფასე</DialogTitle>
            <DialogDescription>
              TODO. შენი შეფასება გვეხმარება
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              value={comment}
              onChange={(e) => onChangeComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClear}>
              Clear
            </Button>

            <Button disabled={isLoading} type="submit" onClick={onSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)

FeedbackModal.displayName = 'FeedbackModal'
