
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Plus,
  Check,
  X,
  Clock,
  FileText,
  User,
  AlertCircle
} from 'lucide-react';

const LeaveManagement = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);

  const leaveRequests = [
    {
      id: 'REQ-001',
      employee: 'Maria Rodriguez',
      type: 'Congé Payé',
      startDate: '2024-02-20',
      endDate: '2024-02-25',
      duration: '5 jours',
      status: 'en_attente',
      reason: 'Vacances familiales',
      submittedDate: '2024-02-10',
      remainingDays: 15
    },
    {
      id: 'REQ-002',
      employee: 'Jean Dupont',
      type: 'Congé Maladie',
      startDate: '2024-02-15',
      endDate: '2024-02-16',
      duration: '2 jours',
      status: 'approuvé',
      reason: 'Grippe',
      submittedDate: '2024-02-14',
      remainingDays: 8
    },
    {
      id: 'REQ-003',
      employee: 'Sophie Martin',
      type: 'Congé Maternité',
      startDate: '2024-03-01',
      endDate: '2024-05-30',
      duration: '90 jours',
      status: 'approuvé',
      reason: 'Naissance',
      submittedDate: '2024-01-15',
      remainingDays: 0
    }
  ];

  const leaveBalances = [
    {
      employee: 'Dr. Sarah Johnson',
      congesPayes: { total: 25, used: 5, remaining: 20 },
      congesMaladie: { total: 10, used: 2, remaining: 8 },
      congesTotaux: { total: 35, used: 7, remaining: 28 }
    },
    {
      employee: 'Maria Rodriguez',
      congesPayes: { total: 25, used: 10, remaining: 15 },
      congesMaladie: { total: 10, used: 3, remaining: 7 },
      congesTotaux: { total: 35, used: 13, remaining: 22 }
    },
    {
      employee: 'Jean Dupont',
      congesPayes: { total: 22, used: 14, remaining: 8 },
      congesMaladie: { total: 10, used: 2, remaining: 8 },
      congesTotaux: { total: 32, used: 16, remaining: 16 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approuvé': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'refusé': return 'bg-red-100 text-red-800';
      case 'annulé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Congé Payé': return 'bg-blue-100 text-blue-800';
      case 'Congé Maladie': return 'bg-red-100 text-red-800';
      case 'Congé Maternité': return 'bg-pink-100 text-pink-800';
      case 'Congé Paternité': return 'bg-purple-100 text-purple-800';
      case 'Formation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestion des Congés</h3>
          <p className="text-text-muted">Demandes et soldes de congés</p>
        </div>
        <Button onClick={() => setShowNewRequest(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Demande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-text-muted">En Attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-text-muted">Approuvées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-text-muted">Jours Utilisés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-text-muted">Conflits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Demandes de Congé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{request.employee}</h4>
                      <p className="text-sm text-text-muted">{request.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(request.type)}>
                      {request.type}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Période</p>
                    <p className="font-medium">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-text-muted">{request.duration}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Motif</p>
                    <p className="font-medium">{request.reason}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Soumis le</p>
                    <p className="font-medium">{new Date(request.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Jours restants</p>
                    <p className="font-medium">{request.remainingDays} jours</p>
                  </div>
                </div>

                {request.status === 'en_attente' && (
                  <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-border-primary">
                    <Button variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Refuser
                    </Button>
                    <Button size="sm">
                      <Check className="w-4 h-4 mr-2" />
                      Approuver
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leave Balances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Soldes de Congés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-primary">
                  <th className="text-left p-3">Employé</th>
                  <th className="text-center p-3">Congés Payés</th>
                  <th className="text-center p-3">Congés Maladie</th>
                  <th className="text-center p-3">Total Restant</th>
                  <th className="text-center p-3">Progression</th>
                </tr>
              </thead>
              <tbody>
                {leaveBalances.map((balance, index) => (
                  <tr key={index} className="border-b border-border-primary">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {balance.employee.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{balance.employee}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="text-sm">
                        <p className="font-medium">{balance.congesPayes.remaining}/{balance.congesPayes.total}</p>
                        <p className="text-text-muted">({balance.congesPayes.used} utilisés)</p>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="text-sm">
                        <p className="font-medium">{balance.congesMaladie.remaining}/{balance.congesMaladie.total}</p>
                        <p className="text-text-muted">({balance.congesMaladie.used} utilisés)</p>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <p className="text-lg font-bold text-green-600">{balance.congesTotaux.remaining}</p>
                    </td>
                    <td className="p-3 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(balance.congesTotaux.used / balance.congesTotaux.total) * 100}%`
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {Math.round((balance.congesTotaux.used / balance.congesTotaux.total) * 100)}% utilisé
                      </p>
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

export default LeaveManagement;
