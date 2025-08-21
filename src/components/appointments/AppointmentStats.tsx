import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserCheck
} from 'lucide-react';

interface AppointmentStatsProps {
  selectedDate: Date;
}

const AppointmentStats = ({ selectedDate }: AppointmentStatsProps) => {
  // Mock statistics data
  const stats = {
    totalAppointments: 24,
    confirmedAppointments: 18,
    pendingAppointments: 4,
    cancelledAppointments: 2,
    noShowAppointments: 1,
    newPatients: 6,
    followUpAppointments: 18,
    occupancyRate: 75,
    averageDuration: 35,
    peakHours: '14:00 - 16:00',
    dailyRevenue: 2400,
    weeklyComparison: 12 // +12% vs previous week
  };

  const appointmentTypes = [
    { type: 'Consultation', count: 12, color: 'bg-blue-500' },
    { type: 'Contrôle', count: 8, color: 'bg-green-500' },
    { type: 'Urgence', count: 3, color: 'bg-red-500' },
    { type: 'Vaccination', count: 1, color: 'bg-purple-500' }
  ];

  const hourlyDistribution = [
    { hour: '08:00', appointments: 2 },
    { hour: '09:00', appointments: 3 },
    { hour: '10:00', appointments: 4 },
    { hour: '11:00', appointments: 3 },
    { hour: '14:00', appointments: 5 },
    { hour: '15:00', appointments: 4 },
    { hour: '16:00', appointments: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Total Rendez-vous
            </CardTitle>
            <Calendar className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.totalAppointments}</div>
            <p className="text-xs text-text-secondary">
              +{stats.weeklyComparison}% vs semaine précédente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Taux d'occupation
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.occupancyRate}%</div>
            <Progress value={stats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Nouveaux Patients
            </CardTitle>
            <UserCheck className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.newPatients}</div>
            <p className="text-xs text-text-secondary">
              {Math.round((stats.newPatients / stats.totalAppointments) * 100)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Durée Moyenne
            </CardTitle>
            <Clock className="h-4 w-4 text-text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.averageDuration}min</div>
            <p className="text-xs text-text-secondary">
              Heure de pointe: {stats.peakHours}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Statut des Rendez-vous</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Confirmés</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{stats.confirmedAppointments}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {Math.round((stats.confirmedAppointments / stats.totalAppointments) * 100)}%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">En attente</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{stats.pendingAppointments}</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  {Math.round((stats.pendingAppointments / stats.totalAppointments) * 100)}%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Annulés</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{stats.cancelledAppointments}</span>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {Math.round((stats.cancelledAppointments / stats.totalAppointments) * 100)}%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Absents</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{stats.noShowAppointments}</span>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  {Math.round((stats.noShowAppointments / stats.totalAppointments) * 100)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types de Rendez-vous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointmentTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <span className="text-sm">{type.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{type.count}</span>
                  <Badge variant="outline">
                    {Math.round((type.count / stats.totalAppointments) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Horaire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hourlyDistribution.map((slot, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium text-text-secondary">
                  {slot.hour}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={(slot.appointments / 5) * 100} 
                      className="flex-1" 
                    />
                    <span className="text-sm font-medium w-8">
                      {slot.appointments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentStats;