'use client'
import { useAuth } from '@/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import authConfigs from '@/configs/auth'
import Image from 'next/image'
import Cookies from 'js-cookie'

interface AuthGuardProps {
  children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter()
  const pathName = usePathname()
  const auth = useAuth()

  console.log(auth)

  useEffect(
    () => {
      const accessToken = Cookies.get(authConfigs.storageTokenKeyName)

      console.log({ accessToken })

      if (!accessToken && pathName !== '/signup') {
        router.replace(`/login?returnUrl=${pathName}`)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  if (auth.loading) {
    return (
      <main className="flex h-dvh w-full animate-pulse flex-col items-center justify-center">
        <Image
          alt="PriveAI"
          className="animate-pulse"
          height={70}
          src="/app-logos/logo-solid.svg"
          width={70}
        />
        <p className="mt-2">{'Loading...'}</p>
      </main>
    )
  }

  if (auth.user === null) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
