import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/components/atoms'
import { HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'

export const ConversationGreeting = () => {
  const t = (val: string) => val
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="group peer relative flex size-36 items-center justify-center rounded-full bg-card shadow-1 transition-all duration-200 ease-in-out hover:shadow">
        <Image
          alt="Prive AI logo"
          className="opacity-70 transition-all duration-200 ease-in-out group-hover:scale-95 group-hover:animate-none"
          height={70}
          src={
            resolvedTheme === 'dark'
              ? '/app-logos/logo-white.svg'
              : '/app-logos/logo-solid.svg'
          }
          width={70}
        />
      </div>
      <p className="max-w-[80%] text-center text-lg text-raisin-90">
        {t('hello_how_can_i_help')}
      </p>

      <p
        className={clsx(
          'max-w-2xl whitespace-pre-line text-center text-sm text-raisin-80',
          '-translate-y-1 transition-all duration-200 ease-in-out',
        )}
      >
        {t('chat_v2_subtitle')}
      </p>
      <Button
        variant="secondary"
        onClick={() => {
          toast.success('TODO. Tour started')
        }}
      >
        <div className="flex items-center gap-1 px-1 text-sm">
          <HelpCircle size={18} />
          <span>{t('how_to_use')}</span>
        </div>
      </Button>
    </div>
  )
}
