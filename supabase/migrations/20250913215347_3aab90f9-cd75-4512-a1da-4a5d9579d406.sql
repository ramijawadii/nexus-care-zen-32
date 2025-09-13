-- =============================================
-- MEDICAL CRM COMPLETE DATABASE SCHEMA
-- =============================================

-- Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'doctor', 'nurse', 'receptionist', 'manager');
CREATE TYPE public.patient_status AS ENUM ('active', 'inactive', 'deceased', 'archived');
CREATE TYPE public.gender AS ENUM ('male', 'female', 'other');
CREATE TYPE public.appointment_status AS ENUM ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show');
CREATE TYPE public.appointment_type AS ENUM ('consultation', 'follow-up', 'emergency', 'procedure');
CREATE TYPE public.prescription_status AS ENUM ('active', 'completed', 'discontinued');
CREATE TYPE public.document_type AS ENUM ('lab-result', 'scan', 'referral', 'insurance', 'other');
CREATE TYPE public.invoice_status AS ENUM ('paid', 'unpaid', 'partial', 'overdue');
CREATE TYPE public.reminder_type AS ENUM ('medication', 'follow-up', 'appointment', 'general');
CREATE TYPE public.reminder_status AS ENUM ('active', 'completed', 'dismissed');
CREATE TYPE public.communication_method AS ENUM ('sms', 'email', 'whatsapp');
CREATE TYPE public.employee_status AS ENUM ('active', 'inactive', 'terminated');
CREATE TYPE public.expense_status AS ENUM ('pending', 'approved', 'rejected', 'paid');
CREATE TYPE public.payment_method AS ENUM ('cash', 'card', 'bank_transfer', 'insurance', 'other');

-- =============================================
-- 1. PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'receptionist',
  specialization TEXT,
  license_number TEXT,
  department TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (id)
);

-- =============================================
-- 2. PATIENTS TABLE
-- =============================================
CREATE TABLE public.patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mrn TEXT UNIQUE NOT NULL, -- Medical Record Number
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender gender NOT NULL,
  national_id TEXT,
  passport TEXT,
  status patient_status DEFAULT 'active',
  photo_url TEXT,
  profession TEXT,
  
  -- Contact Information
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip_code TEXT,
  address_country TEXT DEFAULT 'Tunisia',
  
  -- Emergency Contact
  emergency_contact_name TEXT,
  emergency_contact_relationship TEXT,
  emergency_contact_phone TEXT,
  
  -- Medical Information
  blood_type TEXT,
  allergies TEXT[],
  chronic_conditions TEXT[],
  insurance_provider TEXT,
  insurance_number TEXT,
  preferred_language TEXT DEFAULT 'French',
  
  -- Timestamps
  last_visit TIMESTAMP WITH TIME ZONE,
  next_appointment TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES public.profiles(id)
);

-- =============================================
-- 3. APPOINTMENTS TABLE
-- =============================================
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  reason TEXT NOT NULL,
  notes TEXT,
  status appointment_status DEFAULT 'scheduled',
  type appointment_type DEFAULT 'consultation',
  location TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES public.profiles(id)
);

-- =============================================
-- 4. CONSULTATIONS TABLE
-- =============================================
CREATE TABLE public.consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id),
  doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  consultation_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- SOAP Notes
  subjective TEXT,
  objective TEXT,
  assessment TEXT,
  plan TEXT,
  
  -- Additional fields
  chief_complaint TEXT,
  present_illness TEXT,
  physical_exam TEXT,
  vital_signs JSONB,
  diagnosis TEXT[],
  follow_up_date DATE,
  follow_up_instructions TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 5. PRESCRIPTIONS TABLE
-- =============================================
CREATE TABLE public.prescriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  instructions TEXT,
  quantity INTEGER,
  refills_allowed INTEGER DEFAULT 0,
  
  prescribed_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  start_date DATE,
  end_date DATE,
  status prescription_status DEFAULT 'active',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 6. DOCUMENTS TABLE
