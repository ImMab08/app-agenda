"use client";
import { useState } from "react";

import { ClientsConfig } from "@/components/config/config_settings_page/config_clients";
// import { StylistsConfig } from "@/components/config/config_settings_page/stylists-config";
// import { ServicesConfig } from "@/components/config/config_settings_page/services-config";
import { InventoryConfig } from "@/components/config/config_settings_page/config_inventory";
// import { SalonGeneralConfig } from "@/components/config/config_settings_page/config_salon_general";

import {
  IconCalendar,
  IconClients,
  IconInfo,
  IconUser,
} from "@/components/icons";

type ConfigSection =
  | "general"
  | "collaborator"
  | "services"
  | "clients"
  | "inventory"
  | "appointments"
  | "notifications";

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<ConfigSection>("general");

  const sections = [
    {
      id: "general" as ConfigSection,
      name: "Información General",
      // Store
      icon: IconInfo,
      description: "Datos del salón y configuración básica",
    },
    {
      id: "appointments" as ConfigSection,
      name: "Citas",
      icon: IconCalendar,
      description: "Configuración de horarios y citas",
    },
    {
      id: "clients" as ConfigSection,
      name: "Clientes",
      icon: IconClients,
      description: "Gestionar base de datos de clientes",
    },
    {
      id: "collaborator" as ConfigSection,
      name: "Colaboradores",
      icon: IconUser,
      description: "Gestionar trabajadores y sus horarios",
    },
    {
      id: "services" as ConfigSection,
      name: "Servicios",
      icon: IconInfo,
      description: "Configurar servicios, precios y duración",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "general":
      // return <SalonGeneralConfig />;
      case "collaborator":
      // return <StylistsConfig />;
      case "services":
      // return <ServicesConfig />;
      case "clients":
        return <ClientsConfig />;
      case "inventory":
        return <InventoryConfig />;
      case "appointments":
        return (
          <div className="p-6 text-center text-gray-500">
            Configuración de citas - Próximamente
          </div>
        );
      case "notifications":
        return (
          <div className="p-6 text-center text-gray-500">
            Configuración de notificaciones - Próximamente
          </div>
        );
      default:
      // return <SalonGeneralConfig />;
    }
  };

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>

      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg">
        <nav className="p-4">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  w-full flex items-start gap-3 p-4 rounded-lg text-left transition-colors cursor-pointer
                  ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-primary"
                      : "text-gray-700 hover:bg-gray-50 hover:border-l-2 hover:border-primary"
                  }
                `}
              >
                <section.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{section.name}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {section.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
