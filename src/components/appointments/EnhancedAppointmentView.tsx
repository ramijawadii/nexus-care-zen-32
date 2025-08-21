
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Zap,
  RefreshCw,
  FileText,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import DoctorScheduleGrid from './DoctorScheduleGrid';
import SmartScheduling from './SmartScheduling';
import ConflictDetection from './ConflictDetection';
import RescheduleModal from './RescheduleModal';
import AppointmentNotes from './AppointmentNotes';
import LoadAnalytics from './LoadAnalytics';
import { DoctorViewMode } from './DoctorCalendar';

interface EnhancedAppointmentViewProps {
  view: DoctorViewMode;
  selectedDate: Date;
  schedule: any[];
  filters: any;
}

const EnhancedAppointmentView = ({
  view,
  selectedDate,
  schedule,
  filters
}: EnhancedAppointmentViewProps) => {
  const [showSmartScheduling, setShowSmartScheduling] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Mock data for conflicts
  const conflicts = [
    {
      type: 'overlap' as const,
      severity: 'high' as const,
      message: 'Double booking detected at 10:30 AM',
      suggestion: 'Reschedule one appointment to 11:00 AM or extend session buffer'
    },
    {
      type: 'no-buffer' as const,
      severity: 'medium' as const,
      message: 'No buffer time between 2:00 PM and 2:30 PM appointments',
      suggestion: 'Add 10-minute buffer for patient transition and room preparation'
    }
  ];

  // Mock data for notes and attachments
  const mockNotes = [
    {
      id: '1',
      content: 'Patient requested early morning slot due to work commitments',
      author: 'Dr. Smith',
      timestamp: '2024-02-05 08:30',
      type: 'pre-appointment' as const
    },
    {
      id: '2',
      content: 'Follow-up needed in 2 weeks for medication effectiveness review',
      author: 'Dr. Smith',
      timestamp: '2024-02-05 10:45',
      type: 'during-appointment' as const
    }
  ];

  const mockAttachments = [
    {
      id: '1',
      name: 'MRI_Results_Johnson.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Dr. Smith',
      uploadedAt: '2024-02-05 09:15'
    },
    {
      id: '2',
      name: 'Lab_Report_Feb2024.pdf',
      type: 'pdf',
      size: '1.2 MB',
      uploadedBy: 'Nurse Johnson',
      uploadedAt: '2024-02-05 08:45'
    }
  ];

  // Mock analytics data
  const analyticsData = {
    dailyCapacity: 16,
    currentBookings: 12,
    noShowRate: 8.5,
    averageDuration: 35,
    peakHours: ['09:00-10:00', '14:00-15:00', '16:00-17:00'],
    weeklyTrends: [
      { day: 'Monday', bookings: 14, noShows: 2, capacity: 16 },
      { day: 'Tuesday', bookings: 12, noShows: 1, capacity: 16 },
      { day: 'Wednesday', bookings: 10, noShows: 0, capacity: 16 },
      { day: 'Thursday', bookings: 13, noShows: 1, capacity: 16 },
      { day: 'Friday', bookings: 11, noShows: 2, capacity: 16 }
    ]
  };

  const handleSelectSlot = (slot: any) => {
    console.log('Selected smart slot:', slot);
    setShowSmartScheduling(false);
  };

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleAddNote = (note: string, type: any) => {
    console.log('Adding clinical note:', note, type);
  };

  const handleAddAttachment = (file: File) => {
    console.log('Adding medical document:', file.name);
  };

  const handleRemoveAttachment = (id: string) => {
    console.log('Removing attachment:', id);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Action Bar */}
      <div className="flex items-center justify-between bg-surface-elevated p-4 rounded-lg border border-border-primary">
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setShowSmartScheduling(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Smart Schedule
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-Reschedule
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Notify Patients
          </Button>
        </div>
      </div>

      {/* Conflict Detection */}
      <ConflictDetection 
        conflicts={conflicts} 
        onResolve={(conflict) => console.log('Resolving scheduling conflict:', conflict)}
      />

      {/* Enhanced Calendar with Tabs */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            My Schedule
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileText className="h-4 w-4 mr-2" />
            Clinical Notes
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Practice Analytics
          </TabsTrigger>
          <TabsTrigger value="smart">
            <Zap className="h-4 w-4 mr-2" />
            Smart Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <DoctorScheduleGrid
            view={view}
            selectedDate={selectedDate}
            schedule={schedule}
            filters={filters}
            workingHours={[]}
          />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <AppointmentNotes
            appointmentId="selected-appointment"
            notes={mockNotes}
            attachments={mockAttachments}
            onAddNote={handleAddNote}
            onAddAttachment={handleAddAttachment}
            onRemoveAttachment={handleRemoveAttachment}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <LoadAnalytics {...analyticsData} />
        </TabsContent>

        <TabsContent value="smart" className="space-y-4">
          <SmartScheduling
            doctorId="current-doctor"
            patientId="selected-patient"
            appointmentType="consultation"
            duration={30}
            onSelectSlot={handleSelectSlot}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showSmartScheduling && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Smart Scheduling Assistant</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSmartScheduling(false)}
                >
                  ×
                </Button>
              </div>
              <SmartScheduling
                doctorId="current-doctor"
                patientId="selected-patient"
                appointmentType="consultation"
                duration={30}
                onSelectSlot={handleSelectSlot}
              />
            </div>
          </div>
        </div>
      )}

      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        appointmentId={selectedAppointment?.id || ''}
        currentDateTime="Feb 6, 2024 at 10:30 AM"
        patientName="Sarah Johnson"
        patientPhone="+1234567890"
      />
    </div>
  );
};

export default EnhancedAppointmentView;
