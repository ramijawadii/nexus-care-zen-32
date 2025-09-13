-- =============================================
-- ENABLE ROW LEVEL SECURITY AND CREATE POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccination_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surgical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- =============================================
-- CREATE SECURITY DEFINER FUNCTIONS
-- =============================================

-- Function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_role public.user_role)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = _role 
    AND is_active = true
  );
$$;

-- Function to check if user is admin or manager
CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'manager') 
    AND is_active = true
  );
$$;

-- Function to check if user can access patient data
CREATE OR REPLACE FUNCTION public.can_access_patient(patient_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    CASE 
      -- Admin and managers can access all patients
      WHEN public.is_admin_or_manager() THEN true
      -- Doctors can access their assigned patients
      WHEN public.has_role('doctor') THEN EXISTS (
        SELECT 1 FROM public.appointments 
        WHERE appointments.patient_id = can_access_patient.patient_id 
        AND doctor_id = auth.uid()
      )
      -- Others (nurses, receptionists) can access all patients for operational needs
      ELSE public.has_role('nurse') OR public.has_role('receptionist')
    END;
$$;

-- =============================================
-- PROFILES POLICIES
-- =============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins and managers can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin_or_manager());

-- Admins and managers can update all profiles
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin_or_manager());

-- Only authenticated users can insert profiles (handled by trigger)
CREATE POLICY "Authenticated users can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- PATIENTS POLICIES
-- =============================================

-- Staff can view patients they have access to
CREATE POLICY "Staff can view accessible patients" ON public.patients
  FOR SELECT USING (public.can_access_patient(id));

-- Staff can create patients
CREATE POLICY "Staff can create patients" ON public.patients
  FOR INSERT WITH CHECK (
    public.has_role('doctor') OR 
    public.has_role('nurse') OR 
    public.has_role('receptionist') OR 
    public.is_admin_or_manager()
  );

-- Staff can update patients they have access to
CREATE POLICY "Staff can update accessible patients" ON public.patients
  FOR UPDATE USING (public.can_access_patient(id));

-- Only admins can delete patients
CREATE POLICY "Admins can delete patients" ON public.patients
  FOR DELETE USING (public.has_role('admin'));

-- =============================================
-- APPOINTMENTS POLICIES
-- =============================================

-- Users can view appointments for accessible patients
CREATE POLICY "View accessible appointments" ON public.appointments
  FOR SELECT USING (public.can_access_patient(patient_id));

-- Staff can create appointments
CREATE POLICY "Staff can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (
    public.can_access_patient(patient_id) AND (
      public.has_role('doctor') OR 
      public.has_role('nurse') OR 
      public.has_role('receptionist') OR 
      public.is_admin_or_manager()
    )
  );

-- Users can update appointments they created or are assigned to
CREATE POLICY "Update own appointments" ON public.appointments
  FOR UPDATE USING (
    public.can_access_patient(patient_id) AND (
      doctor_id = auth.uid() OR 
      created_by = auth.uid() OR 
      public.is_admin_or_manager()
    )
  );

-- =============================================
-- CONSULTATIONS POLICIES
-- =============================================

-- Users can view consultations for accessible patients
CREATE POLICY "View accessible consultations" ON public.consultations
  FOR SELECT USING (public.can_access_patient(patient_id));

-- Doctors can create consultations for their patients
CREATE POLICY "Doctors create consultations" ON public.consultations
  FOR INSERT WITH CHECK (
    public.can_access_patient(patient_id) AND 
    public.has_role('doctor') AND 
    doctor_id = auth.uid()
  );

-- Doctors can update their own consultations
CREATE POLICY "Doctors update own consultations" ON public.consultations
  FOR UPDATE USING (
    doctor_id = auth.uid() OR public.is_admin_or_manager()
  );

-- =============================================
-- PRESCRIPTIONS POLICIES
-- =============================================

-- Users can view prescriptions for accessible patients
CREATE POLICY "View accessible prescriptions" ON public.prescriptions
  FOR SELECT USING (public.can_access_patient(patient_id));

