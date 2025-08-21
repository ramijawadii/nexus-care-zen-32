
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Send,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';

const BillingInvoicing = () => {
  const mockInvoices = [
    {
      id: 'INV-001',
      patient: 'Sarah Johnson',
      date: '2024-02-05',
      services: ['Consultation', 'Lab Test'],
      amount: 350.00,
      tax: 35.00,
      total: 385.00,
      status: 'paid',
      paymentMethod: 'insurance'
    },
    {
      id: 'INV-002',
      patient: 'Michael Chen',
      date: '2024-02-04',
      services: ['Follow-up', 'Prescription'],
      amount: 150.00,
      tax: 15.00,
      total: 165.00,
      status: 'pending',
      paymentMethod: 'cash'
    },
    {
      id: 'INV-003',
      patient: 'Emma Rodriguez',
      date: '2024-02-03',
      services: ['Physical Exam', 'Vaccination'],
      amount: 250.00,
      tax: 25.00,
      total: 275.00,
      status: 'overdue',
      paymentMethod: 'card'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Billing & Invoicing</h2>
          <p className="text-text-secondary">Generate and manage patient invoices</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Invoices</p>
                <p className="text-xl font-bold text-text-primary">245</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Revenue</p>
                <p className="text-xl font-bold text-text-primary">$52,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-orange-600 mr-3" />
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
              <FileText className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Overdue</p>
                <p className="text-xl font-bold text-text-primary">$2,150</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Search invoices by patient or ID..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg hover:bg-hover-surface">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{invoice.id}</h4>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{invoice.patient}</p>
                    <p className="text-xs text-text-muted">
                      {invoice.services.join(', ')} • {invoice.date}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-text-primary">${invoice.total.toFixed(2)}</p>
                  <p className="text-sm text-text-secondary">
                    +${invoice.tax.toFixed(2)} tax
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="w-4 h-4" />
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

      {/* Invoice Generation Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">One-Click from Appointment</h3>
            <p className="text-sm text-text-secondary mb-4">
              Generate invoice directly from completed appointments
            </p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Bulk Invoice Generation</h3>
            <p className="text-sm text-text-secondary mb-4">
              Create multiple invoices at once for efficiency
            </p>
            <Button variant="outline" size="sm">Start Bulk</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Multi-Currency Support</h3>
            <p className="text-sm text-text-secondary mb-4">
              Handle international patients with automatic FX rates
            </p>
            <Button variant="outline" size="sm">Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingInvoicing;
