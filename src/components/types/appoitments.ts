export interface Appointment {
  id: string;
  title: string;
  client: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  stylist: string;
  status: "confirmed" | "pending" | "cancelled";
  color: string;
  phone?: string;
  notes?: string;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  display: string;
}
