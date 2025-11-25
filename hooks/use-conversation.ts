import { sendConversationMessage, SendConversationMessageInput } from '@/lib'
import {
  IAnthropicUsage,
  IContentBlock,
  IConversation,
  IConversationResponse,
  IExtendedModelMessage,
  qk,
} from '@/services'
import { useQueryClient } from '@tanstack/react-query'
// import { useTranslation } from 'next-i18next'
import { useQueryState } from 'nuqs'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

type CreateConversationMessageInput = {
  role: IExtendedModelMessage['role']
  text: string
}

export const createConversationMessage = ({
  text,
  role,
}: CreateConversationMessageInput): IExtendedModelMessage => ({
  role,
  content: [
    {
      type: 'text',
      text,
    },
  ],
  redactedContent: [],
  feedback: null,
  context: null,
  resourceChunkIds: [],
})

type Props = { conversationBottomRef: React.RefObject<HTMLDivElement | null> }

export const useConversation = ({ conversationBottomRef }: Props) => {
  // const { t } = useTranslation()
  const [conversationId, setConversationId] = useQueryState('conversationId')

  const [isLoading, setIsLoading] = useState(false)
  const [currentState, setCurrentState] = useState('INITIAL')
  const queryClient = useQueryClient()

  const zeroUsage: IAnthropicUsage = useMemo(
    () => ({
      inputTokens: 0,
      outputTokens: 0,
      cacheCreationInputTokens: 0,
      cacheReadInputTokens: 0,
    }),
    [],
  )

  const initialData: IConversationResponse = useMemo(() => {
    const conversation = {
      _id: null,
      messages: [],
      user: null,
      title: null,
      baseModelUsage: zeroUsage,
      priveUsage: 0,
      type: null,
      style: 'normal',
      createdAt: '',
      updatedAt: '',
    } as IConversation

    return { data: conversation }
  }, [zeroUsage])

  const optimisticUpdate = (data: SendConversationMessageInput) => {
    queryClient.setQueryData<IConversationResponse>(
      qk.conversation.details({ conversationId }).queryKey,
      (old) => {
        if (old === undefined) {
          return {
            data: {
              ...initialData.data,
              messages: [
                ...initialData.data.messages,
                createConversationMessage({ role: 'user', text: data.message }),
              ],
            },
          }
        } else {
          return {
            data: {
              ...old.data,
              messages: [
                ...old.data.messages,
                createConversationMessage({ role: 'user', text: data.message }),
              ],
            },
          }
        }
      },
    )
  }

  const updateByContentBlock = (contentBlock: IContentBlock) => {
    queryClient.setQueryData<IConversationResponse>(
      qk.conversation.details({ conversationId }).queryKey,
      (old) => {
        const conversationQueryState =
          old !== undefined ? { ...old } : { ...initialData }

        const messages = [...conversationQueryState.data.messages]
        const lastMessage = messages.pop()

        const content = lastMessage?.content

        if (content !== undefined) {
          const updatedLastMessage: IExtendedModelMessage = {
            ...lastMessage,
            role: 'assistant',
            content: [...content, contentBlock],
            redactedContent: [],
            feedback: null,
            context: null,
            resourceChunkIds: [],
          }

          return {
            data: {
              ...conversationQueryState.data,
              messages: [...messages, updatedLastMessage],
            },
          }
        } else {
          return conversationQueryState
        }
      },
    )
  }

  const createEmptyAssistantMessage = () => {
    queryClient.setQueryData<IConversationResponse>(
      qk.conversation.details({ conversationId }).queryKey,
      (old) => {
        const conversationQueryState = old || initialData

        return {
          data: {
            ...conversationQueryState.data,
            messages: [
              ...conversationQueryState.data.messages,
              createConversationMessage({ role: 'assistant', text: '' }),
            ],
          },
        }
      },
    )
  }

  const onSendMessage = async (data: SendConversationMessageInput) => {
    console.log({ data })
    await sendConversationMessage(data, {
      onStart: () => {
        optimisticUpdate(data)
        setIsLoading(true)
      },
      onMessage: (message) => {
        if (message?.type === 'state-change') {
          setCurrentState(message.state || 'INITIAL')

          return
        }

        if (message?.type === 'message_start') {
          setIsLoading(false)
          createEmptyAssistantMessage()

          return
        }

        if (message.conversationId !== undefined) {
          setCurrentState('INITIAL')
          const currentQueryData =
            queryClient.getQueryData<IConversationResponse>(
              qk.conversation.details({ conversationId }).queryKey,
            )

          queryClient.setQueryData<IConversationResponse>(
            qk.conversation.details({ conversationId: message.conversationId })
              .queryKey,
            () => currentQueryData,
          )

          if (conversationId === null) {
            setConversationId(message.conversationId)
          }
          queryClient.invalidateQueries({ queryKey: qk.conversation._def })
          queryClient.invalidateQueries({ queryKey: qk.user._def })

          queryClient.setQueryData<IConversationResponse>(
            qk.conversation.details({ conversationId: null }).queryKey,
            () => initialData,
          )

          return
        }

        // Update assistant-message.tsx content
        updateByContentBlock(message)
        conversationBottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
      },
      onError: (error: Error) => {
        console.error(error)
        setIsLoading(false)
        queryClient.invalidateQueries({ queryKey: qk.conversation._def })
        toast.error('TODO. something went wrong')
      },
      onComplete: () => {},
    })
  }

  return {
    onSendMessage,
    isLoading,
    conversationId,
    setConversationId,
    initialData,
    currentState,
  }
}
