/* eslint-disable @typescript-eslint/no-explicit-any */
import authConfigs from '@/configs/auth'
import { IBaseModel, IConversationStyle } from '@/services'

import { fetchEventSource } from '@microsoft/fetch-event-source'
import Cookies from 'js-cookie'

// TODO. ConversationFormInput can be in ConversationForm or Services
type ConversationFormInput = {
  message: string
  conversationStyle: IConversationStyle
  baseModel: IBaseModel
}

export type SendConversationMessageInput = {
  conversationId: string | null
} & ConversationFormInput

export const sendConversationMessage = async (
  data: SendConversationMessageInput,
  {
    onStart,
    onMessage,
    onComplete,
    onError,
  }: {
    onStart: () => void
    onMessage: (message: any) => void
    onComplete: () => void
    onError: (error: Error) => void
  },
) => {
  onStart()

  // Create abort controller for manual connection control
  const abortController = new AbortController()

  // Get auth token
  const accessToken = Cookies.get(authConfigs.storageTokenKeyName)
  if (!accessToken) {
    onError(new Error('Authentication token missing'))

    return
  }

  try {
    await fetchEventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/conversation/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,

          // Add Cache-Control header to prevent caching issues on iOS
          'Cache-Control': 'no-cache',
          'Referrer-Policy': 'no-referrer-when-downgrade',
        },
        body: JSON.stringify(data),
        signal: abortController.signal,
        credentials: 'same-origin',

        // Important for iOS
        openWhenHidden: true,

        async onopen(response) {
          // Check if connection was successfully established
          if (
            response.ok &&
            response.headers.get('content-type')?.includes('text/event-stream')
          ) {
            console.log('SSE connection opened successfully')

            return // Connection is good
          }

          // Handle error responses
          let errorMsg = 'Failed to connect to the server'

          if (response.status === 401 || response.status === 403) {
            errorMsg = 'Authentication error'
          } else if (response.status >= 500) {
            errorMsg = 'Server error'
          }

          // Abort the connection on errors
          abortController.abort()
          onError(new Error(errorMsg))
          throw new Error(errorMsg)
        },

        onmessage(event) {
          try {
            // Handle message parsing
            const parsedData = JSON.parse(event.data)
            onMessage(parsedData)
          } catch (err: any) {
            console.error('Failed to parse message:', event.data, err)
          }
        },

        onerror(err) {
          console.error('SSE Error:', err)

          // iOS-specific error handling
          if (
            err.toString().includes('Load failed') ||
            err.toString().includes('aborted') ||
            err.toString().includes('network')
          ) {
            onError(
              new Error(
                'Connection error. Please check your internet connection.',
              ),
            )
          } else {
            onError(err)
          }

          // Critical - don't throw here, just return false
          return
        },

        onclose() {
          console.log('SSE connection closed')
          onComplete()
        },
      },
    )
  } catch (error) {
    console.error('Error in SSE setup:', error)
    onError(
      error instanceof Error ? error : new Error('Unknown error occurred'),
    )

    // Don't rethrow the error - this prevents page refresh
  }

  // Return the abort controller for external cancellation
  return abortController
}
