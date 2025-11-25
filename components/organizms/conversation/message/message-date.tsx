import React from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Link } from '@/i18n/navigation'

type Props = {
  date?: string | null
  className?: string
  showDisclaimer?: boolean
}

export const MessageDate = ({ date, className, showDisclaimer }: Props) => {
  const t = useTranslations()
  if (date === undefined || date === null) {
    return null
  }

  return (
    <span
      className={clsx(
        `flex items-center gap-2 text-[10px] text-muted-foreground md:opacity-0 md:group-hover:opacity-100`,
        'transition-all duration-200 ease-in-out',
        className,
      )}
    >
      {dayjs(date).format('DD MMM HH:mm:ss')}
      {showDisclaimer && (
        <span className="hidden md:block">
          {`| ${t('prive_may_make_mistakes.title')}.`}
          <Link className="ml-1" href="/faq" target="_blank">
            {t('learn_the_details')}
          </Link>
        </span>
      )}
    </span>
  )
}
