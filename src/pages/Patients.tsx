import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PatientCard from '@/components/PatientCard';
import PatientFilters from '@/components/patient/PatientFilters';
import PatientStatsCards from '@/components/patient/PatientStatsCards';
import AddPatientModal from '@/components/patient/AddPatientModal';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import GlobalChatbot from '@/components/shared/GlobalChatbot';
import PatientCardSkeleton from '@/components/patient/PatientCardSkeleton';

// Interface for mock patient data used in PatientCard
interface MockPatient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: 'active' | 'pending' | 'inactive';
  riskLevel: 'low' | 'medium' | 'high';
  isInCabinet: boolean;
  nextSession: string;
  phone: string;
  emergencyContact: string;
  registrationDate: string;
  nextAppointment: {
    date: string;
    time: string;
    type: string;
  };
  bookingType: 'online' | 'cabinet';
}

// Generate more comprehensive mock data with higher numbers
const generateMockPatients = (): MockPatient[] => {
  const patients: MockPatient[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      age: 34,
      condition: 'Hypertension artérielle',
      lastVisit: '2024-08-15',
      status: 'active',
      riskLevel: 'medium',
      isInCabinet: true,
      nextSession: '2024-08-22',
      phone: '06 12 34 56 78',
      emergencyContact: '06 98 76 54 32',
      registrationDate: '2024-08-05',
      nextAppointment: {
        date: '2024-08-22',
        time: '14:30',
        type: 'Consultation de suivi'
      },
      bookingType: 'cabinet'
    },
    {
      id: '2',
      name: 'Jean Dupont',
      age: 62,
      condition: 'Diabète Type 2',
      lastVisit: '2024-01-10',
      status: 'active',
      riskLevel: 'high',
      isInCabinet: false,
      nextSession: '',
      phone: '07 65 43 21 09',
      emergencyContact: '07 01 23 45 67',
      registrationDate: '2024-08-10',
      nextAppointment: {
        date: '2024-08-25',
        time: '10:00',
        type: 'Bilan de santé'
      },
      bookingType: 'online'
    },
    {
      id: '3',
      name: 'Sophie Lemaire',
      age: 28,
      condition: 'Migraine chronique',
      lastVisit: '2024-01-18',
      status: 'pending',
      riskLevel: 'low',
      isInCabinet: false,
      nextSession: '',
      phone: '06 44 55 66 77',
      emergencyContact: '06 88 99 00 11',
      registrationDate: '2024-08-12',
      nextAppointment: {
        date: '2024-08-23',
        time: '16:15',
        type: 'Consultation initiale'
      },
      bookingType: 'online'
    },
    {
      id: '4',
      name: 'Luc Martin',
      age: 45,
      condition: 'Asthme',
      lastVisit: '2024-01-05',
      status: 'active',
      riskLevel: 'medium',
      isInCabinet: true,
      nextSession: '2024-08-24',
      phone: '07 11 22 33 44',
      emergencyContact: '07 55 66 77 88',
      registrationDate: '2023-05-10',
      nextAppointment: {
        date: '2024-08-24',
        time: '09:45',
        type: 'Contrôle'
      },
      bookingType: 'cabinet'
    }
  ];

  // Generate additional patients to reach higher numbers
  const additionalPatients: MockPatient[] = [];
  const names = ['Sophie Martin', 'Pierre Leclerc', 'Anne Rousseau', 'Michel Blanc', 'Claire Moreau', 'Jean Petit', 'Isabelle Girard', 'François Bernard'];
  const conditions = ['Diabète Type 2', 'Asthme', 'Arthrite', 'Migraine chronique', 'Hypertension', 'Allergie saisonnière'];
  const bookingTypes: ('online' | 'cabinet')[] = ['online', 'cabinet'];
  
  for (let i = 0; i < 200; i++) {
    const isThisMonth = i < 18; // Exactly 18 new patients this month
    const hasAppointmentThisWeek = i < 42; // 42 appointments this week
    const bookingType = bookingTypes[Math.floor(Math.random() * 2)];
    
    additionalPatients.push({
      id: `${i + 10}`,
      name: `${names[i % names.length]} ${i + 1}`,
      age: 25 + (i % 50),
      condition: conditions[i % conditions.length],
      lastVisit: `2024-01-${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}`,
      status: 'active',
      riskLevel: ['low', 'medium', 'high'][i % 3] as 'low' | 'medium' | 'high',
      isInCabinet: i % 5 === 0,
      nextSession: hasAppointmentThisWeek ? `2024-08-${String(22 + (i % 5)).padStart(2, '0')}` : '',
      phone: `06 ${String(Math.floor(Math.random() * 90) + 10)} ${String(Math.floor(Math.random() * 90) + 10)} ${String(Math.floor(Math.random() * 90) + 10)} ${String(Math.floor(Math.random() * 90) + 10)}`,
      emergencyContact: `06 ${String(Math.floor(Math.random() * 90) + 10)} ${String(Math.floor(Math.random() * 90) + 10)} ${String(Math.floor(Math.random() * 90) + 10)} ${String(Math.floor(Math.random() * 90) + 10)}`,
      registrationDate: isThisMonth ? `2024-08-${String(Math.floor(Math.random() * 20) + 1).padStart(2, '0')}` : `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      nextAppointment: hasAppointmentThisWeek ? {
        date: `2024-08-${String(22 + (i % 5)).padStart(2, '0')}`,
        time: `${String(9 + (i % 8)).padStart(2, '0')}:${['00', '15', '30', '45'][i % 4]}`,
        type: ['Consultation de suivi', 'Contrôle', 'Examen', 'Vaccination'][i % 4]
      } : {
        date: `2024-09-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        time: `${String(9 + (i % 8)).padStart(2, '0')}:${['00', '15', '30', '45'][i % 4]}`,
        type: ['Consultation de suivi', 'Contrôle', 'Examen', 'Vaccination'][i % 4]
      },
      bookingType
    });
  }

  return [...patients.slice(0, 4), ...additionalPatients];
};

