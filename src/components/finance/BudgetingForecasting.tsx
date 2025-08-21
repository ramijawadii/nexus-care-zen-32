
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart
} from 'lucide-react';

const BudgetingForecasting = () => {
  const budgetCategories = [
    {
      category: 'Medical Supplies',
      budgeted: 5000,
      actual: 4250,
      variance: -750,
      percentage: 85,
      status: 'good'
    },
    {
      category: 'Staff Salaries',
      budgeted: 25000,
      actual: 26200,
      variance: 1200,
      percentage: 105,
      status: 'warning'
    },
    {
      category: 'Equipment',
      budgeted: 3000,
      actual: 3850,
      variance: 850,
      percentage: 128,
      status: 'alert'
    },
    {
      category: 'Utilities',
      budgeted: 1500,
      actual: 1280,
      variance: -220,
      percentage: 85,
      status: 'good'
    }
  ];

  const revenueForecasts = [
    {
      period: 'Q1 2024',
      forecasted: 165000,
      actual: 158250,
      confidence: 92
    },
    {
      period: 'Q2 2024',
      forecasted: 172000,
      actual: null,
      confidence: 88
    },
    {
      period: 'Q3 2024',
      forecasted: 185000,
      actual: null,
      confidence: 75
    },
    {
      period: 'Q4 2024',
      forecasted: 195000,
      actual: null,
      confidence: 70
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'alert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalActual = budgetCategories.reduce((sum, cat) => sum + cat.actual, 0);
  const totalVariance = totalActual - totalBudget;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Budgeting & Forecasting</h2>
          <p className="text-text-secondary">Plan budgets and forecast financial performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Set Budget Period
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Create Budget
          </Button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Budget</p>
                <p className="text-xl font-bold text-text-primary">
                  ${totalBudget.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">February 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Actual Spend</p>
                <p className="text-xl font-bold text-text-primary">
                  ${totalActual.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  {((totalActual / totalBudget) * 100).toFixed(1)}% of budget
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Variance</p>
                <p className={`text-xl font-bold ${totalVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${Math.abs(totalVariance).toLocaleString()}
                </p>
                <p className={`text-sm ${totalVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {totalVariance > 0 ? 'Over budget' : 'Under budget'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Budget Utilization</p>
                <p className="text-xl font-bold text-text-primary">
                  {((totalActual / totalBudget) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-orange-600">Of total budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category) => (
              <div key={category.category} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary">{category.category}</h4>
                    {getStatusIcon(category.status)}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-text-secondary">
                        ${category.actual.toLocaleString()} / ${category.budgeted.toLocaleString()}
                      </span>
                      <Badge 
                        className={`${
                          category.variance > 0 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {category.variance > 0 ? '+' : ''}${category.variance.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={category.percentage} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>0%</span>
                    <span className={getStatusColor(category.status)}>
                      {category.percentage}%
                    </span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Forecasting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueForecasts.map((forecast) => (
              <div key={forecast.period} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div>
                  <h4 className="font-medium text-text-primary">{forecast.period}</h4>
                  <p className="text-sm text-text-secondary">
                    Forecasted: ${forecast.forecasted.toLocaleString()}
                  </p>
                  {forecast.actual && (
                    <p className="text-sm text-green-600">
                      Actual: ${forecast.actual.toLocaleString()}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm text-text-secondary">Confidence:</span>
                    <Badge variant="outline">{forecast.confidence}%</Badge>
                  </div>
                  {forecast.actual && (
                    <div className="text-sm">
                      <span className={
                        forecast.actual >= forecast.forecasted 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }>
                        {forecast.actual >= forecast.forecasted ? '+' : ''}
                        ${(forecast.actual - forecast.forecasted).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Planning Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Budget Templates</h3>
            <p className="text-sm text-text-secondary mb-4">
              Use predefined templates for different clinic sizes and specialties
            </p>
            <Button variant="outline" size="sm">Browse Templates</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <PieChart className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Scenario Planning</h3>
            <p className="text-sm text-text-secondary mb-4">
              Create and compare different budget scenarios for better planning
            </p>
            <Button variant="outline" size="sm">Create Scenario</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Predictive Analytics</h3>
            <p className="text-sm text-text-secondary mb-4">
              AI-powered forecasting based on historical data and trends
            </p>
            <Button variant="outline" size="sm">Enable AI Forecast</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetingForecasting;
