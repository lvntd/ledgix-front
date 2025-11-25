import { IConversationStyle } from '@/services'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select'

type Props = {
  value: IConversationStyle
  onChange: (value: IConversationStyle) => void
}

export const SelectConversationStyle = ({ value, onChange }: Props) => {
  const t = (val: string) => val

  const options: Array<IConversationStyle> = [
    'normal',
    'concise',
    'explanatory',
    'formal',
  ]

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        localStorage.setItem('baseModelName', value)
        onChange(value as IConversationStyle)
      }}
    >
      <SelectTrigger
        size="sm"
        className="w-[180px] outline-none border-none shadow-none "
      >
        <SelectValue placeholder={t('choose_style')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('choose_style')}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`chat_styles.${option}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