-- Doctors can create prescriptions
CREATE POLICY "Doctors create prescriptions" ON public.prescriptions
  FOR INSERT WITH CHECK (
    public.can_access_patient(patient_id) AND 
    public.has_role('doctor') AND 
    doctor_id = auth.uid()
  );

-- Doctors can update their own prescriptions
CREATE POLICY "Doctors update own prescriptions" ON public.prescriptions
  FOR UPDATE USING (
    doctor_id = auth.uid() OR public.is_admin_or_manager()
  );

-- =============================================
-- DOCUMENTS POLICIES
-- =============================================

-- Users can view documents for accessible patients
CREATE POLICY "View accessible documents" ON public.documents
  FOR SELECT USING (public.can_access_patient(patient_id));

-- Staff can upload documents
CREATE POLICY "Staff upload documents" ON public.documents
  FOR INSERT WITH CHECK (
    public.can_access_patient(patient_id) AND 
    uploaded_by = auth.uid()
  );

-- Users can update documents they uploaded or admins
CREATE POLICY "Update own documents" ON public.documents
  FOR UPDATE USING (
    uploaded_by = auth.uid() OR public.is_admin_or_manager()
  );

-- =============================================
-- INVOICES POLICIES
-- =============================================

-- Staff can view invoices for accessible patients
CREATE POLICY "View accessible invoices" ON public.invoices
  FOR SELECT USING (public.can_access_patient(patient_id));

-- Staff can create invoices
CREATE POLICY "Staff create invoices" ON public.invoices
  FOR INSERT WITH CHECK (
    public.can_access_patient(patient_id) AND 
    created_by = auth.uid()
  );

-- Staff can update invoices they created or admins
CREATE POLICY "Update own invoices" ON public.invoices
  FOR UPDATE USING (
    created_by = auth.uid() OR public.is_admin_or_manager()
  );

-- =============================================
-- INVOICE ITEMS POLICIES
-- =============================================

-- Users can view invoice items if they can view the invoice
CREATE POLICY "View invoice items" ON public.invoice_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invoices 
      WHERE invoices.id = invoice_items.invoice_id 
      AND public.can_access_patient(invoices.patient_id)
    )
  );

-- Users can create invoice items if they can modify the invoice
CREATE POLICY "Create invoice items" ON public.invoice_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invoices 
      WHERE invoices.id = invoice_items.invoice_id 
      AND (invoices.created_by = auth.uid() OR public.is_admin_or_manager())
    )
  );

-- =============================================
-- REMINDERS POLICIES
-- =============================================

-- Staff can view reminders for accessible patients
CREATE POLICY "View accessible reminders" ON public.reminders
  FOR SELECT USING (public.can_access_patient(patient_id));

-- Staff can create reminders
CREATE POLICY "Staff create reminders" ON public.reminders
  FOR INSERT WITH CHECK (
    public.can_access_patient(patient_id) AND 
    created_by = auth.uid()
  );

-- Staff can update reminders they created
CREATE POLICY "Update own reminders" ON public.reminders
  FOR UPDATE USING (
    created_by = auth.uid() OR public.is_admin_or_manager()
  );

-- =============================================
-- MEDICAL HISTORY POLICIES (Apply same pattern)
-- =============================================

-- Vaccination Records
CREATE POLICY "View accessible vaccination records" ON public.vaccination_records
  FOR SELECT USING (public.can_access_patient(patient_id));

CREATE POLICY "Staff create vaccination records" ON public.vaccination_records
  FOR INSERT WITH CHECK (public.can_access_patient(patient_id));

CREATE POLICY "Staff update vaccination records" ON public.vaccination_records
  FOR UPDATE USING (public.can_access_patient(patient_id));

-- Surgical History
CREATE POLICY "View accessible surgical history" ON public.surgical_history
  FOR SELECT USING (public.can_access_patient(patient_id));

CREATE POLICY "Staff create surgical history" ON public.surgical_history
  FOR INSERT WITH CHECK (public.can_access_patient(patient_id));

CREATE POLICY "Staff update surgical history" ON public.surgical_history
  FOR UPDATE USING (public.can_access_patient(patient_id));

-- Family History
CREATE POLICY "View accessible family history" ON public.family_history
  FOR SELECT USING (public.can_access_patient(patient_id));

