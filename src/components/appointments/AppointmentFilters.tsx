
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface FilterProps {
  filters: {
    doctor: string;
    specialty: string;
    room: string;
    status: string;
    type: string;
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const AppointmentFilters = ({ filters, onFiltersChange, onClose }: FilterProps) => {
  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown'];
  const specialties = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'];
  const rooms = ['Room 101', 'Room 102', 'Room 201', 'Room 202'];
  const statuses = ['confirmed', 'pending', 'completed', 'cancelled', 'no-show'];
  const types = ['consultation', 'follow-up', 'emergency', 'routine-check'];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: filters[key as keyof typeof filters] === value ? '' : value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      doctor: '',
      specialty: '',
      room: '',
      status: '',
      type: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-surface-elevated border border-border-primary rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount} active</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Doctor Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Doctor</label>
          <div className="space-y-1">
            {doctors.map((doctor) => (
              <button
                key={doctor}
                onClick={() => updateFilter('doctor', doctor)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.doctor === doctor
                    ? 'bg-text-primary text-background'
                    : 'bg-surface hover:bg-hover-surface text-text-primary'
                }`}
              >
                {doctor}
              </button>
            ))}
          </div>
        </div>

        {/* Specialty Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Specialty</label>
          <div className="space-y-1">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => updateFilter('specialty', specialty)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.specialty === specialty
                    ? 'bg-text-primary text-background'
                    : 'bg-surface hover:bg-hover-surface text-text-primary'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Room Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Room</label>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room}
                onClick={() => updateFilter('room', room)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.room === room
                    ? 'bg-text-primary text-background'
                    : 'bg-surface hover:bg-hover-surface text-text-primary'
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Status</label>
          <div className="space-y-1">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => updateFilter('status', status)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                  filters.status === status
                    ? 'bg-text-primary text-background'
                    : 'bg-surface hover:bg-hover-surface text-text-primary'
                }`}
              >
                {status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-secondary">Type</label>
          <div className="space-y-1">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => updateFilter('type', type)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                  filters.type === type
                    ? 'bg-text-primary text-background'
                    : 'bg-surface hover:bg-hover-surface text-text-primary'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilters;
