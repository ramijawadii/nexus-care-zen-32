
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CreditCard,
  Smartphone,
  Wallet,
  RefreshCw,
  Bell,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

const PaymentsCollections = () => {
  const mockPayments = [
    {
      id: 'PAY-001',
      patient: 'Sarah Johnson',
      amount: 385.00,
      method: 'Insurance',
      status: 'completed',
      date: '2024-02-05',
      transactionId: 'TXN-12345'
    },
    {
      id: 'PAY-002',
      patient: 'Michael Chen',
      amount: 165.00,
      method: 'Cash',
      status: 'pending',
      date: '2024-02-04',
      transactionId: 'TXN-12346'
    },
    {
      id: 'PAY-003',
      patient: 'Emma Rodriguez',
      amount: 137.50,
      method: 'Card',
      status: 'partial',
      date: '2024-02-03',
      transactionId: 'TXN-12347'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const paymentMethods = [
    { name: 'Credit/Debit Cards', icon: CreditCard, color: 'text-blue-600', amount: '$18,450' },
    { name: 'Mobile Money', icon: Smartphone, color: 'text-green-600', amount: '$12,350' },
    { name: 'Cash Payments', icon: Wallet, color: 'text-purple-600', amount: '$8,920' },
    { name: 'Insurance Claims', icon: DollarSign, color: 'text-orange-600', amount: '$15,720' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Payments & Collections</h2>
          <p className="text-text-secondary">Track and manage all payment transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Setup Reminders
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reconcile
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Collected</p>
                <p className="text-xl font-bold text-text-primary">$55,440</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">This Month</p>
                <p className="text-xl font-bold text-text-primary">$8,920</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <RefreshCw className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Pending</p>
                <p className="text-xl font-bold text-text-primary">$3,150</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Refunds</p>
                <p className="text-xl font-bold text-text-primary">$450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center mb-3">
                  <method.icon className={`w-6 h-6 ${method.color} mr-2`} />
                  <span className="font-medium text-text-primary">{method.name}</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">{method.amount}</p>
                <p className="text-sm text-text-secondary">+12.5% vs last month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Payments</CardTitle>
            <Input placeholder="Search payments..." className="max-w-xs" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{payment.id}</h4>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{payment.patient}</p>
                    <p className="text-xs text-text-muted">
                      {payment.method} • {payment.date}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-text-primary">${payment.amount}</p>
                  <p className="text-xs text-text-muted">{payment.transactionId}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Refund</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateway Integration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Stripe Integration</h3>
            <p className="text-sm text-text-secondary mb-4">
              Accept credit cards and online payments
            </p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Mobile Money</h3>
            <p className="text-sm text-text-secondary mb-4">
              Local mobile payment solutions
            </p>
            <Button variant="outline" size="sm">Setup</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Wallet className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Patient Wallet</h3>
            <p className="text-sm text-text-secondary mb-4">
              Pre-payment and credit system
            </p>
            <Button variant="outline" size="sm">Enable</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsCollections;
