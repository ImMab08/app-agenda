import type { ComponentType } from "react";
import { ModalProps } from "./open_modal";

export interface MenuItem {
  // Obligatorio.
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;

  // Opcionales
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface MenuSection {
  // Obligatorio.
  id: string;
  items: MenuItem[];

  // Opcionales
  separator?: boolean;
}

export interface SidebarConfig {
  // Obligatorio.
  sections: MenuSection[];
}

export interface SidebarProps {
  // Obligatorio.
  config: SidebarConfig;

  // Opcionales
  isCollapsed?: boolean;
  isOpenModal?: ModalProps;
}
