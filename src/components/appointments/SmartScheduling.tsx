
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';

interface TimeSlotSuggestion {
  time: string;
  date: string;
  score: number;
  reasons: string[];
  bufferAvailable: boolean;
  conflicts: string[];
}

interface SmartSchedulingProps {
  doctorId: string;
  patientId: string;
  appointmentType: 'consultation' | 'follow-up' | 'procedure';
  duration: number;
  onSelectSlot: (slot: TimeSlotSuggestion) => void;
}

const SmartScheduling = ({ 
  doctorId, 
  patientId, 
  appointmentType, 
  duration,
  onSelectSlot 
}: SmartSchedulingProps) => {
  const [suggestions, setSuggestions] = useState<TimeSlotSuggestion[]>([
    {
      time: '10:30',
      date: '2024-02-06',
      score: 95,
      reasons: ['Low patient load', 'Doctor well-rested', 'Perfect timing after break'],
      bufferAvailable: true,
      conflicts: []
    },
    {
      time: '14:30',
      date: '2024-02-06',
      score: 88,
      reasons: ['Preferred afternoon slot', 'Good for follow-ups', 'Buffer time available'],
      bufferAvailable: true,
      conflicts: []
    },
    {
      time: '09:00',
      date: '2024-02-07',
      score: 82,
      reasons: ['Fresh start of day', 'No prior appointments'],
      bufferAvailable: true,
      conflicts: ['High Monday morning load']
    },
    {
      time: '15:00',
      date: '2024-02-07',
      score: 75,
      reasons: ['Available slot'],
      bufferAvailable: false,
      conflicts: ['Back-to-back appointments', 'No buffer time']
    },
    {
      time: '11:00',
      date: '2024-02-08',
      score: 90,
      reasons: ['Optimal mid-morning slot', 'Doctor available', 'Patient preferred time'],
      bufferAvailable: true,
      conflicts: []
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 80) return <TrendingUp className="h-4 w-4 text-blue-600" />;
    return <AlertTriangle className="h-4 w-4 text-orange-600" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <span>Smart Scheduling Suggestions</span>
        </CardTitle>
        <p className="text-sm text-text-muted">
          AI-powered optimal time slots based on doctor availability, patient history, and clinic patterns
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((slot, index) => (
          <div 
            key={`${slot.date}-${slot.time}`}
            className="border border-border-primary rounded-lg p-4 hover:bg-hover-surface transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getScoreIcon(slot.score)}
                <div>
                  <div className="font-medium text-text-primary">
                    {new Date(slot.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })} at {slot.time}
                  </div>
                  <div className="text-sm text-text-muted">
                    {duration} minutes • Buffer time {slot.bufferAvailable ? 'included' : 'not available'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${getScoreColor(slot.score)} border-0`}>
                  {slot.score}% match
                </Badge>
                <Button 
                  size="sm"
                  onClick={() => onSelectSlot(slot)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Book Slot
                </Button>
              </div>
            </div>

            {/* Reasons */}
            <div className="mb-3">
              <div className="text-sm font-medium text-text-secondary mb-1">Why this slot works:</div>
              <div className="flex flex-wrap gap-1">
                {slot.reasons.map((reason, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    {reason}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Conflicts */}
            {slot.conflicts.length > 0 && (
              <div className="flex items-center space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-orange-700">
                  Considerations: {slot.conflicts.join(', ')}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Buffer Time Settings */}
        <div className="border-t border-border-primary pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-text-secondary" />
              <span className="text-sm font-medium">Buffer Time Settings</span>
            </div>
            <div className="flex space-x-2 text-sm text-text-muted">
              <span>Before: 5 min</span>
              <span>•</span>
              <span>After: 10 min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartScheduling;
