import { Link, useNavigate } from 'react-router-dom';
import { Calendar, AlertTriangle, CheckCircle, Clock, Circle, CreditCard, FileText, Euro, CalendarDays, Edit, MessageSquare, User, Phone, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger,
  ContextMenuSeparator 
} from '@/components/ui/context-menu';

import { SimplePatient } from '@/services/database';

interface Patient extends SimplePatient {
  // Add computed fields for display
  age?: number;
  condition?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  isInCabinet?: boolean;
  nextSession?: string;
  appointmentHistory?: Array<{
    id: string;
    date: string;
    type: string;
    status: 'completed' | 'cancelled' | 'no-show';
  }>;
  nextAppointment?: {
    date: string;
    time: string;
    type: string;
  };
  paymentHistory?: Array<{
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'unpaid' | 'partial';
    description: string;
  }>;
  totalOutstanding?: number;
}

interface PatientCardProps {
  patient: Patient;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-warning" />;
    case 'inactive':
      return <AlertTriangle className="w-4 h-4 text-error" />;
    default:
      return null;
  }
};

const getRiskBadge = (riskLevel: string) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (riskLevel) {
    case 'high':
      return `${baseClasses} bg-error text-white`;
    case 'medium':
      return `${baseClasses} bg-warning text-white`;
    case 'low':
      return `${baseClasses} bg-success text-white`;
    default:
      return `${baseClasses} bg-text-muted text-white`;
  }
};

