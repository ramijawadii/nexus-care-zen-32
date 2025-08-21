
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Building,
  Users,
  Activity,
  CreditCard,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const MedicalFinanceOverview = () => {
  const kpiData = [
    {
      title: 'CA Mensuel',
      value: '145 250 €',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'CA Annuel',
      value: '1 658 400 €',
      change: '+18.7%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Encaissements',
      value: '138 900 €',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Paiements Attente',
      value: '28 750 €',
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Solde Bancaire',
      value: '85 600 €',
      change: '+15.1%',
      trend: 'up',
      icon: Building,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Marge Brute',
      value: '68.5%',
      change: '+2.8%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Marge Nette',
      value: '42.3%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Taux Occupation',
      value: '87.2%',
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Délai Règlement',
      value: '15.5 j',
      change: '-2.5j',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Trésorerie Prévisionnelle',
      value: '92 300 €',
      change: '+8.9%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const encaissementsByType = [
    { type: 'Consultations', amount: 98400, percentage: 67.8, color: 'text-blue-600' },
    { type: 'Actes Médicaux', amount: 32850, percentage: 22.6, color: 'text-green-600' },
    { type: 'Services Annexes', amount: 14000, percentage: 9.6, color: 'text-purple-600' }
  ];

  const paymentMethods = [
    { type: 'Carte Bancaire', amount: 52400, percentage: 37.7, icon: CreditCard },
    { type: 'Virement', amount: 28900, percentage: 20.8, icon: Building },
    { type: 'Espèces', amount: 31200, percentage: 22.5, icon: DollarSign },
    { type: 'Chèques', amount: 18700, percentage: 13.5, icon: CheckCircle },
    { type: 'Paiement en ligne', amount: 7700, percentage: 5.5, icon: Activity }
  ];

  const invoiceStatus = [
    { status: 'Payées', count: 156, amount: 138900, color: 'bg-green-100 text-green-800', icon: CheckCircle },
    { status: 'En Attente', count: 23, amount: 18750, color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    { status: 'Partiellement Payées', count: 8, amount: 6800, color: 'bg-orange-100 text-orange-800', icon: Activity },
    { status: 'En Litige', count: 3, amount: 3200, color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Vue d'Ensemble - Indicateurs Clés</h1>
          <p className="text-text-secondary">Tableau de bord synthétique pour cabinet médical</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Rapport Mensuel
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <Badge variant="outline" className={`${
                  kpi.trend === 'up' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'
                }`}>
                  {kpi.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">{kpi.title}</p>
                <p className="text-xl font-bold text-text-primary">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Encaissements par Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Répartition des Encaissements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {encaissementsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div>
                    <h4 className="font-medium text-text-primary">{item.type}</h4>
                    <p className="text-sm text-text-secondary">{item.percentage}% du total</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${item.color}`}>
                      {item.amount.toLocaleString()} €
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modes de Paiement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-600" />
              Encaissements par Mode de Paiement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <method.icon className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-text-primary">{method.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">
                      {method.amount.toLocaleString()} €
                    </p>
                    <p className="text-xs text-text-muted">
                      {method.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status des Factures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
            Statut des Factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {invoiceStatus.map((status) => (
              <div key={status.status} className="p-4 border border-border-primary rounded-lg text-center">
                <status.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-text-primary mb-1">{status.status}</h3>
                <Badge className={`${status.color} mb-2`}>
                  {status.count} factures
                </Badge>
                <p className="text-lg font-bold text-text-primary">
                  {status.amount.toLocaleString()} €
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prévisions de Trésorerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
            Prévisions de Trésorerie (30 jours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Encaissements prévus</p>
              <p className="text-xl font-bold text-blue-600">+28 750 €</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Charges prévues</p>
              <p className="text-xl font-bold text-orange-600">-15 200 €</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Solde projeté</p>
              <p className="text-xl font-bold text-green-600">99 150 €</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Objectif mensuel</p>
              <p className="text-xl font-bold text-purple-600">150 000 €</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalFinanceOverview;
