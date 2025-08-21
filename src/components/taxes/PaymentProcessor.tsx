import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CreditCard,
  Banknote,
  Smartphone,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  Receipt,
  Calendar,
  DollarSign,
  FileText,
  Eye,
  Download
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  fees: number;
  processingTime: string;
  available: boolean;
}

interface PaymentProcessorProps {
  obligations: Array<{
    id: number;
    type: string;
    description: string;
    dueDate: string;
    taxAmount: number;
    remainingAmount?: number;
    status: string;
  }>;
  onPayment: (obligationId: number, amount: number, method: string) => void;
  onPaymentHistory: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  obligations,
  onPayment,
  onPaymentHistory
}) => {
  const [selectedObligation, setSelectedObligation] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      date: '2024-03-15',
      obligationType: 'TVA',
      amount: 1500,
      method: 'Virement bancaire',
      status: 'completed',
      reference: 'VIR-2024-03-15-001',
      fees: 0
    },
    {
      id: 2,
      date: '2024-03-10',
      obligationType: 'CNSS',
      amount: 800,
      method: 'Carte bancaire',
      status: 'completed',
      reference: 'CB-2024-03-10-002',
      fees: 15
    }
  ]);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bank_transfer',
      name: 'Virement bancaire',
      icon: <Building className="w-5 h-5" />,
      fees: 0,
      processingTime: '1-2 jours ouvrés',
      available: true
    },
    {
      id: 'credit_card',
      name: 'Carte bancaire',
      icon: <CreditCard className="w-5 h-5" />,
      fees: 1.5,
      processingTime: 'Immédiat',
      available: true
    },
    {
      id: 'mobile_payment',
      name: 'Paiement mobile',
      icon: <Smartphone className="w-5 h-5" />,
      fees: 0.5,
      processingTime: 'Immédiat',
      available: true
    },
    {
      id: 'cash',
      name: 'Espèces (Poste)',
      icon: <Banknote className="w-5 h-5" />,
      fees: 5,
      processingTime: '1 jour ouvré',
      available: true
    }
  ];

  const tunisianBanks = [
    { code: 'STB', name: 'Société Tunisienne de Banque' },
    { code: 'BNA', name: 'Banque Nationale Agricole' },
    { code: 'BIAT', name: 'Banque Internationale Arabe de Tunisie' },
    { code: 'UIB', name: 'Union Internationale de Banques' },
    { code: 'ATB', name: 'Arab Tunisian Bank' },
    { code: 'BT', name: 'Banque de Tunisie' }
  ];

  const selectedObligationData = obligations.find(o => o.id === selectedObligation);
  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);

  const calculateFees = (amount: number, method: PaymentMethod) => {
    if (method.fees === 0) return 0;
    return method.fees < 10 ? (amount * method.fees) / 100 : method.fees;
  };

  const handlePayment = async () => {
    if (!selectedObligation || !paymentAmount || !selectedMethod) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const amount = parseFloat(paymentAmount);
      onPayment(selectedObligation, amount, selectedMethod);
      
      // Add to payment history
      const newPayment = {
        id: paymentHistory.length + 1,
        date: new Date().toISOString().split('T')[0],
        obligationType: selectedObligationData?.type || '',
        amount,
        method: selectedPaymentMethod?.name || '',
        status: 'completed',
        reference: `PAY-${Date.now()}`,
        fees: selectedPaymentMethod ? calculateFees(amount, selectedPaymentMethod) : 0
      };
      
      setPaymentHistory(prev => [newPayment, ...prev]);
      
      // Reset form
      setSelectedObligation(null);
      setPaymentAmount('');
      setSelectedMethod('');
      setIsProcessing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Centre de Paiement Fiscal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="payment" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="payment">Nouveau Paiement</TabsTrigger>
              <TabsTrigger value="schedule">Paiements Programmés</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="payment" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Form */}
                <div className="space-y-4">
                  <div>
                    <Label>Sélectionner l'obligation à payer</Label>
                    <Select 
                      value={selectedObligation?.toString() || ''} 
                      onValueChange={(value) => setSelectedObligation(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une obligation" />
                      </SelectTrigger>
                      <SelectContent>
                        {obligations.map((obligation) => (
                          <SelectItem key={obligation.id} value={obligation.id.toString()}>
                            <div className="flex items-center justify-between w-full">
                              <span>{obligation.type} - {obligation.description}</span>
                              <Badge variant="outline">
                                {(obligation.remainingAmount || obligation.taxAmount).toLocaleString()} DT
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedObligationData && (
                    <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Détails de l'obligation</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="font-medium">{selectedObligationData.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Échéance:</span>
                            <span className="font-medium">
                              {new Date(selectedObligationData.dueDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Montant restant:</span>
                            <span className="font-bold text-red-600">
                              {(selectedObligationData.remainingAmount || selectedObligationData.taxAmount).toLocaleString()} DT
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div>
                    <Label htmlFor="amount">Montant à payer (DT)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="0.00"
                      max={selectedObligationData?.remainingAmount || selectedObligationData?.taxAmount}
                    />
                    {selectedObligationData && paymentAmount && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Solde restant: {((selectedObligationData.remainingAmount || selectedObligationData.taxAmount) - parseFloat(paymentAmount || '0')).toFixed(2)} DT
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Méthode de paiement</Label>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedMethod === method.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => method.available && setSelectedMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {method.icon}
                              <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {method.processingTime}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {method.fees === 0 ? 'Gratuit' : 
                                 method.fees < 10 ? `${method.fees}%` : `${method.fees} DT`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPaymentMethod && paymentAmount && (
                    <Card className="bg-gradient-to-r from-green-50 to-green-100">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Résumé du paiement</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Montant:</span>
                            <span className="font-medium">{parseFloat(paymentAmount).toFixed(2)} DT</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frais:</span>
                            <span className="font-medium">
                              {calculateFees(parseFloat(paymentAmount), selectedPaymentMethod).toFixed(2)} DT
                            </span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>
                              {(parseFloat(paymentAmount) + calculateFees(parseFloat(paymentAmount), selectedPaymentMethod)).toFixed(2)} DT
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button 
                    onClick={handlePayment} 
                    disabled={!selectedObligation || !paymentAmount || !selectedMethod || isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Effectuer le paiement
                      </>
                    )}
                  </Button>
                </div>

                {/* Payment Methods Information */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Informations Bancaires</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Virement bancaire</h4>
                        <div className="text-sm space-y-1 p-3 bg-muted rounded-lg">
                          <p><strong>Bénéficiaire:</strong> Ministère des Finances</p>
                          <p><strong>RIB:</strong> 08 000 0123456789 12</p>
                          <p><strong>Code Swift:</strong> BNATNTTX</p>
                          <p><strong>Référence:</strong> [Type d'impôt] + [Numéro fiscal]</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Banques partenaires</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {tunisianBanks.slice(0, 4).map((bank) => (
                            <div key={bank.code} className="flex items-center space-x-2 text-sm">
                              <Building className="w-4 h-4 text-muted-foreground" />
                              <span>{bank.name} ({bank.code})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-1">Conseil</h4>
                        <p className="text-sm text-blue-800">
                          Les paiements par virement bancaire sont gratuits et recommandés 
                          pour les montants importants.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Paiements Programmés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Aucun paiement programmé</h3>
                    <p className="text-muted-foreground mb-4">
                      Configurez des paiements automatiques pour ne jamais oublier vos échéances
                    </p>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Programmer un paiement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Historique des Paiements</CardTitle>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Frais</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Référence</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            {new Date(payment.date).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{payment.obligationType}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            {payment.amount.toLocaleString()} DT
                          </TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>{payment.fees.toFixed(2)} DT</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(payment.status)}
                                <span>
                                  {payment.status === 'completed' ? 'Terminé' :
                                   payment.status === 'pending' ? 'En attente' : 'Échoué'}
                                </span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {payment.reference}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Receipt className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentProcessor;