
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  PieChart
} from 'lucide-react';

const PayrollReports = () => {
  const reports = [
    {
      id: 'monthly-payroll',
      title: 'Rapport Paie Mensuel',
      description: 'Détail complet de la paie par employé',
      frequency: 'Mensuel',
      lastGenerated: '2024-01-31',
      format: ['PDF', 'Excel'],
      status: 'available'
    },
    {
      id: 'annual-salary',
      title: 'Masse Salariale Annuelle',
      description: 'Évolution de la masse salariale sur 12 mois',
      frequency: 'Annuel',
      lastGenerated: '2023-12-31',
      format: ['PDF', 'Excel'],
      status: 'available'
    },
    {
      id: 'department-comparison',
      title: 'Comparatif par Service',
      description: 'Répartition des coûts par département',
      frequency: 'Trimestriel',
      lastGenerated: '2023-12-31',
      format: ['PDF', 'Excel', 'PowerPoint'],
      status: 'pending'
    },
    {
      id: 'social-charges',
      title: 'Charges Sociales',
      description: 'Détail des cotisations sociales et fiscales',
      frequency: 'Mensuel',
      lastGenerated: '2024-01-31',
      format: ['PDF', 'CSV'],
      status: 'available'
    }
  ];

  const quickStats = [
    {
      title: 'Rapports Générés',
      value: '156',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Employés Couverts',
      value: '24',
      change: '+2',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Moyenne Mensuelle',
      value: '45.6K €',
      change: '+3.2%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Conformité',
      value: '100%',
      change: 'Optimal',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const historicalData = [
    { month: 'Oct 2023', totalPayroll: 44200, employees: 22, avgSalary: 2009 },
    { month: 'Nov 2023', totalPayroll: 44800, employees: 23, avgSalary: 1948 },
    { month: 'Dec 2023', totalPayroll: 46100, employees: 23, avgSalary: 2004 },
    { month: 'Jan 2024', totalPayroll: 45600, employees: 24, avgSalary: 1900 },
    { month: 'Fév 2024', totalPayroll: 45600, employees: 24, avgSalary: 1900 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mr-3`} />
                <div>
                  <p className="text-sm text-text-secondary">{stat.title}</p>
                  <p className="text-xl font-bold text-text-primary">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Rapports Disponibles
            </CardTitle>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Générer Tous
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{report.title}</h4>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status === 'available' ? 'Disponible' : 'En attente'}
                    </Badge>
                    <Badge variant="outline">{report.frequency}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{report.description}</p>
                  <div className="flex space-x-4 text-xs text-text-muted">
                    <span>Dernière génération: {report.lastGenerated}</span>
                    <span>Formats: {report.format.join(', ')}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
            Historique Masse Salariale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historicalData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{data.month}</h4>
                    <p className="text-sm text-text-secondary">{data.employees} employés</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-text-primary">
                    {data.totalPayroll.toLocaleString()} €
                  </p>
                  <p className="text-sm text-text-secondary">
                    Moy: {data.avgSalary.toLocaleString()} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Options d'Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Export Excel</h3>
              <p className="text-sm text-text-muted mb-3">Données détaillées pour analyse</p>
              <Button variant="outline" size="sm">Télécharger</Button>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <PieChart className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Format Comptable</h3>
              <p className="text-sm text-text-muted mb-3">Compatible expert-comptable</p>
              <Button variant="outline" size="sm">Générer</Button>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Rapport N vs N-1</h3>
              <p className="text-sm text-text-muted mb-3">Analyse comparative</p>
              <Button variant="outline" size="sm">Comparer</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollReports;
