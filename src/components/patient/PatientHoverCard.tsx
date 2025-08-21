
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Calendar, AlertTriangle, User } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: 'active' | 'pending' | 'inactive';
  riskLevel: 'low' | 'medium' | 'high';
  phone?: string;
  nextSession?: string;
  emergencyContact?: string;
}

interface PatientHoverCardProps {
  patient: Patient;
}

const PatientHoverCard = ({ patient }: PatientHoverCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-80 shadow-lg border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{patient.name}</CardTitle>
          <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
            {patient.status === 'active' ? 'Actif' : 
             patient.status === 'pending' ? 'En attente' : 'Inactif'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Contact */}
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-text-muted" />
          <span className="text-sm">
            <strong>Téléphone:</strong> {patient.phone || '+33 6 XX XX XX XX'}
          </span>
        </div>

        {/* Next Session */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-text-muted" />
          <span className="text-sm">
            <strong>Prochaine séance:</strong> {patient.nextSession ? formatDate(patient.nextSession) : 'Non programmée'}
          </span>
        </div>

        {/* Condition */}
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-text-muted" />
          <span className="text-sm">
            <strong>Maladie:</strong> {patient.condition}
          </span>
        </div>

        {/* Emergency Contact */}
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-text-muted" />
          <span className="text-sm">
            <strong>Contact d'urgence:</strong> {patient.emergencyContact || 'Non renseigné'}
          </span>
        </div>

        {/* Last Visit */}
        <div className="pt-2 border-t">
          <span className="text-xs text-text-muted">
            Dernière visite: {formatDate(patient.lastVisit)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHoverCard;
