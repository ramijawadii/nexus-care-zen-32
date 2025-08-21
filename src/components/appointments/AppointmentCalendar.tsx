
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  Clock, 
  Filter, 
  Search, 
  Plus,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import CalendarViewTabs from './CalendarViewTabs';
import AppointmentFilters from './AppointmentFilters';
import QuickBookModal from './QuickBookModal';
import AppointmentTimeline from './AppointmentTimeline';
import { mockAppointments } from './mockAppointmentData';

export type ViewMode = 'day' | 'week' | 'month' | 'timeline';

const AppointmentCalendar = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [showQuickBook, setShowQuickBook] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    doctor: '',
    specialty: '',
    room: '',
    status: '',
    type: ''
  });

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    setSelectedDate(newDate);
  };

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
      case 'month':
        return selectedDate.toLocaleDateString('en-US', options);
      case 'timeline':
        return selectedDate.toLocaleDateString('en-US', options);
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <CalendarDays className="h-5 w-5 text-text-secondary" />
            <h2 className="text-lg font-semibold text-text-primary">
              {getDateRangeText()}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border-primary rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-focus-ring"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-hover-surface' : ''}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Quick Book */}
          <Button onClick={() => setShowQuickBook(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Quick Book
          </Button>

          {/* Today Button */}
          <Button
            variant="outline"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <CalendarViewTabs 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />

      {/* Filters Panel */}
      {showFilters && (
        <AppointmentFilters 
          filters={filters} 
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Calendar Content */}
      <div className="bg-surface-elevated rounded-lg border border-border-primary">
        <AppointmentTimeline
          view={currentView}
          selectedDate={selectedDate}
          appointments={mockAppointments}
          filters={filters}
          searchQuery={searchQuery}
        />
      </div>

      {/* Quick Book Modal */}
      {showQuickBook && (
        <QuickBookModal
          isOpen={showQuickBook}
          onClose={() => setShowQuickBook(false)}
          selectedDate={selectedDate}
        />
      )}

      {/* Status Legend */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-text-secondary">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-text-secondary">Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-text-secondary">Pending</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-text-secondary">Blocked</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
