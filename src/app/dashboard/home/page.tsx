'use client'
import React from "react";

import { HomePage } from "@/components/screens/dashboard/home_page/home_page";

export default function page() {
  return (
    <HomePage
      onNewAppointment={() => {
        // Aquí podrías navegar a la página del calendario o abrir un modal
        console.log("Ir a crear nueva cita");
      }}
      onSearchClient={() => {
        // Aquí podrías navegar a la página de clientes o abrir un modal de búsqueda
        console.log("Buscar cliente");
      }}
      onViewCalendar={() => {
        // Aquí podrías navegar a la página del calendario
        console.log("Ver calendario");
      }}
    />
  );
}
