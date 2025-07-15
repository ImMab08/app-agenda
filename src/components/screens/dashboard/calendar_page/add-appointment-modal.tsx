"use client"

import type React from "react"
import { useState } from "react"

import type { Appointment } from "@/components/types/appoitments"
import { SERVICES, STYLISTS, formatDate } from "@/components/utils/calendar"

import { IconCalendar, IconClock, IconClose, IconFileText, IconInfo, IconPhone, IconUser } from "@/components/icons"

interface AddAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (appointment: Omit<Appointment, "id">) => void
  selectedDate?: Date
  selectedTime?: string
}

export function AddAppointmentModal({
  isOpen,
  onClose,
  onSave,
  selectedDate = new Date(),
  selectedTime = "09:00",
}: AddAppointmentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    service: SERVICES[0].name,
    date: formatDate(selectedDate),
    startTime: selectedTime,
    endTime: "10:00",
    stylist: STYLISTS[0],
    phone: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedService = SERVICES.find((s) => s.name === formData.service)

    const appointment: Omit<Appointment, "id"> = {
      ...formData,
      title: formData.title || `${formData.service} - ${formData.client}`,
      status: "confirmed",
      color: selectedService?.color || "bg-blue-500",
    }

    onSave(appointment)
    onClose()

    // Reset form
    setFormData({
      title: "",
      client: "",
      service: SERVICES[0].name,
      date: formatDate(selectedDate),
      startTime: selectedTime,
      endTime: "10:00",
      stylist: STYLISTS[0],
      phone: "",
      notes: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Nueva Cita</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconFileText className="w-4 h-4 inline mr-2" />
              Título (opcional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Corte y peinado especial"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconUser className="w-4 h-4 inline mr-2" />
              Cliente *
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del cliente"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconPhone className="w-4 h-4 inline mr-2" />
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconInfo className="w-4 h-4 inline mr-2" />
              Servicio *
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {SERVICES.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconUser className="w-4 h-4 inline mr-2" />
              Estilista *
            </label>
            <select
              value={formData.stylist}
              onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {STYLISTS.map((stylist) => (
                <option key={stylist} value={stylist}>
                  {stylist}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconCalendar className="w-4 h-4 inline mr-2" />
              Fecha *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <IconClock className="w-4 h-4 inline mr-2" />
                Hora Inicio *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <IconClock className="w-4 h-4 inline mr-2" />
                Hora Fin *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <IconFileText className="w-4 h-4 inline mr-2" />
              Notas
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Notas adicionales..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Guardar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
