
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Download, 
  Filter, 
  Calculator,
  DollarSign,
  TrendingUp,
  Receipt,
  Search,
  Calendar,
  Edit,
  Trash2,
  FileText,
  CreditCard,
  Banknote,
  Smartphone,
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EditReceiptModal from './EditReceiptModal';
import EncaissementReports from './EncaissementReports';

interface CashReceipt {
  id: string;
  date: string;
  patientName: string;
  paymentMethod: 'Espèces' | 'Carte' | 'Chèque' | 'Virement' | 'Assurance';
  amountReceived: number;
  serviceType: 'Consultation' | 'Acte médical' | 'Vente produit' | 'Vaccination' | 'Échographie' | 'Autres';
  invoiceReference: string;
  notes: string;
  status: 'Confirmé' | 'En attente' | 'Annulé';
  receiptNumber: string;
}

const CashReceiptsView: React.FC = () => {
  console.log('CashReceiptsView component rendering');

  const [receiptsData, setReceiptsData] = useState<CashReceipt[]>([
    {
      id: '1',
      date: '2024-02-05',
      patientName: 'Sarah Benali',
      paymentMethod: 'Carte',
      amountReceived: 85.00,
      serviceType: 'Consultation',
      invoiceReference: 'FACT-2024-001',
      notes: 'Consultation de contrôle',
      status: 'Confirmé',
      receiptNumber: 'REC-2024-001'
    },
    {
      id: '2',
      date: '2024-02-05',
      patientName: 'Ahmed Trabelsi',
      paymentMethod: 'Espèces',
      amountReceived: 120.00,
      serviceType: 'Acte médical',
      invoiceReference: 'FACT-2024-002',
      notes: 'Suture - paiement comptant',
      status: 'Confirmé',
      receiptNumber: 'REC-2024-002'
    },
    {
      id: '3',
      date: '2024-02-05',
      patientName: 'Fatma Mansouri',
      paymentMethod: 'Assurance',
      amountReceived: 200.00,
      serviceType: 'Échographie',
      invoiceReference: 'FACT-2024-003',
      notes: 'Remboursement CNSS en cours',
      status: 'En attente',
      receiptNumber: 'REC-2024-003'
    },
    {
      id: '4',
      date: '2024-02-04',
      patientName: 'Mohamed Khelifi',
      paymentMethod: 'Chèque',
      amountReceived: 65.00,
      serviceType: 'Consultation',
      invoiceReference: 'FACT-2024-004',
      notes: 'Chèque n°123456',
      status: 'Confirmé',
      receiptNumber: 'REC-2024-004'
    },
    {
      id: '5',
      date: '2024-02-04',
      patientName: 'Amina Sfar',
      paymentMethod: 'Virement',
      amountReceived: 95.00,
      serviceType: 'Vaccination',
      invoiceReference: 'FACT-2024-005',
      notes: 'Vaccin hépatite B',
      status: 'Confirmé',
      receiptNumber: 'REC-2024-005'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    paymentMethod: 'all',
    serviceType: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddingReceipt, setIsAddingReceipt] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<CashReceipt | null>(null);
  const [deletingReceiptId, setDeletingReceiptId] = useState<string | null>(null);
  const [showReports, setShowReports] = useState(false);

  // New receipt form data
  const [newReceipt, setNewReceipt] = useState<Partial<CashReceipt>>({
    date: selectedDate,
    patientName: '',
    paymentMethod: 'Espèces',
    amountReceived: 0,
    serviceType: 'Consultation',
    invoiceReference: '',
    notes: '',
    status: 'Confirmé'
  });

  // Filter receipts
  const filteredReceipts = useMemo(() => {
    return receiptsData.filter(receipt => {
      const matchesSearch = filters.searchTerm === '' || 
        receipt.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        receipt.receiptNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        receipt.invoiceReference.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesPaymentMethod = filters.paymentMethod === 'all' || receipt.paymentMethod === filters.paymentMethod;
      const matchesServiceType = filters.serviceType === 'all' || receipt.serviceType === filters.serviceType;
      const matchesStatus = filters.status === 'all' || receipt.status === filters.status;
      
      const matchesDateFrom = filters.dateFrom === '' || receipt.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || receipt.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || receipt.amountReceived >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || receipt.amountReceived <= parseFloat(filters.amountMax);

      return matchesSearch && matchesPaymentMethod && matchesServiceType && matchesStatus && 
             matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
  }, [receiptsData, filters]);

  // Calculate daily totals
  const dailyTotals = useMemo(() => {
    const totals = new Map<string, { total: number; count: number; byMethod: Record<string, number> }>();
    
    filteredReceipts.forEach(receipt => {
      if (receipt.status === 'Confirmé') {
        const date = receipt.date;
        const current = totals.get(date) || { total: 0, count: 0, byMethod: {} };
        current.total += receipt.amountReceived;
        current.count += 1;
        current.byMethod[receipt.paymentMethod] = (current.byMethod[receipt.paymentMethod] || 0) + receipt.amountReceived;
        totals.set(date, current);
      }
    });
    
    return totals;
  }, [filteredReceipts]);

  const selectedDateTotal = dailyTotals.get(selectedDate) || { total: 0, count: 0, byMethod: {} };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Carte': return <CreditCard className="w-4 h-4" />;
      case 'Espèces': return <Banknote className="w-4 h-4" />;
      case 'Virement': return <Smartphone className="w-4 h-4" />;
      case 'Chèque': return <Receipt className="w-4 h-4" />;
      case 'Assurance': return <FileText className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddReceipt = () => {
    if (newReceipt.patientName && newReceipt.amountReceived) {
      const receipt: CashReceipt = {
        id: Date.now().toString(),
        date: newReceipt.date || selectedDate,
        patientName: newReceipt.patientName,
        paymentMethod: newReceipt.paymentMethod || 'Espèces',
        amountReceived: newReceipt.amountReceived,
        serviceType: newReceipt.serviceType || 'Consultation',
        invoiceReference: newReceipt.invoiceReference || `FACT-${Date.now()}`,
        notes: newReceipt.notes || '',
        status: newReceipt.status || 'Confirmé',
        receiptNumber: `REC-${Date.now()}`
      };

      setReceiptsData([receipt, ...receiptsData]);
      setNewReceipt({
        date: selectedDate,
        patientName: '',
        paymentMethod: 'Espèces',
        amountReceived: 0,
        serviceType: 'Consultation',
        invoiceReference: '',
        notes: '',
        status: 'Confirmé'
      });
      setIsAddingReceipt(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Patient', 'Mode de paiement', 'Montant', 'Type prestation', 'Référence', 'Notes', 'Statut', 'N° Reçu'].join(','),
      ...filteredReceipts.map(receipt => [
        receipt.date,
        receipt.patientName,
        receipt.paymentMethod,
        receipt.amountReceived.toFixed(2),
        receipt.serviceType,
        receipt.invoiceReference,
        receipt.notes,
        receipt.status,
        receipt.receiptNumber
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `encaissements-${selectedDate}.csv`;
    a.click();
  };

  const handleEditReceipt = (receipt: CashReceipt) => {
    setEditingReceipt(receipt);
  };

  const handleSaveEditedReceipt = (editedReceipt: CashReceipt) => {
    setReceiptsData(receiptsData.map(receipt => 
      receipt.id === editedReceipt.id ? editedReceipt : receipt
    ));
    setEditingReceipt(null);
  };

  const handleDeleteReceipt = (id: string) => {
    setReceiptsData(receiptsData.filter(receipt => receipt.id !== id));
    setDeletingReceiptId(null);
  };

  if (showReports) {
    return <EncaissementReports onBack={() => setShowReports(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header with Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Jour</p>
                <p className="text-xl font-bold text-text-primary">
                  {selectedDateTotal.total.toFixed(2)} TND
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Receipt className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Nb Encaissements</p>
                <p className="text-xl font-bold text-text-primary">
                  {selectedDateTotal.count}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Banknote className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Espèces</p>
                <p className="text-lg font-medium text-text-primary">
                  {(selectedDateTotal.byMethod['Espèces'] || 0).toFixed(2)} TND
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Cartes</p>
                <p className="text-lg font-medium text-text-primary">
                  {(selectedDateTotal.byMethod['Carte'] || 0).toFixed(2)} TND
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Selector and Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Encaissements - {format(new Date(selectedDate), 'dd MMMM yyyy', { locale: fr })}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Du:</label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-36"
                />
                <label className="text-sm font-medium">Au:</label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-36"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowReports(true)}>
                <BarChart3 className="w-4 h-4 mr-1" />
                Rapport
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button size="sm" onClick={() => setIsAddingReceipt(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Nouvel Encaissement
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Add Receipt Form */}
          {isAddingReceipt && (
            <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-medium mb-4">Saisie Rapide - Nouvel Encaissement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Patient *</label>
                  <Input
                    value={newReceipt.patientName || ''}
                    onChange={(e) => setNewReceipt({...newReceipt, patientName: e.target.value})}
                    placeholder="Nom et prénom"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Montant (TND) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newReceipt.amountReceived || ''}
                    onChange={(e) => setNewReceipt({...newReceipt, amountReceived: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mode de paiement</label>
                  <Select 
                    value={newReceipt.paymentMethod || 'Espèces'} 
                    onValueChange={(value) => setNewReceipt({...newReceipt, paymentMethod: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Espèces">Espèces</SelectItem>
                      <SelectItem value="Carte">Carte</SelectItem>
                      <SelectItem value="Chèque">Chèque</SelectItem>
                      <SelectItem value="Virement">Virement</SelectItem>
                      <SelectItem value="Assurance">Assurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Type de prestation</label>
                  <Select 
                    value={newReceipt.serviceType || 'Consultation'} 
                    onValueChange={(value) => setNewReceipt({...newReceipt, serviceType: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Acte médical">Acte médical</SelectItem>
                      <SelectItem value="Vente produit">Vente produit</SelectItem>
                      <SelectItem value="Vaccination">Vaccination</SelectItem>
                      <SelectItem value="Échographie">Échographie</SelectItem>
                      <SelectItem value="Autres">Autres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Référence facture</label>
                  <Input
                    value={newReceipt.invoiceReference || ''}
                    onChange={(e) => setNewReceipt({...newReceipt, invoiceReference: e.target.value})}
                    placeholder="FACT-2024-XXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Input
                    value={newReceipt.notes || ''}
                    onChange={(e) => setNewReceipt({...newReceipt, notes: e.target.value})}
                    placeholder="Observations..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddingReceipt(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddReceipt}>
                  Enregistrer
                </Button>
              </div>
            </div>
          )}

          {/* Advanced Filters */}
          <div className="mb-6 p-4 border rounded-lg">
            <div className="flex items-center mb-3">
              <Filter className="w-4 h-4 mr-2" />
              <span className="font-medium">Filtres avancés</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Rechercher patient, reçu..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                />
              </div>
              <Select value={filters.paymentMethod} onValueChange={(value) => setFilters({...filters, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Mode de paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Espèces">Espèces</SelectItem>
                  <SelectItem value="Carte">Carte</SelectItem>
                  <SelectItem value="Chèque">Chèque</SelectItem>
                  <SelectItem value="Virement">Virement</SelectItem>
                  <SelectItem value="Assurance">Assurance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.serviceType} onValueChange={(value) => setFilters({...filters, serviceType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de prestation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Acte médical">Acte médical</SelectItem>
                  <SelectItem value="Vente produit">Vente produit</SelectItem>
                  <SelectItem value="Vaccination">Vaccination</SelectItem>
                  <SelectItem value="Échographie">Échographie</SelectItem>
                  <SelectItem value="Autres">Autres</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Confirmé">Confirmé</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Annulé">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Receipts Table */}
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Mode Paiement</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Type Prestation</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id} className="hover:bg-gray-50">
                    <TableCell>
                      {format(new Date(receipt.date), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">{receipt.patientName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getPaymentMethodIcon(receipt.paymentMethod)}
                        <span className="ml-2">{receipt.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      {receipt.amountReceived.toFixed(2)} TND
                    </TableCell>
                    <TableCell>{receipt.serviceType}</TableCell>
                    <TableCell className="text-blue-600">{receipt.invoiceReference}</TableCell>
                    <TableCell className="max-w-32 truncate">{receipt.notes}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(receipt.status)}>
                        {receipt.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditReceipt(receipt)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => setDeletingReceiptId(receipt.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReceipts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-gray-500 py-8">
                      Aucun encaissement trouvé pour les critères sélectionnés
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Receipt Modal */}
      <EditReceiptModal
        receipt={editingReceipt}
        isOpen={!!editingReceipt}
        onClose={() => setEditingReceipt(null)}
        onSave={handleSaveEditedReceipt}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingReceiptId} onOpenChange={() => setDeletingReceiptId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet encaissement ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingReceiptId && handleDeleteReceipt(deletingReceiptId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CashReceiptsView;
