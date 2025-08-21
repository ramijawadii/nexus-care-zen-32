import { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Phone, Calendar, CreditCard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PatientFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  
  // Insurance Info
  insuranceProvider: string;
  insuranceNumber: string;
  
  // Initial Appointment
  appointmentReason: string;
  appointmentDate: string;
  appointmentTime: string;
}

const initialFormData: PatientFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactPhone: '',
  insuranceProvider: '',
  insuranceNumber: '',
  appointmentReason: '',
  appointmentDate: '',
  appointmentTime: ''
};

const AddPatientModal = ({ open, onOpenChange }: AddPatientModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);

  const steps = [
    { id: 1, title: 'Informations Personnelles', icon: User },
    { id: 2, title: 'Contact d\'Urgence', icon: Phone },
    { id: 3, title: 'Assurance', icon: CreditCard },
    { id: 4, title: 'Premier Rendez-vous', icon: Calendar }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Patient data:', formData);
    onOpenChange(false);
    setCurrentStep(1);
    setFormData(initialFormData);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Prénom du patient"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Nom du patient"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Genre</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculin</SelectItem>
                    <SelectItem value="female">Féminin</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="patient@email.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Adresse</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Adresse complète du patient"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergencyContactName">Nom du contact d'urgence *</Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => updateFormData('emergencyContactName', e.target.value)}
                placeholder="Nom complet du contact"
              />
            </div>

            <div>
              <Label htmlFor="emergencyContactRelationship">Relation</Label>
              <Select value={formData.emergencyContactRelationship} onValueChange={(value) => updateFormData('emergencyContactRelationship', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="spouse">Conjoint(e)</SelectItem>
                  <SelectItem value="child">Enfant</SelectItem>
                  <SelectItem value="sibling">Frère/Sœur</SelectItem>
                  <SelectItem value="friend">Ami(e)</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="emergencyContactPhone">Téléphone d'urgence *</Label>
              <Input
                id="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={(e) => updateFormData('emergencyContactPhone', e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="insuranceProvider">Assurance maladie</Label>
              <Input
                id="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={(e) => updateFormData('insuranceProvider', e.target.value)}
                placeholder="CPAM, MSA, etc."
              />
            </div>

            <div>
              <Label htmlFor="insuranceNumber">Numéro de sécurité sociale</Label>
              <Input
                id="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={(e) => updateFormData('insuranceNumber', e.target.value)}
                placeholder="1 23 45 67 890 123 45"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="appointmentReason">Motif du rendez-vous</Label>
              <Textarea
                id="appointmentReason"
                value={formData.appointmentReason}
                onChange={(e) => updateFormData('appointmentReason', e.target.value)}
                placeholder="Raison de la consultation"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointmentDate">Date souhaitée</Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => updateFormData('appointmentDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="appointmentTime">Heure souhaitée</Label>
                <Input
                  id="appointmentTime"
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => updateFormData('appointmentTime', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> La date et l'heure proposées seront confirmées selon la disponibilité du médecin.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau patient</DialogTitle>
          <DialogDescription>
            Remplissez les informations du patient étape par étape
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  currentStep === step.id 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : currentStep > step.id 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'bg-gray-100 text-gray-500'
                }`}>
                  <StepIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
              </div>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {(() => {
                const CurrentStepIcon = steps[currentStep - 1].icon;
                return <CurrentStepIcon className="w-5 h-5" />;
              })()}
              <span>{steps[currentStep - 1].title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <Badge variant="secondary">
            Étape {currentStep} sur {steps.length}
          </Badge>

          {currentStep < steps.length ? (
            <Button 
              onClick={handleNext}
              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
              variant="outline"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
              variant="outline"
            >
              Créer le patient
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
