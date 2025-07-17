"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Store, Clock } from "lucide-react"
import { useDocument } from "../../hooks/useFirestore"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import type { SalonConfig } from "../../types/configuration"

export function SalonGeneralConfig() {
  const { data: salonConfig, loading } = useDocument<SalonConfig>("config", "salon")
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    workingHours: {
      Lunes: { start: "09:00", end: "18:00", isOpen: true },
      Martes: { start: "09:00", end: "18:00", isOpen: true },
      Miércoles: { start: "09:00", end: "18:00", isOpen: true },
      Jueves: { start: "09:00", end: "18:00", isOpen: true },
      Viernes: { start: "09:00", end: "18:00", isOpen: true },
      Sábado: { start: "09:00", end: "16:00", isOpen: true },
      Domingo: { start: "10:00", end: "14:00", isOpen: false },
    },
    appointmentSettings: {
      slotDuration: 30,
      bufferTime: 15,
      advanceBookingDays: 30,
      cancellationHours: 24,
    },
  })

  useEffect(() => {
    if (salonConfig) {
      setFormData({
        name: salonConfig.name || "",
        address: salonConfig.address || "",
        phone: salonConfig.phone || "",
        email: salonConfig.email || "",
        workingHours: salonConfig.workingHours || formData.workingHours,
        appointmentSettings: salonConfig.appointmentSettings || formData.appointmentSettings,
      })
    }
  }, [salonConfig])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await setDoc(doc(db, "config", "salon"), {
        ...formData,
        updatedAt: new Date(),
      })
      alert("Configuración guardada exitosamente")
    } catch (error) {
      console.error("Error saving config:", error)
      alert("Error al guardar la configuración")
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Cargando configuración...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Configuración General</h2>
        <p className="text-gray-600">Información básica de tu salón</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información del Salón */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Información del Salón</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Salón *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Horarios de Trabajo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Horarios de Trabajo</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(formData.workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hours.isOpen}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: {
                          ...prev.workingHours,
                          [day]: { ...hours, isOpen: e.target.checked },
                        },
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Abierto</span>
                </label>

                {hours.isOpen && (
                  <>
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            [day]: { ...hours, start: e.target.value },
                          },
                        }))
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">a</span>
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          workingHours: {
                            ...prev.workingHours,
                            [day]: { ...hours, end: e.target.value },
                          },
                        }))
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  )
}
