
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  MessageSquare,
  Send,
  Star,
  CheckCircle
} from 'lucide-react';

interface RescheduleSlot {
  date: string;
  time: string;
  score: number;
  available: boolean;
  reason: string;
}

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
  currentDateTime: string;
  patientName: string;
  patientPhone: string;
}

const RescheduleModal = ({ 
  isOpen, 
  onClose, 
  appointmentId, 
  currentDateTime, 
  patientName,
  patientPhone 
}: RescheduleModalProps) => {
  const [selectedSlot, setSelectedSlot] = useState<RescheduleSlot | null>(null);
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [customMessage, setCustomMessage] = useState('');
  const [step, setStep] = useState(1);

  const suggestedSlots: RescheduleSlot[] = [
    {
      date: '2024-02-07',
      time: '10:30',
      score: 95,
      available: true,
      reason: 'Same weekday, similar time'
    },
    {
      date: '2024-02-08',
      time: '11:00',
      score: 88,
      available: true,
      reason: 'Next available slot'
    },
    {
      date: '2024-02-06',
      time: '15:30',
      score: 82,
      available: true,
      reason: 'Earlier slot today'
    },
    {
      date: '2024-02-09',
      time: '09:00',
      score: 75,
      available: true,
      reason: 'Friday morning slot'
    },
    {
      date: '2024-02-12',
      time: '14:00',
      score: 70,
      available: true,
      reason: 'Next week option'
    }
  ];

  const handleReschedule = () => {
    if (selectedSlot) {
      console.log('Rescheduling appointment:', {
        appointmentId,
        newDate: selectedSlot.date,
        newTime: selectedSlot.time,
        notifyPatient,
        customMessage
      });
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Reschedule Appointment</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Appointment Info */}
          <div className="bg-surface border border-border-primary rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-text-primary">Current Appointment</h3>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-sm text-text-secondary space-y-1">
              <div><strong>Patient:</strong> {patientName}</div>
              <div><strong>Date & Time:</strong> {currentDateTime}</div>
              <div><strong>Phone:</strong> {patientPhone}</div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center space-x-2">
                <Star className="h-5 w-5 text-blue-600" />
                <span>Smart Reschedule Suggestions</span>
              </h3>
              
              <div className="space-y-3">
                {suggestedSlots.map((slot, index) => (
                  <div
                    key={`${slot.date}-${slot.time}`}
                    onClick={() => setSelectedSlot(slot)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-border-primary hover:border-gray-300 hover:bg-hover-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`} />
                        <div>
                          <div className="font-medium text-text-primary">
                            {formatDate(slot.date)} at {slot.time}
                          </div>
                          <div className="text-sm text-text-muted">{slot.reason}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                          {slot.score}% match
                        </Badge>
                        {slot.available && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-border-primary">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!selectedSlot}
                >
                  Next: Notification
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Patient Notification</span>
              </h3>

              {/* Selected slot summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-medium text-blue-900 mb-1">New Appointment Time</div>
                <div className="text-blue-800">
                  {selectedSlot && formatDate(selectedSlot.date)} at {selectedSlot?.time}
                </div>
              </div>

              {/* Notification options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="notify-patient"
                    checked={notifyPatient}
                    onChange={(e) => setNotifyPatient(e.target.checked)}
                    className="rounded border-border-primary"
                  />
                  <label htmlFor="notify-patient" className="text-sm font-medium">
                    Send notification to patient
                  </label>
                </div>

                {notifyPatient && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-secondary">
                      Custom message (optional)
                    </label>
                    <Textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Hi [Patient Name], your appointment has been rescheduled to [New Date] at [New Time]. Please confirm. Thank you!"
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-border-primary">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleReschedule}>
                  <Send className="h-4 w-4 mr-2" />
                  Confirm Reschedule
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleModal;
