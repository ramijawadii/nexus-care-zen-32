
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  AlertCircle,
  Clock,
  FileText
} from 'lucide-react';

const PayrollOverview = () => {
  const payrollSummary = {
    totalEmployees: 24,
    activeEmployees: 22,
    inactiveEmployees: 2,
    totalMonthlySalary: 45600,
    totalEmployerCharges: 12850,
    averageSalaryPerEmployee: 1900,
    nextPaymentDate: '2024-02-28'
  };

  const employeeTypes = [
    { type: 'Médecins', count: 5, averageSalary: 4200, color: 'bg-blue-100 text-blue-800' },
    { type: 'Infirmiers', count: 8, averageSalary: 2100, color: 'bg-green-100 text-green-800' },
    { type: 'Secrétaires', count: 4, averageSalary: 1400, color: 'bg-purple-100 text-purple-800' },
    { type: 'Techniciens', count: 3, averageSalary: 1800, color: 'bg-orange-100 text-orange-800' },
    { type: 'Administration', count: 4, averageSalary: 1650, color: 'bg-gray-100 text-gray-800' }
  ];

  const contractTypes = [
    { type: 'CDI', count: 18, percentage: 75 },
    { type: 'CDD', count: 4, percentage: 17 },
    { type: 'Freelance', count: 2, percentage: 8 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Employés</p>
                <p className="text-2xl font-bold text-text-primary">{payrollSummary.totalEmployees}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-600">{payrollSummary.activeEmployees} actifs</span>
                  <span className="text-red-600">{payrollSummary.inactiveEmployees} inactifs</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Masse Salariale</p>
                <p className="text-2xl font-bold text-text-primary">
                  {payrollSummary.totalMonthlySalary.toLocaleString()} €
                </p>
                <p className="text-sm text-green-600">+3.2% ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Charges Patronales</p>
                <p className="text-2xl font-bold text-text-primary">
                  {payrollSummary.totalEmployerCharges.toLocaleString()} €
                </p>
                <p className="text-sm text-purple-600">28.2% masse salariale</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Prochaine Paie</p>
                <p className="text-2xl font-bold text-text-primary">28 Fév</p>
                <p className="text-sm text-orange-600">Dans 5 jours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Répartition par Fonction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeTypes.map((employeeType) => (
                <div key={employeeType.type} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={employeeType.color}>
                      {employeeType.count}
                    </Badge>
                    <span className="font-medium text-text-primary">{employeeType.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">
                      {employeeType.averageSalary.toLocaleString()} €
                    </p>
                    <p className="text-sm text-text-secondary">Salaire moyen</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Types de Contrats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractTypes.map((contract) => (
                <div key={contract.type} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-text-primary">{contract.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">{contract.count} employés</p>
                    <p className="text-sm text-text-secondary">{contract.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payroll Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            Activité Récente Paie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <UserCheck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-text-primary">Paie Janvier 2024 - Traitée</p>
                  <p className="text-sm text-text-secondary">22 employés • 43,200 € net versé</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Terminé</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-text-primary">Préparation Paie Février</p>
                  <p className="text-sm text-text-secondary">En cours • Variables à saisir</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-text-primary">Déclaration CNSS</p>
                  <p className="text-sm text-text-secondary">Échéance 15 Mars • À préparer</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">À faire</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollOverview;
