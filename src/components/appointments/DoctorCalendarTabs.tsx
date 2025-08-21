
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, BarChart3 } from 'lucide-react';
import { DoctorViewMode } from './DoctorCalendar';

interface DoctorCalendarTabsProps {
  currentView: DoctorViewMode;
  onViewChange: (view: DoctorViewMode) => void;
}

const DoctorCalendarTabs = ({ currentView, onViewChange }: DoctorCalendarTabsProps) => {
  return (
    <Tabs value={currentView} onValueChange={(value) => onViewChange(value as DoctorViewMode)}>
      <TabsList className="grid w-full max-w-lg grid-cols-3">
        <TabsTrigger value="day" className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Jour</span>
        </TabsTrigger>
        <TabsTrigger value="week" className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Semaine</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4" />
          <span>Statistiques</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DoctorCalendarTabs;
