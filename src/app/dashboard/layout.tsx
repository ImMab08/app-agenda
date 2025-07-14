import { Sidebar } from "@/components/shared/sidebar/sidebar";
import { salonSidebarConfig } from "@/components/config/config_siderbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex size-full">
      <section>
        <Sidebar config={salonSidebarConfig} />
      </section>
      <section className="w-full h-screen">{children}</section>
    </main>
  );
}
