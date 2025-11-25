import { IBaseModel } from '@/services'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'
import { useTranslations } from 'next-intl'

type Props = { value: IBaseModel; onChange: (value: IBaseModel) => void }

export const SelectBaseModel = ({ value, onChange }: Props) => {
  const t = useTranslations()

  const options: Array<IBaseModel> = ['claude_4_5_sonnet', 'claude_3_7_sonnet']

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        localStorage.setItem('baseModelName', value)
        onChange(value as IBaseModel)
      }}
    >
      <SelectTrigger
        size="sm"
        className="w-[180px] outline-none border-none shadow-none "
      >
        <SelectValue placeholder={t('choose_base_model')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('choose_base_model')}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`base_models.${option}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
