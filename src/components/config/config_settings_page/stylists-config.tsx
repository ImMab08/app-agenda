"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, User, Mail, Phone, Clock, Star } from "lucide-react"
import { useCollection } from "../../hooks/useFirestore"
import type { Stylist } from "../../types/configuration"

export function StylistsConfig() {
  const { data: stylists, loading, add, update, remove } = useCollection<Stylist>("stylists")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialties: [] as string[],
    workingDays: [] as string[],
    workingHours: { start: "09:00", end: "18:00" },
    isActive: true,
  })

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  const specialtyOptions = [
    "Corte de Cabello",
    "Coloración",
    "Peinados",
    "Tratamientos",
    "Manicure",
    "Pedicure",
    "Cejas",
    "Pestañas",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingStylist) {
        await update(editingStylist.id, formData)
      } else {
        await add(formData)
      }

      setIsModalOpen(false)
      setEditingStylist(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialties: [],
        workingDays: [],
        workingHours: { start: "09:00", end: "18:00" },
        isActive: true,
      })
    } catch (error) {
      console.error("Error saving stylist:", error)
    }
  }

  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist)
    setFormData({
      name: stylist.name,
      email: stylist.email,
      phone: stylist.phone,
      specialties: stylist.specialties,
      workingDays: stylist.workingDays,
      workingHours: stylist.workingHours,
      isActive: stylist.isActive,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este estilista?")) {
      try {
        await remove(id)
      } catch (error) {
        console.error("Error deleting stylist:", error)
      }
    }
  }

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const toggleWorkingDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }))
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-500">Cargando estilistas...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Estilistas</h2>
          <p className="text-gray-600">Administra tu equipo de trabajo</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Estilista
        </button>
      </div>

      {/* Lista de Estilistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stylists.map((stylist) => (
          <div key={stylist.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{stylist.name}</h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      stylist.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stylist.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(stylist)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(stylist.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{stylist.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{stylist.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {stylist.workingHours.start} - {stylist.workingHours.end}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Especialidades</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {stylist.specialties.map((specialty) => (
                  <span key={specialty} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Días de trabajo</div>
              <div className="text-sm text-gray-600">{stylist.workingDays.join(", ")}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingStylist ? "Editar Estilista" : "Agregar Estilista"}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingStylist(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    value={formData.isActive ? "active" : "inactive"}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.value === "active" }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora de Inicio</label>
                  <input
                    type="time"
                    value={formData.workingHours.start}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, start: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora de Fin</label>
                  <input
                    type="time"
                    value={formData.workingHours.end}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: { ...prev.workingHours, end: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Días de Trabajo</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {weekDays.map((day) => (
                    <label key={day} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.workingDays.includes(day)}
                        onChange={() => toggleWorkingDay(day)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Especialidades</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specialtyOptions.map((specialty) => (
                    <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.specialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingStylist(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingStylist ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
