
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MapPin, Phone, MoreVertical } from 'lucide-react';
import { ViewMode } from './AppointmentCalendar';
import AppointmentCard from './AppointmentCard';

interface TimelineProps {
  view: ViewMode;
  selectedDate: Date;
  appointments: any[];
  filters: any;
  searchQuery: string;
}

const AppointmentTimeline = ({ 
  view, 
  selectedDate, 
  appointments, 
  filters, 
  searchQuery 
}: TimelineProps) => {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  // Generate time slots for day/week view
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  // Get days for week view
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
  const timeSlots = generateTimeSlots();
  const weekDays = getWeekDays();

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = !searchQuery || 
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientPhone.includes(searchQuery);
    
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return apt[key] === value;
    });
    
    return matchesSearch && matchesFilters;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500';
      case 'pending': return 'bg-orange-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'no-show': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const renderDayView = () => (
    <div className="p-6">
      <div className="flex">
        {/* Time Column */}
        <div className="w-16 pr-4">
          {timeSlots.map((time) => (
            <div key={time} className="h-16 flex items-start pt-2">
              <span className="text-xs text-text-muted">{time}</span>
            </div>
          ))}
        </div>

        {/* Doctors Columns */}
        {doctors.map((doctor) => (
          <div key={doctor} className="flex-1 border-l border-border-primary">
            <div className="p-3 bg-surface-muted border-b border-border-primary">
              <h4 className="font-medium text-sm text-text-primary">{doctor}</h4>
            </div>
            {timeSlots.map((time) => {
              const appointment = filteredAppointments.find(
                apt => apt.doctor === doctor && apt.time === time && 
                apt.date === selectedDate.toISOString().split('T')[0]
              );
              const slotId = `${doctor}-${time}`;
              
              return (
                <div
                  key={time}
                  className="h-16 border-b border-border-primary p-2 relative"
                  onMouseEnter={() => setHoveredSlot(slotId)}
                  onMouseLeave={() => setHoveredSlot(null)}
                >
                  {appointment ? (
                    <AppointmentCard appointment={appointment} compact />
                  ) : (
                    <div className={`h-full rounded transition-colors ${
                      hoveredSlot === slotId ? 'bg-hover-surface' : 'hover:bg-surface-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="p-6">
      <div className="flex">
        {/* Time Column */}
        <div className="w-16 pr-4">
          <div className="h-12"></div> {/* Header spacer */}
          {timeSlots.map((time) => (
            <div key={time} className="h-12 flex items-start pt-1">
              <span className="text-xs text-text-muted">{time}</span>
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="flex-1 border-l border-border-primary">
            <div className="h-12 p-2 bg-surface-muted border-b border-border-primary">
              <div className="text-center">
                <div className="text-xs text-text-muted">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm font-medium text-text-primary">
                  {day.getDate()}
                </div>
              </div>
            </div>
            {timeSlots.map((time) => {
              const dayAppointments = filteredAppointments.filter(
                apt => apt.date === day.toISOString().split('T')[0] && apt.time === time
              );
              
              return (
                <div key={time} className="h-12 border-b border-border-primary p-1">
                  {dayAppointments.map((appointment, idx) => (
                    <div
                      key={appointment.id}
                      className={`h-2 rounded mb-1 ${getStatusColor(appointment.status)}`}
                      title={`${appointment.patientName} - ${appointment.doctor}`}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMonthView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return (
      <div className="p-6">
        {/* Month Header */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-text-secondary p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, idx) => {
            if (!day) return <div key={idx} className="h-24"></div>;
            
            const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
            const dayAppointments = filteredAppointments.filter(
              apt => apt.date === dayDate.toISOString().split('T')[0]
            );

            return (
              <div key={day} className="h-24 border border-border-primary rounded-lg p-2 hover:bg-hover-surface">
                <div className="text-sm font-medium text-text-primary mb-1">{day}</div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 2).map((apt, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-2 py-1 rounded text-white truncate ${getStatusColor(apt.status)}`}
                    >
                      {apt.patientName}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-text-muted">
                      +{dayAppointments.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimelineView = () => (
    <div className="p-6">
      <div className="space-y-6">
        {doctors.map((doctor) => {
          const doctorAppointments = filteredAppointments
            .filter(apt => apt.doctor === doctor)
            .sort((a, b) => a.time.localeCompare(b.time));

          return (
            <div key={doctor} className="border border-border-primary rounded-lg">
              <div className="p-4 bg-surface-muted border-b border-border-primary">
                <h3 className="font-semibold text-text-primary">{doctor}</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-4 overflow-x-auto">
                  {timeSlots.map((time) => {
                    const appointment = doctorAppointments.find(apt => apt.time === time);
                    
                    return (
                      <div key={time} className="flex-shrink-0 w-32">
                        <div className="text-xs text-text-muted mb-2 text-center">{time}</div>
                        {appointment ? (
                          <AppointmentCard appointment={appointment} compact />
                        ) : (
                          <div className="h-16 bg-surface border border-border-primary rounded-md flex items-center justify-center hover:bg-hover-surface">
                            <span className="text-xs text-text-muted">Available</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderView = () => {
    switch (view) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      case 'timeline':
        return renderTimelineView();
      default:
        return renderWeekView();
    }
  };

  return (
    <div className="bg-surface-elevated">
      {renderView()}
    </div>
  );
};

export default AppointmentTimeline;
