
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield,
  FileCheck,
  Clock,
  XCircle,
  Send,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

const InsuranceClaims = () => {
  const mockClaims = [
    {
      id: 'CLM-001',
      patient: 'Sarah Johnson',
      insurer: 'Blue Cross Blue Shield',
      claimRef: 'BC-2024-001',
      amount: 385.00,
      status: 'approved',
      submittedDate: '2024-01-15',
      processedDate: '2024-01-20',
      services: ['Consultation', 'Lab Work']
    },
    {
      id: 'CLM-002',
      patient: 'Michael Chen',
      insurer: 'Aetna Health',
      claimRef: 'AET-2024-002',
      amount: 250.00,
      status: 'pending',
      submittedDate: '2024-02-01',
      processedDate: null,
      services: ['Physical Exam']
    },
    {
      id: 'CLM-003',
      patient: 'Emma Rodriguez',
      insurer: 'United Healthcare',
      claimRef: 'UHC-2024-003',
      amount: 450.00,
      status: 'rejected',
      submittedDate: '2024-01-25',
      processedDate: '2024-02-02',
      services: ['Surgery', 'Follow-up']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under-review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <FileCheck className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'under-review': return <RefreshCw className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Insurance Claims Management</h2>
          <p className="text-text-secondary">Track and manage insurance claims and approvals</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Claims
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Submit Batch
          </Button>
        </div>
      </div>

      {/* Claims Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileCheck className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Approved Claims</p>
                <p className="text-xl font-bold text-text-primary">142</p>
                <p className="text-sm text-green-600">$38,450 paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Pending Claims</p>
                <p className="text-xl font-bold text-text-primary">28</p>
                <p className="text-sm text-yellow-600">$7,250 pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Rejected Claims</p>
                <p className="text-xl font-bold text-text-primary">12</p>
                <p className="text-sm text-red-600">$3,120 rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Success Rate</p>
                <p className="text-xl font-bold text-text-primary">92.4%</p>
                <p className="text-sm text-blue-600">+2.1% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Claims */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Insurance Claims</CardTitle>
            <Input placeholder="Search claims..." className="max-w-xs" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {getStatusIcon(claim.status)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{claim.id}</h4>
                      <Badge className={getStatusColor(claim.status)}>
                        {claim.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{claim.patient} • {claim.insurer}</p>
                    <p className="text-xs text-text-muted">
                      Ref: {claim.claimRef} • Submitted: {claim.submittedDate}
                    </p>
                    <p className="text-xs text-text-subtle">
                      Services: {claim.services.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-text-primary">${claim.amount.toFixed(2)}</p>
                  {claim.processedDate && (
                    <p className="text-xs text-text-muted">
                      Processed: {claim.processedDate}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                  {claim.status === 'rejected' && (
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insurance Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border-primary rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-text-primary">Blue Cross Blue Shield</h3>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Claims Submitted:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Success Rate:</span>
                  <span className="font-medium text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Avg. Processing:</span>
                  <span className="font-medium">5.2 days</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border-primary rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-text-primary">Aetna Health</h3>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Claims Submitted:</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Success Rate:</span>
                  <span className="font-medium text-green-600">91.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Avg. Processing:</span>
                  <span className="font-medium">6.1 days</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border-primary rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-text-primary">United Healthcare</h3>
                <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Claims Submitted:</span>
                  <span className="font-medium">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Success Rate:</span>
                  <span className="font-medium text-orange-600">87.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Avg. Processing:</span>
                  <span className="font-medium">8.3 days</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceClaims;
