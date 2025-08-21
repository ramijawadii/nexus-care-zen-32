
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Patient } from '@/types/patient';
import { Search, Pill, Stethoscope, Syringe, Scissors, Users } from 'lucide-react';

interface PatientMedicalHistoryProps {
  patient: Patient;
}

const PatientMedicalHistory = ({ patient }: PatientMedicalHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-text-subtle" />
        <Input
          placeholder="Rechercher dans l'historique médical..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Prescriptions Actuelles
              </div>
              <Button size="sm">Ajouter</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patient.prescriptions.length > 0 ? (
              <div className="space-y-3">
                {patient.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border border-border-primary rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-text-primary">{prescription.medication}</h4>
                      <Badge variant={prescription.status === 'active' ? 'default' : 'secondary'}>
                        {prescription.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {prescription.dosage} - {prescription.frequency}
                    </p>
                    <p className="text-sm text-text-subtle">
                      Durée: {prescription.duration} | Prescrit le: {new Date(prescription.prescribedDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">Aucune prescription actuelle</p>
            )}
          </CardContent>
        </Card>

        {/* Vaccination Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Syringe className="w-5 h-5 mr-2" />
                Carnet de Vaccination
              </div>
              <Button size="sm">Ajouter</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patient.vaccinationRecords.length > 0 ? (
              <div className="space-y-3">
                {patient.vaccinationRecords.map((vaccine, index) => (
                  <div key={index} className="border border-border-primary rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-text-primary">{vaccine.vaccine}</h4>
                        <p className="text-sm text-text-secondary">
                          Administré le: {new Date(vaccine.date).toLocaleDateString('fr-FR')}
                        </p>
                        {vaccine.nextDue && (
                          <p className="text-sm text-text-subtle">
                            Prochain rappel: {new Date(vaccine.nextDue).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">Aucun vaccin enregistré</p>
            )}
          </CardContent>
        </Card>

        {/* Surgical History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Scissors className="w-5 h-5 mr-2" />
                Historique Chirurgical
              </div>
              <Button size="sm">Ajouter</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patient.surgicalHistory.length > 0 ? (
              <div className="space-y-3">
                {patient.surgicalHistory.map((surgery, index) => (
                  <div key={index} className="border border-border-primary rounded-lg p-3">
                    <h4 className="font-medium text-text-primary">{surgery.procedure}</h4>
                    <p className="text-sm text-text-secondary">
                      Date: {new Date(surgery.date).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Hôpital: {surgery.hospital}
                    </p>
                    {surgery.notes && (
                      <p className="text-sm text-text-subtle mt-2">{surgery.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">Aucun antécédent chirurgical</p>
            )}
          </CardContent>
        </Card>

        {/* Family History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Antécédents Familiaux
              </div>
              <Button size="sm">Ajouter</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {patient.familyHistory.length > 0 ? (
              <div className="space-y-3">
                {patient.familyHistory.map((family, index) => (
                  <div key={index} className="border border-border-primary rounded-lg p-3">
                    <h4 className="font-medium text-text-primary">{family.relation}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {family.conditions.map((condition, condIndex) => (
                        <Badge key={condIndex} variant="outline">{condition}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary">Aucun antécédent familial enregistré</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientMedicalHistory;
