
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/patient';
import { Calendar, Plus, Clock } from 'lucide-react';

interface PatientAppointmentsProps {
  patient: Patient;
}

const PatientAppointments = ({ patient }: PatientAppointmentsProps) => {
  // Mock appointments data
  const mockAppointments = [
    {
      id: '1',
      date: '2024-02-10',
      time: '10:00',
      reason: 'Consultation de suivi',
      status: 'confirmed' as const,
      type: 'follow-up' as const
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '14:30',
      reason: 'Examen physique annuel',
      status: 'completed' as const,
      type: 'consultation' as const
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      case 'no-show': return 'Absent';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'follow-up': return 'Suivi';
      case 'consultation': return 'Consultation';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Rendez-vous</h2>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Programmer un RDV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAppointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-text-secondary" />
                  <div>
                    <p className="font-medium text-text-primary">
                      {new Date(appointment.date).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-sm text-text-secondary">{appointment.time}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {getStatusText(appointment.status)}
                </Badge>
              </div>
              <p className="text-text-primary font-medium mb-2">
                {appointment.reason}
              </p>
              <p className="text-sm text-text-secondary">
                Type: {getTypeText(appointment.type)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