-- =============================================
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  type document_type NOT NULL,
  category TEXT,
  
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Metadata
  metadata JSONB,
  is_confidential BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 7. INVOICES TABLE
-- =============================================
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT UNIQUE NOT NULL,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  status invoice_status DEFAULT 'unpaid',
  payment_method payment_method,
  payment_date TIMESTAMP WITH TIME ZONE,
  
  notes TEXT,
  insurance_claim_number TEXT,
  
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 8. INVOICE ITEMS TABLE
-- =============================================
CREATE TABLE public.invoice_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  
  service_code TEXT,
  category TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 9. REMINDERS TABLE
-- =============================================
CREATE TABLE public.reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  
  type reminder_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status reminder_status DEFAULT 'active',
  
  communication_method communication_method DEFAULT 'sms',
  sent_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 10. VACCINATION RECORDS TABLE
-- =============================================
CREATE TABLE public.vaccination_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  
  vaccine_name TEXT NOT NULL,
  vaccine_code TEXT,
  administration_date DATE NOT NULL,
  next_due_date DATE,
  batch_number TEXT,
  site TEXT,
  dose_number INTEGER,
  
  administered_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 11. SURGICAL HISTORY TABLE
-- =============================================
CREATE TABLE public.surgical_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  
  procedure_name TEXT NOT NULL,
  procedure_date DATE NOT NULL,
  surgeon_name TEXT,
  hospital_name TEXT,
  complications TEXT,
  outcome TEXT,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 12. FAMILY HISTORY TABLE
-- =============================================
CREATE TABLE public.family_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  
  relation TEXT NOT NULL,
  conditions TEXT[] NOT NULL,
  age_of_onset INTEGER,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 13. EMPLOYEES TABLE
-- =============================================
CREATE TABLE public.employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  
  employee_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  position TEXT NOT NULL,
  department TEXT,
  hire_date DATE NOT NULL,
  salary DECIMAL(10,2),
  status employee_status DEFAULT 'active',
  
  -- Address
  address JSONB,
  
  -- Emergency contact
  emergency_contact JSONB,
  
  -- Employment details
  contract_type TEXT,
  work_schedule JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 14. EXPENSES TABLE
-- =============================================
CREATE TABLE public.expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  expense_number TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  
  supplier_name TEXT NOT NULL,
  supplier_contact JSONB,
  
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  payment_date DATE,
  
  payment_method payment_method,
  status expense_status DEFAULT 'pending',
  
  receipt_url TEXT,
  invoice_number TEXT,
  
  is_recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB,
  
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  approved_by UUID REFERENCES public.profiles(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- 15. SUPPORT TICKETS TABLE
-- =============================================
CREATE TABLE public.support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  assigned_to UUID REFERENCES public.profiles(id),
  
  resolution TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_patients_mrn ON public.patients(mrn);
CREATE INDEX idx_patients_status ON public.patients(status);
CREATE INDEX idx_patients_created_by ON public.patients(created_by);

CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_status ON public.appointments(status);

CREATE INDEX idx_consultations_patient_id ON public.consultations(patient_id);
CREATE INDEX idx_consultations_doctor_id ON public.consultations(doctor_id);
CREATE INDEX idx_consultations_date ON public.consultations(consultation_date);

CREATE INDEX idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX idx_prescriptions_status ON public.prescriptions(status);

CREATE INDEX idx_documents_patient_id ON public.documents(patient_id);
CREATE INDEX idx_documents_type ON public.documents(type);

CREATE INDEX idx_invoices_patient_id ON public.invoices(patient_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_date ON public.invoices(invoice_date);

CREATE INDEX idx_reminders_patient_id ON public.reminders(patient_id);
CREATE INDEX idx_reminders_due_date ON public.reminders(due_date);
CREATE INDEX idx_reminders_status ON public.reminders(status);

CREATE INDEX idx_expenses_category ON public.expenses(category);
CREATE INDEX idx_expenses_status ON public.expenses(status);
CREATE INDEX idx_expenses_date ON public.expenses(expense_date);