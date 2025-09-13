export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string | null
          created_by: string | null
          doctor_id: string
          duration_minutes: number | null
          id: string
          is_recurring: boolean | null
          location: string | null
          notes: string | null
          patient_id: string
          reason: string
          recurring_pattern: Json | null
          reminder_sent: boolean | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          type: Database["public"]["Enums"]["appointment_type"] | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string | null
          created_by?: string | null
          doctor_id: string
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          notes?: string | null
          patient_id: string
          reason: string
          recurring_pattern?: Json | null
          reminder_sent?: boolean | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          type?: Database["public"]["Enums"]["appointment_type"] | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string | null
          created_by?: string | null
          doctor_id?: string
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          notes?: string | null
          patient_id?: string
          reason?: string
          recurring_pattern?: Json | null
          reminder_sent?: boolean | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          type?: Database["public"]["Enums"]["appointment_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          appointment_id: string | null
          assessment: string | null
          chief_complaint: string | null
          consultation_date: string | null
          created_at: string | null
          diagnosis: string[] | null
          doctor_id: string
          follow_up_date: string | null
          follow_up_instructions: string | null
          id: string
          objective: string | null
          patient_id: string
          physical_exam: string | null
          plan: string | null
          present_illness: string | null
          subjective: string | null
          updated_at: string | null
          vital_signs: Json | null
        }
        Insert: {
          appointment_id?: string | null
          assessment?: string | null
          chief_complaint?: string | null
          consultation_date?: string | null
          created_at?: string | null
          diagnosis?: string[] | null
          doctor_id: string
          follow_up_date?: string | null
          follow_up_instructions?: string | null
          id?: string
          objective?: string | null
          patient_id: string
          physical_exam?: string | null
          plan?: string | null
          present_illness?: string | null
          subjective?: string | null
          updated_at?: string | null
          vital_signs?: Json | null
        }
        Update: {
          appointment_id?: string | null
          assessment?: string | null
          chief_complaint?: string | null
          consultation_date?: string | null
          created_at?: string | null
          diagnosis?: string[] | null
          doctor_id?: string
          follow_up_date?: string | null
          follow_up_instructions?: string | null
          id?: string
          objective?: string | null
          patient_id?: string
          physical_exam?: string | null
          plan?: string | null
          present_illness?: string | null
          subjective?: string | null
          updated_at?: string | null
          vital_signs?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          consultation_id: string | null
          created_at: string | null
          description: string | null
          file_path: string
          file_size: number | null
          id: string
          is_confidential: boolean | null
          metadata: Json | null
          mime_type: string | null
          name: string
          patient_id: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string
        }
        Insert: {
          category?: string | null
          consultation_id?: string | null
          created_at?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          is_confidential?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          name: string
          patient_id: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by: string
        }
        Update: {
          category?: string | null
          consultation_id?: string | null
          created_at?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          is_confidential?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          name?: string
          patient_id?: string
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: Json | null
          contract_type: string | null
          created_at: string | null
          department: string | null
          email: string
          emergency_contact: Json | null
          employee_id: string
          full_name: string
          hire_date: string
          id: string
          phone: string | null
          position: string
          salary: number | null
          status: Database["public"]["Enums"]["employee_status"] | null
          updated_at: string | null
          user_id: string | null
          work_schedule: Json | null
        }
        Insert: {
          address?: Json | null
          contract_type?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          emergency_contact?: Json | null
          employee_id: string
          full_name: string
          hire_date: string
          id?: string
          phone?: string | null
          position: string
          salary?: number | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          updated_at?: string | null
          user_id?: string | null
          work_schedule?: Json | null
        }
        Update: {
          address?: Json | null
          contract_type?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          emergency_contact?: Json | null
          employee_id?: string
          full_name?: string
          hire_date?: string
          id?: string
          phone?: string | null
          position?: string
          salary?: number | null
          status?: Database["public"]["Enums"]["employee_status"] | null
          updated_at?: string | null
          user_id?: string | null
          work_schedule?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approved_by: string | null
          category: string
          created_at: string | null
          created_by: string
          description: string
          due_date: string | null
          expense_date: string
          expense_number: string
          id: string
          invoice_number: string | null
          is_recurring: boolean | null
          payment_date: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          receipt_url: string | null
          recurring_pattern: Json | null
          status: Database["public"]["Enums"]["expense_status"] | null
          subcategory: string | null
          supplier_contact: Json | null
          supplier_name: string
          tax_amount: number | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          approved_by?: string | null
          category: string
          created_at?: string | null
          created_by: string
          description: string
          due_date?: string | null
          expense_date?: string
          expense_number: string
          id?: string
          invoice_number?: string | null
          is_recurring?: boolean | null
          payment_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          receipt_url?: string | null
          recurring_pattern?: Json | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          subcategory?: string | null
          supplier_contact?: Json | null
          supplier_name: string
          tax_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          approved_by?: string | null
          category?: string
          created_at?: string | null
          created_by?: string
          description?: string
          due_date?: string | null
          expense_date?: string
          expense_number?: string
          id?: string
          invoice_number?: string | null
          is_recurring?: boolean | null
          payment_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          receipt_url?: string | null
          recurring_pattern?: Json | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          subcategory?: string | null
          supplier_contact?: Json | null
          supplier_name?: string
          tax_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      family_history: {
        Row: {
          age_of_onset: number | null
          conditions: string[]
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string
          relation: string
          updated_at: string | null
        }
        Insert: {
          age_of_onset?: number | null
          conditions: string[]
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          relation: string
          updated_at?: string | null
        }
        Update: {
          age_of_onset?: number | null
          conditions?: string[]
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          relation?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number
          service_code: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          service_code?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          service_code?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          consultation_id: string | null
          created_at: string | null
          created_by: string
          discount_amount: number | null
          due_date: string
          id: string
          insurance_claim_number: string | null
          invoice_date: string
          invoice_number: string
          notes: string | null
          patient_id: string
          payment_date: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string | null
          created_by: string
          discount_amount?: number | null
          due_date: string
          id?: string
          insurance_claim_number?: string | null
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          patient_id: string
          payment_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number
          tax_amount?: number
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          consultation_id?: string | null
          created_at?: string | null
          created_by?: string
          discount_amount?: number | null
          due_date?: string
          id?: string
          insurance_claim_number?: string | null
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          patient_id?: string
          payment_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address_city: string | null
          address_country: string | null
          address_state: string | null
          address_street: string | null
          address_zip_code: string | null
          allergies: string[] | null
          blood_type: string | null
          chronic_conditions: string[] | null
          created_at: string | null
          created_by: string | null
          date_of_birth: string
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          last_visit: string | null
          mrn: string
          national_id: string | null
          next_appointment: string | null
          passport: string | null
          phone: string | null
          photo_url: string | null
          preferred_language: string | null
          profession: string | null
          status: Database["public"]["Enums"]["patient_status"] | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          address_city?: string | null
          address_country?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          allergies?: string[] | null
          blood_type?: string | null
          chronic_conditions?: string[] | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          last_visit?: string | null
          mrn: string
          national_id?: string | null
          next_appointment?: string | null
          passport?: string | null
          phone?: string | null
          photo_url?: string | null
          preferred_language?: string | null
          profession?: string | null
          status?: Database["public"]["Enums"]["patient_status"] | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          address_city?: string | null
          address_country?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip_code?: string | null
          allergies?: string[] | null
          blood_type?: string | null
          chronic_conditions?: string[] | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          last_visit?: string | null
          mrn?: string
          national_id?: string | null
          next_appointment?: string | null
          passport?: string | null
          phone?: string | null
          photo_url?: string | null
          preferred_language?: string | null
          profession?: string | null
          status?: Database["public"]["Enums"]["patient_status"] | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultation_id: string | null
          created_at: string | null
          doctor_id: string
          dosage: string
          duration: string
          end_date: string | null
          frequency: string
          id: string
          instructions: string | null
          medication_name: string
          patient_id: string
          prescribed_date: string | null
          quantity: number | null
          refills_allowed: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["prescription_status"] | null
          updated_at: string | null
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string | null
          doctor_id: string
          dosage: string
          duration: string
          end_date?: string | null
          frequency: string
          id?: string
          instructions?: string | null
          medication_name: string
          patient_id: string
          prescribed_date?: string | null
          quantity?: number | null
          refills_allowed?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["prescription_status"] | null
          updated_at?: string | null
        }
        Update: {
          consultation_id?: string | null
          created_at?: string | null
          doctor_id?: string
          dosage?: string
          duration?: string
          end_date?: string | null
          frequency?: string
          id?: string
          instructions?: string | null
          medication_name?: string
          patient_id?: string
          prescribed_date?: string | null
          quantity?: number | null
          refills_allowed?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["prescription_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          license_number: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          license_number?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          communication_method:
            | Database["public"]["Enums"]["communication_method"]
            | null
          completed_at: string | null
          created_at: string | null
          created_by: string
          description: string | null
          due_date: string
          id: string
          patient_id: string
          sent_at: string | null
          status: Database["public"]["Enums"]["reminder_status"] | null
          title: string
          type: Database["public"]["Enums"]["reminder_type"]
          updated_at: string | null
        }
        Insert: {
          communication_method?:
            | Database["public"]["Enums"]["communication_method"]
            | null
          completed_at?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          due_date: string
          id?: string
          patient_id: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["reminder_status"] | null
          title: string
          type: Database["public"]["Enums"]["reminder_type"]
          updated_at?: string | null
        }
        Update: {
          communication_method?:
            | Database["public"]["Enums"]["communication_method"]
            | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          due_date?: string
          id?: string
          patient_id?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["reminder_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["reminder_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string | null
          created_by: string
          description: string
          id: string
          priority: string | null
          resolution: string | null
          resolved_at: string | null
          status: string | null
          ticket_number: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string | null
          created_by: string
          description: string
          id?: string
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string | null
          ticket_number: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string | null
          created_by?: string
          description?: string
          id?: string
          priority?: string | null
          resolution?: string | null
          resolved_at?: string | null
          status?: string | null
          ticket_number?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surgical_history: {
        Row: {
          complications: string | null
          created_at: string | null
          hospital_name: string | null
          id: string
          notes: string | null
          outcome: string | null
          patient_id: string
          procedure_date: string
          procedure_name: string
          surgeon_name: string | null
          updated_at: string | null
        }
        Insert: {
          complications?: string | null
          created_at?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          outcome?: string | null
          patient_id: string
          procedure_date: string
          procedure_name: string
          surgeon_name?: string | null
          updated_at?: string | null
        }
        Update: {
          complications?: string | null
          created_at?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          outcome?: string | null
          patient_id?: string
          procedure_date?: string
          procedure_name?: string
          surgeon_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "surgical_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccination_records: {
        Row: {
          administered_by: string | null
          administration_date: string
          batch_number: string | null
          created_at: string | null
          dose_number: number | null
          id: string
          next_due_date: string | null
          notes: string | null
          patient_id: string
          site: string | null
          updated_at: string | null
          vaccine_code: string | null
          vaccine_name: string
        }
        Insert: {
          administered_by?: string | null
          administration_date: string
          batch_number?: string | null
          created_at?: string | null
          dose_number?: number | null
          id?: string
          next_due_date?: string | null
          notes?: string | null
          patient_id: string
          site?: string | null
          updated_at?: string | null
          vaccine_code?: string | null
          vaccine_name: string
        }
        Update: {
          administered_by?: string | null
          administration_date?: string
          batch_number?: string | null
          created_at?: string | null
          dose_number?: number | null
          id?: string
          next_due_date?: string | null
          notes?: string | null
          patient_id?: string
          site?: string | null
          updated_at?: string | null
          vaccine_code?: string | null
          vaccine_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccination_records_administered_by_fkey"
            columns: ["administered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccination_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_patient: {
        Args: { patient_id: string }
        Returns: boolean
      }
      generate_expense_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_mrn: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: { _role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
      is_admin_or_manager: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      appointment_status:
        | "scheduled"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "no-show"
      appointment_type: "consultation" | "follow-up" | "emergency" | "procedure"
      communication_method: "sms" | "email" | "whatsapp"
      document_type: "lab-result" | "scan" | "referral" | "insurance" | "other"
      employee_status: "active" | "inactive" | "terminated"
      expense_status: "pending" | "approved" | "rejected" | "paid"
      gender: "male" | "female" | "other"
      invoice_status: "paid" | "unpaid" | "partial" | "overdue"
      patient_status: "active" | "inactive" | "deceased" | "archived"
      payment_method: "cash" | "card" | "bank_transfer" | "insurance" | "other"
      prescription_status: "active" | "completed" | "discontinued"
      reminder_status: "active" | "completed" | "dismissed"
      reminder_type: "medication" | "follow-up" | "appointment" | "general"
      user_role: "admin" | "doctor" | "nurse" | "receptionist" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status: [
        "scheduled",
        "confirmed",
        "completed",
        "cancelled",
        "no-show",
      ],
      appointment_type: ["consultation", "follow-up", "emergency", "procedure"],
      communication_method: ["sms", "email", "whatsapp"],
      document_type: ["lab-result", "scan", "referral", "insurance", "other"],
      employee_status: ["active", "inactive", "terminated"],
      expense_status: ["pending", "approved", "rejected", "paid"],
      gender: ["male", "female", "other"],
      invoice_status: ["paid", "unpaid", "partial", "overdue"],
      patient_status: ["active", "inactive", "deceased", "archived"],
      payment_method: ["cash", "card", "bank_transfer", "insurance", "other"],
      prescription_status: ["active", "completed", "discontinued"],
      reminder_status: ["active", "completed", "dismissed"],
      reminder_type: ["medication", "follow-up", "appointment", "general"],
      user_role: ["admin", "doctor", "nurse", "receptionist", "manager"],
    },
  },
} as const
