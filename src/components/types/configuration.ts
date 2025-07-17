export interface Stylist {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  specialties: string[];
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutos
  price: number;
  color: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SalonConfig {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
  workingHours: {
    [key: string]: {
      start: string;
      end: string;
      isOpen: boolean;
    };
  };
  appointmentSettings: {
    slotDuration: number; // en minutos
    bufferTime: number; // tiempo entre citas
    advanceBookingDays: number;
    cancellationHours: number;
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    reminderHours: number;
  };
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate?: Date;
  notes: string;
  preferences: {
    preferredStylist?: string;
    allergies: string[];
    skinType?: string;
  };
  appointmentHistory: string[]; // IDs de citas
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  currentStock: number;
  minStock: number;
  price: number;
  supplier: string;
  lastRestocked: Date;
  createdAt: Date;
  updatedAt: Date;
}
