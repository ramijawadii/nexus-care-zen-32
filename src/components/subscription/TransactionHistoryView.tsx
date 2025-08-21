
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Receipt, Calendar } from 'lucide-react';
import InvoiceDetailView from '../billing/InvoiceDetailView';

const TransactionHistoryView = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  
  const recentTransactions = [
    {
      id: '1',
      date: '2025-01-15',
      description: 'Abonnement Pro - Janvier 2025',
      amount: 499,
      status: 'paid',
      invoice: 'INV-2025-001'
    },
    {
      id: '2',
      date: '2024-12-15',
      description: 'Abonnement Pro - Décembre 2024',
      amount: 499,
      status: 'paid',
      invoice: 'INV-2024-012'
    },
    {
      id: '3',
      date: '2024-11-15',
      description: 'Abonnement Pro - Novembre 2024',
      amount: 499,
      status: 'paid',
      invoice: 'INV-2024-011'
    },
    {
      id: '4',
      date: '2024-10-15',
      description: 'Abonnement Pro - Octobre 2024',
      amount: 499,
      status: 'paid',
      invoice: 'INV-2024-010'
    }
  ];

  const handleInvoiceClick = (transaction: any) => {
    setSelectedInvoice(transaction);
  };

  const handleBackToTransactions = () => {
    setSelectedInvoice(null);
  };

  // If an invoice is selected, show the detail view
  if (selectedInvoice) {
    return <InvoiceDetailView invoice={selectedInvoice} onBack={handleBackToTransactions} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-text-primary">
          Historique des Transactions
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Consultez et téléchargez vos factures et historique de paiements
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Transactions Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-surface-muted/50 transition-colors">
                <div className="space-y-1">
                  <p className="font-medium text-text-primary">{transaction.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <Calendar className="w-4 h-4" />
                    <span>{transaction.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-text-primary">{transaction.amount} DT</p>
                    <Badge variant="default" className="bg-emerald-100 text-emerald-800 text-xs">
                      Payé
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleInvoiceClick(transaction)}
                    className="flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">{transaction.invoice}</span>
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

export default TransactionHistoryView;
