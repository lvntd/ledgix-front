'use client'

import { type LucideIcon } from 'lucide-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/atoms/sidebar'
import { Button } from '@/components/atoms'

export function NavMain({
  items,
}: {
  items: {
    title: string
    onClick: () => void
    icon: LucideIcon
    isActive?: boolean
    isPrimary?: boolean
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        if (item.isPrimary) {
          return (
            <SidebarMenuItem key={item.title}>
              <Button
                className="cursor-pointer w-full h-8"
                onClick={item.onClick}
              >
                <item.icon />
                <span>{item.title}</span>
              </Button>
            </SidebarMenuItem>
          )
        } else {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="cursor-pointer"
                onClick={item.onClick}
              >
                <div>
                  <item.icon />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }
      })}
    </SidebarMenu>
  )
}
