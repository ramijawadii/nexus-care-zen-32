
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, AlertTriangle } from 'lucide-react';

interface QuickBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

const QuickBookModal = ({ isOpen, onClose, selectedDate }: QuickBookModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');
  const [hasConflict, setHasConflict] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const doctors = [
    { id: '1', name: 'Dr. Smith', specialty: 'Cardiology', available: true },
    { id: '2', name: 'Dr. Johnson', specialty: 'Neurology', available: true },
    { id: '3', name: 'Dr. Williams', specialty: 'Orthopedics', available: false },
    { id: '4', name: 'Dr. Brown', specialty: 'Pediatrics', available: true },
  ];

  const patients = [
    { id: '1', name: 'John Doe', phone: '+1234567890' },
    { id: '2', name: 'Jane Smith', phone: '+1234567891' },
    { id: '3', name: 'Mike Johnson', phone: '+1234567892' },
  ];

  const rooms = [
    { id: '1', name: 'Room 101', available: true },
    { id: '2', name: 'Room 102', available: true },
    { id: '3', name: 'Room 201', available: false },
  ];

  const appointmentTypes = [
    'Consultation',
    'Follow-up',
    'Routine Check',
    'Emergency',
  ];

  const handleBook = () => {
    // Simulate booking logic
    console.log('Booking appointment:', {
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor,
      patient: selectedPatient,
      room: selectedRoom,
      type: appointmentType,
      duration,
      notes
    });
    onClose();
    setStep(1);
  };

  const canProceedToNext = () => {
    switch (step) {
      case 1:
        return selectedTime && selectedDoctor;
      case 2:
        return selectedPatient && selectedRoom;
      case 3:
        return appointmentType;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Quick Book Appointment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`flex items-center ${stepNum < 4 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? 'bg-text-primary text-background'
                      : 'bg-surface-muted text-text-muted'
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      step > stepNum ? 'bg-text-primary' : 'bg-border-primary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Select Time & Doctor</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Time Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-text-secondary">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-md text-sm transition-colors ${
                            selectedTime === time
                              ? 'bg-text-primary text-background'
                              : 'bg-surface hover:bg-hover-surface text-text-primary border border-border-primary'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-text-secondary">
                      Select Doctor
                    </label>
                    <div className="space-y-2">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => doctor.available && setSelectedDoctor(doctor.name)}
                          disabled={!doctor.available}
                          className={`w-full p-3 rounded-md text-left transition-colors ${
                            selectedDoctor === doctor.name
                              ? 'bg-text-primary text-background'
                              : doctor.available
                              ? 'bg-surface hover:bg-hover-surface text-text-primary border border-border-primary'
                              : 'bg-surface-muted text-text-muted cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{doctor.name}</p>
                              <p className="text-sm opacity-75">{doctor.specialty}</p>
                            </div>
                            {!doctor.available && (
                              <Badge variant="secondary" className="text-xs">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Select Patient & Room</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Patient Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-text-secondary">
                      Select Patient
                    </label>
                    <div className="space-y-2">
                      {patients.map((patient) => (
                        <button
                          key={patient.id}
                          onClick={() => setSelectedPatient(patient.name)}
                          className={`w-full p-3 rounded-md text-left transition-colors ${
                            selectedPatient === patient.name
                              ? 'bg-text-primary text-background'
                              : 'bg-surface hover:bg-hover-surface text-text-primary border border-border-primary'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm opacity-75">{patient.phone}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-text-secondary">
                      Select Room
                    </label>
                    <div className="space-y-2">
                      {rooms.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => room.available && setSelectedRoom(room.name)}
                          disabled={!room.available}
                          className={`w-full p-3 rounded-md text-left transition-colors ${
                            selectedRoom === room.name
                              ? 'bg-text-primary text-background'
                              : room.available
                              ? 'bg-surface hover:bg-hover-surface text-text-primary border border-border-primary'
                              : 'bg-surface-muted text-text-muted cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span className="font-medium">{room.name}</span>
                            </div>
                            {!room.available && (
                              <Badge variant="secondary" className="text-xs">
                                Occupied
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Appointment Details</h3>
                
                <div className="space-y-4">
                  {/* Appointment Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Appointment Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {appointmentTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setAppointmentType(type)}
                          className={`p-3 rounded-md text-left transition-colors ${
                            appointmentType === type
                              ? 'bg-text-primary text-background'
                              : 'bg-surface hover:bg-hover-surface text-text-primary border border-border-primary'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Duration (minutes)
                    </label>
                    <div className="flex space-x-2">
                      {[15, 30, 45, 60].map((mins) => (
                        <button
                          key={mins}
                          onClick={() => setDuration(mins)}
                          className={`px-4 py-2 rounded-md transition-colors ${
                            duration === mins
                              ? 'bg-text-primary text-background'
                              : 'bg-surface hover:bg-hover-surface text-text-primary border border-border-primary'
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional notes..."
                      className="w-full p-3 border border-border-primary rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-focus-ring"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Confirm Appointment</h3>
                
                {/* Conflict Warning */}
                {hasConflict && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-orange-800">Schedule Conflict Detected</p>
                      <p className="text-sm text-orange-700">
                        There's an overlapping appointment. Please review the timing.
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="bg-surface border border-border-primary rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Date & Time:</span>
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString()} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Doctor:</span>
                    <span className="font-medium">{selectedDoctor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Patient:</span>
                    <span className="font-medium">{selectedPatient}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Room:</span>
                    <span className="font-medium">{selectedRoom}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Type:</span>
                    <span className="font-medium">{appointmentType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Duration:</span>
                    <span className="font-medium">{duration} minutes</span>
                  </div>
                  {notes && (
                    <div className="flex items-start justify-between">
                      <span className="text-text-secondary">Notes:</span>
                      <span className="font-medium text-right max-w-xs">{notes}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between pt-4 border-t border-border-primary">
            <Button
              variant="ghost"
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            >
              {step > 1 ? 'Previous' : 'Cancel'}
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceedToNext()}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleBook}>
                Book Appointment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickBookModal;
