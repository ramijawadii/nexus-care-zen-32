
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, UserPlus, Clock, Phone, CheckCircle } from 'lucide-react';

const PatientCheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const todayAppointments = [
    {
      id: '1',
      name: 'Alice Petit',
      time: '11:00',
      phone: '+33 6 12 34 56 78',
      status: 'scheduled',
      reason: 'Consultation générale'
    },
    {
      id: '2',
      name: 'Marc Legrand',
      time: '11:30',
      phone: '+33 6 98 76 54 32',
      status: 'confirmed',
      reason: 'Suivi traitement'
    },
    {
      id: '3',
      name: 'Emma Rousseau',
      time: '12:00',
      phone: '+33 6 11 22 33 44',
      status: 'checked-in',
      reason: 'Vaccin'
    }
  ];

  const walkInPatients = [
    {
      id: 'w1',
      name: 'Paul Durand',
      arrivalTime: '10:45',
      priority: 'normal',
      reason: 'Consultation sans RDV'
    }
  ];

  const handleCheckIn = (patientId: string) => {
    console.log('Check in patient:', patientId);
    // Logic to check in patient
  };

  return (
    <div className="space-y-6">
      {/* Quick Check-in */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Enregistrement rapide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher un patient (nom, téléphone...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
            </div>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <Clock className="w-5 h-5" />
              <span className="text-sm">RDV prévu</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <UserPlus className="w-5 h-5" />
              <span className="text-sm">Sans RDV</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <Phone className="w-5 h-5" />
              <span className="text-sm">Urgence</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Rendez-vous d'aujourd'hui</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {appointment.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.name}</p>
                    <p className="text-sm text-text-muted">{appointment.reason}</p>
                    <p className="text-xs text-text-muted">{appointment.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <Badge 
                      className={
                        appointment.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {appointment.status === 'checked-in' ? 'Enregistré' :
                       appointment.status === 'confirmed' ? 'Confirmé' : 'Programmé'}
                    </Badge>
                  </div>
                  {appointment.status !== 'checked-in' && (
                    <Button 
                      size="sm"
                      onClick={() => handleCheckIn(appointment.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Enregistrer
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Walk-in Patients */}
      <Card>
        <CardHeader>
          <CardTitle>Patients sans rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          {walkInPatients.length > 0 ? (
            <div className="space-y-3">
              {walkInPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-text-muted">{patient.reason}</p>
                      <p className="text-xs text-text-muted">Arrivé à {patient.arrivalTime}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Programmer
                    </Button>
                    <Button size="sm">
                      Accepter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">Aucun patient sans rendez-vous</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientCheckIn;
