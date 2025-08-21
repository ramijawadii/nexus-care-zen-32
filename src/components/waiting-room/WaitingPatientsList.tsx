import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Phone, MessageSquare, AlertTriangle, User, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ConsultationContextMenu from './ConsultationContextMenu';

interface WaitingPatient {
  id: string;
  name: string;
  appointmentTime: string;
  arrivalTime: string;
  waitingTime: number;
  priority: 'normal' | 'urgent' | 'high';
  status: 'waiting' | 'called' | 'in-consultation' | 'completed';
  phone: string;
  reason: string;
  avatar?: string;
}

const WaitingPatientsList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<WaitingPatient[]>([
    {
      id: '1',
      name: 'Marie Dubois',
      appointmentTime: '09:00',
      arrivalTime: '08:45',
      waitingTime: 35,
      priority: 'urgent',
      status: 'waiting',
      phone: '+33 6 12 34 56 78',
      reason: 'Consultation urgente'
    },
    {
      id: '2',
      name: 'Jean Martin',
      appointmentTime: '09:30',
      arrivalTime: '09:15',
      waitingTime: 20,
      priority: 'normal',
      status: 'waiting',
      phone: '+33 6 98 76 54 32',
      reason: 'Suivi médical'
    },
    {
      id: '3',
      name: 'Sophie Bernard',
      appointmentTime: '10:00',
      arrivalTime: '09:50',
      waitingTime: 15,
      priority: 'high',
      status: 'called',
      phone: '+33 6 11 22 33 44',
      reason: 'Résultats analyses'
    },
    {
      id: '4',
      name: 'Pierre Moreau',
      appointmentTime: '10:30',
      arrivalTime: '10:20',
      waitingTime: 5,
      priority: 'normal',
      status: 'waiting',
      phone: '+33 6 55 66 77 88',
      reason: 'Consultation générale'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'called': return 'bg-blue-100 text-blue-800';
      case 'in-consultation': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCallPatient = (patientId: string) => {
    setPatients(patients.map(p => 
      p.id === patientId ? { ...p, status: 'called' as const } : p
    ));
    navigate(`/patient/${patientId}`);
  };

  const handleStartConsultation = (patientId: string) => {
    setPatients(patients.map(p => 
      p.id === patientId ? { ...p, status: 'in-consultation' as const } : p
    ));
  };

  const handleViewProfile = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const handleTeamChat = (patientId: string, patientName: string) => {
    console.log(`Opening team chat for ${patientName}`);
    // Open team chat functionality
  };

  const handleRequestMedicalRecord = (patientId: string, patientName: string) => {
    console.log(`Requesting medical record for ${patientName}`);
    // Request medical record functionality
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Patients en attente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>RDV</TableHead>
              <TableHead>Arrivée</TableHead>
              <TableHead>Attente</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-text-primary">{patient.name}</p>
                      <p className="text-sm text-text-muted">{patient.reason}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-text-muted" />
                    {patient.appointmentTime}
                  </div>
                </TableCell>
                <TableCell>{patient.arrivalTime}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className={patient.waitingTime > 30 ? 'text-red-600 font-medium' : 'text-text-primary'}>
                      {patient.waitingTime}min
                    </span>
                    {patient.waitingTime > 30 && <AlertTriangle className="w-4 h-4 ml-1 text-red-500" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(patient.priority)}>
                    {patient.priority === 'urgent' ? 'Urgent' : 
                     patient.priority === 'high' ? 'Prioritaire' : 'Normal'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(patient.status)}>
                    {patient.status === 'waiting' ? 'En attente' :
                     patient.status === 'called' ? 'Appelé' :
                     patient.status === 'in-consultation' ? 'En consultation' : 'Terminé'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {patient.status === 'waiting' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCallPatient(patient.id)}
                        >
                          Appeler
                        </Button>
                        <ConsultationContextMenu
                          patientId={patient.id}
                          patientName={patient.name}
                          onViewProfile={handleViewProfile}
                          onTeamChat={handleTeamChat}
                          onRequestMedicalRecord={handleRequestMedicalRecord}
                        >
                          <Button 
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => handleStartConsultation(patient.id)}
                          >
                            Consultation
                          </Button>
                        </ConsultationContextMenu>
                      </>
                    )}
                    {patient.status === 'called' && (
                      <ConsultationContextMenu
                        patientId={patient.id}
                        patientName={patient.name}
                        onViewProfile={handleViewProfile}
                        onTeamChat={handleTeamChat}
                        onRequestMedicalRecord={handleRequestMedicalRecord}
                      >
                        <Button 
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => handleStartConsultation(patient.id)}
                        >
                          Démarrer
                        </Button>
                      </ConsultationContextMenu>
                    )}
                    <Button size="sm" variant="ghost">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WaitingPatientsList;
