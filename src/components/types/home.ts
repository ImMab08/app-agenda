import type React from "react";

export interface DashboardStats {
  todayAppointments: number;
  todayRevenue: number;
  pendingConfirmations: number;
  availableStylists: number;
  completedToday: number;
  cancelledToday: number;
}

export interface TodayAppointment {
  id: string;
  time: string;
  client: string;
  service: string;
  stylist: string;
  status: "confirmed" | "pending" | "in-progress" | "completed" | "cancelled";
  duration: number;
  price: number;
  phone?: string;
  isLate?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  color: string;
}

export interface StylistStatus {
  id: string;
  name: string;
  status: "available" | "busy" | "break" | "offline";
  currentClient?: string;
  nextAppointment?: string;
  avatar?: string;
}

export interface InventoryAlert {
  id: string;
  product: string;
  currentStock: number;
  minStock: number;
  urgency: "low" | "medium" | "high";
}
