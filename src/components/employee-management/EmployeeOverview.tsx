
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Plus
} from 'lucide-react';

const EmployeeOverview = () => {
  const stats = [
    {
      title: 'Total Employés',
      value: '24',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Présents Aujourd\'hui',
      value: '22',
      icon: UserCheck,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'En Congé',
      value: '2',
      icon: UserX,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      title: 'Heures Travaillées (Semaine)',
      value: '856h',
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  const recentEmployees = [
    {
      id: 1,
      nom: 'Dr. Sarah Johnson',
      fonction: 'Médecin',
      statut: 'présent',
      heuresAujourdhui: '7h30',
      dernierPointage: '08:15'
    },
    {
      id: 2,
      nom: 'Maria Rodriguez',
      fonction: 'Infirmière',
      statut: 'présent',
      heuresAujourdhui: '6h45',
      dernierPointage: '08:30'
    },
    {
      id: 3,
      nom: 'Jean Dupont',
      fonction: 'Secrétaire',
      statut: 'congé',
      heuresAujourdhui: '0h00',
      dernierPointage: 'Hier 17:30'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: '3 employés approchent de leur limite d\'heures supplémentaires',
      icon: AlertTriangle
    },
    {
      type: 'info',
      message: '5 demandes de congé en attente d\'approbation',
      icon: Calendar
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'présent': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'congé': return 'bg-orange-100 text-orange-800';
      case 'retard': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">{stat.title}</p>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alertes & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center p-3 border border-border-primary rounded-lg">
                <alert.icon className="w-5 h-5 mr-3 text-orange-600" />
                <span className="text-text-primary">{alert.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Employés Actifs
              </CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {employee.nom.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{employee.nom}</p>
                      <p className="text-sm text-text-muted">{employee.fonction}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(employee.statut)}>
                      {employee.statut}
                    </Badge>
                    <p className="text-xs text-text-muted mt-1">{employee.heuresAujourdhui}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 border border-border-primary rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Maria Rodriguez a pointé</p>
                  <p className="text-xs text-text-muted">Il y a 2 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border border-border-primary rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Nouvelle demande de congé soumise</p>
                  <p className="text-xs text-text-muted">Il y a 15 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 border border-border-primary rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Planning modifié pour demain</p>
                  <p className="text-xs text-text-muted">Il y a 1 heure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeOverview;
