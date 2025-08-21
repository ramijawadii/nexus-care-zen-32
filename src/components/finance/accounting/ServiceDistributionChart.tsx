
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ServiceDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
    count: number;
    color: string;
  }>;
}

const ServiceDistributionChart: React.FC<ServiceDistributionChartProps> = ({ data }) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.value, 0);
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Distribution by Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Chiffre d'Affaires</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: {totalRevenue.toFixed(2)} TND
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
              <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} TND`, 'Chiffre d\'Affaires']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribution by Count */}
      <Card>
        <CardHeader>
          <CardTitle>Nombre de Services par Type</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total: {totalCount} services
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

export default ServiceDistributionChart;
