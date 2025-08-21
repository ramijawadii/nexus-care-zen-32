import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  X, 
  Clock, 
  Users, 
  Calendar,
  Coffee
} from 'lucide-react';

interface Conflict {
  type: 'overlap' | 'double-booking' | 'no-buffer' | 'lunch-conflict' | 'overload';
  severity: 'high' | 'medium' | 'low';
  message: string;
  suggestion: string;
  time?: string;
  affectedAppointments?: string[];
}

interface ConflictDetectionProps {
  conflicts: Conflict[];
  onResolve?: (conflict: Conflict) => void;
}

const ConflictDetection = ({ conflicts, onResolve }: ConflictDetectionProps) => {
  if (conflicts.length === 0) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getConflictIcon = (type: string) => {
    switch (type) {
      case 'overlap': return <Users className="h-4 w-4" />;
      case 'double-booking': return <Calendar className="h-4 w-4" />;
      case 'no-buffer': return <Clock className="h-4 w-4" />;
      case 'lunch-conflict': return <Coffee className="h-4 w-4" />;
      case 'overload': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {conflicts.map((conflict, index) => (
        <Alert key={index} variant={getSeverityColor(conflict.severity)}>
          <div className="flex items-start space-x-3">
            {getConflictIcon(conflict.type)}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <AlertDescription className="font-medium">
                  {conflict.message}
                </AlertDescription>
                <Badge variant={getSeverityColor(conflict.severity)}>
                  {conflict.severity}
                </Badge>
              </div>
              
              <div className="text-sm text-text-muted">
                💡 Suggestion: {conflict.suggestion}
              </div>
              
              {conflict.time && (
                <div className="text-sm">
                  <strong>Time:</strong> {conflict.time}
                </div>
              )}
              
              {conflict.affectedAppointments && conflict.affectedAppointments.length > 0 && (
                <div className="text-sm">
                  <strong>Affected:</strong> {conflict.affectedAppointments.join(', ')}
                </div>
              )}
            </div>
            
            {onResolve && (
              <button
                onClick={() => onResolve(conflict)}
                className="p-1 hover:bg-surface-muted rounded"
                title="Resolve conflict"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default ConflictDetection;
