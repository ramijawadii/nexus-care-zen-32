import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AppointmentContextMenu from './AppointmentContextMenu';
import EmptySlotContextMenu from './EmptySlotContextMenu';
import AddEventModal from './AddEventModal';
import { DoctorViewMode } from './DoctorCalendar';

interface DoctorScheduleGridProps {
  view: DoctorViewMode;
  selectedDate: Date;
  schedule: any[];
  filters: any;
  workingHours: any[];
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  title: string;
  patientName?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no-show';
  type: string;
  duration: number;
  patientId?: string;
}

const DoctorScheduleGrid = ({ view, selectedDate, schedule, filters, workingHours }: DoctorScheduleGridProps) => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [slotStates, setSlotStates] = useState<Record<string, 'available' | 'blocked' | 'break'>>({});
  const [showAddModal, setShowAddModal] = useState(false);

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayOfWeek = (date: Date): string => {
    return daysOfWeek[date.getDay()];
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
  };

  const getAppointmentForSlot = (date: string, time: string): Appointment | undefined => {
    return schedule.find(item => item.date === date && item.time === time && item.type === 'appointment');
  };

  const isWorkingTime = (date: string, time: string): boolean => {
    const dayOfWeek = new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' });
    const workingDay = workingHours.find(day => day.day.toLowerCase() === dayOfWeek?.toLowerCase());
  
    if (!workingDay || !workingDay.enabled) {
      return false;
    }
  
    const [hour, minute] = time.split(':').map(Number);
    const appointmentTime = hour + minute / 60;
  
    const [startHour, startMinute] = workingDay.start.split(':').map(Number);
    const workingStart = startHour + startMinute / 60;
  
    const [endHour, endMinute] = workingDay.end.split(':').map(Number);
    const workingEnd = endHour + endMinute / 60;
  
    if (workingDay.breakStart && workingDay.breakEnd) {
      const [breakStartHour, breakStartMinute] = workingDay.breakStart.split(':').map(Number);
      const breakStart = breakStartHour + breakStartMinute / 60;
  
      const [breakEndHour, breakEndMinute] = workingDay.breakEnd.split(':').map(Number);
      const breakEnd = breakEndHour + breakEndMinute / 60;
  
      return appointmentTime >= workingStart && appointmentTime < breakStart ||
             appointmentTime >= breakEnd && appointmentTime < workingEnd;
    }
  
    return appointmentTime >= workingStart && appointmentTime < workingEnd;
  };

  const getAppointmentStyles = (appointment: Appointment): string => {
    switch (appointment.status) {
      case 'confirmed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'completed':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'no-show':
        return 'bg-gray-50 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeStyle = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      case 'no-show':
        return 'Absent';
      default:
        return status;
    }
  };

  const handleSlotClick = (date: string, time: string) => {
    const existingAppointment = getAppointmentForSlot(date, time);
    if (!existingAppointment) {
      setSelectedSlot({ date, time });
      setShowAddModal(true);
    }
  };

  const handleSlotStateChange = (date: string, time: string, state: 'available' | 'blocked' | 'break') => {
    const slotKey = `${date}-${time}`;
    setSlotStates(prev => ({
      ...prev,
      [slotKey]: state
    }));
  };

  const getSlotState = (date: string, time: string): 'available' | 'blocked' | 'break' => {
    const slotKey = `${date}-${time}`;
    return slotStates[slotKey] || 'available';
  };

  const getSlotStyles = (date: string, time: string): string => {
    const state = getSlotState(date, time);
    switch (state) {
      case 'blocked':
        return 'bg-red-100 border-red-300 hover:bg-red-200';
      case 'break':
        return 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200';
      case 'available':
      default:
        return 'border-dashed border-border-primary hover:border-primary hover:bg-surface-muted';
    }
  };

  const handleStartVisit = (appointmentId: string) => {
    console.log('Starting visit for appointment:', appointmentId);
  };

  const handlePatientConfirmed = (appointmentId: string) => {
    console.log('Patient confirmed for appointment:', appointmentId);
  };

  const handlePatientArrived = (appointmentId: string) => {
    console.log('Patient arrived for appointment:', appointmentId);
  };

  const handleCompleteVisit = (appointmentId: string) => {
    console.log('Completing visit for appointment:', appointmentId);
  };

  const handleViewProfile = (patientId: string) => {
    navigate(`/patients?id=${patientId}`);
  };

  const handleEdit = (appointmentId: string) => {
    console.log('Editing appointment:', appointmentId);
  };

  const handleCancel = (appointmentId: string) => {
    console.log('Cancelling appointment:', appointmentId);
  };

  const renderDayView = () => {
    const currentDate = new Date(selectedDate);
    const formattedDate = formatDate(currentDate);
    const dayOfWeek = getDayOfWeek(currentDate);

    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">{dayOfWeek} {formattedDate}</h2>
        <div className="grid grid-cols-[50px_1fr] gap-2">
          <div></div>
          <div></div>
          {timeSlots.map(time => (
            <React.Fragment key={time}>
              <div className="text-sm text-gray-500">{time}</div>
              {renderTimeSlot(formattedDate, time)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() === 0 ? -6 : 1));

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    // Get working hours to filter time slots (9 AM to 6 PM)
    const workingTimeSlots = timeSlots.filter(time => {
      const hour = parseInt(time.split(':')[0]);
      return hour >= 9 && hour < 18;
    });

    return (
      <div className="w-full h-full overflow-auto">
        <div className="min-w-full">
          {/* Header with time slots (horizontal) */}
          <div className="sticky top-0 bg-surface-elevated border-b border-border-primary">
            <div className="grid gap-px" style={{ gridTemplateColumns: `180px repeat(${workingTimeSlots.length}, 1fr)` }}>
              <div className="bg-surface-muted p-3 font-semibold text-text-primary">Jour / Heure</div>
              {workingTimeSlots.map(time => (
                <div key={time} className="bg-surface-muted p-3 text-sm font-medium text-text-primary text-center border-l border-border-primary">
                  {time}
                </div>
              ))}
            </div>
          </div>
          
          {/* Days with appointments (vertical) */}
          <div className="bg-surface">
            {weekDates.map(date => {
              const formattedDate = formatDate(date);
              const dayOfWeek = getDayOfWeek(date);
              const isToday = isSameDay(date, new Date());
              
              return (
                <div key={date.toISOString()} className="border-b border-border-primary">
                  <div className="grid gap-px h-20" style={{ gridTemplateColumns: `180px repeat(${workingTimeSlots.length}, 1fr)` }}>
                    {/* Day label */}
                    <div className={`p-3 flex flex-col justify-center border-r border-border-primary ${
                      isToday ? 'bg-primary/10 text-primary font-semibold' : 'bg-surface-muted text-text-primary'
                    }`}>
                      <div className="font-semibold">{dayOfWeek}</div>
                      <div className="text-sm text-text-muted">{date.getDate()}</div>
                    </div>
                    
                    {/* Time slots for this day */}
                    {workingTimeSlots.map(time => (
                      <div key={`${formattedDate}-${time}`} className="border-l border-border-primary">
                        {renderTimeSlot(formattedDate, time)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() === 0 ? -6 : 1));

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });

    return (
      <div>
        {weekDates.map(date => {
          const formattedDate = formatDate(date);
          const dayOfWeek = getDayOfWeek(date);

          return (
            <div key={date.toISOString()} className="mb-6">
              <h3 className="text-lg font-semibold">{dayOfWeek}, {formattedDate}</h3>
              {timeSlots.map(time => {
                const appointment = getAppointmentForSlot(formattedDate, time);
                if (appointment) {
                  return (
                    <div key={`${formattedDate}-${time}`} className="p-2 rounded border mb-2">
                      <div className="font-medium">{appointment.title}</div>
                      {appointment.patientName && (
                        <div className="text-sm text-gray-500">{appointment.patientName}</div>
                      )}
                      <Badge className={getStatusBadgeStyle(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTimeSlot = (date: string, time: string) => {
    const appointment = getAppointmentForSlot(date, time);
    const isWorkingHour = isWorkingTime(date, time);
    
    if (appointment) {
      return (
        <AppointmentContextMenu
          onStartVisit={() => handleStartVisit(appointment.id)}
          onPatientConfirmed={() => handlePatientConfirmed(appointment.id)}
          onPatientArrived={() => handlePatientArrived(appointment.id)}
          onCompleteVisit={() => handleCompleteVisit(appointment.id)}
          onViewProfile={() => handleViewProfile(appointment.patientId || '1')}
          onEdit={() => handleEdit(appointment.id)}
          onCancel={() => handleCancel(appointment.id)}
        >
          <div
            className={`w-full h-full p-1 rounded border cursor-pointer transition-colors ${getAppointmentStyles(appointment)}`}
          >
            <div className="font-medium text-xs truncate">{appointment.title}</div>
            {appointment.patientName && (
              <div className="text-xs text-text-muted truncate">{appointment.patientName}</div>
            )}
            <Badge className={`text-xs ${getStatusBadgeStyle(appointment.status)}`}>
              {getStatusText(appointment.status)}
            </Badge>
          </div>
        </AppointmentContextMenu>
      );
    }
    
    if (isWorkingHour) {
      return (
        <EmptySlotContextMenu
          onAddAppointment={() => handleSlotClick(date, time)}
          onMarkBlocked={() => handleSlotStateChange(date, time, 'blocked')}
          onMarkBreak={() => handleSlotStateChange(date, time, 'break')}
          onMarkAvailable={() => handleSlotStateChange(date, time, 'available')}
        >
          <div
            className={`w-full h-full border cursor-pointer flex items-center justify-center transition-colors rounded ${getSlotStyles(date, time)}`}
            onClick={() => handleSlotClick(date, time)}
          >
            <Button size="sm" variant="ghost" className="opacity-0 hover:opacity-100 h-8 w-8 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </EmptySlotContextMenu>
      );
    }
    
    return (
      <div className="w-full h-full bg-surface border border-border-secondary rounded opacity-50"></div>
    );
  };

  return (
    <div className="p-4">
      {view === 'day' && renderDayView()}
      {view === 'week' && renderWeekView()}
      
      
      {/* Add Event Modal */}
      {showAddModal && selectedSlot && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedSlot(null);
          }}
          selectedDate={new Date(selectedSlot.date)}
        />
      )}
    </div>
  );
};

export default DoctorScheduleGrid;
