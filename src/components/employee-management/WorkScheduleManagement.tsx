
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Clock,
  Plus,
  Edit,
  Copy,
  Save,
  Users,
  AlertTriangle
} from 'lucide-react';

const WorkScheduleManagement = () => {
  const [selectedWeek, setSelectedWeek] = useState('2024-02-12');
  const [selectedEmployee, setSelectedEmployee] = useState('all');

  const employees = [
    { id: 'all', name: 'Tous les employés' },
    { id: '1', name: 'Dr. Sarah Johnson' },
    { id: '2', name: 'Maria Rodriguez' },
    { id: '3', name: 'Jean Dupont' },
    { id: '4', name: 'Sophie Martin' }
  ];

  const schedule = [
    {
      employee: 'Dr. Sarah Johnson',
      role: 'Médecin',
      shifts: {
        lundi: { start: '08:00', end: '17:00', break: '12:00-13:00', status: 'confirmé' },
        mardi: { start: '08:00', end: '17:00', break: '12:00-13:00', status: 'confirmé' },
        mercredi: { start: '08:00', end: '17:00', break: '12:00-13:00', status: 'confirmé' },
        jeudi: { start: '08:00', end: '17:00', break: '12:00-13:00', status: 'confirmé' },
        vendredi: { start: '08:00', end: '16:00', break: '12:00-13:00', status: 'confirmé' },
        samedi: { start: null, end: null, break: null, status: 'repos' },
        dimanche: { start: null, end: null, break: null, status: 'repos' }
      },
      totalHours: '41h'
    },
    {
      employee: 'Maria Rodriguez',
      role: 'Infirmière',
      shifts: {
        lundi: { start: '07:00', end: '15:00', break: '11:00-12:00', status: 'confirmé' },
        mardi: { start: '07:00', end: '15:00', break: '11:00-12:00', status: 'confirmé' },
        mercredi: { start: '07:00', end: '15:00', break: '11:00-12:00', status: 'confirmé' },
        jeudi: { start: '07:00', end: '15:00', break: '11:00-12:00', status: 'en_attente' },
        vendredi: { start: '07:00', end: '15:00', break: '11:00-12:00', status: 'confirmé' },
        samedi: { start: '08:00', end: '12:00', break: null, status: 'confirmé' },
        dimanche: { start: null, end: null, break: null, status: 'repos' }
      },
      totalHours: '44h'
    }
  ];

  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmé': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'modifié': return 'bg-blue-100 text-blue-800';
      case 'repos': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Semaine</label>
            <Input
              type="week"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
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
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copier Planning
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Planning
          </Button>
        </div>
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Planning de la Semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-primary">
                  <th className="text-left p-3 font-medium">Employé</th>
                  {days.map((day) => (
                    <th key={day} className="text-center p-3 font-medium capitalize">
                      {day}
                    </th>
                  ))}
                  <th className="text-center p-3 font-medium">Total</th>
                  <th className="text-center p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((emp, index) => (
                  <tr key={index} className="border-b border-border-primary hover:bg-surface-elevated">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-text-primary">{emp.employee}</p>
                        <p className="text-sm text-text-muted">{emp.role}</p>
                      </div>
                    </td>
                    {days.map((day) => {
                      const shift = emp.shifts[day as keyof typeof emp.shifts];
                      return (
                        <td key={day} className="p-3 text-center">
                          {shift.start && shift.end ? (
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {shift.start} - {shift.end}
                              </div>
                              {shift.break && (
                                <div className="text-xs text-text-muted">
                                  Pause: {shift.break}
                                </div>
                              )}
                              <Badge className={getStatusColor(shift.status)}>
                                {shift.status}
                              </Badge>
                            </div>
                          ) : (
                            <Badge className={getStatusColor('repos')}>
                              Repos
                            </Badge>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-3 text-center">
                      <span className="font-medium">{emp.totalHours}</span>
                      {parseInt(emp.totalHours) > 40 && (
                        <AlertTriangle className="w-4 h-4 text-orange-500 inline ml-1" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Modèles de Planning</h3>
                <p className="text-sm text-text-muted">Créer des modèles réutilisables</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Planning Automatique</h3>
                <p className="text-sm text-text-muted">Génération basée sur les règles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium">Conflits & Alertes</h3>
                <p className="text-sm text-text-muted">Détecter les problèmes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkScheduleManagement;
