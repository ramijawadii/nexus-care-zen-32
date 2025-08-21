
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  FileText,
  PieChart
} from 'lucide-react';

const EmployeeReports = () => {
  const reportTypes = [
    {
      title: 'Rapport de Présence',
      description: 'Analyse détaillée des heures travaillées et absences',
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      frequency: 'Mensuel'
    },
    {
      title: 'Rapport des Congés',
      description: 'Utilisation des congés et soldes restants',
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-100',
      frequency: 'Trimestriel'
    },
    {
      title: 'Productivité Employés',
      description: 'Métriques de performance et efficacité',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      frequency: 'Mensuel'
    },
    {
      title: 'Coûts de Personnel',
      description: 'Analyse des coûts salariaux et heures supplémentaires',
      icon: BarChart3,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      frequency: 'Mensuel'
    }
  ];

  const recentReports = [
    {
      name: 'Rapport Présence - Février 2024',
      type: 'Présence',
      generatedDate: '2024-02-15',
      period: 'Février 2024',
      status: 'Généré',
      size: '2.4 MB'
    },
    {
      name: 'Analyse Congés - T1 2024',
      type: 'Congés',
      generatedDate: '2024-01-31',
      period: 'T1 2024',
      status: 'Généré',
      size: '1.8 MB'
    },
    {
      name: 'Performance Équipe - Janvier 2024',
      type: 'Productivité',
      generatedDate: '2024-01-31',
      period: 'Janvier 2024',
      status: 'Généré',
      size: '3.2 MB'
    }
  ];

  const metrics = [
    {
      title: 'Taux de Présence Moyen',
      value: '94.2%',
      trend: '+2.1%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Heures Supplémentaires',
      value: '145h',
      trend: '-8.3%',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Jours de Congé Utilisés',
      value: '187',
      trend: '+12.5%',
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Coût Mensuel Moyen',
      value: '€85,430',
      trend: '+5.2%',
      icon: BarChart3,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Rapports & Analyses</h3>
          <p className="text-text-muted">Tableaux de bord et rapports détaillés</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette Semaine</SelectItem>
              <SelectItem value="month">Ce Mois</SelectItem>
              <SelectItem value="quarter">Ce Trimestre</SelectItem>
              <SelectItem value="year">Cette Année</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter Tout
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend} vs mois dernier
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Types de Rapports Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${report.bg} rounded-lg`}>
                    <report.icon className={`w-6 h-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{report.title}</h4>
                      <Badge variant="outline">{report.frequency}</Badge>
                    </div>
                    <p className="text-sm text-text-muted mb-3">{report.description}</p>
                    <Button size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Générer Rapport
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-green-600" />
            Rapports Récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-text-muted">
                      {report.period} • Généré le {new Date(report.generatedDate).toLocaleDateString()} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">{report.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
            Tableau de Bord Analytique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Présence par Département</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Médical</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Administration</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-18 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Support</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-17 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">88%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Tendances Mensuelles</h4>
              <div className="text-center p-6 border border-border-primary rounded-lg">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">+5.2%</p>
                <p className="text-sm text-text-muted">Amélioration présence</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Actions Recommandées</h4>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm font-medium">Retards fréquents</p>
                  <p className="text-xs text-text-muted">3 employés avec +5 retards ce mois</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-medium">Heures supplémentaires</p>
                  <p className="text-xs text-text-muted">Budget dépassé de 12%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeReports;
