import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Download,
  Calendar,
  DollarSign,
  Building,
  Banknote,
  Receipt,
  Target,
  Shield,
  BarChart3
} from 'lucide-react';
import TaxCalculator from './TaxCalculator';
import PaymentProcessor from './PaymentProcessor';
import ComplianceTracker from './ComplianceTracker';
import TaxAnalytics from './TaxAnalytics';
import TaxObligationsTable from './TaxObligationsTable';
import TaxTransactionsTable from './TaxTransactionsTable';

interface TaxObligation {
  id: number;
  type: string;
  period: string;
  description: string;
  dueDate: string;
  baseAmount: number;
  taxAmount: number;
  status: 'pending' | 'completed' | 'overdue' | 'paid' | 'partial';
  priority: 'high' | 'medium' | 'low';
  paymentMethod?: string;
  paidAmount?: number;
  remainingAmount?: number;
  notes?: string;
}

interface TaxTransaction {
  id: number;
  date: string;
  type: string;
  description: string;
  amount: number;
  taxAmount: number;
  taxRate: number;
  category: 'income' | 'deductible' | 'payment';
  status: 'recorded' | 'processed' | 'verified';
  reference?: string;
}

interface TaxSummary {
  totalCollected: number;
  totalDeductible: number;
  netToPay: number;
  overdueTaxes: number;
  upcomingTaxes: number;
  complianceScore: number;
}

