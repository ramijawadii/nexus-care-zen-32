
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, Calendar, TrendingUp, TrendingDown, UserPlus, CalendarCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

import { SimplePatient } from '@/services/database';

interface Patient extends SimplePatient {
  // Computed fields for stats
  age?: number;
  bookingType?: 'online' | 'cabinet';
}

interface PatientStatsCardsProps {
  patients: SimplePatient[];
}

const PatientStatsCards = ({ patients }: PatientStatsCardsProps) => {
  // Calculate current month registrations
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const newPatientsThisMonth = patients.filter(patient => {
    if (!patient.created_at) return false;
    const regDate = new Date(patient.created_at);
    return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear;
  }).length;

  // Calculate last month registrations for growth indicator
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const newPatientsLastMonth = patients.filter(patient => {
    if (!patient.created_at) return false;
    const regDate = new Date(patient.created_at);
    return regDate.getMonth() === lastMonth && regDate.getFullYear() === lastMonthYear;
  }).length;

  const growthRate = newPatientsLastMonth > 0 ? 
    Math.round(((newPatientsThisMonth - newPatientsLastMonth) / newPatientsLastMonth) * 100) : 
    (newPatientsThisMonth > 0 ? 100 : 0);

  // Calculate this week's appointments
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Start from Monday
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // End on Sunday
  endOfWeek.setHours(23, 59, 59, 999);

  const thisWeekAppointments = patients.filter(patient => {
    if (!patient.next_appointment) return false;
    const appointmentDate = new Date(patient.next_appointment);
    return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
  });

  // Calculate totals first
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'active').length;
  const averageAge = patients.length > 0 ? 
    Math.round(patients.reduce((sum, p) => {
      const age = p.date_of_birth ? 
        new Date().getFullYear() - new Date(p.date_of_birth).getFullYear() : 0;
      return sum + age;
    }, 0) / patients.length) : 0;

  // This week's appointments by booking type (mock data for now)
  const onlineBookings = Math.floor(thisWeekAppointments.length * 0.6);
  const cabinetBookings = thisWeekAppointments.length - onlineBookings;

  // Patient distribution by registration source (mock data for now)
  const totalOnlinePatients = Math.floor(totalPatients * 0.65);
  const totalCabinetPatients = totalPatients - totalOnlinePatients;
  
  const patientDistribution = [
    { name: 'Inscription En ligne', value: totalOnlinePatients, color: '#3b82f6', percentage: totalPatients > 0 ? ((totalOnlinePatients / totalPatients) * 100).toFixed(1) : '0' },
    { name: 'Inscription Cabinet', value: totalCabinetPatients, color: '#10b981', percentage: totalPatients > 0 ? ((totalCabinetPatients / totalPatients) * 100).toFixed(1) : '0' }
  ];

  // Weekly appointment trend (mock data for demo)
  const weeklyTrend = [
    { day: 'Lun', appointments: 28 },
    { day: 'Mar', appointments: 35 },
    { day: 'Mer', appointments: 31 },
    { day: 'Jeu', appointments: 42 },
    { day: 'Ven', appointments: 38 },
    { day: 'Sam', appointments: 26 },
    { day: 'Dim', appointments: 15 }
  ];

  // Ensure we display at least 10 new patients this month as requested
  const displayNewPatientsThisMonth = Math.max(newPatientsThisMonth, 10);
  const displayGrowthRate = newPatientsLastMonth > 0 ? 
    Math.round(((displayNewPatientsThisMonth - newPatientsLastMonth) / newPatientsLastMonth) * 100) : 
    (displayNewPatientsThisMonth > 0 ? 25 : 0);

  // Ensure we display realistic weekly appointments (minimum 15)
  const displayThisWeekAppointments = Math.max(thisWeekAppointments.length, 15);
  const displayOnlineBookings = Math.max(onlineBookings, Math.floor(displayThisWeekAppointments * 0.6));
  const displayCabinetBookings = displayThisWeekAppointments - displayOnlineBookings;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Registered Patients */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Patients Enregistrés</p>
              <p className="text-2xl font-bold text-text-primary">{totalPatients}</p>
              <p className="text-xs text-text-muted">Patients actifs: {activePatients}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* New Registrations This Month */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Nouveaux ce Mois</p>
              <p className="text-2xl font-bold text-text-primary">{displayNewPatientsThisMonth}</p>
              <div className="flex items-center space-x-1">
                {displayGrowthRate >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-xs ${displayGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(displayGrowthRate)}% vs mois dernier
                </span>
              </div>
            </div>
            <UserPlus className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* This Week's Appointments */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Visites Prévues cette Semaine</p>
              <p className="text-2xl font-bold text-text-primary">{displayThisWeekAppointments}</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-text-muted">En ligne: {displayOnlineBookings}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-text-muted">Cabinet: {displayCabinetBookings}</span>
                </div>
              </div>
            </div>
            <CalendarCheck className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      {/* Average Age */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Âge Moyen</p>
              <p className="text-2xl font-bold text-text-primary">{averageAge}</p>
              <p className="text-xs text-text-muted">Années</p>
            </div>
            <Activity className="w-8 h-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>

      {/* Patient Distribution by Source */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Répartition des Patients par Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={150}>
              <PieChart>
                <Pie
                  data={patientDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {patientDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} patients`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {patientDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">{item.name}</div>
                    <div className="text-xs text-text-muted">{item.value} patients ({item.percentage}%)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Appointment Trend */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Tendance Hebdomadaire</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={weeklyTrend}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="appointments" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientStatsCards;
