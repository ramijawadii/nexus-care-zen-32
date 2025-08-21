
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppSidebar from '@/components/AppSidebar';
import PatientViewTabs from '@/components/patient/PatientViewTabs';
import PatientCopilot from '@/components/copilot/PatientCopilot';
import GlobalChatbot from '@/components/shared/GlobalChatbot';
import { Patient } from '@/types/patient';

// Mock patient data - updated to match the Patient interface
const mockPatient: Patient = {
  id: '2',
  name: 'Jean Martin',
  age: 32,
  gender: 'male',
  status: 'active',
  lastVisit: '2024-01-10',
  nextAppointment: '2024-01-22T10:00:00',
  profession: 'Ingénieur',
  contact: {
    phone: '06 98 76 54 32',
    email: 'jean.martin@email.com',
    address: {
      street: '123 Rue de la Santé',
      city: 'Paris',
      state: 'Île-de-France',
      zipCode: '75014',
      country: 'France'
    },
    emergencyContact: {
      name: 'Sophie Martin',
      relationship: 'Épouse',
      phone: '06 11 22 33 44'
    }
  },
  medicalInfo: {
    mrn: 'MRN001234',
    bloodType: 'A+',
    allergies: ['Pénicilline', 'Aspirine'],
    chronicConditions: ['Diabète Type 2', 'Hypertension'],
    insuranceProvider: 'CPAM Paris',
    preferredLanguage: 'Français'
  },
  consultations: [],
  prescriptions: [],
  appointments: [],
  documents: [],
  invoices: [],
  reminders: [],
  vaccinationRecords: [],
  surgicalHistory: [],
  familyHistory: []
};

const PatientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCopilot, setShowCopilot] = useState(false);

  const getRiskLevel = (patient: Patient) => {
    if (patient.medicalInfo.chronicConditions.length > 1) return 'high';
    if (patient.medicalInfo.chronicConditions.length === 1) return 'medium';
    return 'low';
  };

  const riskLevel = getRiskLevel(mockPatient);
  const primaryCondition = mockPatient.medicalInfo.chronicConditions[0] || 'Aucune condition';

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/patients')}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-text-primary">Dossier Patient</h1>
                  <p className="text-text-muted text-sm">Patient #{mockPatient.id}</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowCopilot(!showCopilot)}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
                variant="outline"
              >
                <Bot className="w-4 h-4" />
                {showCopilot ? 'Masquer' : 'Assistant'} IA
              </Button>
            </header>

            <main className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient Overview */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Informations Patient</CardTitle>
                        <Badge variant={riskLevel === 'high' ? 'destructive' : 'secondary'}>
                          {riskLevel === 'high' ? 'Risque élevé' : riskLevel === 'medium' ? 'Risque moyen' : 'Faible risque'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-text-muted">Âge</p>
                        <p className="font-medium">{mockPatient.age} ans</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Condition principale</p>
                        <p className="font-medium">{primaryCondition}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Téléphone</p>
                        <p className="font-medium">{mockPatient.contact.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Email</p>
                        <p className="font-medium">{mockPatient.contact.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Contact d'urgence</p>
                        <p className="font-medium">{mockPatient.contact.emergencyContact.name} - {mockPatient.contact.emergencyContact.phone}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Patient Details Tabs */}
                <div className="lg:col-span-2">
                  <PatientViewTabs patient={mockPatient} />
                </div>
              </div>

              {/* AI Copilot */}
              {showCopilot && (
                <div className="mt-6">
                  <PatientCopilot patient={mockPatient} />
                </div>
              )}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default PatientView;
