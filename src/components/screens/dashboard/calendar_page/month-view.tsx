"use client"

import type React from "react"
import { useState } from "react"

import type { Appointment } from "@/components/types/appoitments"
import { AppointmentTooltip } from "@/components/tooltip/appointment-tooltip"

import { MONTHS, DAYS, getDaysInMonth, formatDate } from "@/components/utils/calendar"

import { IconLeft, IconRight } from "@/components/icons"

interface MonthViewProps {
  appointments: Appointment[]
  onDateSelect: (date: Date) => void
  onAddAppointment: (date: Date) => void
  onShowDayAppointments: (date: Date, appointments: Appointment[]) => void
  onConfirmAppointment: (appointmentId: string) => void
  onCancelAppointment: (appointmentId: string) => void
  onEditAppointment: (appointment: Appointment) => void
}

export function MonthView({
  appointments,
  onDateSelect,
  onAddAppointment,
  onShowDayAppointments,
  onConfirmAppointment,
  onCancelAppointment,
  onEditAppointment,
}: MonthViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredAppointment, setHoveredAppointment] = useState<{
    appointment: Appointment
    position: { x: number; y: number }
  } | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = getDaysInMonth(year, month)
  const today = new Date()

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = formatDate(date)
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const handleAppointmentHover = (appointment: Appointment, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredAppointment({
      appointment,
      position: {
        x: rect.right + 10,
        y: rect.top,
      },
    })
  }

  const isToday = (date: Date) => {
    return formatDate(date) === formatDate(today)
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month
  }

  return (
    <div className="bg-background rounded-lg shadow-lg flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-text-primary">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-selected rounded-md transition-colors cursor-pointer"
          >
            <IconLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-selected rounded-md transition-colors cursor-pointer"
          >
            Hoy
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-selected rounded-md transition-colors cursor-pointer"
          >
            <IconRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid del calendario */}
      <div className="p-4 h-full overflow-auto flex flex-col">
        {/* Días de la semana en el encabezado */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {DAYS.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-text-primary">
              {day}
            </div>
          ))}
        </div>

        {/* Días del calendario */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date)
            const isCurrentMonthDay = isCurrentMonth(date)
            const isTodayDate = isToday(date)

            return (
              <div
                key={index}
                className={`
                  min-h-[120px] p-2 border border-border rounded-md cursor-pointer transition-colors
                  ${isCurrentMonthDay ? "bg-background hover:bg-selected/60 hover:border-divider hover:border" : "bg-block text-text-primary"}
                  ${isTodayDate ? "ring-2 ring-primary" : ""}
                `}
                onClick={() => {
                  onDateSelect(date)
                  if (isCurrentMonthDay) {
                    const dayAppointments = getAppointmentsForDate(date)
                    if (dayAppointments.length > 0) {
                      onShowDayAppointments(date, dayAppointments)
                    } else {
                      onAddAppointment(date)
                    }
                  }
                }}
              >
                <div
                  className={`text-sm font-medium mb-2 ${isTodayDate ? "text-primary" : isCurrentMonthDay ? "text-text-secondary" : "text-text-muted"}`}
                >
                  {date.getDate()}
                </div>

                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`
                        text-xs p-1 rounded text-text-primary cursor-pointer truncate
                        ${appointment.color} hover:opacity-80 transition-opacity
                      `}
                      onMouseEnter={(e) => handleAppointmentHover(appointment, e)}
                      onMouseLeave={() => setHoveredAppointment(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowDayAppointments(date, dayAppointments)
                      }}
                    >
                      {appointment.startTime} {appointment.client}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div
                      className="text-xs text-surface text-center cursor-pointer bg-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowDayAppointments(date, dayAppointments)
                      }}
                    >
                      +{dayAppointments.length - 3} más
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredAppointment && (
        <AppointmentTooltip
          appointment={hoveredAppointment.appointment}
          position={hoveredAppointment.position}
          isVisible={true}
          onConfirm={onConfirmAppointment}
          onCancel={onCancelAppointment}
          onEdit={onEditAppointment}
        />
      )}
    </div>
  )
}
