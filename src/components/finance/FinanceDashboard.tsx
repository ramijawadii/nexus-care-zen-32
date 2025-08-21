
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  CreditCard,
  Clock,
  Users,
  Activity,
  Wallet,
  Building,
  Phone
} from 'lucide-react';

const FinanceDashboard = () => {
  const medicalFinanceData = {
    // KPI Principaux
    monthlyRevenue: 145250,
    annualRevenue: 1658400,
    totalCollections: 138900,
    pendingPayments: 28750,
    bankBalance: 85600,
    grossMargin: 68.5,
    netMargin: 42.3,
    appointmentOccupancyRate: 87.2,
    avgPaymentDelay: 15.5, // jours
    cashflowForecast: 92300,
    
    // Encaissements détaillés
    consultationRevenue: 98400,
    medicalActsRevenue: 32850,
    annexServicesRevenue: 14000,
    
    // Paiements par statut
    paidInvoices: { count: 156, amount: 138900 },
    pendingInvoices: { count: 23, amount: 18750 },
    partiallyPaidInvoices: { count: 8, amount: 6800 },
    disputedInvoices: { count: 3, amount: 3200 },
  };

  const paymentMethods = [
    { type: 'Carte Bancaire', amount: 52400, percentage: 37.7, color: 'text-blue-600', icon: CreditCard },
    { type: 'Espèces', amount: 31200, percentage: 22.5, color: 'text-green-600', icon: Wallet },
    { type: 'Virement', amount: 28900, percentage: 20.8, color: 'text-purple-600', icon: Building },
    { type: 'Chèques', amount: 18700, percentage: 13.5, color: 'text-orange-600', icon: FileText },
    { type: 'Paiement en ligne', amount: 7700, percentage: 5.5, color: 'text-indigo-600', icon: Phone },
  ];

  const invoicesByStatus = [
    {
      status: 'Payées',
      count: medicalFinanceData.paidInvoices.count,
      amount: medicalFinanceData.paidInvoices.amount,
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    {
      status: 'En Attente',
      count: medicalFinanceData.pendingInvoices.count,
      amount: medicalFinanceData.pendingInvoices.amount,
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
      iconColor: 'text-yellow-600'
    },
    {
      status: 'Partiellement Payées',
      count: medicalFinanceData.partiallyPaidInvoices.count,
      amount: medicalFinanceData.partiallyPaidInvoices.amount,
      color: 'bg-orange-100 text-orange-800',
      icon: Activity,
      iconColor: 'text-orange-600'
    },
    {
      status: 'En Litige',
      count: medicalFinanceData.disputedInvoices.count,
      amount: medicalFinanceData.disputedInvoices.amount,
      color: 'bg-red-100 text-red-800',
      icon: AlertTriangle,
      iconColor: 'text-red-600'
    }
  ];

  const keyMetrics = [
    {
      title: 'CA Mensuel',
      value: `${medicalFinanceData.monthlyRevenue.toLocaleString()} €`,
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      description: 'vs mois dernier'
    },
    {
      title: 'CA Annuel',
      value: `${(medicalFinanceData.annualRevenue / 1000).toFixed(0)}K €`,
      change: '+18.7%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600',
      description: 'projection'
    },
    {
      title: 'Encaissements',
      value: `${medicalFinanceData.totalCollections.toLocaleString()} €`,
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      description: 'ce mois'
    },
    {
      title: 'Paiements Attente',
      value: `${medicalFinanceData.pendingPayments.toLocaleString()} €`,
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600',
      description: 'en retard'
    },
    {
      title: 'Solde Bancaire',
      value: `${medicalFinanceData.bankBalance.toLocaleString()} €`,
      change: '+15.1%',
      trend: 'up',
      icon: Building,
      color: 'text-indigo-600',
      description: 'disponible'
    },
    {
      title: 'Marge Nette',
      value: `${medicalFinanceData.netMargin}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600',
      description: 'rentabilité'
    },
    {
      title: 'Taux Occupation',
      value: `${medicalFinanceData.appointmentOccupancyRate}%`,
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      description: 'RDV mensuels'
    },
    {
      title: 'Délai Règlement',
      value: `${medicalFinanceData.avgPaymentDelay} j`,
      change: '-2.5j',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600',
      description: 'délai moyen'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec Actions Rapides */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Tableau de Bord Finance & Comptabilité</h1>
          <p className="text-text-secondary">Vue synthétique et actionnable pour cabinet médical</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Bilan Mensuel
          </Button>
          <Button size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Prévisions
          </Button>
        </div>
      </div>

      {/* Indicateurs Clés - KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <Badge variant="outline" className={`${
                  metric.trend === 'up' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'
                }`}>
                  {metric.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">{metric.title}</p>
                <p className="text-xl font-bold text-text-primary mb-1">{metric.value}</p>
                <p className="text-xs text-text-muted">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section Encaissements & Facturation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facturation par Statut */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Facturation par Statut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoicesByStatus.map((invoice) => (
                <div key={invoice.status} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <invoice.icon className={`w-4 h-4 ${invoice.iconColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-text-primary">{invoice.status}</span>
                        <Badge className={invoice.color}>
                          {invoice.count}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {invoice.amount.toLocaleString()} €
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Encaissements par Mode de Paiement */}
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
                    <method.icon className={`w-4 h-4 ${method.color}`} />
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

      {/* Détail Revenus Médicaux */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            Répartition des Revenus Médicaux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border-primary rounded-lg">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Consultations</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {medicalFinanceData.consultationRevenue.toLocaleString()} €
              </p>
              <p className="text-sm text-text-muted">67.8% du CA</p>
            </div>
            
            <div className="text-center p-4 border border-border-primary rounded-lg">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Actes Médicaux</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {medicalFinanceData.medicalActsRevenue.toLocaleString()} €
              </p>
              <p className="text-sm text-text-muted">22.6% du CA</p>
            </div>
            
            <div className="text-center p-4 border border-border-primary rounded-lg">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Services Annexes</h3>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {medicalFinanceData.annexServicesRevenue.toLocaleString()} €
              </p>
              <p className="text-sm text-text-muted">9.6% du CA</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prévisions de Trésorerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
            Prévisions de Trésorerie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Prévision 30j</p>
              <p className="text-xl font-bold text-blue-600">+{medicalFinanceData.cashflowForecast.toLocaleString()} €</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Encaissements prévus</p>
              <p className="text-xl font-bold text-green-600">+28 750 €</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Charges prévues</p>
              <p className="text-xl font-bold text-orange-600">-15 200 €</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Building className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-text-secondary">Solde projeté</p>
              <p className="text-xl font-bold text-purple-600">99 150 €</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
