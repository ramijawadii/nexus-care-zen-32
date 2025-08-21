
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield,
  FileText,
  Lock,
  AlertCircle,
  CheckCircle,
  Download,
  Search,
  Clock,
  User,
  DollarSign
} from 'lucide-react';

const ComplianceAuditing = () => {
  const auditLogs = [
    {
      id: 'AUD-001',
      timestamp: '2024-02-05 14:32:15',
      user: 'Dr. Sarah Johnson',
      action: 'Invoice Generated',
      entity: 'INV-2024-045',
      amount: 385.00,
      details: 'Generated invoice for patient consultation',
      status: 'completed'
    },
    {
      id: 'AUD-002',
      timestamp: '2024-02-05 13:28:42',
      user: 'Admin User',
      action: 'Payment Processed',
      entity: 'PAY-2024-123',
      amount: 250.00,
      details: 'Insurance payment processed for claim CLM-001',
      status: 'completed'
    },
    {
      id: 'AUD-003',
      timestamp: '2024-02-05 11:15:33',
      user: 'Finance Manager',
      action: 'Expense Approved',
      entity: 'EXP-2024-067',
      amount: 150.00,
      details: 'Medical supplies purchase approved',
      status: 'completed'
    },
    {
      id: 'AUD-004',
      timestamp: '2024-02-05 09:45:21',
      user: 'System',
      action: 'Backup Created',
      entity: 'BKP-2024-035',
      amount: 0,
      details: 'Automated daily financial data backup',
      status: 'completed'
    }
  ];

  const complianceChecks = [
    {
      category: 'Tax Compliance',
      status: 'compliant',
      lastCheck: '2024-02-01',
      nextDue: '2024-03-01',
      details: 'All tax calculations and reporting up to date'
    },
    {
      category: 'Insurance Reporting',
      status: 'warning',
      lastCheck: '2024-01-28',
      nextDue: '2024-02-15',
      details: '3 pending insurance claim submissions require attention'
    },
    {
      category: 'Financial Records',
      status: 'compliant',
      lastCheck: '2024-02-05',
      nextDue: '2024-02-12',
      details: 'All financial transactions properly documented'
    },
    {
      category: 'Audit Trail Integrity',
      status: 'compliant',
      lastCheck: '2024-02-05',
      nextDue: '2024-02-06',
      details: 'All system logs secure and immutable'
    }
  ];

  const accessControls = [
    {
      role: 'Administrator',
      users: 2,
      permissions: ['Full Access', 'User Management', 'System Configuration'],
      lastReview: '2024-01-15'
    },
    {
      role: 'Finance Manager',
      users: 1,
      permissions: ['Financial Reports', 'Expense Management', 'Budget Planning'],
      lastReview: '2024-01-15'
    },
    {
      role: 'Doctor',
      users: 8,
      permissions: ['Patient Billing', 'View Reports', 'Generate Invoices'],
      lastReview: '2024-01-15'
    },
    {
      role: 'Accountant',
      users: 2,
      permissions: ['All Financial Data', 'Audit Logs', 'Compliance Reports'],
      lastReview: '2024-01-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'completed': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'alert':
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'alert':
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Compliance & Auditing</h2>
          <p className="text-text-secondary">Monitor compliance status and maintain audit trails</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Audit Log
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Run Compliance Check
          </Button>
        </div>
      </div>

      {/* Compliance Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Compliant Areas</p>
                <p className="text-xl font-bold text-text-primary">3/4</p>
                <p className="text-sm text-green-600">75% compliance rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Audit Entries</p>
                <p className="text-xl font-bold text-text-primary">1,247</p>
                <p className="text-sm text-blue-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Lock className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Secure Transactions</p>
                <p className="text-xl font-bold text-text-primary">100%</p>
                <p className="text-sm text-purple-600">All logged & encrypted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Pending Actions</p>
                <p className="text-xl font-bold text-text-primary">3</p>
                <p className="text-sm text-orange-600">Require attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceChecks.map((check) => (
              <div key={check.category} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <h4 className="font-medium text-text-primary">{check.category}</h4>
                    <p className="text-sm text-text-secondary">{check.details}</p>
                    <p className="text-xs text-text-muted">
                      Last checked: {check.lastCheck} • Next due: {check.nextDue}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(check.status)}>
                    {check.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Financial Audit Trail</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input 
                placeholder="Search audit logs..." 
                className="pl-10 w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border border-border-primary rounded-lg hover:bg-hover-surface">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {log.action.includes('Invoice') && <FileText className="w-4 h-4 text-blue-600" />}
                    {log.action.includes('Payment') && <DollarSign className="w-4 h-4 text-green-600" />}
                    {log.action.includes('Expense') && <DollarSign className="w-4 h-4 text-red-600" />}
                    {log.action.includes('Backup') && <Shield className="w-4 h-4 text-purple-600" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{log.action}</h4>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-muted">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {log.user}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {log.timestamp}
                      </span>
                      {log.amount > 0 && (
                        <span className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          ${log.amount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Control */}
      <Card>
        <CardHeader>
          <CardTitle>Access Control & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessControls.map((control) => (
              <div key={control.role} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-text-primary">{control.role}</h4>
                    <p className="text-sm text-text-secondary">{control.users} active users</p>
                  </div>
                  <Badge variant="outline">
                    Last review: {control.lastReview}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {control.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border-primary">
                  <Button variant="ghost" size="sm" className="w-full">
                    Review Permissions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAuditing;
