'use client'
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/atoms'

export const ThemeToggler = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      size={'icon'}
      className="cursor-pointer"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