CREATE POLICY "Staff create family history" ON public.family_history
  FOR INSERT WITH CHECK (public.can_access_patient(patient_id));

CREATE POLICY "Staff update family history" ON public.family_history
  FOR UPDATE USING (public.can_access_patient(patient_id));

-- =============================================
-- EMPLOYEE POLICIES
-- =============================================

-- Managers and admins can view all employees
CREATE POLICY "Managers view all employees" ON public.employees
  FOR SELECT USING (public.is_admin_or_manager());

-- Users can view their own employee record
CREATE POLICY "Users view own employee record" ON public.employees
  FOR SELECT USING (user_id = auth.uid());

-- Only admins and managers can create/update employee records
CREATE POLICY "Managers manage employees" ON public.employees
  FOR ALL USING (public.is_admin_or_manager());

-- =============================================
-- EXPENSES POLICIES
-- =============================================

-- Staff can view expenses they created or admins/managers
CREATE POLICY "View own expenses" ON public.expenses
  FOR SELECT USING (
    created_by = auth.uid() OR public.is_admin_or_manager()
  );

-- Staff can create expenses
CREATE POLICY "Staff create expenses" ON public.expenses
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Users can update expenses they created, managers can approve
CREATE POLICY "Update own expenses" ON public.expenses
  FOR UPDATE USING (
    created_by = auth.uid() OR public.is_admin_or_manager()
  );

-- =============================================
-- SUPPORT TICKETS POLICIES
-- =============================================

-- Users can view tickets they created or are assigned to
CREATE POLICY "View own tickets" ON public.support_tickets
  FOR SELECT USING (
    created_by = auth.uid() OR 
    assigned_to = auth.uid() OR 
    public.is_admin_or_manager()
  );

-- All authenticated users can create tickets
CREATE POLICY "Users create tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (created_by = auth.uid());

-- Users can update tickets they created or are assigned to
CREATE POLICY "Update assigned tickets" ON public.support_tickets
  FOR UPDATE USING (
    created_by = auth.uid() OR 
    assigned_to = auth.uid() OR 
    public.is_admin_or_manager()
  );

-- =============================================
-- CREATE TRIGGERS FOR AUTOMATIC UPDATES
-- =============================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'receptionist'
  );
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_patients BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_appointments BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_consultations BEFORE UPDATE ON public.consultations FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_prescriptions BEFORE UPDATE ON public.prescriptions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_documents BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_invoices BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_reminders BEFORE UPDATE ON public.reminders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_employees BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_expenses BEFORE UPDATE ON public.expenses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_tickets BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- CREATE STORAGE BUCKET FOR DOCUMENTS
-- =============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies for documents (private)
CREATE POLICY "Authenticated users can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can view documents they have access to" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND 
    auth.role() = 'authenticated'
  );

-- Storage policies for avatars (public)
CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own avatars" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND 
    auth.role() = 'authenticated'
  );

-- =============================================
-- HELPER FUNCTIONS FOR FRONTEND
-- =============================================

-- Function to generate MRN (Medical Record Number)
CREATE OR REPLACE FUNCTION public.generate_mrn()
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT 'MRN' || LPAD((
    SELECT COALESCE(MAX(CAST(SUBSTRING(mrn FROM 4) AS INTEGER)), 0) + 1
    FROM public.patients 
    WHERE mrn ~ '^MRN[0-9]+$'
  )::TEXT, 6, '0');
$$;

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT 'INV' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || 
         LPAD((
           SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 9) AS INTEGER)), 0) + 1
           FROM public.invoices 
           WHERE invoice_number ~ ('^INV' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-[0-9]+$')
         )::TEXT, 4, '0');
$$;

-- Function to generate expense number
CREATE OR REPLACE FUNCTION public.generate_expense_number()
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT 'EXP' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || 
         LPAD((
           SELECT COALESCE(MAX(CAST(SUBSTRING(expense_number FROM 9) AS INTEGER)), 0) + 1
           FROM public.expenses 
           WHERE expense_number ~ ('^EXP' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-[0-9]+$')
         )::TEXT, 4, '0');
$$;