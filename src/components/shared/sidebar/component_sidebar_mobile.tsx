"use client";
import { usePathname } from "next/navigation";

import type React from "react";
import type { MenuItem, SidebarProps } from "@/components/types/sidebar";
import { IconClose } from "@/components/icons";

export function SidebarMobile({ config, isOpenModal }: SidebarProps) {
  const isOpen = isOpenModal?.isOpen ?? true;

  // Hook que devuelve la ruta actual del navegador y nos
  // permite saber en qué página o sección nos encontramos.
  const pathname = usePathname();

  // Filtra las secciones principales del sidebar, es decir,
  // aquellas que NO tienen separador (separator === false).
  const mainSections = config.sections.filter((s) => !s.separator);

  // Filtra las secciones del pie del sidebar, es decir,
  // aquellas que SÍ tienen separador (separator === true).
  const footerSections = config.sections.filter((s) => s.separator);

  // Maneja el evento de clic sobre un ítem del menú.
  // Si el ítem tiene definida una función `onClick`, la ejecuta.
  // En caso contrario, si tiene una URL (`href`), navega hacia esa ruta.
  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
      isOpenModal?.onClose();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <>
      <div
        className={`
          bg-white w-4/5 flex flex-col justify-between h-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        <div className="flex items-center justify-between h-16 px-5 border-b border-divider">
          <h1 className="text-2xl font-bold text-text-primary">Menú</h1>
          <IconClose onClick={isOpenModal?.onClose} />
        </div>

        {/* === Sección del menú navegable === */}
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
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-left cursor-pointer
                      ${
                        pathname === item.href
                          ? "bg-blue-50 text-primary"
                          : "text-gray-700 hover:bg-gray-100 hover:border-l-2 hover:border-primary"
                      }
                    `}
                  >
                    <div className="flex space-x-2">
                      <item.icon className="w-6 h-6" />
                      <span className="flex-1 text-base font-medium">
                        {item.label}
                      </span>
                    </div>
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
                    className={`
                      w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-left cursor-pointer
                      ${
                        pathname === item.href
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100 hover:border-l-2 hover:border-primary"
                      }
                    `}
                  >
                    <div className="flex space-x-2">
                      <item.icon className="w-6 h-6" />
                      <span className="flex-1 text-base font-medium">
                        {item.label}
                      </span>
                    </div>
                  </button>
                ))
              )}
          </div>
        )}
      </div>

      {isOpen ? (
        <div
          className="bg-black/40 top-0 left-0 fixed z-40 w-full h-full"
          onClick={isOpenModal?.onClose}
        ></div>
      ) : (
        ""
      )}
    </>
  );
}
