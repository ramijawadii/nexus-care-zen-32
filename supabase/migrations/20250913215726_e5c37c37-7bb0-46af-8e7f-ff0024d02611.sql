-- Fix security warnings by setting search_path on functions

-- Update helper functions to include search_path
CREATE OR REPLACE FUNCTION public.generate_mrn()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 'MRN' || LPAD((
    SELECT COALESCE(MAX(CAST(SUBSTRING(mrn FROM 4) AS INTEGER)), 0) + 1
    FROM public.patients 
    WHERE mrn ~ '^MRN[0-9]+$'
  )::TEXT, 6, '0');
$$;

CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 'INV' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || 
         LPAD((
           SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 9) AS INTEGER)), 0) + 1
           FROM public.invoices 
           WHERE invoice_number ~ ('^INV' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-[0-9]+$')
         )::TEXT, 4, '0');
$$;

CREATE OR REPLACE FUNCTION public.generate_expense_number()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 'EXP' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-' || 
         LPAD((
           SELECT COALESCE(MAX(CAST(SUBSTRING(expense_number FROM 9) AS INTEGER)), 0) + 1
           FROM public.expenses 
           WHERE expense_number ~ ('^EXP' || TO_CHAR(CURRENT_DATE, 'YYYY') || '-[0-9]+$')
         )::TEXT, 4, '0');
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;