"use client";

// Importación de tipado (SidebarConfig).
import type { SidebarConfig } from "@/components/types/sidebar";

// Importación de iconos.
import {
  IconHome,
  IconLogout,
  IconCalendar,
  IconSettings,
} from "@/components/icons";


export const salonSidebarConfig: SidebarConfig = {
  sections: [
    {
      id: "main",
      items: [
        {
          id: "inicio",
          label: "Inicio",
          icon: IconHome,
          href: "/dashboard/home",
        },
        {
          id: "calendario",
          label: "Calendario",
          icon: IconCalendar,
          href: "/dashboard/calendar",
        }
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
            console.log("Cerrando sesión...");
          },
        },
      ],
    },
  ],
};
