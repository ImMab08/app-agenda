"use client";

// Importación de generales.
import { useState } from "react";
import { usePathname } from "next/navigation";

// Importación de tipados.
import type React from "react";
import type { MenuItem, SidebarProps } from "@/components/types/sidebar";

// Importación de componente (TooltipSidebar).
import { TooltipSidebar } from "@/components/tooltip/tooltip_sidebar";

// Importación de iconos.
import { IconLeft, IconRight } from "@/components/icons";

export function Sidebar({
  config,
  isCollapsed = false,
}: SidebarProps) {

  
  // Hook que devuelve la ruta actual del navegador y nos
  // permite saber en qué página o sección nos encontramos.
  const pathname = usePathname();
  
  // Estado que indica si el sidebar está colapsado (true) o expandido (false).
  // Inicialmente toma el valor de la prop 'isCollapsed'.
  const [collapsed, setCollapsed] = useState(isCollapsed);
  
  // Estado que almacena la información del ítem actualmente "hovered"
  // (pasado el cursor encima) cuando el sidebar está colapsado.
  // Guarda el texto del ítem y su posición en la pantalla para mostrar un tooltip.
  const [hoveredItem, setHoveredItem] = useState<{
    text: string;
    position: { x: number; y: number };
  } | null>(null);
  
  // Filtra las secciones principales del sidebar, es decir,
  // aquellas que NO tienen separador (separator === false).
  const mainSections = config.sections.filter((s) => !s.separator);
  
  // Filtra las secciones del pie del sidebar, es decir,
  // aquellas que SÍ tienen separador (separator === true).
  const footerSections = config.sections.filter((s) => s.separator);
  
  // === FUNCIONES ===
  // Cambia el estado de colapsado del sidebar.
  // Si estaba expandido, lo colapsa, y viceversa.
  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
  };

  // Maneja el evento de hover (pasar el mouse por encima) sobre un ítem.
  // Si el sidebar está colapsado, calcula la posición del ítem en pantalla
  // y guarda su información para mostrar un tooltip contextual.
  const handleItemHover = (item: MenuItem, event: React.MouseEvent) => {
    if (collapsed) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoveredItem({
        text: item.label,
        position: {
          x: rect.right + 8,
          y: rect.top + rect.height / 2 - 14,
        },
      });
    }
  };

  // Maneja el evento de clic sobre un ítem del menú.
  // Si el ítem tiene definida una función `onClick`, la ejecuta.
  // En caso contrario, si tiene una URL (`href`), navega hacia esa ruta.
  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <>
      <div
        className={`
          flex bg-white flex-col transition-all duration-300 ease-in-out h-screen shadow-2xl
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0"></div>
              {!collapsed && (
                <span className="text-xl font-bold text-gray-800"></span>
              )}
            </div>
          </div>
        </div>

        {/* === Sección del menú navegable === */}
        {/* Contenedor principal */}
        <div className="flex-1">
          {mainSections.map((section, sectionIndex) => (
            <div key={section.id}>
              {section.separator && sectionIndex > 0 && (
                <div className="border-t border-border my-2" />
              )}
              <div className="p-2">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={(e) => handleItemHover(item, e)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-left cursor-pointer
                      ${
                        pathname === item.href
                          ? "bg-blue-50 text-primary"
                          : "text-gray-700 hover:bg-gray-100 hover:border-l-2 hover:border-primary"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <div className="flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-base font-medium">
                          {item.label}
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contenedor del footer */}
        {footerSections.some((section) => section.separator) && (
          <div className="border-t border-gray-200 p-2">
            {config.sections
              .filter((section) => section.separator)
              .map((section) =>
                section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={(e) => handleItemHover(item, e)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-left cursor-pointer
                      ${
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100 hover:border-l-2 hover:border-primary"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <div className="flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    {!collapsed && (
                      <span className="flex-1 text-base font-medium">
                        {item.label}
                      </span>
                    )}
                  </button>
                ))
              )}
          </div>
        )}
      </div>

      {/* Abrir o contraer el menú lateral */}
      <button
        onClick={handleToggleCollapse}
        className={`absolute z-50 p-1 bg-white shadow-2xs rounded-r-md transition-all duration-300 ease-in-out bottom-13 cursor-pointer ${
          collapsed ? "left-16" : "left-64"
        }`}
      >
        {collapsed ? (
          <IconRight className="size-6" />
        ) : (
          <IconLeft className="size-6" />
        )}
      </button>

      {/* Tooltip */}
      {hoveredItem && (
        <TooltipSidebar
          isVisible={true}
          text={hoveredItem.text}
          position={hoveredItem.position}
        />
      )}
    </>
  );
}