const mockPatients = generateMockPatients();

// Convert mock patients to Patient type for stats component
const convertToPatientStats = (mockPatients: MockPatient[]) => {
  return mockPatients.map(patient => ({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    condition: patient.condition,
    status: patient.status,
    registrationDate: patient.registrationDate,
    nextAppointment: `${patient.nextAppointment.date}T${patient.nextAppointment.time}:00`,
    bookingType: patient.bookingType
  }));
};

const Patients = () => {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaladie, setSelectedMaladie] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [customDate, setCustomDate] = useState<Date | undefined>();
  const [showInCabinetOnly, setShowInCabinetOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const patientStats = convertToPatientStats(mockPatients);

  // Simulate loading
  useState(() => {
    setTimeout(() => setIsLoading(false), 1500);
  });

  // Filter patients based on current filters
  const filteredPatients = mockPatients.filter(patient => {
    // Search filter
    if (searchTerm && !patient.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !patient.phone.includes(searchTerm)) {
      return false;
    }

    // Maladie filter
    if (selectedMaladie !== 'all' && !patient.condition.toLowerCase().includes(selectedMaladie.toLowerCase())) {
      return false;
    }

    // In cabinet filter
    if (showInCabinetOnly && !patient.isInCabinet) {
      return false;
    }

    return true;
  });

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Navbar with Sidebar Toggle */}
          <div className="bg-secondary h-16 border-b border-border-primary flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Patients</h1>
            </div>
            <Button 
              onClick={() => setIsAddPatientModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un patient
            </Button>
          </div>

          {/* Content Area - Fixed margins */}
          <div className="flex-1 p-6 overflow-y-auto max-w-full">
            {/* Patient Stats Cards */}
            <PatientStatsCards patients={patientStats} />

            {/* Patient Filters */}
            <Card className="mb-6">
              <CardContent>
                <PatientFilters 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedMaladie={selectedMaladie}
                  onMaladieChange={setSelectedMaladie}
                  selectedDateFilter={selectedDateFilter}
                  onDateFilterChange={setSelectedDateFilter}
                  customDate={customDate}
                  onCustomDateChange={setCustomDate}
                  showInCabinetOnly={showInCabinetOnly}
                  onShowInCabinetOnlyChange={setShowInCabinetOnly}
                />
              </CardContent>
            </Card>

            {/* Patient List with Lazy Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {isLoading ? (
                // Show skeleton cards while loading
                Array.from({ length: 12 }).map((_, index) => (
                  <PatientCardSkeleton key={index} />
                ))
              ) : (
                filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        open={isAddPatientModalOpen}
        onOpenChange={setIsAddPatientModalOpen}
      />
      <GlobalChatbot/>
    </SidebarProvider>
  );
};

export default Patients;
