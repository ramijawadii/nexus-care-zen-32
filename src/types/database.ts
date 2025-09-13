// Database types based on Supabase schema
import { Database } from '@/integrations/supabase/types';

// Extract table types from Database
export type Tables = Database['public']['Tables'];
export type Patient = Tables['patients']['Row'];
export type PatientInsert = Tables['patients']['Insert'];
export type PatientUpdate = Tables['patients']['Update'];

export type Profile = Tables['profiles']['Row'];
export type ProfileInsert = Tables['profiles']['Insert'];
export type ProfileUpdate = Tables['profiles']['Update'];

export type Appointment = Tables['appointments']['Row'];
export type AppointmentInsert = Tables['appointments']['Insert'];
export type AppointmentUpdate = Tables['appointments']['Update'];

export type Consultation = Tables['consultations']['Row'];
export type ConsultationInsert = Tables['consultations']['Insert'];
export type ConsultationUpdate = Tables['consultations']['Update'];

export type Prescription = Tables['prescriptions']['Row'];
export type PrescriptionInsert = Tables['prescriptions']['Insert'];
export type PrescriptionUpdate = Tables['prescriptions']['Update'];

export type Document = Tables['documents']['Row'];
export type DocumentInsert = Tables['documents']['Insert'];
export type DocumentUpdate = Tables['documents']['Update'];

export type Invoice = Tables['invoices']['Row'];
export type InvoiceInsert = Tables['invoices']['Insert'];
export type InvoiceUpdate = Tables['invoices']['Update'];

export type InvoiceItem = Tables['invoice_items']['Row'];
export type InvoiceItemInsert = Tables['invoice_items']['Insert'];
export type InvoiceItemUpdate = Tables['invoice_items']['Update'];

export type Reminder = Tables['reminders']['Row'];
export type ReminderInsert = Tables['reminders']['Insert'];
export type ReminderUpdate = Tables['reminders']['Update'];

export type VaccinationRecord = Tables['vaccination_records']['Row'];
export type VaccinationRecordInsert = Tables['vaccination_records']['Insert'];
export type VaccinationRecordUpdate = Tables['vaccination_records']['Update'];

export type SurgicalHistory = Tables['surgical_history']['Row'];
export type SurgicalHistoryInsert = Tables['surgical_history']['Insert'];
export type SurgicalHistoryUpdate = Tables['surgical_history']['Update'];

export type FamilyHistory = Tables['family_history']['Row'];
export type FamilyHistoryInsert = Tables['family_history']['Insert'];
export type FamilyHistoryUpdate = Tables['family_history']['Update'];

export type Employee = Tables['employees']['Row'];
export type EmployeeInsert = Tables['employees']['Insert'];
export type EmployeeUpdate = Tables['employees']['Update'];

export type Expense = Tables['expenses']['Row'];
export type ExpenseInsert = Tables['expenses']['Insert'];
export type ExpenseUpdate = Tables['expenses']['Update'];

export type SupportTicket = Tables['support_tickets']['Row'];
export type SupportTicketInsert = Tables['support_tickets']['Insert'];
export type SupportTicketUpdate = Tables['support_tickets']['Update'];

// Enums
export type UserRole = Database['public']['Enums']['user_role'];
export type PatientStatus = Database['public']['Enums']['patient_status'];
export type Gender = Database['public']['Enums']['gender'];
export type AppointmentStatus = Database['public']['Enums']['appointment_status'];
export type AppointmentType = Database['public']['Enums']['appointment_type'];
export type PrescriptionStatus = Database['public']['Enums']['prescription_status'];
export type DocumentType = Database['public']['Enums']['document_type'];
export type InvoiceStatus = Database['public']['Enums']['invoice_status'];
export type ReminderType = Database['public']['Enums']['reminder_type'];
export type ReminderStatus = Database['public']['Enums']['reminder_status'];
export type CommunicationMethod = Database['public']['Enums']['communication_method'];
export type EmployeeStatus = Database['public']['Enums']['employee_status'];
export type ExpenseStatus = Database['public']['Enums']['expense_status'];
export type PaymentMethod = Database['public']['Enums']['payment_method'];

// Extended types with relationships
export interface PatientWithRelations extends Patient {
  appointments?: Appointment[];
  consultations?: Consultation[];
  prescriptions?: Prescription[];
  documents?: Document[];
  invoices?: Invoice[];
  reminders?: Reminder[];
  vaccination_records?: VaccinationRecord[];
  surgical_history?: SurgicalHistory[];
  family_history?: FamilyHistory[];
}

export interface AppointmentWithRelations extends Appointment {
  patient?: Patient;
  doctor?: Profile;
  consultation?: Consultation;
}

export interface ConsultationWithRelations extends Consultation {
  patient?: Patient;
  doctor?: Profile;
  appointment?: Appointment;
  prescriptions?: Prescription[];
}

export interface InvoiceWithRelations extends Invoice {
  patient?: Patient;
  consultation?: Consultation;
  items?: InvoiceItem[];
}

// Utility types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  count?: number;
}