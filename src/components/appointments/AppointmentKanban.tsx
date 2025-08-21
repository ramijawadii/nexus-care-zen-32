import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Clock, 
  User, 
  Phone, 
  MoreVertical, 
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Coffee
} from 'lucide-react';

interface KanbanAppointment {
  id: string;
  patientName: string;
  patientPhone: string;
  time: string;
  duration: number;
  appointmentType: 'new-patient' | 'follow-up' | 'routine' | 'urgent';
  reason: string;
  doctor: string;
  room?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  icon: React.ElementType;
  appointments: KanbanAppointment[];
}

const AppointmentKanban = ({ selectedDate }: { selectedDate: Date }) => {
  const [draggedItem, setDraggedItem] = useState<{id: string, sourceColumn: string} | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Mock data for today's appointments
  const mockAppointments: KanbanAppointment[] = [
    {
      id: '1',
      patientName: 'Marie Dupont',
      patientPhone: '+33 6 12 34 56 78',
      time: '09:00',
      duration: 30,
      appointmentType: 'routine',
      reason: 'Consultation de suivi',
      doctor: 'Dr. Martin'
    },
    {
      id: '2',
      patientName: 'Jean Pierre',
      patientPhone: '+33 6 23 45 67 89',
      time: '09:30',
      duration: 45,
      appointmentType: 'new-patient',
      reason: 'Première consultation',
      doctor: 'Dr. Martin'
    },
    {
      id: '3',
      patientName: 'Sophie Laurent',
      patientPhone: '+33 6 34 56 78 90',
      time: '10:15',
      duration: 30,
      appointmentType: 'follow-up',
      reason: 'Contrôle post-opératoire',
      doctor: 'Dr. Martin'
    }
  ];

  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'scheduled',
      title: 'Programmés',
      color: 'bg-blue-100 border-blue-200',
      icon: Calendar,
      appointments: mockAppointments
    },
    {
      id: 'waiting',
      title: 'En Attente',
      color: 'bg-orange-100 border-orange-200',
      icon: Clock,
      appointments: []
    },
    {
      id: 'in-progress',
      title: 'En Cours',
      color: 'bg-purple-100 border-purple-200',
      icon: User,
      appointments: []
    },
    {
      id: 'completed',
      title: 'Terminés',
      color: 'bg-green-100 border-green-200',
      icon: CheckCircle,
      appointments: []
    },
    {
      id: 'cancelled',
      title: 'Annulés',
      color: 'bg-red-100 border-red-200',
      icon: XCircle,
      appointments: []
    },
    {
      id: 'no-show',
      title: 'Absents',
      color: 'bg-gray-100 border-gray-200',
      icon: AlertCircle,
      appointments: []
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'new-patient': return 'bg-blue-500 text-white';
      case 'follow-up': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'urgent': return 'Urgent';
      case 'new-patient': return 'Nouveau';
      case 'follow-up': return 'Suivi';
      default: return 'Routine';
    }
  };

  const handleDragStart = (e: React.DragEvent, appointmentId: string, columnId: string) => {
    console.log('Drag start:', appointmentId, 'from column:', columnId);
    
    setDraggedItem({ id: appointmentId, sourceColumn: columnId });
    
    // Set drag data
    e.dataTransfer.setData('text/plain', appointmentId);
    e.dataTransfer.setData('application/json', JSON.stringify({ appointmentId, sourceColumn: columnId }));
    e.dataTransfer.effectAllowed = 'move';
    
    // Visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '0.5';
    target.style.transform = 'scale(0.95)';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('Drag end');
    
    // Reset visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
    target.style.transform = 'scale(1)';
    
    // Clean up state
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    
    // Only clear if we're actually leaving the column
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      if (dragOverColumn === columnId) {
        setDragOverColumn(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Drop on column:', targetColumnId);
    
    let appointmentId: string;
    let sourceColumnId: string;
    
    // Try to get data from JSON first, fallback to plain text
    try {
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        const data = JSON.parse(jsonData);
        appointmentId = data.appointmentId;
        sourceColumnId = data.sourceColumn;
      } else {
        appointmentId = e.dataTransfer.getData('text/plain');
        sourceColumnId = draggedItem?.sourceColumn || '';
      }
    } catch {
      appointmentId = e.dataTransfer.getData('text/plain');
      sourceColumnId = draggedItem?.sourceColumn || '';
    }

    console.log('Moving appointment:', appointmentId, 'from:', sourceColumnId, 'to:', targetColumnId);

    if (!appointmentId || !sourceColumnId || sourceColumnId === targetColumnId) {
      setDraggedItem(null);
      setDragOverColumn(null);
      return;
    }

    // Move the appointment
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      
      // Find source and target columns
      const sourceColumn = newColumns.find(col => col.id === sourceColumnId);
      const targetColumn = newColumns.find(col => col.id === targetColumnId);
      
      if (sourceColumn && targetColumn) {
        // Find the appointment
        const appointmentIndex = sourceColumn.appointments.findIndex(apt => apt.id === appointmentId);
        if (appointmentIndex !== -1) {
          const appointment = sourceColumn.appointments[appointmentIndex];
          
          console.log('Found appointment:', appointment.patientName);
          
          // Remove from source
          sourceColumn.appointments.splice(appointmentIndex, 1);
          
          // Add to target
          targetColumn.appointments.push(appointment);
          
          console.log('Move completed successfully');
        }
      }
      
      return newColumns;
    });

    // Clean up
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const AppointmentCard = ({ appointment, columnId }: { appointment: KanbanAppointment; columnId: string }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, appointment.id, columnId)}
      onDragEnd={handleDragEnd}
      className={`p-3 bg-background border border-border-primary rounded-lg shadow-sm cursor-move transition-all duration-200 ${
        draggedItem?.id === appointment.id 
          ? 'opacity-50 scale-95' 
          : 'hover:shadow-lg hover:scale-105'
      }`}
    >
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-text-secondary" />
          <span className="font-medium text-text-primary text-sm">
            {appointment.patientName}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreVertical className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-3 w-3 text-text-muted" />
          <span className="text-text-secondary">
            {appointment.time} ({appointment.duration}min)
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Phone className="h-3 w-3 text-text-muted" />
          <span className="text-text-secondary">
            {appointment.patientPhone}
          </span>
        </div>

        <p className="text-sm text-text-secondary line-clamp-2">
          {appointment.reason}
        </p>

        <div className="flex items-center justify-between">
          <Badge className={`text-xs ${getTypeColor(appointment.appointmentType)}`}>
            {getTypeLabel(appointment.appointmentType)}
          </Badge>
          <span className="text-xs text-text-muted">
            {appointment.doctor}
          </span>
        </div>
      </div>
    </div>
  );

  const today = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const totalAppointments = columns.reduce((acc, col) => acc + col.appointments.length, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary capitalize">
            Kanban - {selectedDate.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <p className="text-sm text-text-secondary">
            {columns.reduce((acc, col) => acc + col.appointments.length, 0)} rendez-vous au total
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-text-secondary">Glissez pour changer le statut</span>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const IconComponent = column.icon;
          const isDropZone = dragOverColumn === column.id;
          
          return (
            <div
              key={column.id}
              className={`flex-shrink-0 w-80 ${column.color} rounded-lg p-4 transition-all duration-300 ${
                isDropZone 
                  ? 'ring-2 ring-primary scale-105 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={(e) => handleDragLeave(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5 text-text-primary" />
                  <h3 className="font-medium text-text-primary">
                    {column.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {column.appointments.length}
                  </Badge>
                </div>
              </div>

              {/* Appointments */}
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {column.appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      columnId={column.id}
                    />
                  ))}
                  
                  {column.appointments.length === 0 && (
                    <div className={`flex items-center justify-center h-32 border-2 border-dashed rounded-lg transition-all duration-300 ${
                      isDropZone 
                        ? 'border-primary bg-primary/10 scale-105' 
                        : 'border-border-primary bg-background/50'
                    }`}>
                      <p className="text-text-muted text-sm font-medium">
                        {isDropZone ? '✋ Déposez ici' : 'Aucun rendez-vous'}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Légende des Statuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Programmés: Rendez-vous confirmés</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>En Attente: Patients arrivés</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-purple-500" />
              <span>En Cours: Consultation en cours</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Terminés: Consultations finies</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span>Annulés: Rendez-vous annulés</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <span>Absents: Patients non présentés</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentKanban;
