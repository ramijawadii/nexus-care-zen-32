
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart3, Euro, AlertTriangle } from 'lucide-react';

interface ExpenseStatsProps {
  expensesData: any[];
  budgetData: any[];
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expensesData, budgetData }) => {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const budgetRemaining = totalBudget - totalSpent;

  // Category distribution for pie chart
  const categoryData = budgetData.map(item => ({
    name: item.category,
    value: item.spent,
    color: item.color
  })).filter(item => item.value > 0);

  // Monthly trend data for bar chart
  const monthlyData = [
    { month: 'Oct', expenses: 3200, budget: 4500 },
    { month: 'Nov', expenses: 4100, budget: 4500 },
    { month: 'Déc', expenses: 3800, budget: 4500 },
    { month: 'Jan', expenses: 4200, budget: 4500 },
    { month: 'Fév', expenses: totalSpent, budget: totalBudget }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              Suivi Budget par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetData.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{item.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{item.spent.toLocaleString()} TND</span>
                      <span className="text-xs text-text-muted ml-1">/ {item.budget.toLocaleString()} TND</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.spent > item.budget ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>{((item.spent / item.budget) * 100).toFixed(1)}% utilisé</span>
                    {item.spent > item.budget && (
                      <span className="text-red-600 flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Dépassement
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} TND`, 'Montant']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tendance Mensuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} TND`, '']} />
                <Legend />
                <Bar dataKey="expenses" fill="#ef4444" name="Dépenses" />
                <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseStats;
