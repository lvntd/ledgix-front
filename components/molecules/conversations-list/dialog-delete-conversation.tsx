import { Button } from '@/components/atoms'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from '@/components/atoms/dialog'
import React from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  isLoading: boolean
}

export const DialogDeleteConversation = ({
  isOpen,
  onClose,
  onDelete,
  isLoading,
}: Props) => {
  const t = (value: string) => value
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('delete_chat')}</DialogTitle>
          <DialogDescription>
            {t('are_you_sure_to_delete_chat')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('close')}
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isLoading}>
            {t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
