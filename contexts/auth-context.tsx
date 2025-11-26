'use client'
import { createContext, useEffect, useState, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IUser, qk } from '@/services'
import authConfigs from '@/configs/auth'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

type AuthValuesType = { user: IUser | null; loading: boolean; canChat: boolean }

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  canChat: false,
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter()
  const $user = useQuery({
    ...qk.user.details,
    enabled: Boolean(Cookies.get(authConfigs.storageTokenKeyName)),
  })

  const loading = $user.isLoading
  const [user, setUser] = useState<IUser | null>(null)
  const canChat = user
    ? user.remainingTokens > 0 && dayjs().isBefore(user.tokensExpireOn)
    : false

  useEffect(() => {
    if ($user.error?.message === 'error_not_authorized') {
      setUser(null)
      router.push('/login')
    }

    if ($user.data === undefined) {
      setUser(null)
    } else {
      setUser($user.data.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$user.data, $user.error?.message])

  const values = {
    user,
    loading,
    canChat,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
