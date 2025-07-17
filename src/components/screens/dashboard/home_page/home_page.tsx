"use client";
import { useState, useEffect } from "react";

import type {
  DashboardStats,
  TodayAppointment,
  QuickAction,
  StylistStatus,
  // InventoryAlert,
} from "@/components/types/home";
// import type { Appointment } from "@/components/types/appoitments";
// import {
//   calculateDashboardStats,
//   getTodayAppointments,
//   checkLateAppointments,
// } from "@/components/utils/home";

import {
  IconAdd,
  IconCalendar,
  IconClock,
  IconMoney,
  IconPhone,
  IconSearch,
  IconUser,
} from "@/components/icons";

// Datos mock que no cambian (en producción vendrían de APIs)
const mockStylists: StylistStatus[] = [
  {
    id: "1",
    name: "Ana Rodríguez",
    status: "busy",
    currentClient: "María García",
    nextAppointment: "10:30",
  },
  {
    id: "2",
    name: "María González",
    status: "available",
    nextAppointment: "10:30",
  },
  {
    id: "3",
    name: "Laura Sánchez",
    status: "break",
    nextAppointment: "11:00",
  },
];

// Datos para requerimiento de inventario (Próximo).
// const mockInventoryAlerts: InventoryAlert[] = [
//   {
//     id: "1",
//     product: "Shampoo Premium",
//     currentStock: 2,
//     minStock: 5,
//     urgency: "high",
//   },
//   {
//     id: "2",
//     product: "Tinte Castaño",
//     currentStock: 4,
//     minStock: 8,
//     urgency: "medium",
//   },
// ];

interface DashboardProps {
  // appointments: Appointment[]; // Recibir las citas reales
  onNewAppointment: () => void;
  onSearchClient: () => void;
  onViewCalendar: () => void;
}

// Eliminar las props relacionadas con appointments y usar los datos mock originales
export function HomePage({ onNewAppointment, onSearchClient, onViewCalendar }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

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
      label: "Nueva Cita",
      icon: IconAdd,
      onClick: onNewAppointment,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      id: "search-client",
      label: "Buscar Cliente",
      icon: IconSearch,
      onClick: onSearchClient,
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      id: "view-calendar",
      label: "Ver Agenda",
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

  const getStylistStatusColor = (status: StylistStatus["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-red-500";
      case "break":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // const getUrgencyColor = (urgency: InventoryAlert["urgency"]) => {
  //   switch (urgency) {
  //     case "high":
  //       return "border-red-500 bg-red-50";
  //     case "medium":
  //       return "border-yellow-500 bg-yellow-50";
  //     case "low":
  //       return "border-blue-500 bg-blue-50";
  //     default:
  //       return "border-gray-500 bg-gray-50";
  //   }
  // };

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
            <div className="text-left sm:text-right mt-2 sm:mt-0">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {currentTime.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Hora actual
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 sm:gap-4`}
            >
              <action.icon className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <span className="text-base sm:text-lg font-semibold">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6 sm:mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <IconCalendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-600">
                Citas Hoy
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.todayAppointments}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <IconMoney className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-600">
                Ingresos
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${stats.todayRevenue}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <IconClock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-600">
                Pendientes
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.pendingConfirmations}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <IconUser className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-600">
                Disponibles
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.availableStylists}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-gray-600">
                Completadas
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.completedToday}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-gray-600">
                Canceladas
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.cancelledToday}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Citas de Hoy
              </h2>
            </div>
            <div className="p-4 sm:p-6">
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
                      className={`p-4 rounded-lg border-l-4 ${
                        appointment.isLate
                          ? "border-red-500 bg-red-50"
                          : "border-blue-500 bg-gray-50"
                      }`}
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
                            <button
                              onClick={() => {}}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            >
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

                      {/* Botones de acción */}
                      {appointment.status === "pending" && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {}}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => {}}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                          >
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

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stylist Status */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Estado de Estilistas
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {mockStylists.map((stylist) => (
                    <div key={stylist.id} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${getStylistStatusColor(
                          stylist.status
                        )}`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {stylist.name}
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {stylist.status === "busy" &&
                            `Atendiendo: ${stylist.currentClient}`}
                          {stylist.status === "available" && "Disponible"}
                          {stylist.status === "break" && "En descanso"}
                          {stylist.status === "offline" && "No disponible"}
                        </div>
                        {stylist.nextAppointment && (
                          <div className="text-xs text-gray-500">
                            Próxima: {stylist.nextAppointment}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inventory Alerts */}
            {/* <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Alertas de Inventario
                  </h2>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {mockInventoryAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border-l-4 ${getUrgencyColor(
                        alert.urgency
                      )}`}
                    >
                      <div className="font-medium text-gray-900">
                        {alert.product}
                      </div>
                      <div className="text-sm text-gray-600">
                        Stock actual: {alert.currentStock} / Mínimo:{" "}
                        {alert.minStock}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
