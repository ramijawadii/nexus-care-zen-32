
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Users,
  FileText,
  Activity
} from 'lucide-react';

const FinancialReporting = () => {
  const reportCategories = [
    {
      title: 'Revenue Reports',
      icon: TrendingUp,
      color: 'text-green-600',
      reports: [
        { name: 'Daily Revenue Summary', lastGenerated: '2024-02-05', size: '2.3MB' },
        { name: 'Monthly Revenue Trends', lastGenerated: '2024-02-01', size: '1.8MB' },
        { name: 'Doctor Performance Report', lastGenerated: '2024-01-31', size: '3.1MB' },
        { name: 'Service Revenue Breakdown', lastGenerated: '2024-01-30', size: '1.5MB' }
      ]
    },
    {
      title: 'Expense Reports',
      icon: DollarSign,
      color: 'text-red-600',
      reports: [
        { name: 'Monthly Expense Summary', lastGenerated: '2024-02-01', size: '1.2MB' },
        { name: 'Category-wise Expenses', lastGenerated: '2024-01-31', size: '945KB' },
        { name: 'Supplier Payment Report', lastGenerated: '2024-01-30', size: '678KB' },
        { name: 'Recurring Expenses Tracker', lastGenerated: '2024-01-29', size: '523KB' }
      ]
    },
    {
      title: 'Financial Statements',
      icon: FileText,
      color: 'text-blue-600',
      reports: [
        { name: 'Profit & Loss Statement', lastGenerated: '2024-02-01', size: '2.1MB' },
        { name: 'Cash Flow Statement', lastGenerated: '2024-02-01', size: '1.7MB' },
        { name: 'Balance Sheet', lastGenerated: '2024-01-31', size: '1.4MB' },
        { name: 'Financial Summary Dashboard', lastGenerated: '2024-02-05', size: '856KB' }
      ]
    },
    {
      title: 'Analytics Reports',
      icon: Activity,
      color: 'text-purple-600',
      reports: [
        { name: 'Patient Demographics & Revenue', lastGenerated: '2024-02-04', size: '2.8MB' },
        { name: 'Seasonal Revenue Analysis', lastGenerated: '2024-01-31', size: '1.9MB' },
        { name: 'Insurance vs Private Pay Analysis', lastGenerated: '2024-01-30', size: '1.3MB' },
        { name: 'Outstanding Payments Analysis', lastGenerated: '2024-02-03', size: '967KB' }
      ]
    }
  ];

  const kpiMetrics = [
    {
      title: 'Monthly Revenue',
      value: '$52,450',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Profit Margin',
      value: '28.3%',
      change: '+2.1%',
      trend: 'up',
      icon: PieChart
    },
    {
      title: 'Outstanding Payments',
      value: '$8,920',
      change: '-5.2%',
      trend: 'down',
      icon: DollarSign
    },
    {
      title: 'Patient Volume',
      value: '1,247',
      change: '+18.7%',
      trend: 'up',
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Financial Reporting & Analytics</h2>
          <p className="text-text-secondary">Generate comprehensive financial reports and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Reports
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiMetrics.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">{kpi.title}</p>
                  <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <kpi.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change} vs last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <BarChart className="w-8 h-8 text-blue-600" />
              <span className="font-medium">Revenue Dashboard</span>
              <span className="text-xs text-text-muted">Current month overview</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <PieChart className="w-8 h-8 text-green-600" />
              <span className="font-medium">Expense Breakdown</span>
              <span className="text-xs text-text-muted">Category analysis</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <span className="font-medium">P&L Statement</span>
              <span className="text-xs text-text-muted">Profit and loss</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report) => (
                  <div key={report.name} className="flex items-center justify-between p-3 border border-border-primary rounded-lg hover:bg-hover-surface">
                    <div>
                      <h4 className="font-medium text-text-primary">{report.name}</h4>
                      <div className="flex items-center space-x-4 text-xs text-text-muted">
                        <span>Last generated: {report.lastGenerated}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
              <select className="w-full p-2 border border-border-primary rounded-md">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Doctor/Department</label>
              <select className="w-full p-2 border border-border-primary rounded-md">
                <option>All Doctors</option>
                <option>Dr. Sarah Johnson</option>
                <option>Dr. Michael Chen</option>
                <option>Dr. Emma Rodriguez</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Report Type</label>
              <select className="w-full p-2 border border-border-primary rounded-md">
                <option>Revenue Analysis</option>
                <option>Expense Report</option>
                <option>Patient Demographics</option>
                <option>Financial Summary</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Format</label>
              <select className="w-full p-2 border border-border-primary rounded-md">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
                <option>Dashboard View</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReporting;
