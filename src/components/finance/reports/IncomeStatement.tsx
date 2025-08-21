
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Download,
  Eye,
  Calculator
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const IncomeStatement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [viewType, setViewType] = useState('detailed');

  // Mock data for income statement
  const incomeData = {
    revenues: {
      consultations: 485600,
      procedures: 892300,
      diagnostics: 234500,
      other: 67200
    },
    expenses: {
      personnel: 356800,
      equipment: 125400,
      supplies: 89600,
      utilities: 34200,
      insurance: 45600,
      other: 78900
    }
  };

  const totalRevenues = Object.values(incomeData.revenues).reduce((sum, val) => sum + val, 0);
  const totalExpenses = Object.values(incomeData.expenses).reduce((sum, val) => sum + val, 0);
  const netIncome = totalRevenues - totalExpenses;
  const profitMargin = (netIncome / totalRevenues) * 100;

  // Monthly trend data
  const monthlyData = [
    { month: 'Jan', revenues: 142800, expenses: 98200, net: 44600 },
    { month: 'Fév', revenues: 156200, expenses: 103400, net: 52800 },
    { month: 'Mar', revenues: 149500, expenses: 101200, net: 48300 },
    { month: 'Avr', revenues: 138900, expenses: 95600, net: 43300 },
    { month: 'Mai', revenues: 167400, expenses: 108900, net: 58500 },
    { month: 'Jun', revenues: 171200, expenses: 112300, net: 58900 },
    { month: 'Jul', revenues: 145600, expenses: 99800, net: 45800 },
    { month: 'Aoû', revenues: 159800, expenses: 106700, net: 53100 },
    { month: 'Sep', values: 165400, expenses: 109500, net: 55900 },
    { month: 'Oct', revenues: 158900, expenses: 105200, net: 53700 },
    { month: 'Nov', revenues: 172600, expenses: 114800, net: 57800 },
    { month: 'Déc', revenues: 175200, expenses: 117100, net: 58100 }
  ];

  const revenueBreakdown = [
    { category: 'Consultations', amount: incomeData.revenues.consultations, percentage: 28.6 },
    { category: 'Procédures', amount: incomeData.revenues.procedures, percentage: 52.4 },
    { category: 'Diagnostics', amount: incomeData.revenues.diagnostics, percentage: 13.8 },
    { category: 'Autres', amount: incomeData.revenues.other, percentage: 3.9 }
  ];

  const expenseBreakdown = [
    { category: 'Personnel', amount: incomeData.expenses.personnel, percentage: 48.9 },
    { category: 'Équipement', amount: incomeData.expenses.equipment, percentage: 17.2 },
    { category: 'Fournitures', amount: incomeData.expenses.supplies, percentage: 12.3 },
    { category: 'Services', amount: incomeData.expenses.utilities, percentage: 4.7 },
    { category: 'Assurances', amount: incomeData.expenses.insurance, percentage: 6.2 },
    { category: 'Autres', amount: incomeData.expenses.other, percentage: 10.8 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Compte de Résultat</h2>
          <p className="text-text-secondary">Analyse détaillée des revenus et charges</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detailed">Vue Détaillée</SelectItem>
              <SelectItem value="summary">Résumé</SelectItem>
              <SelectItem value="comparative">Comparatif</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Chiffre d'Affaires</p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalRevenues.toLocaleString()} €
                </p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.4% vs N-1
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Charges Totales</p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalExpenses.toLocaleString()} €
                </p>
                <p className="text-sm text-orange-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2% vs N-1
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Résultat Net</p>
                <p className="text-2xl font-bold text-text-primary">
                  {netIncome.toLocaleString()} €
                </p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +18.7% vs N-1
                </p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Marge Bénéficiaire</p>
                <p className="text-2xl font-bold text-text-primary">
                  {profitMargin.toFixed(1)}%
                </p>
                <p className="text-sm text-green-600">
                  Excellent
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`} />
                    <span className="text-sm text-text-primary">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.amount.toLocaleString()} €</p>
                    <p className="text-xs text-text-secondary">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500' :
                      index === 1 ? 'bg-orange-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-green-500' :
                      index === 4 ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                    <span className="text-sm text-text-primary">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.amount.toLocaleString()} €</p>
                    <p className="text-xs text-text-secondary">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution Mensuelle {selectedPeriod}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              <Line type="monotone" dataKey="revenues" stroke="#3b82f6" name="Revenus" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Charges" strokeWidth={2} />
              <Line type="monotone" dataKey="net" stroke="#22c55e" name="Résultat Net" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Statement Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compte de Résultat Détaillé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Revenues Section */}
            <div>
              <h4 className="font-semibold text-lg text-text-primary mb-3 bg-blue-50 p-2 rounded">PRODUITS</h4>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between items-center">
                  <span>Consultations</span>
                  <span className="font-medium">{incomeData.revenues.consultations.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Procédures médicales</span>
                  <span className="font-medium">{incomeData.revenues.procedures.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Examens diagnostiques</span>
                  <span className="font-medium">{incomeData.revenues.diagnostics.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Autres revenus</span>
                  <span className="font-medium">{incomeData.revenues.other.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 font-bold">
                  <span>TOTAL PRODUITS</span>
                  <span>{totalRevenues.toLocaleString()} €</span>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div>
              <h4 className="font-semibold text-lg text-text-primary mb-3 bg-red-50 p-2 rounded">CHARGES</h4>
              <div className="space-y-2 ml-4">
                <div className="flex justify-between items-center">
                  <span>Charges de personnel</span>
                  <span className="font-medium">{incomeData.expenses.personnel.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Équipements et matériel</span>
                  <span className="font-medium">{incomeData.expenses.equipment.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fournitures médicales</span>
                  <span className="font-medium">{incomeData.expenses.supplies.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Services et utilities</span>
                  <span className="font-medium">{incomeData.expenses.utilities.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Assurances</span>
                  <span className="font-medium">{incomeData.expenses.insurance.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Autres charges</span>
                  <span className="font-medium">{incomeData.expenses.other.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 font-bold">
                  <span>TOTAL CHARGES</span>
                  <span>{totalExpenses.toLocaleString()} €</span>
                </div>
              </div>
            </div>

            {/* Net Result */}
            <div className="bg-green-50 p-4 rounded">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>RÉSULTAT NET</span>
                <span className="text-green-600">{netIncome.toLocaleString()} €</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeStatement;
