"use client"

import type { Appointment } from "@/components/types/appoitments" 
import { IconCalendar, IconClock, IconClose, IconFileText, IconInfo, IconPhone, IconUser } from "@/components/icons"

interface DayAppointmentsModalProps {
  isOpen: boolean
  onClose: () => void
  date: Date
  appointments: Appointment[]
  onEditAppointment: (appointment: Appointment) => void
  onConfirmAppointment: (appointmentId: string) => void
  onCancelAppointment: (appointmentId: string) => void
}

export function DayAppointmentsModal({
  isOpen,
  onClose,
  date,
  appointments,
  onEditAppointment,
  onConfirmAppointment,
  onCancelAppointment,
}: DayAppointmentsModalProps) {
  if (!isOpen) return null

  const sortedAppointments = [...appointments].sort((a, b) => a.startTime.localeCompare(b.startTime))

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Citas del Día</h2>
            <p className="text-gray-400 text-sm">
              {date.toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {sortedAppointments.length === 0 ? (
            <div className="text-center py-8">
              <IconCalendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No hay citas programadas para este día</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-700 rounded-lg p-4 border-l-4"
                  style={{ borderLeftColor: appointment.color.replace("bg-", "#") }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{appointment.title}</h3>
                      <span className={`text-sm font-medium ${statusColors[appointment.status]}`}>
                        {statusLabels[appointment.status]}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <IconClock className="w-4 h-4 mr-1" />
                      {appointment.startTime} - {appointment.endTime}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300 text-sm">
                        <IconUser className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{appointment.client}</span>
                      </div>
                      {appointment.phone && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <IconPhone className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{appointment.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300 text-sm">
                        <IconInfo className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{appointment.service}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <IconUser className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Estilista: {appointment.stylist}</span>
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mb-4 p-3 bg-gray-600 rounded">
                      <div className="flex items-start text-gray-300 text-sm">
                        <IconFileText className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                        <div>
                          <strong>Notas:</strong> {appointment.notes}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {appointment.status === "pending" && (
                      <button
                        onClick={() => onConfirmAppointment(appointment.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                      >
                        Confirmar
                      </button>
                    )}
                    {appointment.status !== "cancelled" && (
                      <button
                        onClick={() => onCancelAppointment(appointment.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      onClick={() => onEditAppointment(appointment)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
