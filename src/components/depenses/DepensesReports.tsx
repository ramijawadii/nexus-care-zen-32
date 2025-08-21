import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  FileText, 
  TrendingDown, 
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface DepensesReportsProps {
  onBack: () => void;
}

const DepensesReports: React.FC<DepensesReportsProps> = ({ onBack }) => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample data for reports
  const monthlyExpenses = [
    { month: 'Jan', amount: 4200, budget: 5000 },
    { month: 'Fév', amount: 4300, budget: 5000 },
    { month: 'Mar', amount: 3800, budget: 5000 },
    { month: 'Avr', amount: 4500, budget: 5000 },
    { month: 'Mai', amount: 4700, budget: 5000 },
    { month: 'Jun', amount: 4300, budget: 5000 }
  ];

  const categoryDistribution = [
    { name: 'Équipement', value: 1250, color: '#3b82f6', budget: 5000 },
    { name: 'Charges fixes', value: 850, color: '#10b981', budget: 2000 },
    { name: 'Fournitures', value: 680, color: '#f59e0b', budget: 1500 },
    { name: 'Services', value: 420, color: '#8b5cf6', budget: 800 },
    { name: 'Assurances', value: 1100, color: '#ef4444', budget: 1200 }
  ];

  const supplierAnalysis = [
    { supplier: 'MedSupply Tunisie', totalSpent: 1250, transactions: 3, avgAmount: 417 },
    { supplier: 'STEG', totalSpent: 850, transactions: 1, avgAmount: 850 },
    { supplier: 'PharmaTech Solutions', totalSpent: 680, transactions: 2, avgAmount: 340 },
    { supplier: 'Cabinet Comptable Sfax', totalSpent: 420, transactions: 1, avgAmount: 420 },
    { supplier: 'Assurance Médicale Plus', totalSpent: 1100, transactions: 1, avgAmount: 1100 }
  ];

  const totalExpenses = categoryDistribution.reduce((sum, cat) => sum + cat.value, 0);
  const totalBudget = categoryDistribution.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetUtilization = (totalExpenses / totalBudget) * 100;

  const exceededBudgets = categoryDistribution.filter(cat => cat.value > cat.budget);
  const nearBudgetLimit = categoryDistribution.filter(cat => (cat.value / cat.budget) > 0.8 && cat.value <= cat.budget);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Retour
          </Button>
          <h2 className="text-2xl font-semibold text-text-primary">Rapports des Dépenses</h2>
          <p className="text-text-secondary">Analyse détaillée des dépenses et budgets</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="quarterly">Trimestriel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* KPIs Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Dépenses</p>
                <p className="text-xl font-bold text-text-primary">{totalExpenses.toLocaleString()} TND</p>
                <p className="text-sm text-green-600">-5.2% vs mois dernier</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Budget Utilisé</p>
                <p className="text-xl font-bold text-text-primary">{budgetUtilization.toFixed(1)}%</p>
                <p className="text-sm text-blue-600">Budget total: {totalBudget.toLocaleString()} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Dépassements</p>
                <p className="text-xl font-bold text-text-primary">{exceededBudgets.length}</p>
                <p className="text-sm text-orange-600">Catégories en alerte</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Fournisseurs</p>
                <p className="text-xl font-bold text-text-primary">{supplierAnalysis.length}</p>
                <p className="text-sm text-green-600">Actifs ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Dépenses Mensuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} TND`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Dépenses réelles"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="budget" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    name="Budget"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} TND`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget vs Réalisé par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} TND`, '']} />
                    <Bar dataKey="budget" fill="#e5e7eb" name="Budget" />
                    <Bar dataKey="value" fill="#3b82f6" name="Réalisé" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des Fournisseurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierAnalysis.map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                    <div>
                      <h4 className="font-medium text-text-primary">{supplier.supplier}</h4>
                      <p className="text-sm text-text-secondary">
                        {supplier.transactions} transaction(s) • Moyenne: {supplier.avgAmount.toLocaleString()} TND
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">{supplier.totalSpent.toLocaleString()} TND</p>
                      <p className="text-sm text-text-secondary">Total dépensé</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Alertes Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exceededBudgets.length > 0 ? (
                    exceededBudgets.map((cat, index) => (
                      <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-red-800">{cat.name}</span>
                          <Badge variant="destructive">Dépassé</Badge>
                        </div>
                        <p className="text-sm text-red-600">
                          {cat.value.toLocaleString()} TND / {cat.budget.toLocaleString()} TND
                          (+{((cat.value - cat.budget) / cat.budget * 100).toFixed(1)}%)
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-text-secondary">Aucun dépassement de budget</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Proche de la Limite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nearBudgetLimit.length > 0 ? (
                    nearBudgetLimit.map((cat, index) => (
                      <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-yellow-800">{cat.name}</span>
                          <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                            {((cat.value / cat.budget) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-yellow-600">
                          {cat.value.toLocaleString()} TND / {cat.budget.toLocaleString()} TND
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-text-secondary">Aucune catégorie proche de la limite</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepensesReports;