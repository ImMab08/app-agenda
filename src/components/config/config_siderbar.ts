'use client'

import { IconCalendar, IconClients, IconLogout, IconSettings, IconStats, IconUser } from "../icons"
import type { SidebarConfig } from "../types/sidebar"

export const salonSidebarConfig: SidebarConfig = {
  sections: [
    {
      id: "main",
      items: [
        {
          id: "inicio",
          label: "Inicio",
          icon: IconUser,
          href: "/dashboard/",
          isActive: false,
        },
        {
          id: "calendario",
          label: "Calendario",
          icon: IconCalendar,
          href: "/dashboard/calendar",
          isActive: true,
        },
        {
          id: "clientes",
          label: "Clientes",
          icon: IconClients,
          href: "/dashboard/clients",
        },
        {
          id: "stats",
          label: "Estadísticas",
          icon: IconStats,
          href: "/dashboard/reportes",
        },
      ],
    },
    {
      id: "footer",
      separator: true,
      items: [
        {
          id: "configuracion",
          label: "Configuración",
          icon: IconSettings,
          href: "/dashboard/settings",
        },
        {
          id: "cerrar-sesion",
          label: "Cerrar Sesión",
          icon: IconLogout,
          onClick: () => {
            console.log("Cerrando sesión...")
          },
        },
      ],
    },
  ],
}
