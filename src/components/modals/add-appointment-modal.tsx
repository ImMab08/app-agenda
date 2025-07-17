"use client";

import type React from "react";
import { useState } from "react";

import type { Appointment } from "@/components/types/appoitments";
import { SERVICES, STYLISTS, formatDate } from "@/components/utils/calendar";

import {
  IconCalendar,
  IconClock,
  IconClose,
  IconFileText,
  IconInfo,
  IconPhone,
  IconUser,
} from "@/components/icons";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: Omit<Appointment, "id">) => void;
  selectedDate?: Date;
  selectedTime?: string;
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedService = SERVICES.find((s) => s.name === formData.service);

    const appointment: Omit<Appointment, "id"> = {
      ...formData,
      title: formData.title || `${formData.service} - ${formData.client}`,
      status: "confirmed",
      color: selectedService?.color || "bg-blue-500",
    };

    onSave(appointment);
    onClose();

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
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-xl max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-divider">
          <h2 className="text-xl font-semibold text-text-primary">
            Nueva Cita
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 h-full flex flex-col overflow-auto"
        >
          <div>
            <label className="block text-base font-medium text-text-primary mb-2">
              <IconFileText className="w-4 h-4 inline mr-2" />
              Título (opcional)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary "
              placeholder="Ej: Corte y peinado especial"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-medium text-text-primary mb-2">
                <IconUser className="w-4 h-4 inline mr-2" />
                Cliente <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nombre del cliente"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-text-primary mb-2">
                <IconPhone className="w-4 h-4 inline mr-2" />
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Número de teléfono"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-text-primary mb-2">
                <IconInfo className="w-4 h-4 inline mr-2" />
                Servicio <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full px-3 py-2 bg-panel border border-divider rounded-md  focus:outline-none focus:ring-2 focus:ring-primary"
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
              <label className="block text-base font-medium text-text-primary mb-2">
                <IconUser className="w-4 h-4 inline mr-2" />
                Estilista <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.stylist}
                onChange={(e) =>
                  setFormData({ ...formData, stylist: e.target.value })
                }
                className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-base font-medium text-text-primary mb-2">
                <IconCalendar className="w-4 h-4 inline mr-2" />
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-text-primary mb-2">
                  <IconClock className="w-4 h-4 inline mr-2" />
                  Hora Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-medium text-text-primary mb-2">
                  <IconClock className="w-4 h-4 inline mr-2" />
                  Hora Fin <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-text-primary mb-2">
              <IconFileText className="w-4 h-4 inline mr-2" />
              Notas
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-3 py-2 bg-panel border border-divider rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Notas adicionales..."
              rows={3}
            />
          </div>
        </form>

        <div className="flex gap-3 p-4 border-t border-divider">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-text-muted text-white rounded-md hover:bg-text-secondary transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Guardar Cita
          </button>
        </div>
      </div>
    </div>
  );
}
