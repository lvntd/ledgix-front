import React, { useEffect } from 'react'

import { useKey } from 'react-use'
import { ArrowUp as SendIcon } from 'lucide-react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { conversationSchema } from './validations'
import { SelectConversationStyle } from './select-conversation-style'
import { SelectBaseModel } from './select-base-model'
import { IBaseModel, IConversationStyle } from '@/services'
import {
  defaultBaseModel,
  defaultConversationStyle,
  lsConversationStyleKey,
} from '@/configs'
import { Button } from '@/components/atoms'
import { Textarea } from '@/components/atoms/textarea'
import { useTranslations } from 'next-intl'
import { useIsMobile } from '@/hooks/use-mobile'

export type ConversationFormInput = {
  message: string
  conversationStyle: IConversationStyle
  baseModel: IBaseModel
}

type Props = {
  onSubmit: (values: ConversationFormInput) => void
  defaultValues: ConversationFormInput
  disabledInput: boolean
}

export const ConversationForm = ({
  onSubmit,
  defaultValues,
  disabledInput,
}: Props) => {
  const t = useTranslations()
  const isMobile = useIsMobile()

  const formMethods = useForm<ConversationFormInput>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(conversationSchema),
  })
  const { handleSubmit, control, reset, formState, setValue } = formMethods

  useEffect(() => {
    if (formState.isSubmitted) {
      reset({
        message: '',
        baseModel: (localStorage.getItem('baseModelName') ||
          defaultBaseModel) as IBaseModel,
        conversationStyle: (localStorage.getItem(lsConversationStyleKey) ||
          defaultConversationStyle) as IConversationStyle,
      })
    }
  }, [formState, reset])

  useEffect(() => {
    setValue('conversationStyle', defaultValues.conversationStyle)
  }, [defaultValues, setValue])

  // Submit form (send message) when user clicks Enter
  useKey(
    (e) => {
      if (isMobile) {
        return e.shiftKey && e.code === 'Enter'
      } else {
        return e.code === 'Enter' && !e.shiftKey
      }
    },
    () => {
      handleSubmit(onSubmit)()
    },
  )

  return (
    <FormProvider {...formMethods}>
      <form
        className="shadow-conversation-form flex w-full items-end gap-3 rounded-xl bg-card text-card-foreground max-w-3xl m-auto p-[17px_16px] mb-5"
        id="conversation-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="focus-within:none flex w-full flex-col justify-end">
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <Textarea
                className="resize-none outline-none border-none bg-transparent! transition-all duration-200 disabled:bg-transparent shadow-none focus-visible:ring-0 max-h-[300px]"
                disabled={disabledInput}
                onChange={field.onChange}
                placeholder={t('enter_your_question_here')}
                value={field.value}
              />
            )}
          />
          <div className="flex items-center justify-between">
            <Controller
              control={control}
              name="conversationStyle"
              render={({ field }) => {
                return (
                  <SelectConversationStyle
                    onChange={field.onChange}
                    value={field.value}
                  />
                )
              }}
            />
            <Controller
              control={control}
              name="baseModel"
              render={({ field }) => {
                return (
                  <SelectBaseModel
                    onChange={field.onChange}
                    value={field.value}
                  />
                )
              }}
            />
          </div>
        </div>
        <Button
          disabled={!formState.isValid}
          id="submit-conversation-form"
          size="icon"
          type="submit"
        >
          <SendIcon size={18} />
        </Button>
      </form>
    </FormProvider>
  )
}
