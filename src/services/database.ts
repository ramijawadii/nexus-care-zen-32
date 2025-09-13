import { supabase } from '@/integrations/supabase/client';

// Simple type definitions to avoid deep type recursion
export interface SimplePatient {
  id: string;
  mrn: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  national_id?: string;
  passport?: string;
  status: string;
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
  last_visit?: string;
  next_appointment?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface SimpleAppointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  reason: string;
  notes?: string;
  status: string;
  type: string;
  location?: string;
  is_recurring: boolean;
  recurring_pattern?: any;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface SimpleProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: string;
  specialization?: string;
  license_number?: string;
  department?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
      let query = supabase
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
            query = query.eq(key, value);
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

      return { data: data || [], count };
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
  async createPatient(patient: Partial<SimplePatient>): Promise<ApiResponse<SimplePatient>> {
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
  async updatePatient(id: string, updates: Partial<SimplePatient>): Promise<ApiResponse<SimplePatient>> {
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
      let query = supabase
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
              query = query.eq(key, value);
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

      return { data: data || [], count };
    } catch (error: any) {
      return { error: error.message };
    }
  },

  // Create appointment
  async createAppointment(appointment: Partial<SimpleAppointment>): Promise<ApiResponse<SimpleAppointment>> {
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
  async updateAppointment(id: string, updates: Partial<SimpleAppointment>): Promise<ApiResponse<SimpleAppointment>> {
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
  async updateProfile(updates: Partial<SimpleProfile>): Promise<ApiResponse<SimpleProfile>> {
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
  async getProfiles(role?: string): Promise<ApiResponse<SimpleProfile[]>> {
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