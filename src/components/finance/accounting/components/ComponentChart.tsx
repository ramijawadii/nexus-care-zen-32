
import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComponentData } from '../CustomViewBuilder';

interface ComponentChartProps {
  component: ComponentData;
  onUpdate: (updates: Partial<ComponentData>) => void;
}

const ComponentChart: React.FC<ComponentChartProps> = ({ component, onUpdate }) => {
  const [chartType, setChartType] = useState(component.config?.type || 'bar');
  
  const sampleData = [
    { name: 'Consultations', value: 3500 },
    { name: 'Médicaments', value: 1200 },
    { name: 'Équipements', value: 800 },
    { name: 'Autres', value: 600 }
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const updateChartType = (type: string) => {
    setChartType(type);
    onUpdate({
      config: { ...component.config, type }
    });
  };

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sampleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2">
        <Select value={chartType} onValueChange={updateChartType}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Barres</SelectItem>
            <SelectItem value="pie">Secteurs</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        {renderChart()}
      </div>
    </div>
  );
};

export default ComponentChart;
