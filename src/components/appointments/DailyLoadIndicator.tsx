
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface DailyStats {
  totalAppointments: number;
  confirmedAppointments: number;
  totalHours: number;
  noShows: number;
}

interface DailyLoadIndicatorProps {
  stats: DailyStats;
}

const DailyLoadIndicator = ({ stats }: DailyLoadIndicatorProps) => {
  const getLoadColor = (appointments: number) => {
    if (appointments <= 8) return 'bg-green-500';
    if (appointments <= 12) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getLoadStatus = (appointments: number) => {
    if (appointments <= 8) return 'Light';
    if (appointments <= 12) return 'Moderate';
    return 'Heavy';
  };

  return (
    <div className="flex items-center space-x-3 bg-surface-muted px-4 py-2 rounded-lg border border-border-primary">
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-text-secondary" />
        <span className="text-sm font-medium">{stats.totalAppointments} Patients</span>
        <Badge 
          variant="outline" 
          className={`${getLoadColor(stats.totalAppointments)} text-white border-none`}
        >
          {getLoadStatus(stats.totalAppointments)}
        </Badge>
      </div>
      
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-text-secondary" />
        <span className="text-sm">{stats.totalHours.toFixed(1)}h</span>
      </div>

      {stats.noShows > 0 && (
        <div className="flex items-center space-x-1">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-600">{stats.noShows} No-show</span>
        </div>
      )}

      <div className="flex items-center space-x-1">
        <TrendingUp className="h-4 w-4 text-green-600" />
        <span className="text-sm text-green-600">{stats.confirmedAppointments} Confirmed</span>
      </div>
    </div>
  );
};

export default DailyLoadIndicator;
