export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const FULL_DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

interface TimeSlot {
  hour: number;
  minute: number;
  display: string;
}

export const TIME_SLOTS: TimeSlot[] = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  minute: 0,
  display:
    i === 0
      ? "12:00 AM"
      : i < 12
      ? `${i}:00 AM`
      : i === 12
      ? "12:00 PM"
      : `${i - 12}:00 PM`,
}));

export const SERVICES = [
  { name: "Corte de Cabello", color: "bg-green-500", duration: 60 },
  { name: "Coloración", color: "bg-yellow-500", duration: 120 },
  { name: "Peinado", color: "bg-blue-500", duration: 90 },
  { name: "Tratamiento", color: "bg-purple-500", duration: 45 },
  { name: "Manicure", color: "bg-pink-500", duration: 60 },
  { name: "Pedicure", color: "bg-indigo-500", duration: 75 },
];

export const STYLISTS = [
  "María González",
  "Ana Rodríguez",
  "Carmen López",
  "Isabel Martín",
  "Laura Sánchez",
];

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatTime(hour: number, minute = 0): string {
  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: Date[] = [];

  // Add previous month's days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  // Add next month's days to complete the grid
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    days.push(new Date(year, month + 1, day));
  }

  return days;
}

export function getWeekDays(date: Date): Date[] {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }

  return weekDays;
}
