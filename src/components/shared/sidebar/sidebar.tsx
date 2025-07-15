"use client";
import type React from "react";
import { useState } from "react";

import { SidebarTooltip } from "./sidebar_tooltip";
import type { SidebarConfig, MenuItem } from "@/components/types/sidebar";

import { IconLeft, IconRight } from "@/components/icons";

interface SidebarProps {
  config: SidebarConfig;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  className?: string;
}

export function Sidebar({
  config,
  isCollapsed = false,
  onToggleCollapse,
  className = "",
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [hoveredItem, setHoveredItem] = useState<{
    text: string;
    position: { x: number; y: number };
  } | null>(null);

  const mainSections = config.sections.filter((s) => !s.separator);
  const footerSections = config.sections.filter((s) => s.separator);

  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggleCollapse?.(newCollapsed);
  };

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
          bg-white flex flex-col transition-all duration-300 ease-in-out h-screen shadow-2xl
          ${collapsed ? "w-16" : "w-64"}
          ${className}
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

        {/* === MENU SECTIONS === */}
        {/* Main section */}
        <div className="flex-1">
          {mainSections.map((section, sectionIndex) => (
            <div key={section.id}>
              {section.separator && sectionIndex > 0 && (
                <div className="border-t border-gray-200 my-2" />
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
                        item.isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
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

        {/* Footer section */}
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
                        item.isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
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

      {/* Open and close menu */}
      <button
        onClick={handleToggleCollapse}
        className={`absolute z-50 p-1 bg-white rounded-r-md transition-all duration-300 ease-in-out bottom-13 cursor-pointer ${
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
        <SidebarTooltip
          isVisible={true}
          text={hoveredItem.text}
          position={hoveredItem.position}
        />
      )}
    </>
  );
}
