
export interface PatientContact {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface PatientMedicalInfo {
  mrn: string;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  insuranceProvider?: string;
  preferredLanguage: string;
}

export interface Consultation {
  id: string;
  date: string;
  reason: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  attachments?: string[];
  followUpDate?: string;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedDate: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'follow-up' | 'emergency';
}

export interface Document {
  id: string;
  name: string;
  type: 'lab-result' | 'scan' | 'referral' | 'insurance' | 'other';
  uploadDate: string;
  url: string;
  category: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'unpaid' | 'partial';
  insuranceClaim?: string;
}

export interface Reminder {
  id: string;
  type: 'medication' | 'follow-up' | 'appointment' | 'general';
  title: string;
  description: string;
  dueDate: string;
  status: 'active' | 'completed' | 'dismissed';
  communicationMethod: 'sms' | 'email' | 'whatsapp';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  nationalId?: string;
  passport?: string;
  status: 'active' | 'inactive' | 'deceased' | 'archived';
  lastVisit?: string;
  nextAppointment?: string;
  profession?: string;
  contact: PatientContact;
  medicalInfo: PatientMedicalInfo;
  consultations: Consultation[];
  prescriptions: Prescription[];
  appointments: Appointment[];
  documents: Document[];
  invoices: Invoice[];
  reminders: Reminder[];
  vaccinationRecords: {
    vaccine: string;
    date: string;
    nextDue?: string;
  }[];
  surgicalHistory: {
    procedure: string;
    date: string;
    hospital: string;
    notes?: string;
  }[];
  familyHistory: {
    relation: string;
    conditions: string[];
  }[];
}
