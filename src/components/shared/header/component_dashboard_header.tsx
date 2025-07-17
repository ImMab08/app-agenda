"use client";
import { dashboardTitles } from "@/components/config/config_headers_titles";
import { usePathname } from "next/navigation";
import type React from "react";

const DashboardHeader = () => {
  const pathname = usePathname();
  const title = dashboardTitles[pathname] ?? "N/A";

  return (
    <header className="w-full h-full bg-white background border-b border-border flex items-center px-4">
      <div className="">
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      </div>
      <div></div>
    </header>
  );
};

export { DashboardHeader };
