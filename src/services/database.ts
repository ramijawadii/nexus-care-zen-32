import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Simplified types to avoid deep type recursion
export interface SimplePatient {
  id: string;
  mrn: string;
  full_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  national_id?: string | null;
  passport?: string | null;
  status: 'active' | 'inactive' | 'archived' | 'deceased';
  photo_url?: string | null;
  profession?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_state?: string | null;
  address_zip_code?: string | null;
  address_country?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_relationship?: string | null;
  emergency_contact_phone?: string | null;
  blood_type?: string | null;
  allergies?: string[] | null;
  chronic_conditions?: string[] | null;
  insurance_provider?: string | null;
  insurance_number?: string | null;
  preferred_language?: string | null;
  last_visit?: string | null;
  next_appointment?: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by?: string | null;
}

export interface PatientInsert {
  mrn?: string;
  full_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  national_id?: string;
  passport?: string;
  status?: 'active' | 'inactive' | 'archived' | 'deceased';
  photo_url?: string;
  profession?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip_code?: string;
  address_country?: string;
  emergency_contact_name?: string;
  emergency_contact_relationship?: string;
  emergency_contact_phone?: string;
  blood_type?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  insurance_provider?: string;
  insurance_number?: string;
  preferred_language?: string;
  created_by?: string;
}

export interface PatientUpdate {
  full_name?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  national_id?: string;
  passport?: string;
  status?: 'active' | 'inactive' | 'archived' | 'deceased';
  photo_url?: string;
  profession?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip_code?: string;
  address_country?: string;
  emergency_contact_name?: string;
  emergency_contact_relationship?: string;
  emergency_contact_phone?: string;
  blood_type?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  insurance_provider?: string;
  insurance_number?: string;
  preferred_language?: string;
}

export interface SimpleAppointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number | null;
  reason: string;
  notes?: string | null;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show' | null;
  type: 'consultation' | 'follow-up' | 'emergency' | 'procedure' | null;
  location?: string | null;
  is_recurring: boolean | null;
  recurring_pattern?: any;
  reminder_sent: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  created_by?: string | null;
}

export interface AppointmentInsert {
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes?: number;
  reason: string;
  notes?: string;
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type?: 'consultation' | 'follow-up' | 'emergency' | 'procedure';
  location?: string;
  is_recurring?: boolean;
  recurring_pattern?: any;
  reminder_sent?: boolean;
  created_by?: string;
}

export interface AppointmentUpdate {
  patient_id?: string;
  doctor_id?: string;
  appointment_date?: string;
  appointment_time?: string;
  duration_minutes?: number;
  reason?: string;
  notes?: string;
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type?: 'consultation' | 'follow-up' | 'emergency' | 'procedure';
  location?: string;
  is_recurring?: boolean;
  recurring_pattern?: any;
  reminder_sent?: boolean;
}

export interface SimpleProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'manager';
  specialization?: string | null;
  license_number?: string | null;
  department?: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProfileUpdate {
  full_name?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  role?: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'manager';
  specialization?: string;
  license_number?: string;
  department?: string;
  is_active?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  count?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

// =============================================
// PATIENT OPERATIONS
// =============================================

export const patientService = {
  // Get all patients with pagination and search
  async getPatients(params?: PaginationParams & SearchParams): Promise<ApiResponse<SimplePatient[]>> {
    try {
      let query: any = supabase
        .from('patients')
        .select('*', { count: 'exact' });

      // Apply search
      if (params?.query) {
        query = query.or(`full_name.ilike.%${params.query}%,mrn.ilike.%${params.query}%,email.ilike.%${params.query}%`);
      }

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query = query.eq(key, value) as any;
          }
        });
      }

      // Apply pagination
      if (params?.page && params?.limit) {
        const from = (params.page - 1) * params.limit;
        const to = from + params.limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return { data: (data || []) as SimplePatient[], count };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Get single patient with full relations
  async getPatientById(id: string): Promise<ApiResponse<SimplePatient>> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Create new patient
  async createPatient(patient: PatientInsert): Promise<ApiResponse<SimplePatient>> {
    try {
      // Generate MRN
      const { data: mrnData, error: mrnError } = await supabase.rpc('generate_mrn');
      if (mrnError) throw mrnError;

      const patientData = {
        ...patient,
        mrn: mrnData,
      };

      const { data, error } = await supabase
        .from('patients')
        .insert(patientData)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Update patient
  async updatePatient(id: string, updates: PatientUpdate): Promise<ApiResponse<SimplePatient>> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Delete patient
  async deletePatient(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { data: undefined };
    } catch (error: any) {
      return { error: error.message };
    }
  }
};

// =============================================
// APPOINTMENT OPERATIONS
// =============================================

export const appointmentService = {
  // Get appointments with filters
  async getAppointments(params?: PaginationParams & SearchParams): Promise<ApiResponse<SimpleAppointment[]>> {
    try {
      let query: any = supabase
        .from('appointments')
        .select('*', { count: 'exact' })
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      // Apply filters
      if (params?.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (key === 'appointment_date' && typeof value === 'object' && value.gte && value.lte) {
              query = query.gte('appointment_date', value.gte).lte('appointment_date', value.lte);
            } else {
              query = query.eq(key, value) as any;
            }
          }
        });
      }

      // Apply pagination
      if (params?.page && params?.limit) {
        const from = (params.page - 1) * params.limit;
        const to = from + params.limit - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return { data: (data || []) as SimpleAppointment[], count };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Create appointment
  async createAppointment(appointment: AppointmentInsert): Promise<ApiResponse<SimpleAppointment>> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert(appointment)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Update appointment
  async updateAppointment(id: string, updates: AppointmentUpdate): Promise<ApiResponse<SimpleAppointment>> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Delete appointment
  async deleteAppointment(id: string): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { data: undefined };
    } catch (error: any) {
      return { error: error.message };
    }
  }
};

// =============================================
// PROFILE OPERATIONS
// =============================================

export const profileService = {
  // Get current user profile
  async getCurrentProfile(): Promise<ApiResponse<SimpleProfile>> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Update profile
  async updateProfile(updates: ProfileUpdate): Promise<ApiResponse<SimpleProfile>> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Get all profiles (for doctors list, etc.)
  async getProfiles(role?: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'manager'): Promise<ApiResponse<SimpleProfile[]>> {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('is_active', true);

      if (role) {
        query = query.eq('role', role);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data: data || [] };
    } catch (error: any) {
      return { error: error.message };
    }
  }
};