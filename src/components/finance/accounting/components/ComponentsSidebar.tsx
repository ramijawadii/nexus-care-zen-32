
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  BarChart3, 
  Calculator,
  Grid3X3,
  PieChart,
  LineChart
} from 'lucide-react';

interface ComponentsSidebarProps {
  onAddComponent: (type: 'table' | 'chart' | 'sheet') => void;
}

const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onAddComponent }) => {
  const components = [
    {
      type: 'table' as const,
      title: 'Tableau',
      description: 'Tableau de données personnalisable',
      icon: Table,
      color: 'text-blue-600'
    },
    {
      type: 'chart' as const,
      title: 'Graphique',
      description: 'Graphiques et diagrammes',
      icon: BarChart3,
      color: 'text-green-600'
    },
    {
      type: 'sheet' as const,
      title: 'Feuille de Calcul',
      description: 'Feuille Excel intégrée avec formules',
      icon: Calculator,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="h-full p-4 border-r border-border-primary bg-surface-elevated">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Composants</h3>
          <div className="space-y-3">
            {components.map((component) => (
              <Card key={component.type} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <component.icon className={`w-8 h-8 ${component.color}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{component.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {component.description}
                      </p>
                      <Button
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => onAddComponent(component.type)}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border-primary">
          <h4 className="font-medium text-sm mb-3">Modèles Prédéfinis</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <PieChart className="w-4 h-4 mr-2" />
              Dashboard Financier
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <LineChart className="w-4 h-4 mr-2" />
              Suivi Revenus
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Analyse Dépenses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsSidebar;
