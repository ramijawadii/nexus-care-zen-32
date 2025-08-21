
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart,
  Zap,
  Wrench,
  Building,
  Plus,
  Download,
  Calendar,
  TrendingDown
} from 'lucide-react';

const ExpensesPurchases = () => {
  const mockExpenses = [
    {
      id: 'EXP-001',
      category: 'Medical Supplies',
      description: 'Surgical gloves and masks',
      amount: 450.00,
      supplier: 'MedSupply Co.',
      date: '2024-02-05',
      status: 'paid',
      recurring: false
    },
    {
      id: 'EXP-002',
      category: 'Utilities',
      description: 'Monthly electricity bill',
      amount: 280.00,
      supplier: 'Power Company',
      date: '2024-02-01',
      status: 'pending',
      recurring: true
    },
    {
      id: 'EXP-003',
      category: 'Equipment',
      description: 'Blood pressure monitor',
      amount: 850.00,
      supplier: 'MedTech Solutions',
      date: '2024-01-28',
      status: 'paid',
      recurring: false
    }
  ];

  const purchaseOrders = [
    {
      id: 'PO-001',
      supplier: 'Pharmaceutical Supplies Ltd',
      items: ['Antibiotics', 'Pain relievers', 'Vitamins'],
      total: 1250.00,
      status: 'delivered',
      orderDate: '2024-01-20',
      deliveryDate: '2024-01-25'
    },
    {
      id: 'PO-002',
      supplier: 'Office Depot',
      items: ['Printer paper', 'Ink cartridges', 'Folders'],
      total: 150.00,
      status: 'pending',
      orderDate: '2024-02-03',
      deliveryDate: '2024-02-08'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const expenseCategories = [
    { name: 'Medical Supplies', icon: ShoppingCart, amount: 2450, color: 'text-blue-600' },
    { name: 'Utilities', icon: Zap, amount: 1280, color: 'text-yellow-600' },
    { name: 'Equipment', icon: Wrench, amount: 3200, color: 'text-green-600' },
    { name: 'Rent & Facilities', icon: Building, amount: 4500, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Expenses & Purchases</h2>
          <p className="text-text-secondary">Track operational expenses and purchase orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Expense Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Expenses</p>
                <p className="text-xl font-bold text-text-primary">$11,430</p>
                <p className="text-sm text-red-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Recurring</p>
                <p className="text-xl font-bold text-text-primary">$3,200</p>
                <p className="text-sm text-blue-600">Monthly</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Purchase Orders</p>
                <p className="text-xl font-bold text-text-primary">15</p>
                <p className="text-sm text-green-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Suppliers</p>
                <p className="text-xl font-bold text-text-primary">24</p>
                <p className="text-sm text-purple-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {expenseCategories.map((category) => (
              <div key={category.name} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center mb-3">
                  <category.icon className={`w-6 h-6 ${category.color} mr-2`} />
                  <span className="font-medium text-text-primary">{category.name}</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">${category.amount.toLocaleString()}</p>
                <p className="text-sm text-text-secondary">This month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Expenses</CardTitle>
              <Input placeholder="Search expenses..." className="max-w-xs" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{expense.id}</h4>
                        <Badge className={getStatusColor(expense.status)}>
                          {expense.status}
                        </Badge>
                        {expense.recurring && (
                          <Badge variant="outline">Recurring</Badge>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{expense.description}</p>
                      <p className="text-xs text-text-muted">
                        {expense.supplier} • {expense.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">${expense.amount}</p>
                    <p className="text-xs text-text-muted">{expense.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Purchase Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchaseOrders.map((po) => (
                <div key={po.id} className="p-4 border border-border-primary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{po.id}</h4>
                      <Badge className={getStatusColor(po.status)}>
                        {po.status}
                      </Badge>
                    </div>
                    <p className="font-semibold text-text-primary">${po.total}</p>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-2">{po.supplier}</p>
                  <p className="text-xs text-text-muted mb-3">
                    Items: {po.items.join(', ')}
                  </p>
                  
                  <div className="flex justify-between text-xs text-text-subtle">
                    <span>Ordered: {po.orderDate}</span>
                    <span>Delivery: {po.deliveryDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesPurchases;
