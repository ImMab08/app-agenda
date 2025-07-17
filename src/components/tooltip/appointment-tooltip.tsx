"use client"
import { useState, useEffect } from "react"

import type { Appointment } from "@/components/types/appoitments"

import { IconCalendar, IconClock, IconInfo, IconPhone, IconUser } from "@/components/icons"

interface AppointmentTooltipProps {
  appointment: Appointment
  position: { x: number; y: number }
  isVisible: boolean
  onConfirm?: (appointmentId: string) => void
  onCancel?: (appointmentId: string) => void
  onEdit?: (appointment: Appointment) => void
}

// Agregar las props de callback al componente
export function AppointmentTooltip({
  appointment,
  position,
  isVisible,
  onConfirm,
  onCancel,
  onEdit,
}: AppointmentTooltipProps) {
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    if (isVisible) {
      const tooltip = document.getElementById("appointment-tooltip")
      if (tooltip) {
        const rect = tooltip.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let newX = position.x
        let newY = position.y

        // Adjust horizontal position if tooltip goes off screen
        if (position.x + rect.width > viewportWidth) {
          newX = position.x - rect.width - 10
        }

        // Adjust vertical position if tooltip goes off screen
        if (position.y + rect.height > viewportHeight) {
          newY = position.y - rect.height - 10
        }

        setAdjustedPosition({ x: newX, y: newY })
      }
    }
  }, [position, isVisible])

  if (!isVisible) return null

  const statusColors = {
    confirmed: "text-green-400",
    pending: "text-yellow-400",
    cancelled: "text-red-400",
  }

  const statusLabels = {
    confirmed: "Confirmada",
    pending: "Pendiente",
    cancelled: "Cancelada",
  }

  return (
    <div
      id="appointment-tooltip"
      className="fixed z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-4 min-w-[280px] max-w-[320px]"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
      }}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-white text-sm leading-tight">{appointment.title}</h3>
          <span className={`text-xs font-medium ${statusColors[appointment.status]}`}>
            {statusLabels[appointment.status]}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <IconUser className="w-4 h-4 mr-2 text-gray-400" />
            <span>{appointment.client}</span>
          </div>

          {appointment.phone && (
            <div className="flex items-center text-gray-300">
              <IconPhone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{appointment.phone}</span>
            </div>
          )}

          <div className="flex items-center text-gray-300">
            <IconInfo className="w-4 h-4 mr-2 text-gray-400" />
            <span>{appointment.service}</span>
          </div>

          <div className="flex items-center text-gray-300">
            <IconUser className="w-4 h-4 mr-2 text-gray-400" />
            <span>Estilista: {appointment.stylist}</span>
          </div>

          <div className="flex items-center text-gray-300">
            <IconCalendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {new Date(appointment.date).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center text-gray-300">
            <IconClock className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {appointment.startTime} - {appointment.endTime}
            </span>
          </div>

          {appointment.notes && (
            <div className="pt-2 border-t border-gray-700">
              <p className="text-gray-400 text-xs">
                <strong>Notas:</strong> {appointment.notes}
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="pt-3 border-t border-gray-700 flex gap-2">
            {appointment.status === "pending" && onConfirm && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onConfirm(appointment.id)
                }}
                className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
              >
                Confirmar
              </button>
            )}
            {appointment.status !== "cancelled" && onCancel && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCancel(appointment.id)
                }}
                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
              >
                Cancelar
              </button>
            )}
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(appointment)
                }}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
