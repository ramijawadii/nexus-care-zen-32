
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Clock, 
  MapPin, 
  Phone, 
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppointmentCardProps {
  appointment: {
    id: string;
    patientName: string;
    patientPhone: string;
    doctor: string;
    room: string;
    time: string;
    duration: number;
    type: string;
    status: string;
    reason?: string;
    notes?: string;
  };
  compact?: boolean;
  onEdit?: (appointment: any) => void;
  onCancel?: (appointmentId: string) => void;
  onConfirm?: (appointmentId: string) => void;
  onMarkComplete?: (appointmentId: string) => void;
}

const AppointmentCard = ({ 
  appointment, 
  compact = false, 
  onEdit,
  onCancel,
  onConfirm,
  onMarkComplete 
}: AppointmentCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'border-l-blue-500';
      case 'pending': return 'border-l-orange-500';
      case 'completed': return 'border-l-green-500';
      case 'cancelled': return 'border-l-red-500';
      case 'no-show': return 'border-l-gray-500';
      default: return 'border-l-gray-400';
    }
  };

  if (compact) {
    return (
      <div
        className={`h-full bg-surface border border-border-primary rounded-md p-2 border-l-4 ${getStatusBorderColor(appointment.status)} hover:shadow-md transition-shadow cursor-pointer relative`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-medium text-text-primary truncate">
            {appointment.patientName}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {appointment.status === 'pending' && (
                <>
                  <DropdownMenuItem onClick={() => onConfirm?.(appointment.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {appointment.status === 'confirmed' && (
                <>
                  <DropdownMenuItem onClick={() => onMarkComplete?.(appointment.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={() => onEdit?.(appointment)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onCancel?.(appointment.id)}
                className="text-red-600"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-1">
          <p className="text-xs text-text-secondary truncate">{appointment.type}</p>
          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </Badge>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-text-primary text-background rounded-lg shadow-lg min-w-64">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{appointment.patientPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{appointment.time} ({appointment.duration} mins)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{appointment.room}</span>
              </div>
              {appointment.reason && (
                <div className="text-sm opacity-90">
                  <strong>Reason:</strong> {appointment.reason}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-surface-elevated border border-border-primary rounded-lg p-4 border-l-4 ${getStatusBorderColor(appointment.status)} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-text-secondary" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">{appointment.patientName}</h4>
            <p className="text-sm text-text-secondary">{appointment.patientPhone}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {appointment.status === 'pending' && (
                <>
                  <DropdownMenuItem onClick={() => onConfirm?.(appointment.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              {appointment.status === 'confirmed' && (
                <>
                  <DropdownMenuItem onClick={() => onMarkComplete?.(appointment.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={() => onEdit?.(appointment)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onCancel?.(appointment.id)}
                className="text-red-600"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Clock className="h-4 w-4" />
          <span>{appointment.time} ({appointment.duration} mins)</span>
        </div>
        <div className="flex items-center space-x-2 text-text-secondary">
          <MapPin className="h-4 w-4" />
          <span>{appointment.room}</span>
        </div>
      </div>

      {appointment.reason && (
        <div className="mt-3 pt-3 border-t border-border-primary">
          <p className="text-sm text-text-secondary">
            <strong>Reason:</strong> {appointment.reason}
          </p>
        </div>
      )}

      {appointment.notes && (
        <div className="mt-2">
          <p className="text-sm text-text-muted">
            <strong>Notes:</strong> {appointment.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
