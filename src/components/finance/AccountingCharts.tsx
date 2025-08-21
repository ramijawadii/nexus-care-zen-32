
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AccountingCharts = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 95000, expenses: 65000, profit: 30000 },
    { month: 'Fév', revenue: 108000, expenses: 72000, profit: 36000 },
    { month: 'Mar', revenue: 125000, expenses: 82000, profit: 43000 },
    { month: 'Avr', revenue: 118000, expenses: 78000, profit: 40000 },
    { month: 'Mai', revenue: 135000, expenses: 88000, profit: 47000 },
    { month: 'Jun', revenue: 142000, expenses: 92000, profit: 50000 }
  ];

  const expenseBreakdown = [
    { name: 'Salaires', value: 45000, color: '#3b82f6' },
    { name: 'Loyer & Charges', value: 15000, color: '#10b981' },
    { name: 'Matériel Médical', value: 12000, color: '#f59e0b' },
    { name: 'Assurances', value: 5000, color: '#ef4444' },
    { name: 'Marketing', value: 3000, color: '#8b5cf6' },
    { name: 'Autres', value: 2300, color: '#6b7280' }
  ];

  const cashFlowData = [
    { week: 'S1', inflow: 28000, outflow: 22000, net: 6000 },
    { week: 'S2', inflow: 32000, outflow: 25000, net: 7000 },
    { week: 'S3', inflow: 35000, outflow: 28000, net: 7000 },
    { week: 'S4', inflow: 38000, outflow: 30000, net: 8000 }
  ];

  return (
    <div className="space-y-6">
      {/* Évolution Revenus/Charges/Résultat */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution Financière (6 derniers mois)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} €`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Chiffre d'Affaires"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Charges"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Résultat Net"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition des Charges */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} €`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Flux de Trésorerie Hebdomadaire */}
        <Card>
          <CardHeader>
            <CardTitle>Flux de Trésorerie (Ce Mois)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} €`, '']} />
                <Legend />
                <Bar dataKey="inflow" fill="#10b981" name="Entrées" />
                <Bar dataKey="outflow" fill="#ef4444" name="Sorties" />
                <Bar dataKey="net" fill="#3b82f6" name="Solde Net" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountingCharts;
