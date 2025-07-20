"use client";

import { useState } from "react";
import type { Appointment } from "@/components/types/appoitments";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";

import { formatDate } from "@/components/utils/calendar";
import { AddAppointmentModal } from "@/components/modals/add-appointment-modal";
import { DayAppointmentsModal } from "@/components/modals/day-appointments-modal";

import { IconAdd, IconCalendar } from "@/components/icons";

export default function SalonCalendar() {
  const [view, setView] = useState<"month" | "week">("week");

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Corte y Peinado",
      client: "María García",
      service: "Corte de Cabello",
      date: formatDate(new Date()),
      startTime: "09:00",
      endTime: "10:00",
      stylist: "Ana Rodríguez",
      status: "confirmed",
      color: "bg-green-500",
      phone: "555-0123",
    },
    {
      id: "2",
      title: "Coloración Completa",
      client: "Carmen López",
      service: "Coloración",
      date: formatDate(new Date()),
      startTime: "14:00",
      endTime: "16:00",
      stylist: "María González",
      status: "confirmed",
      color: "bg-yellow-500",
      phone: "555-0456",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("09:00");
  const [selectedDayAppointments, setSelectedDayAppointments] = useState<Appointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const handleConfirmAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: "confirmed" as const }
          : apt
      )
    );
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: "cancelled" as const }
          : apt
      )
    );
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleShowDayAppointments = (
    date: Date,
    dayAppointments: Appointment[]
  ) => {
    setSelectedDate(date);
    setSelectedDayAppointments(dayAppointments);
    setIsDayModalOpen(true);
  };

  const handleAddAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  // Esta función intermedia resuelve el error de tipos con MonthView
  const handleDateClickFromMonthView = (date: Date) => {
    handleTimeSlotClick(date, "09:00"); // Puedes cambiar la hora por defecto
  };

  return (
    <div className="p-4 h-full overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Controls */}
        <div className="bg-background flex justify-between md:flex-row md:items-center mb-4 md:mb-6 gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setView("week")}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-md transition-colors cursor-pointer flex items-center ${
                view === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-surface text-text-secondary hover:bg-panel"
              }`}
            >
              <IconCalendar className="w-4 h-4 inline mr-2" />
              Semana
            </button>
            <button
              onClick={() => setView("month")}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-md transition-colors cursor-pointer flex items-center ${
                view === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-surface text-text-primary hover:bg-panel"
              }`}
            >
              <IconCalendar className="w-4 h-4 inline mr-2" />
              Mes
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-6 py-1 md:py-2 rounded-md transition-colors flex items-center gap-1 md:gap-2 cursor-pointer"
          >
            <IconAdd className="w-4 h-4" />
            Nueva Cita
          </button>
        </div>

        {/* Calendar Views */}
        {view === "week" ? (
          <WeekView
            appointments={appointments}
            onAddAppointment={handleTimeSlotClick}
            onConfirmAppointment={handleConfirmAppointment}
            onCancelAppointment={handleCancelAppointment}
            onEditAppointment={handleEditAppointment}
          />
        ) : (
          <MonthView
            appointments={appointments}
            onDateSelect={handleDateSelect}
            onAddAppointment={handleDateClickFromMonthView} // <-- función intermedia
            onShowDayAppointments={handleShowDayAppointments}
            onConfirmAppointment={handleConfirmAppointment}
            onCancelAppointment={handleCancelAppointment}
            onEditAppointment={handleEditAppointment}
          />
        )}

        {/* Add Appointment Modal */}
        <AddAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddAppointment}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />

        <DayAppointmentsModal
          isOpen={isDayModalOpen}
          onClose={() => setIsDayModalOpen(false)}
          date={selectedDate}
          appointments={selectedDayAppointments}
          onEditAppointment={handleEditAppointment}
          onConfirmAppointment={handleConfirmAppointment}
          onCancelAppointment={handleCancelAppointment}
        />
      </div>
    </div>
  );
}
