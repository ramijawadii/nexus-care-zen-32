
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Clock,
  User,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Timer
} from 'lucide-react';

const AttendanceTracking = () => {
  const [selectedDate, setSelectedDate] = useState('2024-02-15');
  const [selectedEmployee, setSelectedEmployee] = useState('all');

  const todayAttendance = [
    {
      employee: 'Dr. Sarah Johnson',
      role: 'Médecin',
      clockIn: '08:15',
      clockOut: null,
      breakStart: '12:30',
      breakEnd: '13:15',
      status: 'présent',
      hoursWorked: '6h45m',
      overtime: false
    },
    {
      employee: 'Maria Rodriguez',
      role: 'Infirmière',
      clockIn: '07:30',
      clockOut: '15:45',
      breakStart: '11:00',
      breakEnd: '11:30',
      status: 'parti',
      hoursWorked: '7h45m',
      overtime: false
    },
    {
      employee: 'Jean Dupont',
      role: 'Secrétaire',
      clockIn: '09:15',
      clockOut: null,
      breakStart: null,
      breakEnd: null,
      status: 'retard',
      hoursWorked: '5h30m',
      overtime: false
    },
    {
      employee: 'Sophie Martin',
      role: 'Comptable',
      clockIn: '08:00',
      clockOut: null,
      breakStart: '12:00',
      breakEnd: '13:00',
      status: 'présent',
      hoursWorked: '6h00m',
      overtime: false
    }
  ];

  const weeklyStats = [
    {
      employee: 'Dr. Sarah Johnson',
      totalHours: '42h15m',
      overtime: '2h15m',
      absences: 0,
      lateArrivals: 1,
      earlyDepartures: 0
    },
    {
      employee: 'Maria Rodriguez',
      totalHours: '38h30m',
      overtime: '0h00m',
      absences: 1,
      lateArrivals: 0,
      earlyDepartures: 1
    },
    {
      employee: 'Jean Dupont',
      totalHours: '37h45m',
      overtime: '0h00m',
      absences: 0,
      lateArrivals: 3,
      earlyDepartures: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'présent': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'retard': return 'bg-yellow-100 text-yellow-800';
      case 'parti': return 'bg-blue-100 text-blue-800';
      case 'pause': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'présent': return <CheckCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      case 'retard': return <AlertTriangle className="w-4 h-4" />;
      case 'parti': return <CheckCircle className="w-4 h-4" />;
      case 'pause': return <Timer className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Employé</label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les employés</SelectItem>
                <SelectItem value="1">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="2">Maria Rodriguez</SelectItem>
                <SelectItem value="3">Jean Dupont</SelectItem>
                <SelectItem value="4">Sophie Martin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Rapport Mensuel
          </Button>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-text-muted">Présents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-text-muted">Absents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-text-muted">En Retard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156h</p>
                <p className="text-sm text-text-muted">Total Heures</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Présence du Jour
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAttendance.map((attendance, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{attendance.employee}</h4>
                      <p className="text-sm text-text-muted">{attendance.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(attendance.status)}>
                      {getStatusIcon(attendance.status)}
                      <span className="ml-1">{attendance.status}</span>
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Arrivée</p>
                    <p className="font-medium">{attendance.clockIn || '-'}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Départ</p>
                    <p className="font-medium">{attendance.clockOut || 'En cours'}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Pause</p>
                    <p className="font-medium">
                      {attendance.breakStart && attendance.breakEnd 
                        ? `${attendance.breakStart}-${attendance.breakEnd}`
                        : attendance.breakStart 
                        ? `${attendance.breakStart}-En cours`
                        : '-'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted">Heures Travaillées</p>
                    <p className="font-medium">{attendance.hoursWorked}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Heures Sup</p>
                    <p className="font-medium">
                      {attendance.overtime ? 
                        <Badge className="bg-orange-100 text-orange-800">Oui</Badge> : 
                        <Badge className="bg-gray-100 text-gray-800">Non</Badge>
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Résumé Hebdomadaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-primary">
                  <th className="text-left p-3">Employé</th>
                  <th className="text-center p-3">Total Heures</th>
                  <th className="text-center p-3">Heures Sup</th>
                  <th className="text-center p-3">Absences</th>
                  <th className="text-center p-3">Retards</th>
                  <th className="text-center p-3">Départs Anticipés</th>
                </tr>
              </thead>
              <tbody>
                {weeklyStats.map((stat, index) => (
                  <tr key={index} className="border-b border-border-primary">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {stat.employee.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{stat.employee}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-medium">{stat.totalHours}</td>
                    <td className="p-3 text-center">
                      <span className={stat.overtime !== '0h00m' ? 'text-orange-600 font-medium' : ''}>
                        {stat.overtime}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={stat.absences > 0 ? 'text-red-600 font-medium' : ''}>
                        {stat.absences}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={stat.lateArrivals > 0 ? 'text-yellow-600 font-medium' : ''}>
                        {stat.lateArrivals}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={stat.earlyDepartures > 0 ? 'text-blue-600 font-medium' : ''}>
                        {stat.earlyDepartures}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceTracking;
