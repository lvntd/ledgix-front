'use client'
import React, { useState } from 'react'
import { Button } from '@/components/atoms'
import { Input } from '@/components/atoms/input'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

type Props = React.ComponentProps<'input'> & { wrapperClassname?: string }

export const InputPassword = ({ wrapperClassname, ...inputProps }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={cn('relative', wrapperClassname)}>
      <Input type={isVisible ? 'text' : 'password'} {...inputProps} />
      <Button
        size="icon"
        onClick={() => setIsVisible((prev) => !prev)}
        type="button"
        variant="ghost"
        className="absolute right-0 hover:bg-transparent"
      >
        {isVisible ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  )
}
