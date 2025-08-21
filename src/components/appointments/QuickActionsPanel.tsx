
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Coffee, Plane, UserPlus, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface QuickActionsFilters {
  confirmed: boolean;
  newPatients: boolean;
  followUps: boolean;
  showBlocked: boolean;
}

interface QuickActionsPanelProps {
  filters: QuickActionsFilters;
  onFiltersChange: (filters: QuickActionsFilters) => void;
  onClose: () => void;
}

const QuickActionsPanel = ({ filters, onFiltersChange, onClose }: QuickActionsPanelProps) => {
  const toggleFilter = (key: keyof QuickActionsFilters) => {
    onFiltersChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  return (
    <div className="bg-surface-elevated border border-border-primary rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-text-primary">Quick Actions & Filters</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Coffee className="h-4 w-4 mr-2" />
              Block Lunch
            </Button>
            <Button variant="outline" size="sm">
              <Plane className="h-4 w-4 mr-2" />
              Add Absence
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Follow-ups
            </Button>
          </div>
        </div>

        {/* View Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">View Filters</h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={filters.confirmed ? "default" : "outline"}
              className="cursor-pointer hover:bg-hover-surface"
              onClick={() => toggleFilter('confirmed')}
            >
              {filters.confirmed ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
              Confirmed Only
            </Badge>
            <Badge
              variant={filters.newPatients ? "default" : "outline"}
              className="cursor-pointer hover:bg-hover-surface"
              onClick={() => toggleFilter('newPatients')}
            >
              {filters.newPatients ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
              New Patients
            </Badge>
            <Badge
              variant={filters.followUps ? "default" : "outline"}
              className="cursor-pointer hover:bg-hover-surface"
              onClick={() => toggleFilter('followUps')}
            >
              {filters.followUps ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
              Follow-ups
            </Badge>
            <Badge
              variant={filters.showBlocked ? "default" : "outline"}
              className="cursor-pointer hover:bg-hover-surface"
              onClick={() => toggleFilter('showBlocked')}
            >
              {filters.showBlocked ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
              Show Blocked
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
