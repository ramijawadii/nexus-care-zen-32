
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/patient';
import { Bell, Plus, MessageSquare, Mail, Smartphone } from 'lucide-react';

interface PatientRemindersProps {
  patient: Patient;
}

const PatientReminders = ({ patient }: PatientRemindersProps) => {
  // Mock reminders data
  const mockReminders = [
    {
      id: '1',
      type: 'medication' as const,
      title: 'Renouvellement d\'ordonnance',
      description: 'L\'ordonnance de Lisinopril doit être renouvelée',
      dueDate: '2024-02-05',
      status: 'active' as const,
      communicationMethod: 'sms' as const
    },
    {
      id: '2',
      type: 'follow-up' as const,
      title: 'Examen physique annuel',
      description: 'Programmer le prochain examen physique annuel',
      dueDate: '2024-07-15',
      status: 'active' as const,
      communicationMethod: 'email' as const
    },
    {
      id: '3',
      type: 'appointment' as const,
      title: 'Rendez-vous à venir',
      description: 'Consultation programmée pour demain',
      dueDate: '2024-02-10',
      status: 'completed' as const,
      communicationMethod: 'whatsapp' as const
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-green-100 text-green-800';
      case 'appointment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'medication': return 'Médicament';
      case 'follow-up': return 'Suivi';
      case 'appointment': return 'RDV';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'completed': return 'Terminé';
      case 'dismissed': return 'Ignoré';
      default: return status;
    }
  };

  const getCommunicationIcon = (method: string) => {
    switch (method) {
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getCommunicationText = (method: string) => {
    switch (method) {
      case 'sms': return 'SMS';
      case 'email': return 'Email';
      case 'whatsapp': return 'WhatsApp';
      default: return method;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Rappels & Notifications</h2>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Rappel
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockReminders.map((reminder) => (
          <Card key={reminder.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getTypeColor(reminder.type)}>
                      {getTypeText(reminder.type)}
                    </Badge>
                    <Badge className={getStatusColor(reminder.status)}>
                      {getStatusText(reminder.status)}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-text-primary mb-1">
                    {reminder.title}
                  </h4>
                  <p className="text-text-secondary text-sm mb-2">
                    {reminder.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-text-subtle">
                    <Bell className="w-4 h-4 mr-1" />
                    Échéance: {new Date(reminder.dueDate).toLocaleDateString('fr-FR')}
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      {getCommunicationIcon(reminder.communicationMethod)}
                      <span className="ml-1">{getCommunicationText(reminder.communicationMethod)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {reminder.status === 'active' && (
                    <>
                      <Button variant="outline" size="sm">
                        Envoyer
                      </Button>
                      <Button variant="ghost" size="sm">
                        Ignorer
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Communication Log */}
      <Card>
        <CardHeader>
          <CardTitle>Journal de Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-surface rounded-lg">
              <MessageSquare className="w-5 h-5 text-green-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Rappel WhatsApp envoyé
                </p>
                <p className="text-xs text-text-subtle">
                  Confirmation de rendez-vous - il y a 2 heures
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-surface rounded-lg">
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Notification email envoyée
                </p>
                <p className="text-xs text-text-subtle">
                  Rappel de renouvellement d'ordonnance - il y a 1 jour
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientReminders;
