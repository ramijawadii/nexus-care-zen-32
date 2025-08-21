
import React, { useState } from 'react';
import DoctorCalendarTabs from './DoctorCalendarTabs';
import DoctorScheduleGrid from './DoctorScheduleGrid';
import AddEventModal from './AddEventModal';
import CalendarHeader from './CalendarHeader';
import CalendarLegend from './CalendarLegend';
import AppointmentFiltersPanel from './AppointmentFiltersPanel';
import WorkingHoursSettings from './WorkingHoursSettings';
import AppointmentStats from './AppointmentStats';
import { mockDoctorSchedule } from './mockDoctorScheduleData';

export type DoctorViewMode = 'day' | 'week' | 'stats';

interface WorkingHours {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
  breakStart?: string;
  breakEnd?: string;
}

const DoctorCalendar = () => {
  const [currentView, setCurrentView] = useState<DoctorViewMode>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showWorkingHours, setShowWorkingHours] = useState(false);
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: 'Lundi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Mardi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Mercredi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Jeudi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Vendredi', enabled: true, start: '09:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    { day: 'Samedi', enabled: false, start: '09:00', end: '12:00' },
    { day: 'Dimanche', enabled: false, start: '09:00', end: '12:00' },
  ]);
  const [activeFilters, setActiveFilters] = useState({
    confirmed: false,
    newPatients: false,
    followUps: false,
    showBlocked: true,
    showCompleted: true,
    showCancelled: false
  });

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'stats':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
    }
    setSelectedDate(newDate);
  };

  const getDailyStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = mockDoctorSchedule.filter(item => 
      item.date === today && item.type === 'appointment' && item.status !== 'cancelled'
    );
    
    return {
      totalAppointments: todayAppointments.length,
      confirmedAppointments: todayAppointments.filter(apt => apt.status === 'confirmed').length,
      totalHours: todayAppointments.reduce((acc, apt) => acc + apt.duration, 0) / 60,
      noShows: mockDoctorSchedule.filter(item => 
        item.date === today && item.status === 'no-show'
      ).length
    };
  };

  const handleSaveWorkingHours = (hours: WorkingHours[]) => {
    setWorkingHours(hours);
    setShowWorkingHours(false);
    console.log('Working hours saved:', hours);
  };

  const stats = getDailyStats();

  return (
    <div className="space-y-6">
      {/* Calendar Header with Stats */}
      <CalendarHeader
        currentView={currentView}
        selectedDate={selectedDate}
        onNavigateDate={navigateDate}
        onTodayClick={() => setSelectedDate(new Date())}
        onAddEvent={() => setShowAddEvent(true)}
        onShowFilters={() => setShowFilters(!showFilters)}
        onShowSettings={() => setShowWorkingHours(true)}
        showFilters={showFilters}
        stats={stats}
      />

      {/* View Tabs */}
      <DoctorCalendarTabs 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />

      {/* Filters Panel */}
      {showFilters && (
        <AppointmentFiltersPanel
          filters={activeFilters}
          onFiltersChange={setActiveFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Main Calendar */}
      {currentView === 'stats' ? (
        <AppointmentStats selectedDate={selectedDate} />
      ) : (
        <div className="bg-surface-elevated rounded-lg border border-border-primary">
          <DoctorScheduleGrid
            view={currentView}
            selectedDate={selectedDate}
            schedule={mockDoctorSchedule}
            filters={activeFilters}
            workingHours={workingHours}
          />
        </div>
      )}

      {/* Calendar Legend */}
      {currentView !== 'stats' && <CalendarLegend />}

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddEvent}
        onClose={() => setShowAddEvent(false)}
        selectedDate={selectedDate}
      />

      {/* Working Hours Settings */}
      {showWorkingHours && (
        <WorkingHoursSettings
          onClose={() => setShowWorkingHours(false)}
          onSave={handleSaveWorkingHours}
        />
      )}
    </div>
  );
};

export default DoctorCalendar;
