
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  Clock,
  Users,
  Target,
  BarChart3
} from 'lucide-react';

interface LoadAnalyticsProps {
  dailyCapacity: number;
  currentBookings: number;
  noShowRate: number;
  averageDuration: number;
  peakHours: string[];
  weeklyTrends: Array<{
    day: string;
    bookings: number;
    noShows: number;
    capacity: number;
  }>;
}

const LoadAnalytics = ({
  dailyCapacity,
  currentBookings,
  noShowRate,
  averageDuration,
  peakHours,
  weeklyTrends
}: LoadAnalyticsProps) => {
  const utilizationRate = (currentBookings / dailyCapacity) * 100;
  
  const getLoadColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 75) return 'text-orange-600';
    if (rate >= 50) return 'text-blue-600';
    return 'text-green-600';
  };

  const getLoadStatus = (rate: number) => {
    if (rate >= 90) return { label: 'Overbooked', color: 'bg-red-500' };
    if (rate >= 75) return { label: 'High Load', color: 'bg-orange-500' };
    if (rate >= 50) return { label: 'Optimal', color: 'bg-blue-500' };
    return { label: 'Light Load', color: 'bg-green-500' };
  };

  return (
    <div className="space-y-6">
      {/* Daily Load Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Today's Load Tracker</span>
            </div>
            <Badge className={getLoadStatus(utilizationRate).color}>
              {getLoadStatus(utilizationRate).label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Utilization Rate</span>
            <span className={`font-bold text-lg ${getLoadColor(utilizationRate)}`}>
              {utilizationRate.toFixed(1)}%
            </span>
          </div>
          
          <Progress value={utilizationRate} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg text-blue-600">{currentBookings}</div>
              <div className="text-text-muted">Booked</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-gray-600">{dailyCapacity - currentBookings}</div>
              <div className="text-text-muted">Available</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-green-600">{dailyCapacity}</div>
              <div className="text-text-muted">Capacity</div>
            </div>
          </div>

          {utilizationRate > 85 && (
            <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800">
                Approaching capacity limit. Consider extending hours or rescheduling non-urgent appointments.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Average Duration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {averageDuration} min
            </div>
            <div className="text-sm text-text-muted">
              Per appointment this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>No-Show Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 mb-2">
              {noShowRate}%
            </div>
            <div className="text-sm text-text-muted">
              Last 30 days average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Hours Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Peak Hours Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-text-secondary mb-2">Busiest time slots:</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {peakHours.map((hour) => (
                <Badge key={hour} variant="outline" className="justify-center bg-red-50 text-red-700 border-red-200">
                  {hour}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Weekly Booking Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyTrends.map((day) => {
              const dayUtilization = (day.bookings / day.capacity) * 100;
              return (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex space-x-4">
                      <span>{day.bookings}/{day.capacity}</span>
                      <span className="text-text-muted">({dayUtilization.toFixed(0)}%)</span>
                      <span className="text-red-600">{day.noShows} no-shows</span>
                    </div>
                  </div>
                  <Progress value={dayUtilization} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadAnalytics;
