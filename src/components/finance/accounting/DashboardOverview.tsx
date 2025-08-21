
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Users,
  Calculator,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardOverview: React.FC = () => {
  console.log('DashboardOverview component is rendering');
  
  // Mock data for the dashboard
  const dashboardData = {
    totalRevenue: 45250.00,
    totalExpenses: 12800.00,
    netProfit: 32450.00,
    vatDue: 2167.50,
    unpaidInvoices: 8,
    overdueAmount: 3200.00
  };

  const monthlyData = [
    { month: 'Jan', revenue: 15000, expenses: 8000, profit: 7000 },
    { month: 'Feb', revenue: 18000, expenses: 9500, profit: 8500 },
    { month: 'Mar', revenue: 22000, expenses: 11000, profit: 11000 },
    { month: 'Apr', revenue: 20000, expenses: 10500, profit: 9500 },
    { month: 'May', revenue: 25000, expenses: 12500, profit: 12500 },
    { month: 'Jun', revenue: 28000, expenses: 14000, profit: 14000 }
  ];

  const expenseCategories = [
    { name: 'Salaires', value: 8000, color: '#3b82f6' },
    { name: 'Fournitures', value: 3000, color: '#10b981' },
    { name: 'Loyer', value: 2500, color: '#f59e0b' },
    { name: 'Assurances', value: 1800, color: '#ef4444' },
    { name: 'Autres', value: 1200, color: '#8b5cf6' }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `${dashboardData.totalRevenue.toFixed(2)} TND`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Expenses',
      value: `${dashboardData.totalExpenses.toFixed(2)} TND`,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Net Profit',
      value: `${dashboardData.netProfit.toFixed(2)} TND`,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'VAT Due',
      value: `${dashboardData.vatDue.toFixed(2)} TND`,
      icon: Calculator,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Unpaid Invoices',
      value: dashboardData.unpaidInvoices.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Overdue Amount',
      value: `${dashboardData.overdueAmount.toFixed(2)} TND`,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Financial Dashboard Overview</h3>
        <p className="text-text-secondary">
          Real-time financial metrics and key performance indicators
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{kpi.title}</p>
                    <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">This Month Revenue</span>
                <span className="font-semibold">15,250.00 TND</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Last Month Revenue</span>
                <span className="font-semibold">13,800.00 TND</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Growth</span>
                <span className="font-semibold text-green-600">+10.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Obligations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">VAT Due (Monthly)</span>
                <span className="font-semibold">2,167.50 TND</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">PIT Estimated (Annual)</span>
                <span className="font-semibold">12,450.00 TND</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Next Filing Date</span>
                <span className="font-semibold text-orange-600">March 20, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} TND`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} TND`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Financial Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Payment Received</p>
                  <p className="text-sm text-text-secondary">Sarah Benali - Consultation</p>
                </div>
              </div>
              <span className="font-semibold text-green-600">+69.55 TND</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium">Expense Recorded</p>
                  <p className="text-sm text-text-secondary">Medical Supplies Purchase</p>
                </div>
              </div>
              <span className="font-semibold text-red-600">-535.50 TND</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calculator className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Invoice Generated</p>
                  <p className="text-sm text-text-secondary">INV-2024-002 - Mehdi Sassi</p>
                </div>
              </div>
              <span className="font-semibold text-blue-600">160.50 TND</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
