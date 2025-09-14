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
import { usePatients } from '@/hooks/usePatients';
import { useToast } from '@/hooks/use-toast';


const Patients = () => {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaladie, setSelectedMaladie] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [customDate, setCustomDate] = useState<Date | undefined>();
  const [showInCabinetOnly, setShowInCabinetOnly] = useState(false);
  const { toast } = useToast();
  
  const { 
    patients, 
    loading, 
    error, 
    totalCount,
    createPatient,
    refetch 
  } = usePatients({
    query: searchTerm || undefined,
    limit: 50
  });

  // Handle patient creation success
  const handlePatientCreated = async () => {
    setIsAddPatientModalOpen(false);
    await refetch();
    toast({
      title: "Patient créé",
      description: "Le nouveau patient a été ajouté avec succès."
    });
  };

  // Filter patients based on current filters
  const filteredPatients = patients.filter(patient => {
    // Maladie filter (search in chronic conditions)
    if (selectedMaladie !== 'all') {
      const hasCondition = patient.chronic_conditions?.some(condition => 
        condition.toLowerCase().includes(selectedMaladie.toLowerCase())
      );
      if (!hasCondition) return false;
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
            <PatientStatsCards patients={patients} />

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
              {loading ? (
                // Show skeleton cards while loading
                Array.from({ length: 12 }).map((_, index) => (
                  <PatientCardSkeleton key={index} />
                ))
              ) : error ? (
                <div className="col-span-3 text-center p-8 text-destructive">
                  Erreur lors du chargement des patients: {error}
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="col-span-3 text-center p-8 text-muted-foreground">
                  Aucun patient trouvé.
                </div>
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
        onPatientCreated={handlePatientCreated}
        createPatient={createPatient}
      />
      <GlobalChatbot/>
    </SidebarProvider>
  );
};

export default Patients;
