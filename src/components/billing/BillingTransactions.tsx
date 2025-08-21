
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Filter, Receipt } from 'lucide-react';

const BillingTransactions = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock transaction data
  const transactions = [
    {
      id: '1',
      date: '14 Aug 2025',
      description: 'Renouvellement Mensuel - Basic AI',
      amount: 300,
      status: 'paid',
      invoice: 'INV-2025-008'
    },
    {
      id: '2',
      date: '20 Jul 2025',
      description: 'Dépassement API - Tokens supplémentaires',
      amount: 15,
      status: 'paid',
      invoice: 'INV-2025-007'
    },
    {
      id: '3',
      date: '14 Jul 2025',
      description: 'Renouvellement Mensuel - Basic AI',
      amount: 300,
      status: 'paid',
      invoice: 'INV-2025-006'
    },
    {
      id: '4',
      date: '05 Jul 2025',
      description: 'Mise à niveau vers Advanced AI',
      amount: 200,
      status: 'pending',
      invoice: 'INV-2025-005'
    },
    {
      id: '5',
      date: '14 Jun 2025',
      description: 'Renouvellement Mensuel - Basic AI',
      amount: 300,
      status: 'failed',
      invoice: 'INV-2025-004'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default" className="bg-green-100 text-green-800">Payé</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'failed':
        return <Badge variant="default" className="bg-red-100 text-red-800">Échoué</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTransactions = statusFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === statusFilter);

  const handleExport = (format: 'csv' | 'pdf') => {
    // Mock export function
    console.log(`Exporting transactions as ${format.toUpperCase()}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Historique des Transactions
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtres:</span>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="paid">Payé</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="failed">Échoué</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Facture</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="font-semibold">{transaction.amount} DT</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      {transaction.invoice}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucune transaction trouvée pour ce filtre.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingTransactions;
