"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { dashboardTitles } from "@/components/config/config_headers_titles";

import { SidebarMobile } from "@/components/shared/sidebar/component_sidebar_mobile";
import { salonSidebarConfig } from "@/components/config/config_siderbar";

import { IconMenu } from "@/components/icons";

const DashboardHeader = () => {
  const pathname = usePathname();
  const title = dashboardTitles[pathname] ?? "N/A";
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Eliminar todos los useEffect que dependían de appointments
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full h-16 xl:h-24 bg-white background border-b border-border flex items-center px-4 space-x-4 xl:space-x-0 ">
      <div className="flex xl:hidden">
        <IconMenu width={32} height={32} onClick={openSidebar} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold text-text-primary">
          {title}
        </h2>
        <p className="hidden md:block text-xs md:text-base text-text-secondary/40">
          {currentTime.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>

      {/* Menú lateral en vista mobile */}
      <div className="flex xl:hidden">
        <SidebarMobile
          config={salonSidebarConfig}
          isOpenModal={{
            isOpen: isSidebarOpen,
            onClose: closeSidebar,
          }}
        />
      </div>
    </header>
  );
};

export { DashboardHeader };
