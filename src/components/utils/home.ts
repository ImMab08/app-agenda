import type { Appointment } from "@/components/types/appoitments";
import type { TodayAppointment, DashboardStats } from "@/components/types/home";

export function convertAppointmentToTodayAppointment(
  appointment: Appointment
): TodayAppointment {
  // Mapear servicios a precios (en producción esto vendría de una base de datos)
  const servicePrices: Record<string, number> = {
    "Corte de Cabello": 45,
    Coloración: 85,
    Peinado: 35,
    Tratamiento: 60,
    Manicure: 25,
    Pedicure: 30,
  };

  // Mapear servicios a duración (en minutos)
  const serviceDurations: Record<string, number> = {
    "Corte de Cabello": 60,
    Coloración: 120,
    Peinado: 90,
    Tratamiento: 45,
    Manicure: 60,
    Pedicure: 75,
  };

  return {
    id: appointment.id,
    time: appointment.startTime,
    client: appointment.client,
    service: appointment.service,
    stylist: appointment.stylist,
    status:
      appointment.status === "confirmed"
        ? "confirmed"
        : appointment.status === "cancelled"
        ? "cancelled"
        : "pending",
    duration: serviceDurations[appointment.service] || 60,
    price: servicePrices[appointment.service] || 50,
    phone: appointment.phone,
    isLate: false, // En producción, esto se calcularía comparando la hora actual
  };
}

export function calculateDashboardStats(
  appointments: Appointment[]
): DashboardStats {
  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter((apt) => apt.date === today);

  const servicePrices: Record<string, number> = {
    "Corte de Cabello": 45,
    Coloración: 85,
    Peinado: 35,
    Tratamiento: 60,
    Manicure: 25,
    Pedicure: 30,
  };

  const todayRevenue = todayAppointments
    .filter((apt) => apt.status === "confirmed")
    .reduce((total, apt) => total + (servicePrices[apt.service] || 50), 0);

  return {
    todayAppointments: todayAppointments.length,
    todayRevenue,
    pendingConfirmations: todayAppointments.filter(
      (apt) => apt.status === "pending"
    ).length,
    availableStylists: 2, // En producción, esto se calcularía dinámicamente
    completedToday: todayAppointments.filter(
      (apt) => apt.status === "confirmed"
    ).length,
    cancelledToday: todayAppointments.filter(
      (apt) => apt.status === "cancelled"
    ).length,
  };
}

export function getTodayAppointments(
  appointments: Appointment[]
): TodayAppointment[] {
  const today = new Date().toISOString().split("T")[0];
  return appointments
    .filter((apt) => apt.date === today)
    .map(convertAppointmentToTodayAppointment)
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function checkLateAppointments(
  appointments: TodayAppointment[]
): TodayAppointment[] {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return appointments.map((apt) => ({
    ...apt,
    isLate:
      apt.status === "confirmed" &&
      apt.time < currentTime
  }));
}
