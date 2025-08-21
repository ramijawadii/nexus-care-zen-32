
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/patient';
import { CreditCard, Plus, DollarSign } from 'lucide-react';

interface PatientBillingProps {
  patient: Patient;
}

const PatientBilling = ({ patient }: PatientBillingProps) => {
  // Mock billing data
  const mockInvoices = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 250.00,
      description: 'Examen physique annuel',
      status: 'paid' as const,
      insuranceClaim: 'CLM-2024-001'
    },
    {
      id: '2',
      date: '2023-11-20',
      amount: 150.00,
      description: 'Consultation de suivi',
      status: 'unpaid' as const,
      insuranceClaim: 'CLM-2023-089'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé';
      case 'unpaid': return 'Impayé';
      case 'partial': return 'Partiel';
      default: return status;
    }
  };

  const totalOutstanding = mockInvoices
    .filter(inv => inv.status === 'unpaid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Facturation & Paiements</h2>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Facture
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Impayé</p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalOutstanding.toFixed(2)}€
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Assurance</p>
                <p className="text-lg font-medium text-text-primary">
                  {patient.medicalInfo.insuranceProvider || 'Aucune'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Factures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div>
                  <p className="font-medium text-text-primary">
                    {invoice.description}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {new Date(invoice.date).toLocaleDateString('fr-FR')}
                  </p>
                  {invoice.insuranceClaim && (
                    <p className="text-xs text-text-subtle">
                      Réclamation: {invoice.insuranceClaim}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-primary">
                    {invoice.amount.toFixed(2)}€
                  </p>
                  <Badge className={getStatusColor(invoice.status)}>
                    {getStatusText(invoice.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientBilling;
