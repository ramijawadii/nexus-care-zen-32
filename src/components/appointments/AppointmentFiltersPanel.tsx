
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X, Filter } from 'lucide-react';

interface FiltersProps {
  filters: {
    confirmed: boolean;
    newPatients: boolean;
    followUps: boolean;
    showBlocked: boolean;
    showCompleted: boolean;
    showCancelled: boolean;
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const AppointmentFiltersPanel = ({ filters, onFiltersChange, onClose }: FiltersProps) => {
  const updateFilter = (key: string, value: boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      confirmed: false,
      newPatients: false,
      followUps: false,
      showBlocked: true,
      showCompleted: true,
      showCancelled: false
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'showBlocked' || key === 'showCompleted') return !value;
    return value;
  }).length;

  return (
    <div className="bg-surface-elevated border border-border-primary rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-text-secondary" />
          <h3 className="font-semibold text-text-primary">Quick Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="default">{activeFiltersCount} active</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={clearAllFilters}>
            Reset
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Show Only Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Show Only</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-text-primary">Confirmed Only</label>
              <Switch
                checked={filters.confirmed}
                onCheckedChange={(checked) => updateFilter('confirmed', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-text-primary">New Patients</label>
              <Switch
                checked={filters.newPatients}
                onCheckedChange={(checked) => updateFilter('newPatients', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-text-primary">Follow-ups</label>
              <Switch
                checked={filters.followUps}
                onCheckedChange={(checked) => updateFilter('followUps', checked)}
              />
            </div>
          </div>
        </div>

        {/* Visibility Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Visibility</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-text-primary">Show Breaks</label>
              <Switch
                checked={filters.showBlocked}
                onCheckedChange={(checked) => updateFilter('showBlocked', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-text-primary">Show Completed</label>
              <Switch
                checked={filters.showCompleted}
                onCheckedChange={(checked) => updateFilter('showCompleted', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-text-primary">Show Cancelled</label>
              <Switch
                checked={filters.showCancelled}
                onCheckedChange={(checked) => updateFilter('showCancelled', checked)}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-secondary">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              Today's Schedule
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              This Week
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Pending Confirmations
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Available Slots
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFiltersPanel;
