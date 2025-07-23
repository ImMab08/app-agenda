"use client";
import { useState, useEffect } from "react";

import type {
  DashboardStats,
  TodayAppointment,
  QuickAction,
  // StylistStatus,
} from "@/components/types/home";
// import type { Appointment } from "@/components/types/appoitments";

import {
  IconAdd,
  IconCalendar,
  IconPhone,
} from "@/components/icons";
import SearchInput from "@/components/ui/input_search";

// Datos mock que no cambian (en producción vendrían de APIs)
// const mockStylists: StylistStatus[] = [
//   {
//     id: "1",
//     name: "Ana Rodríguez",
//     status: "busy",
//     currentClient: "María García",
//     nextAppointment: "10:30",
//   },
//   {
//     id: "2",
//     name: "María González",
//     status: "available",
//     nextAppointment: "10:30",
//   },
//   {
//     id: "3",
//     name: "Laura Sánchez",
//     status: "break",
//     nextAppointment: "11:00",
//   },
// ];

interface DashboardProps {
  // appointments: Appointment[]; // Recibir las citas reales
  onNewAppointment: () => void;
  onSearchClient: () => void;
  onViewCalendar: () => void;
}

// Eliminar las props relacionadas con appointments y usar los datos mock originales
export function HomePage({
  onNewAppointment,
  onViewCalendar,
}: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
   const [search, setSearch] = useState("");


  // Usar datos mock estáticos para el dashboard
  const mockStats: DashboardStats = {
    todayAppointments: 12,
    todayRevenue: 850,
    pendingConfirmations: 3,
    availableStylists: 2,
    completedToday: 8,
    cancelledToday: 1,
  };

  const mockTodayAppointments: TodayAppointment[] = [
    {
      id: "1",
      time: "09:00",
      client: "María García",
      service: "Corte y Peinado",
      stylist: "Ana Rodríguez",
      status: "in-progress",
      duration: 60,
      price: 45,
      phone: "555-0123",
    },
    {
      id: "2",
      time: "10:30",
      client: "Carmen López",
      service: "Coloración",
      stylist: "María González",
      status: "confirmed",
      duration: 120,
      price: 85,
      phone: "555-0456",
    },
    {
      id: "3",
      time: "11:00",
      client: "Isabel Martín",
      service: "Manicure",
      stylist: "Laura Sánchez",
      status: "pending",
      duration: 45,
      price: 25,
      phone: "555-0789",
      isLate: true,
    },
  ];

  // Eliminar todos los useEffect que dependían de appointments
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Usar los datos mock directamente
  const stats = mockStats;
  const todayAppointments = mockTodayAppointments;

  const quickActions: QuickAction[] = [
    {
      id: "new-appointment",
      label: "Nueva cita",
      icon: IconAdd,
      onClick: onNewAppointment,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "view-calendar",
      label: "Ver agenda",
      icon: IconCalendar,
      onClick: onViewCalendar,
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const getStatusColor = (status: TodayAppointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: TodayAppointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "in-progress":
        return "En Proceso";
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconocido";
    }
  };

  // const getStylistStatusColor = (status: StylistStatus["status"]) => {
  //   switch (status) {
  //     case "available":
  //       return "bg-green-500";
  //     case "busy":
  //       return "bg-red-500";
  //     case "break":
  //       return "bg-yellow-500";
  //     case "offline":
  //       return "bg-gray-500";
  //     default:
  //       return "bg-gray-500";
  //   }
  // };

  return (
    <div className="p-4 h-full overflow-auto ">
      <div className="h-full flex flex-col rounded-lg shadow-lg bg-surface mx-auto p-4 overflow-auto">
        {/* Header */}
        <div className="bg-surface md:p-4 md:py-2 mb-4">
          <div className="md:flex items-center justify-between space-y-5 md:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                ¡Buen día!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {currentTime.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="md:w-[565px] grid grid-cols-3 gap-2 md:gap-4">
              <div className="p-2 md:p-4 rounded-lg border border-border">
                <div className="md:flex items-center gap-2 mb-1 md:mb-2">
                  <IconCalendar className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-600">
                    Citas de hoy
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.todayAppointments}
                </div>
              </div>
              <div className="p-2 md:p-4 rounded-lg border border-border">
                <div className="md:flex items-center gap-2 mb-1 md:mb-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-600">
                    Completadas
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.completedToday}
                </div>
              </div>
              <div className="p-2 md:p-4 rounded-lg border border-border">
                <div className="md:flex items-center gap-2 mb-1 md:mb-2">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-600">
                    Canceladas
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.cancelledToday}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full flex flex-col-reverse md:grid md:grid-cols-3 gap-4 overflow-auto ">
          {/* Citas de Hoy */}
          <div className="h-full overflow-auto xl:col-span-2 rounded-lg shadow-sm flex flex-col border border-border">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-surface z-10">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Citas de Hoy
              </h2>
              <SearchInput placeholder="Buscar cliente" value={search} onChange={setSearch} />
            </div>
            <div className="p-4 md:p-6 max-h-[600px] overflow-y-auto  bg-background">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <IconCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No hay citas programadas para hoy
                  </p>
                  <button
                    onClick={onNewAppointment}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Crear Primera Cita
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border-l-4 border-l-blue-500 border border-border bg-surface"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-lg font-semibold text-gray-900">
                            {appointment.time}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {getStatusLabel(appointment.status)}
                          </span>
                          {appointment.isLate && (
                            <span className="text-red-600 text-sm font-medium">
                              ¡Llegó tarde!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            ${appointment.price}
                          </span>
                          {appointment.phone && (
                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                              <IconPhone className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <strong>Cliente:</strong> {appointment.client}
                        </div>
                        <div>
                          <strong>Estilista:</strong> {appointment.stylist}
                        </div>
                        <div>
                          <strong>Servicio:</strong> {appointment.service}
                        </div>
                        <div>
                          <strong>Duración:</strong> {appointment.duration} min
                        </div>
                      </div>
                      {appointment.status === "pending" && (
                        <div className="flex flex-wrap gap-2">
                          <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors">
                            Confirmar
                          </button>
                          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="md:rounded-lg md:shadow-sm md:p-6 md:border md:border-border">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1 md:gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={`${action.color} text-surface px-2 py-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-start md:items-center gap-2 sm:gap-4 cursor-pointer`}
                >
                  <action.icon className="size-5 md:size-8 flex-shrink-0" />
                  <span className="text-sm md:text-lg font-semibold">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
