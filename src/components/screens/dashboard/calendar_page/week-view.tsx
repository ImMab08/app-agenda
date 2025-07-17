"use client";

import type React from "react";
import { useState } from "react";

import type { Appointment } from "@/components/types/appoitments";
import { TooltipAppointment } from "@/components/tooltip/tooltip_appointment";

import {
  FULL_DAYS,
  TIME_SLOTS,
  getWeekDays,
  formatDate,
  MONTHS,
} from "@/components/utils/calendar";

import { IconLeft, IconRight } from "@/components/icons";

interface WeekViewProps {
  appointments: Appointment[];
  onAddAppointment: (date: Date, time: string) => void;
  onConfirmAppointment: (appointmentId: string) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onEditAppointment: (appointment: Appointment) => void;
}

export function WeekView({
  appointments,
  onAddAppointment,
  onConfirmAppointment,
  onCancelAppointment,
  onEditAppointment,
}: WeekViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredAppointment, setHoveredAppointment] = useState<{
    appointment: Appointment;
    position: { x: number; y: number };
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const weekDays = getWeekDays(currentDate);
  const today = new Date();

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      const days = direction === "prev" ? -7 : 7;
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  };

  const getAppointmentsForDateTime = (date: Date, hour: number) => {
    const dateStr = formatDate(date);
    return appointments.filter((apt) => {
      if (apt.date !== dateStr) return false;
      const startHour = Number.parseInt(apt.startTime.split(":")[0]);
      const endHour = Number.parseInt(apt.endTime.split(":")[0]);
      return hour >= startHour && hour < endHour;
    });
  };

  const handleAppointmentHover = (
    appointment: Appointment,
    event: React.MouseEvent
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredAppointment({
      appointment,
      position: {
        x: rect.right + 10,
        y: rect.top,
      },
    });
  };

  const isToday = (date: Date) => {
    return formatDate(date) === formatDate(today);
  };

  const formatTimeSlot = (hour: number) => {
    if (hour === 0) return "12:00 AM";
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return "12:00 PM";
    return `${hour - 12}:00 PM`;
  };

  return (
    <div className="bg-background rounded-lg shadow-lg h-full overflow-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
        <div className="flex flex-col">
          <h2 className="text-text-secondary text-base">{MONTHS[month]} {year}</h2>
          <h3 className="text-2xl font-bold text-text-primary">Vista Semanal</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateWeek("prev")}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-selected rounded-md transition-colors cursor-pointer"
          >
            <IconLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-selected rounded-md transition-colors cursor-pointer"
          >
            Esta Semana
          </button>
          <button
            onClick={() => navigateWeek("next")}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-selected rounded-md transition-colors cursor-pointer"
          >
            <IconRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid [grid-template-columns:120px_repeat(7,1fr)] border-b border-border">
        <div className="p-4 text-center flex justify-center items-center text-sm font-medium text-text-primary">
          Hora
        </div>
        {weekDays.map((date, index) => (
          <div
            key={index}
            className={`p-4 text-center border-l border-border ${
              isToday(date) ? "bg-selected" : ""
            }`}
          >
            <div
              className={`text-sm font-medium ${
                isToday(date) ? "text-primary" : "text-text-secondary"
              }`}
            >
              {FULL_DAYS[date.getDay()]}
            </div>
            <div
              className={`text-lg font-bold ${
                isToday(date) ? "text-primary" : "text-text-secondary"
              }`}
            >
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots and appointments */}
      <div className="h-full overflow-auto no-scrollbar flex flex-col">
        {TIME_SLOTS.map((timeSlot) => (
          <div
            key={timeSlot.hour}
            className="grid [grid-template-columns:120px_repeat(7,1fr)] border-b border-border"
          >
            <div className="p-3 text-sm text-text-primary flex items-center justify-center">
              {formatTimeSlot(timeSlot.hour)}
            </div>
            {weekDays.map((date, dayIndex) => {
              const dayAppointments = getAppointmentsForDateTime(
                date,
                timeSlot.hour
              );

              return (
                <div
                  key={dayIndex}
                  className={`
                    min-h-16 p-1 border-l border-border relative group cursor-pointer
                    hover:bg-selected hover:border-divider hover:border transition-colors
                    ${isToday(date) ? "bg-selected/40" : ""}
                  `}
                  onClick={() =>
                    onAddAppointment(
                      date,
                      `${timeSlot.hour.toString().padStart(2, "0")}:00`
                    )
                  }
                >
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map((appointment, index) => (
                      <div
                        key={appointment.id}
                        className={`
                          p-1 rounded text-xs text-text-primary cursor-pointer
                          ${
                            appointment.color
                          } hover:opacity-80 transition-opacity
                          ${index > 0 ? "mt-1" : ""}
                        `}
                        onMouseEnter={(e) =>
                          handleAppointmentHover(appointment, e)
                        }
                        onMouseLeave={() => setHoveredAppointment(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAppointmentHover(appointment, e);
                        }}
                      >
                        <div className="font-medium truncate">
                          {appointment.client}
                        </div>
                        <div className="truncate opacity-90">
                          {appointment.service}
                        </div>
                      </div>
                    ))}

                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-surface text-center bg-primary rounded p-1 cursor-pointer">
                        +{dayAppointments.length - 2} citas más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredAppointment && (
        <TooltipAppointment
          appointment={hoveredAppointment.appointment}
          position={hoveredAppointment.position}
          isVisible={true}
          onConfirm={onConfirmAppointment}
          onCancel={onCancelAppointment}
          onEdit={onEditAppointment}
        />
      )}
    </div>
  );
}
