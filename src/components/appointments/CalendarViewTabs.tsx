
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Grid3x3, List } from 'lucide-react';
import { ViewMode } from './AppointmentCalendar';

interface CalendarViewTabsProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const CalendarViewTabs = ({ currentView, onViewChange }: CalendarViewTabsProps) => {
  return (
    <Tabs value={currentView} onValueChange={(value) => onViewChange(value as ViewMode)}>
      <TabsList className="grid w-full max-w-md grid-cols-4">
        <TabsTrigger value="day" className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Day</span>
        </TabsTrigger>
        <TabsTrigger value="week" className="flex items-center space-x-2">
          <Grid3x3 className="h-4 w-4" />
          <span>Week</span>
        </TabsTrigger>
        <TabsTrigger value="month" className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Month</span>
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex items-center space-x-2">
          <List className="h-4 w-4" />
          <span>Timeline</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CalendarViewTabs;
