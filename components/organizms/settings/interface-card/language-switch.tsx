'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

export const LanguageSwitch = () => {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const query = useSearchParams()

  return (
    <div className="flex w-full items-center justify-between">
      <p>{t('app_language')}</p>
      <Select
        value={locale}
        onValueChange={(value) =>
          router.replace(`${pathname}?${query.toString()}`, { locale: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="ka">{t('languages.ka')}</SelectItem>
            <SelectItem value="en">{t('languages.en')}</SelectItem>
            <SelectItem value="ru">{t('languages.ru')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