const EnhancedTaxManagement = () => {
  const [obligations, setObligations] = useState<TaxObligation[]>([
    {
      id: 1,
      type: 'TVA',
      period: '2024-03',
      description: 'TVA Mensuelle Mars 2024',
      dueDate: '2024-04-20',
      baseAmount: 15000,
      taxAmount: 2850,
      status: 'pending',
      priority: 'high',
      remainingAmount: 2850
    },
    {
      id: 2,
      type: 'IRPP',
      period: '2023',
      description: 'Impôt sur le Revenu 2023',
      dueDate: '2024-05-31',
      baseAmount: 85000,
      taxAmount: 12750,
      status: 'partial',
      priority: 'medium',
      paidAmount: 5000,
      remainingAmount: 7750
    },
    {
      id: 3,
      type: 'CNSS',
      period: '2024-03',
      description: 'Cotisations Sociales Mars',
      dueDate: '2024-04-15',
      baseAmount: 3200,
      taxAmount: 1088,
      status: 'overdue',
      priority: 'high',
      remainingAmount: 1088
    }
  ]);

  const [transactions, setTransactions] = useState<TaxTransaction[]>([
    {
      id: 1,
      date: '2024-03-15',
      type: 'TVA',
      description: 'Consultations Mars 2024',
      amount: 8500,
      taxAmount: 1615,
      taxRate: 19,
      category: 'income',
      status: 'recorded',
      reference: 'CON-2024-03-15'
    },
    {
      id: 2,
      date: '2024-03-20',
      type: 'TVA',
      description: 'Équipement médical',
      amount: 2500,
      taxAmount: 475,
      taxRate: 19,
      category: 'deductible',
      status: 'verified'
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');

  // Calculate tax summary
  const taxSummary: TaxSummary = useMemo(() => {
    const totalCollected = transactions
      .filter(t => t.category === 'income')
      .reduce((sum, t) => sum + t.taxAmount, 0);
    
    const totalDeductible = transactions
      .filter(t => t.category === 'deductible')
      .reduce((sum, t) => sum + t.taxAmount, 0);
    
    const netToPay = totalCollected - totalDeductible;
    
    const overdueTaxes = obligations.filter(o => 
      o.status === 'overdue' || (new Date(o.dueDate) < new Date() && o.status !== 'paid')
    ).length;
    
    const upcomingTaxes = obligations.filter(o => {
      const dueDate = new Date(o.dueDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays >= 0 && o.status !== 'paid';
    }).length;
    
    const totalObligations = obligations.length;
    const completedObligations = obligations.filter(o => o.status === 'paid').length;
    const complianceScore = totalObligations > 0 ? (completedObligations / totalObligations) * 100 : 100;
    
    return {
      totalCollected,
      totalDeductible,
      netToPay,
      overdueTaxes,
      upcomingTaxes,
      complianceScore
    };
  }, [obligations, transactions]);

  const getStatusColor = (status: string) => {
    const colors = {
      'paid': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'pending': 'bg-amber-100 text-amber-800 border-amber-200',
      'overdue': 'bg-red-100 text-red-800 border-red-200',
      'partial': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-500',
      'medium': 'bg-amber-500',
      'low': 'bg-emerald-500'
    };
    return colors[priority] || 'bg-muted';
  };

  const handlePayment = (obligationId: number, amount: number, method: string) => {
    setObligations(prev => prev.map(obligation => {
      if (obligation.id === obligationId) {
        const newPaidAmount = (obligation.paidAmount || 0) + amount;
        const newRemainingAmount = obligation.taxAmount - newPaidAmount;
        const newStatus = newRemainingAmount <= 0 ? 'paid' : 'partial';
        
        return {
          ...obligation,
          paidAmount: newPaidAmount,
          remainingAmount: newRemainingAmount,
          status: newStatus,
          paymentMethod: method
        };
      }
      return obligation;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Gestion Fiscale Avancée</h2>
          <p className="text-text-secondary">Système intégré de gestion des taxes et paiements</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Fiscal
          </Button>
          <Button>
            <Calculator className="w-4 h-4 mr-2" />
            Nouveau Calcul
          </Button>
        </div>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">TVA Collectée</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {taxSummary.totalCollected.toLocaleString()} DT
                </p>
                <p className="text-xs text-emerald-600">Ce mois</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">TVA Déductible</p>
                <p className="text-2xl font-bold text-blue-900">
                  {taxSummary.totalDeductible.toLocaleString()} DT
                </p>
                <p className="text-xs text-blue-600">Récupérable</p>
              </div>
              <Receipt className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Montant Net</p>
                <p className="text-2xl font-bold text-purple-900">
                  {taxSummary.netToPay.toLocaleString()} DT
                </p>
                <p className="text-xs text-purple-600">À payer</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">En Retard</p>
                <p className="text-2xl font-bold text-red-900">
                  {taxSummary.overdueTaxes}
                </p>
                <p className="text-xs text-red-600">Urgent</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">À Venir</p>
                <p className="text-2xl font-bold text-amber-900">
                  {taxSummary.upcomingTaxes}
                </p>
                <p className="text-xs text-amber-600">30 prochains jours</p>
              </div>
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Conformité</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {Math.round(taxSummary.complianceScore)}%
                </p>
                <Progress value={taxSummary.complianceScore} className="h-1 mt-1" />
              </div>
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
          <TabsTrigger value="obligations">Obligations</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="calculator">Calculateur</TabsTrigger>
          <TabsTrigger value="compliance">Conformité</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <span className="font-medium">Payer TVA</span>
                  <span className="text-xs text-muted-foreground">Paiement en ligne</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  <span className="font-medium">Déclaration</span>
                  <span className="text-xs text-muted-foreground">Générer PDF</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Calculator className="w-6 h-6 text-purple-600" />
                  <span className="font-medium">Calculer</span>
                  <span className="text-xs text-muted-foreground">Simulation fiscale</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                  <span className="font-medium">Rapport</span>
                  <span className="text-xs text-muted-foreground">Analyse mensuelle</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Obligations */}
          <Card>
            <CardHeader>
              <CardTitle>Obligations Urgentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {obligations
                  .filter(o => o.status === 'overdue' || o.priority === 'high')
                  .slice(0, 3)
                  .map((obligation) => (
                    <div key={obligation.id} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(obligation.priority)}`}></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{obligation.type}</Badge>
                            <Badge className={getStatusColor(obligation.status)}>
                              {obligation.status === 'overdue' ? 'En retard' : 
                               obligation.status === 'pending' ? 'En attente' :
                               obligation.status === 'partial' ? 'Partiel' : 'Payé'}
                            </Badge>
                          </div>
                          <p className="text-sm text-text-secondary">{obligation.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Échéance: {new Date(obligation.dueDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-text-primary">
                          {(obligation.remainingAmount || obligation.taxAmount).toLocaleString()} DT
                        </p>
                        <Button size="sm" onClick={() => setActiveTab('payments')}>
                          Payer
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="obligations">
          <TaxObligationsTable 
            obligations={obligations}
            onPayment={(id, amount, method) => handlePayment(id, amount, method)}
            onStatusChange={(id, status) => {
              setObligations(prev => prev.map(o => 
                o.id === id ? { ...o, status: status as TaxObligation['status'] } : o
              ));
            }}
          />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentProcessor 
            obligations={obligations.filter(o => o.status !== 'paid')}
            onPayment={handlePayment}
            onPaymentHistory={() => {}}
          />
        </TabsContent>

        <TabsContent value="calculator">
          <TaxCalculator 
            onCalculationComplete={(result) => {
              // Handle calculation result
              console.log('Calculation completed:', result);
            }}
          />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceTracker 
            obligations={obligations}
            complianceScore={taxSummary.complianceScore}
            onComplianceUpdate={(updates) => {
              // Handle compliance updates
              console.log('Compliance updates:', updates);
            }}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <TaxAnalytics 
            obligations={obligations}
            transactions={transactions}
            summary={taxSummary}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTaxManagement;