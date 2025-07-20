"use client";
import type React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { dashboardTitles } from "@/components/config/config_headers_titles";

import { SidebarMobile } from "@/components/shared/sidebar/component_sidebar_mobile";
import { salonSidebarConfig } from "@/components/config/config_siderbar";

import { IconMenu } from "@/components/icons";

const DashboardHeader = () => {
  const pathname = usePathname();
  const title = dashboardTitles[pathname] ?? "N/A";

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <header className="w-full h-16 xl:h-24 bg-white background border-b border-border flex items-center px-4 space-x-4 xl:space-x-0 ">
      <div className="flex xl:hidden">
        <IconMenu width={32} height={32} onClick={openSidebar} />
      </div>
      <div className="">
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
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
