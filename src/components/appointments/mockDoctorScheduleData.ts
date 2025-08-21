
// Get current date and generate appointments for the current week
const now = new Date();
const currentWeekStart = new Date(now);
currentWeekStart.setDate(now.getDate() - now.getDay() + 1); // Monday of current week

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const generateAppointmentForDate = (date: Date, timeSlot: string, patientData: any) => {
  return {
    ...patientData,
    date: formatDate(date),
    time: timeSlot,
  };
};

export const mockDoctorSchedule = [
  // TODAY'S APPOINTMENTS
  {
    id: 'today-1',
    type: 'appointment' as const,
    patientName: 'Sarah Johnson',
    patientPhone: '+1234567890',
    date: formatDate(now),
    time: '09:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'new-patient' as const,
    reason: 'Initial consultation - chest pain',
    notes: 'New patient referral from Dr. Adams'
  },
  {
    id: 'today-2',
    type: 'appointment' as const,
    patientName: 'Michael Chen',
    patientPhone: '+1234567891',
    date: formatDate(now),
    time: '09:30',
    duration: 45,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Diabetes management follow-up',
    notes: 'Check A1C results, adjust medication'
  },
  {
    id: 'today-3',
    type: 'appointment' as const,
    patientName: 'Emma Rodriguez',
    patientPhone: '+1234567892',
    date: formatDate(now),
    time: '10:30',
    duration: 30,
    status: 'waiting' as const,
    appointmentType: 'routine' as const,
    reason: 'Annual physical examination',
    notes: 'Annual checkup'
  },
  {
    id: 'today-4',
    type: 'appointment' as const,
    patientName: 'Robert Wilson',
    patientPhone: '+1234567893',
    date: formatDate(now),
    time: '11:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Blood pressure monitoring',
    notes: 'Hypertension follow-up'
  },
  {
    id: 'today-lunch',
    type: 'block' as const,
    date: formatDate(now),
    time: '12:00',
    duration: 60,
    status: 'blocked' as const,
    blockType: 'lunch' as const,
    notes: 'Lunch break'
  },
  {
    id: 'today-5',
    type: 'appointment' as const,
    patientName: 'David Thompson',
    patientPhone: '+1234567894',
    date: formatDate(now),
    time: '14:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Hypertension monitoring',
    notes: 'Blood pressure check, medication review'
  },
  {
    id: 'today-6',
    type: 'appointment' as const,
    patientName: 'Lisa Anderson',
    patientPhone: '+1234567895',
    date: formatDate(now),
    time: '15:00',
    duration: 30,
    status: 'completed' as const,
    appointmentType: 'routine' as const,
    reason: 'Skin rash consultation',
    notes: 'Treatment prescribed'
  },
  {
    id: 'today-7',
    type: 'appointment' as const,
    patientName: 'Jennifer Davis',
    patientPhone: '+1234567896',
    date: formatDate(now),
    time: '15:30',
    duration: 45,
    status: 'confirmed' as const,
    appointmentType: 'new-patient' as const,
    reason: 'Chronic fatigue consultation',
    notes: 'Comprehensive evaluation needed'
  },

  // TOMORROW'S APPOINTMENTS
  {
    id: 'tomorrow-1',
    type: 'appointment' as const,
    patientName: 'James Miller',
    patientPhone: '+1234567897',
    date: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    time: '09:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Post-surgery follow-up',
    notes: 'Check incision healing'
  },
  {
    id: 'tomorrow-2',
    type: 'appointment' as const,
    patientName: 'Maria Garcia',
    patientPhone: '+1234567898',
    date: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    time: '09:30',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'routine' as const,
    reason: 'Medication review',
    notes: 'Review current prescriptions'
  },
  {
    id: 'tomorrow-3',
    type: 'appointment' as const,
    patientName: 'Thomas Lee',
    patientPhone: '+1234567899',
    date: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    time: '10:00',
    duration: 45,
    status: 'waiting' as const,
    appointmentType: 'new-patient' as const,
    reason: 'Back pain evaluation',
    notes: 'Possible referral to orthopedist'
  },
  {
    id: 'tomorrow-4',
    type: 'appointment' as const,
    patientName: 'Nancy White',
    patientPhone: '+1234567800',
    date: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    time: '11:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Arthritis management',
    notes: 'Joint pain assessment'
  },
  {
    id: 'tomorrow-5',
    type: 'appointment' as const,
    patientName: 'Kevin Brown',
    patientPhone: '+1234567801',
    date: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    time: '14:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'routine' as const,
    reason: 'Regular checkup',
    notes: 'Annual physical'
  },
  {
    id: 'tomorrow-6',
    type: 'appointment' as const,
    patientName: 'Patricia Clark',
    patientPhone: '+1234567802',
    date: formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
    time: '15:00',
    duration: 30,
    status: 'no-show' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Lab results review',
    notes: 'Patient did not show up'
  },

  // DAY AFTER TOMORROW
  {
    id: 'day3-1',
    type: 'appointment' as const,
    patientName: 'Christopher Davis',
    patientPhone: '+1234567803',
    date: formatDate(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
    time: '09:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'new-patient' as const,
    reason: 'Headache consultation',
    notes: 'Migraine evaluation'
  },
  {
    id: 'day3-2',
    type: 'appointment' as const,
    patientName: 'Amanda Wilson',
    patientPhone: '+1234567804',
    date: formatDate(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
    time: '10:00',
    duration: 45,
    status: 'confirmed' as const,
    appointmentType: 'urgent' as const,
    reason: 'Chest pain urgent consultation',
    notes: 'Emergency appointment'
  },
  {
    id: 'day3-lunch',
    type: 'block' as const,
    date: formatDate(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
    time: '12:00',
    duration: 60,
    status: 'blocked' as const,
    blockType: 'lunch' as const,
    notes: 'Lunch break'
  },
  {
    id: 'day3-surgery',
    type: 'block' as const,
    date: formatDate(new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)),
    time: '14:00',
    duration: 120,
    status: 'blocked' as const,
    blockType: 'surgery' as const,
    notes: 'Minor procedure - Room 3'
  },

  // NEXT WEEK APPOINTMENTS
  {
    id: 'nextweek-1',
    type: 'appointment' as const,
    patientName: 'Daniel Martinez',
    patientPhone: '+1234567805',
    date: formatDate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)),
    time: '09:30',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Diabetes follow-up',
    notes: 'Review glucose levels'
  },
  {
    id: 'nextweek-2',
    type: 'appointment' as const,
    patientName: 'Rebecca Taylor',
    patientPhone: '+1234567806',
    date: formatDate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)),
    time: '10:30',
    duration: 30,
    status: 'waiting' as const,
    appointmentType: 'routine' as const,
    reason: 'Annual wellness exam',
    notes: 'Preventive care visit'
  },
  {
    id: 'nextweek-3',
    type: 'appointment' as const,
    patientName: 'Matthew Johnson',
    patientPhone: '+1234567807',
    date: formatDate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)),
    time: '14:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'new-patient' as const,
    reason: 'Knee injury evaluation',
    notes: 'Sports injury assessment'
  },

  // MORE APPOINTMENTS FOR VARIETY
  {
    id: 'variety-1',
    type: 'appointment' as const,
    patientName: 'Ashley Rodriguez',
    patientPhone: '+1234567808',
    date: formatDate(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)),
    time: '09:00',
    duration: 45,
    status: 'confirmed' as const,
    appointmentType: 'new-patient' as const,
    reason: 'Pregnancy consultation',
    notes: 'First prenatal visit'
  },
  {
    id: 'variety-2',
    type: 'appointment' as const,
    patientName: 'Ryan Thompson',
    patientPhone: '+1234567809',
    date: formatDate(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)),
    time: '10:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Blood pressure check',
    notes: 'Medication adjustment review'
  },
  {
    id: 'variety-3',
    type: 'appointment' as const,
    patientName: 'Michelle Anderson',
    patientPhone: '+1234567810',
    date: formatDate(new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000)),
    time: '11:00',
    duration: 30,
    status: 'cancelled' as const,
    appointmentType: 'routine' as const,
    reason: 'Annual physical',
    notes: 'Patient cancelled - rescheduling needed'
  },
  {
    id: 'variety-4',
    type: 'appointment' as const,
    patientName: 'Brandon Lee',
    patientPhone: '+1234567811',
    date: formatDate(new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000)),
    time: '14:00',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Wound care follow-up',
    notes: 'Check healing progress'
  },
  {
    id: 'variety-5',
    type: 'appointment' as const,
    patientName: 'Stephanie Garcia',
    patientPhone: '+1234567812',
    date: formatDate(new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)),
    time: '15:30',
    duration: 30,
    status: 'confirmed' as const,
    appointmentType: 'routine' as const,
    reason: 'Vaccination appointment',
    notes: 'Annual flu shot'
  },

  // YESTERDAY'S APPOINTMENTS (for completed status examples)
  {
    id: 'yesterday-1',
    type: 'appointment' as const,
    patientName: 'John Smith',
    patientPhone: '+1234567813',
    date: formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000)),
    time: '09:00',
    duration: 30,
    status: 'completed' as const,
    appointmentType: 'routine' as const,
    reason: 'Regular checkup',
    notes: 'All vitals normal'
  },
  {
    id: 'yesterday-2',
    type: 'appointment' as const,
    patientName: 'Jane Doe',
    patientPhone: '+1234567814',
    date: formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000)),
    time: '10:30',
    duration: 45,
    status: 'completed' as const,
    appointmentType: 'follow-up' as const,
    reason: 'Lab results discussion',
    notes: 'Results reviewed, treatment adjusted'
  }
];
