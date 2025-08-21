
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface DebtDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
    count: number;
    color: string;
  }>;
}

const DebtDistributionChart: React.FC<DebtDistributionChartProps> = ({ data }) => {
  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Distribution by Amount */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Créances par Montant</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: {totalAmount.toFixed(2)} TND
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} TND`, 'Montant']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribution by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Créances par Statut</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: {totalCount} créances
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Nombre']} />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtDistributionChart;
