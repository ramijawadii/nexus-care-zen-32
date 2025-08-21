
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Download,
  Printer,
  Settings
} from 'lucide-react';
import { DoctorViewMode } from './DoctorCalendar';

interface CalendarHeaderProps {
  currentView: DoctorViewMode;
  selectedDate: Date;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onTodayClick: () => void;
  onAddEvent: () => void;
  onShowFilters: () => void;
  onShowSettings: () => void;
  showFilters: boolean;
  stats: {
    totalAppointments: number;
    confirmedAppointments: number;
    totalHours: number;
    noShows: number;
  };
}

const CalendarHeader = ({
  currentView,
  selectedDate,
  onNavigateDate,
  onTodayClick,
  onAddEvent,
  onShowFilters,
  onShowSettings,
  showFilters,
  stats
}: CalendarHeaderProps) => {
  const getDateRangeText = () => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      year: 'numeric' 
    };
    
    switch (currentView) {
      case 'day':
        return selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'week':
        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'stats':
        return `Statistiques - ${selectedDate.toLocaleDateString('fr-FR', options)}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Date Display */}
          <div className="flex items-center space-x-3">
            <CalendarDays className="h-5 w-5 text-text-secondary" />
            <h2 className="text-lg font-semibold text-text-primary">
              {getDateRangeText()}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onTodayClick}
          >
            Today
          </Button>

          <Button
            variant="outline"
            onClick={onShowFilters}
            className={showFilters ? 'bg-hover-surface' : ''}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onShowSettings}
          >
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
          >
            <Printer className="h-4 w-4" />
          </Button>

          <Button onClick={onAddEvent}>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface-elevated p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Appointments</span>
            <Badge variant="default">{stats.totalAppointments}</Badge>
          </div>
        </div>
        
        <div className="bg-surface-elevated p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Confirmed</span>
            <Badge variant="default" className="bg-green-500">{stats.confirmedAppointments}</Badge>
          </div>
        </div>
        
        <div className="bg-surface-elevated p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Hours</span>
            <Badge variant="default" className="bg-blue-500">{stats.totalHours.toFixed(1)}h</Badge>
          </div>
        </div>
        
        <div className="bg-surface-elevated p-4 rounded-lg border border-border-primary">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">No Shows</span>
            <Badge variant={stats.noShows > 0 ? "destructive" : "default"}>{stats.noShows}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
