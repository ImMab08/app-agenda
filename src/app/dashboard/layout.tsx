'use client'
import { Sidebar } from "@/components/shared/sidebar/component_sidebar";
import { salonSidebarConfig } from "@/components/config/config_siderbar";
import { DashboardHeader } from "@/components/shared/header/component_dashboard_header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen bg-gray-100/80">
      <section>
        <Sidebar config={salonSidebarConfig} />
      </section>
      <section className="w-full h-full flex flex-col">
        <div className="w-full h-24">
          <DashboardHeader /> 
        </div>
        {children}
      </section>
    </main>
  );
}