const getLiveStatusIndicator = (isInCabinet?: boolean, nextSession?: string) => {
  if (isInCabinet) {
    return (
      <div className="flex items-center space-x-1">
        <Circle className="w-3 h-3 fill-green-500 text-green-500 animate-pulse" />
        <span className="text-xs text-green-600 font-medium">En cabinet</span>
      </div>
    );
  }
  
  if (nextSession) {
    const sessionDate = new Date(nextSession);
    const today = new Date();
    const isToday = sessionDate.toDateString() === today.toDateString();
    const isTomorrow = sessionDate.toDateString() === new Date(today.getTime() + 86400000).toDateString();
    
    if (isToday) {
      return (
        <div className="flex items-center space-x-1">
          <Circle className="w-3 h-3 fill-blue-500 text-blue-500" />
          <span className="text-xs text-blue-600 font-medium">RDV aujourd'hui</span>
        </div>
      );
    } else if (isTomorrow) {
      return (
        <div className="flex items-center space-x-1">
          <Circle className="w-3 h-3 fill-orange-500 text-orange-500" />
          <span className="text-xs text-orange-600 font-medium">RDV demain</span>
        </div>
      );
    }
  }
  
  return (
    <div className="flex items-center space-x-1">
      <Circle className="w-3 h-3 fill-gray-400 text-gray-400" />
      <span className="text-xs text-gray-500">Hors cabinet</span>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const PatientCard = ({ patient }: PatientCardProps) => {
  const navigate = useNavigate();
  
  // Compute display values from database fields
  const displayPatient: Patient = {
    ...patient,
    age: patient.date_of_birth ? 
      new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear() : 
      undefined,
    condition: patient.chronic_conditions?.join(', ') || 'Aucune condition connue',
    riskLevel: 'low', // Default risk level, could be computed from conditions
  };

  const handleViewInCalendar = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Viewing ${patient.full_name}'s appointment in calendar`);
    navigate('/appointments');
  };

  const handleChangeTime = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Changing appointment time for ${patient.full_name}`);
    // Open time change modal or navigate to scheduling
  };

  const handleTeamChat = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const message = `Discussion concernant ${patient.full_name} - RDV du ${formatDate(patient.nextAppointment?.date || '')} à ${patient.nextAppointment?.time}`;
    console.log(`Opening team chat with message: ${message}`);
    // Open team chat with pre-filled message
  };

  const handleViewProfile = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Viewing ${patient.full_name}'s profile`);
    navigate(`/patient/${patient.id}`);
  };

  const handleEditPatient = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Editing ${patient.full_name}'s information`);
    // Open edit patient modal
  };

  const handleCallPatient = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (patient.phone) {
      window.open(`tel:${patient.phone}`, '_self');
    }
  };

  const handleDeletePatient = (patient: Patient, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Deleting ${patient.full_name}`);
    // Show confirmation dialog and delete patient
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link to={`/patient/${patient.id}`} className="block">
          <div className="card-patient group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary group-hover:text-text-primary transition-colors">
              {displayPatient.full_name}
            </h3>
            <p className="text-text-muted text-sm">
              {displayPatient.age ? `Âge ${displayPatient.age}` : 'Âge non spécifié'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(displayPatient.status || 'active')}
            <span className={getRiskBadge(displayPatient.riskLevel || 'low')}>
              {displayPatient.riskLevel === 'high' ? 'Risque élevé' :
               displayPatient.riskLevel === 'medium' ? 'Risque moyen' : 'Faible risque'}
            </span>
          </div>
        </div>

        {/* Live Status */}
        <div className="mb-3">
          {getLiveStatusIndicator(displayPatient.isInCabinet, displayPatient.nextSession)}
        </div>

        {/* Condition */}
        <div className="mb-4">
          <p className="text-text-primary font-medium">{displayPatient.condition}</p>
        </div>

        {/* Last Visit */}
        <div className="flex items-center space-x-2 text-text-muted mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Dernière visite: {patient.last_visit ? formatDate(patient.last_visit) : 'Jamais'}
          </span>
        </div>

        {/* Next Appointment with Context Menu */}
        {displayPatient.nextAppointment && (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors" 
                   onClick={(e) => e.preventDefault()}>
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Prochain RDV</span>
                </div>
                <p className="text-sm text-blue-800 font-medium">
                  {formatDate(displayPatient.nextAppointment.date)} à {displayPatient.nextAppointment.time}
                </p>
                <p className="text-xs text-blue-600">{displayPatient.nextAppointment.type}</p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem onClick={(e) => handleViewInCalendar(patient, e)}>
                <CalendarDays className="w-4 h-4 mr-2" />
                Voir dans le calendrier
              </ContextMenuItem>
              <ContextMenuItem onClick={(e) => handleChangeTime(patient, e)}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier l'horaire
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={(e) => handleTeamChat(patient, e)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat équipe
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}

        {/* Appointment History Summary */}
        {displayPatient.appointmentHistory && displayPatient.appointmentHistory.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">Historique RDV</span>
              </div>
              <span className="text-xs text-text-muted">{displayPatient.appointmentHistory.length} total</span>
            </div>
            <div className="flex space-x-1">
              {displayPatient.appointmentHistory.slice(0, 3).map((apt) => (
                <Badge 
                  key={apt.id} 
                  variant={apt.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {apt.status === 'completed' ? '✓' : apt.status === 'cancelled' ? '✗' : '○'}
                </Badge>
              ))}
              {displayPatient.appointmentHistory.length > 3 && (
                <span className="text-xs text-text-muted">+{displayPatient.appointmentHistory.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {/* Payment Status */}
        {displayPatient.paymentHistory && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">Paiements</span>
              </div>
              {displayPatient.totalOutstanding && displayPatient.totalOutstanding > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {displayPatient.totalOutstanding}€ dû
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-text-muted">
                  {displayPatient.paymentHistory.filter(p => p.status === 'paid').length} payé(s)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-error"></div>
                <span className="text-text-muted">
                  {displayPatient.paymentHistory.filter(p => p.status === 'unpaid').length} impayé(s)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Indicator */}
        <div className="mt-4 pt-4 border-t border-border-primary">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-subtle">Voir les détails</span>
            <div className="w-2 h-2 rounded-full bg-text-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>
    </Link>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem onClick={(e) => handleViewProfile(patient, e)}>
      <User className="w-4 h-4 mr-2" />
      Voir le profil complet
    </ContextMenuItem>
    <ContextMenuItem onClick={(e) => handleEditPatient(patient, e)}>
      <Edit className="w-4 h-4 mr-2" />
      Modifier les informations
    </ContextMenuItem>
    {patient.phone && (
      <ContextMenuItem onClick={(e) => handleCallPatient(patient, e)}>
        <Phone className="w-4 h-4 mr-2" />
        Appeler {patient.phone}
      </ContextMenuItem>
    )}
    <ContextMenuSeparator />
    {patient.nextAppointment && (
      <>
        <ContextMenuItem onClick={(e) => handleViewInCalendar(patient, e)}>
          <CalendarDays className="w-4 h-4 mr-2" />
          Voir RDV dans calendrier
        </ContextMenuItem>
        <ContextMenuItem onClick={(e) => handleChangeTime(patient, e)}>
          <Edit className="w-4 h-4 mr-2" />
          Modifier horaire RDV
        </ContextMenuItem>
        <ContextMenuSeparator />
      </>
    )}
    <ContextMenuItem onClick={(e) => handleTeamChat(patient, e)}>
      <MessageSquare className="w-4 h-4 mr-2" />
      Chat équipe
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem 
      onClick={(e) => handleDeletePatient(patient, e)}
      className="text-destructive focus:text-destructive"
    >
      <Trash2 className="w-4 h-4 mr-2" />
      Supprimer patient
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
  );
};

export default PatientCard;
