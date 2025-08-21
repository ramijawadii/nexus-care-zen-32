
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/patient';
import { MapPin, User, Shield, Globe, AlertTriangle, Heart } from 'lucide-react';

interface PatientGeneralInfoProps {
  patient: Patient;
}

const PatientGeneralInfo = ({ patient }: PatientGeneralInfoProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Informations de Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Adresse</label>
            <p className="text-text-primary">{patient.contact.address.street}</p>
            <p className="text-text-primary">
              {patient.contact.address.city}, {patient.contact.address.state} {patient.contact.address.zipCode}
            </p>
            <p className="text-text-primary">{patient.contact.address.country}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Téléphone</label>
            <p className="text-text-primary">{patient.contact.phone || 'Non renseigné'}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Email</label>
            <p className="text-text-primary">{patient.contact.email || 'Non renseigné'}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">WhatsApp</label>
            <p className="text-text-primary">{patient.contact.whatsapp || 'Non renseigné'}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Profession</label>
            <p className="text-text-primary">{patient.profession || 'Non renseigné'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Contact d'Urgence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Nom</label>
            <p className="text-text-primary">{patient.contact.emergencyContact.name}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Relation</label>
            <p className="text-text-primary">{patient.contact.emergencyContact.relationship}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Téléphone</label>
            <p className="text-text-primary">{patient.contact.emergencyContact.phone}</p>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Informations Médicales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Groupe Sanguin</label>
            <p className="text-text-primary font-medium">{patient.medicalInfo.bloodType}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Langue Préférée</label>
            <p className="text-text-primary">{patient.medicalInfo.preferredLanguage}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Numéro National</label>
            <p className="text-text-primary">{patient.nationalId || 'Non renseigné'}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Passeport</label>
            <p className="text-text-primary">{patient.passport || 'Non renseigné'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Insurance & Allergies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Assurance & Alertes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Assurance</label>
            <p className="text-text-primary">{patient.medicalInfo.insuranceProvider || 'Aucune'}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Allergies</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {patient.medicalInfo.allergies.length > 0 ? (
                patient.medicalInfo.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {allergy}
                  </Badge>
                ))
              ) : (
                <p className="text-text-secondary">Aucune allergie connue</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Maladies Chroniques</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {patient.medicalInfo.chronicConditions.length > 0 ? (
                patient.medicalInfo.chronicConditions.map((condition, index) => (
                  <Badge key={index} variant="outline">{condition}</Badge>
                ))
              ) : (
                <p className="text-text-secondary">Aucune maladie chronique</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientGeneralInfo;
