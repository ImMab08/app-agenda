import type { ComponentType } from "react"

export interface MenuItem {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  isActive?: boolean
}

export interface MenuSection {
  id: string
  items: MenuItem[]
  separator?: boolean
}

export interface SidebarConfig {
  sections: MenuSection[]
}
