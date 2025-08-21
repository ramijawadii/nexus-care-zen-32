import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  AlertTriangle,
  Calendar,
  DollarSign,
  Percent,
  Clock
} from 'lucide-react';

interface TaxAnalyticsProps {
  obligations: Array<{
    id: number;
    type: string;
    period: string;
    taxAmount: number;
    status: string;
    dueDate: string;
  }>;
  transactions: Array<{
    id: number;
    date: string;
    type: string;
    amount: number;
    taxAmount: number;
    category: string;
  }>;
  summary: {
    totalCollected: number;
    totalDeductible: number;
    netToPay: number;
    overdueTaxes: number;
    upcomingTaxes: number;
    complianceScore: number;
  };
}

const TaxAnalytics: React.FC<TaxAnalyticsProps> = ({
  obligations,
  transactions,
  summary
}) => {
  // Monthly tax trends
  const monthlyTrends = useMemo(() => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const collected = transactions
        .filter(t => t.category === 'income' && t.date.startsWith(monthKey))
        .reduce((sum, t) => sum + t.taxAmount, 0);
      
      const deductible = transactions
        .filter(t => t.category === 'deductible' && t.date.startsWith(monthKey))
        .reduce((sum, t) => sum + t.taxAmount, 0);
      
      months.push({
        month: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
        collected,
        deductible,
        net: collected - deductible
      });
    }
    
    return months;
  }, [transactions]);

  // Tax type distribution
  const taxTypeDistribution = useMemo(() => {
    const distribution = obligations.reduce((acc, obligation) => {
      const existing = acc.find(item => item.type === obligation.type);
      if (existing) {
        existing.amount += obligation.taxAmount;
        existing.count += 1;
      } else {
        acc.push({
          type: obligation.type,
          amount: obligation.taxAmount,
          count: 1
        });
      }
      return acc;
    }, [] as Array<{ type: string; amount: number; count: number }>);

    return distribution.map(item => ({
      ...item,
      percentage: ((item.amount / distribution.reduce((sum, d) => sum + d.amount, 0)) * 100).toFixed(1)
    }));
  }, [obligations]);

  // Payment timeline
  const paymentTimeline = useMemo(() => {
    const timeline = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthKey = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}`;
      
      const obligationsForMonth = obligations.filter(o => 
        o.dueDate.startsWith(monthKey) && o.status !== 'paid'
      );
      
      const totalAmount = obligationsForMonth.reduce((sum, o) => sum + o.taxAmount, 0);
      
      timeline.push({
        month: futureDate.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
        amount: totalAmount,
        count: obligationsForMonth.length,
        overdue: obligationsForMonth.filter(o => new Date(o.dueDate) < currentDate).length
      });
    }
    
    return timeline;
  }, [obligations]);

  // Performance metrics
  const performanceMetrics = useMemo(() => {
    const totalObligations = obligations.length;
    const completedObligations = obligations.filter(o => o.status === 'paid').length;
    const overdueObligations = obligations.filter(o => o.status === 'overdue').length;
    
    const avgPaymentTime = 15; // Placeholder - calculate actual average
    const previousMonthNet = monthlyTrends[monthlyTrends.length - 2]?.net || 0;
    const currentMonthNet = monthlyTrends[monthlyTrends.length - 1]?.net || 0;
    const netGrowth = previousMonthNet > 0 ? ((currentMonthNet - previousMonthNet) / previousMonthNet) * 100 : 0;

    return {
      completionRate: totalObligations > 0 ? (completedObligations / totalObligations) * 100 : 0,
      overdueRate: totalObligations > 0 ? (overdueObligations / totalObligations) * 100 : 0,
      avgPaymentTime,
      netGrowth: Math.round(netGrowth * 10) / 10,
      effectiveTaxRate: summary.totalCollected > 0 ? (summary.netToPay / summary.totalCollected) * 100 : 0
    };
  }, [obligations, monthlyTrends, summary]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Taux de Conformité</p>
                <p className="text-2xl font-bold text-blue-900">
                  {Math.round(performanceMetrics.completionRate)}%
                </p>
                <Progress value={performanceMetrics.completionRate} className="h-2 mt-2" />
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Évolution Nette</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-green-900">
                    {performanceMetrics.netGrowth > 0 ? '+' : ''}{performanceMetrics.netGrowth}%
                  </p>
                  {performanceMetrics.netGrowth >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-xs text-green-600">vs mois précédent</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Taux Effectif</p>
                <p className="text-2xl font-bold text-amber-900">
                  {performanceMetrics.effectiveTaxRate.toFixed(1)}%
                </p>
                <p className="text-xs text-amber-600">TVA effective</p>
              </div>
              <Percent className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Retards</p>
                <p className="text-2xl font-bold text-red-900">
                  {Math.round(performanceMetrics.overdueRate)}%
                </p>
                <p className="text-xs text-red-600">Taux de retard</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="distribution">Répartition</TabsTrigger>
          <TabsTrigger value="forecasting">Prévisions</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          {/* Monthly Tax Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution Mensuelle de la TVA</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)} DT`, '']}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="collected" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="TVA Collectée"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="deductible" 
                    stackId="2"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="TVA Déductible"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="net" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="TVA Nette"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tax Type Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution par Type d'Impôt</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="collected" stroke="#3b82f6" name="TVA" />
                  <Line type="monotone" dataKey="deductible" stroke="#10b981" name="Déductions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tax Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Type d'Impôt</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taxTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, percentage }) => `${type} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {taxTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value.toFixed(2)} DT`, 'Montant']} />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  {taxTypeDistribution.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.amount.toFixed(2)} DT</p>
                        <p className="text-xs text-muted-foreground">{item.count} obligations</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>État des Obligations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['paid', 'pending', 'overdue', 'partial'].map((status) => {
                    const count = obligations.filter(o => o.status === status).length;
                    const percentage = obligations.length > 0 ? (count / obligations.length) * 100 : 0;
                    const statusLabels = {
                      'paid': 'Payées',
                      'pending': 'En attente',
                      'overdue': 'En retard',
                      'partial': 'Partielles'
                    };
                    const statusColors = {
                      'paid': 'bg-emerald-500',
                      'pending': 'bg-amber-500',
                      'overdue': 'bg-red-500',
                      'partial': 'bg-blue-500'
                    };
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{statusLabels[status]}</span>
                          <span className="text-sm text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${statusColors[status]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          {/* Payment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des Paiements Prévus</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={paymentTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      if (name === 'amount') return [`${value.toFixed(2)} DT`, 'Montant total'];
                      if (name === 'count') return [`${value}`, 'Nombre d\'obligations'];
                      if (name === 'overdue') return [`${value}`, 'En retard'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#3b82f6" name="Montant total" />
                  <Bar dataKey="overdue" fill="#ef4444" name="En retard" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cash Flow Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>Prévision de Trésorerie Fiscale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-center mb-2">Prochain Trimestre</h4>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {paymentTimeline.slice(0, 3).reduce((sum, month) => sum + month.amount, 0).toFixed(2)} DT
                    </p>
                    <p className="text-sm text-muted-foreground">Obligations à payer</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-center mb-2">Dans 6 Mois</h4>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">
                      {paymentTimeline.slice(0, 6).reduce((sum, month) => sum + month.amount, 0).toFixed(2)} DT
                    </p>
                    <p className="text-sm text-muted-foreground">Cumul prévu</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-center mb-2">Sur l'Année</h4>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {paymentTimeline.reduce((sum, month) => sum + month.amount, 0).toFixed(2)} DT
                    </p>
                    <p className="text-sm text-muted-foreground">Total annuel estimé</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Insights Clés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Tendance Positive</h4>
                      <p className="text-sm text-blue-800">
                        Votre TVA collectée a augmenté de {Math.abs(performanceMetrics.netGrowth)}% ce mois.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-900">Optimisation Possible</h4>
                      <p className="text-sm text-amber-800">
                        Vous pourriez économiser en optimisant vos déductions TVA.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Target className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Conformité Excellente</h4>
                      <p className="text-sm text-green-800">
                        Votre taux de conformité de {Math.round(performanceMetrics.completionRate)}% 
                        est au-dessus de la moyenne.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommandations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-medium text-blue-900">Planification</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Mettez en place des rappels automatiques 10 jours avant chaque échéance.
                  </p>
                </div>

                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-medium text-green-900">Optimisation</h4>
                  <p className="text-sm text-green-800 mt-1">
                    Regroupez vos achats d'équipement médical pour maximiser la TVA déductible.
                  </p>
                </div>

                <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-medium text-purple-900">Automatisation</h4>
                  <p className="text-sm text-purple-800 mt-1">
                    Considérez les prélèvements automatiques pour éviter les retards de paiement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle>Comparaison Sectorielle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Votre Cabinet</h4>
                  <p className="text-2xl font-bold text-blue-600">{Math.round(performanceMetrics.completionRate)}%</p>
                  <p className="text-sm text-muted-foreground">Conformité</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Moyenne Secteur</h4>
                  <p className="text-2xl font-bold text-gray-600">78%</p>
                  <p className="text-sm text-muted-foreground">Médecins libéraux</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Meilleurs Pratiques</h4>
                  <p className="text-2xl font-bold text-green-600">95%</p>
                  <p className="text-sm text-muted-foreground">Top 10%</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Objectif</h4>
                  <p className="text-2xl font-bold text-purple-600">90%</p>
                  <p className="text-sm text-muted-foreground">Recommandé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxAnalytics;