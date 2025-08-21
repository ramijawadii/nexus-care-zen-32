import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download, 
  Send, 
  Printer,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import InvoiceDetailView from '../billing/InvoiceDetailView';

const InvoiceBillingView = () => {
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [invoicesData, setInvoicesData] = useState([
    {
      id: 'FACT-001',
      invoiceNumber: 'FAC-2024-001',
      date: '2024-02-05',
      patient: 'Ahmed Ben Ali',
      services: ['Consultation générale', 'Analyses sanguines'],
      amountHT: 320.00,
      vatAmount: 22.40,
      amountTTC: 342.40,
      paymentMethod: 'Carte',
      status: 'Payé',
      notes: 'Consultation de routine',
      createdFrom: 'Rendez-vous',
      dueDate: '2024-03-05'
    },
    {
      id: 'FACT-002',
      invoiceNumber: 'FAC-2024-002',
      date: '2024-02-04',
      patient: 'Fatma Cherif',
      services: ['Consultation spécialisée', 'Échographie'],
      amountHT: 450.00,
      vatAmount: 31.50,
      amountTTC: 481.50,
      paymentMethod: 'Assurance',
      status: 'Non payé',
      notes: 'Dossier envoyé à l\'assurance',
      createdFrom: 'Manuel',
      dueDate: '2024-03-04'
    },
    {
      id: 'FACT-003',
      invoiceNumber: 'FAC-2024-003',
      date: '2024-02-03',
      patient: 'Mohamed Trabelsi',
      services: ['Suivi médical', 'Prescription'],
      amountHT: 180.00,
      vatAmount: 12.60,
      amountTTC: 192.60,
      paymentMethod: 'Espèces',
      status: 'Partiel',
      notes: 'Acompte reçu 100 TND',
      createdFrom: 'Rendez-vous',
      dueDate: '2024-03-03'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: '',
    createdFrom: ''
  });

  const [filteredData, setFilteredData] = useState(invoicesData);

  React.useEffect(() => {
    let filtered = invoicesData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.patient.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.invoiceNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.services.some(service => service.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      const matchesStatus = filters.status === '' || filters.status === 'all' || item.status === filters.status;
      const matchesPaymentMethod = filters.paymentMethod === '' || filters.paymentMethod === 'all' || item.paymentMethod === filters.paymentMethod;
      const matchesCreatedFrom = filters.createdFrom === '' || filters.createdFrom === 'all' || item.createdFrom === filters.createdFrom;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;

      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesCreatedFrom && 
             matchesDateFrom && matchesDateTo;
    });
    setFilteredData(filtered);
  }, [filters, invoicesData]);

  const handleRowClick = (invoice) => {
    // Convert invoice to the expected format for the detail view
    const invoiceData = {
      id: invoice.id,
      date: invoice.date,
      description: invoice.services.join(', '),
      amount: invoice.amountTTC,
      status: invoice.status === 'Payé' ? 'paid' : invoice.status === 'Partiel' ? 'pending' : 'pending',
      invoice: invoice.invoiceNumber
    };
    setSelectedInvoice(invoiceData);
    setShowInvoiceDetail(true);
  };

  const handleBackToList = () => {
    setShowInvoiceDetail(false);
    setSelectedInvoice(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'bg-green-100 text-green-800';
      case 'Partiel': return 'bg-yellow-100 text-yellow-800';
      case 'Non payé': return 'bg-red-100 text-red-800';
      case 'En attente': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Payé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Partiel': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Non payé': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'En attente': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalAmountTTC = filteredData.reduce((sum, item) => sum + item.amountTTC, 0);
  const paidAmount = filteredData.filter(item => item.status === 'Payé').reduce((sum, item) => sum + item.amountTTC, 0);
  const unpaidAmount = filteredData.filter(item => item.status === 'Non payé').reduce((sum, item) => sum + item.amountTTC, 0);

  if (showInvoiceDetail && selectedInvoice) {
    return (
      <InvoiceDetailView 
        invoice={selectedInvoice}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Facturation</h2>
          <p className="text-text-secondary">Gestion de toutes les factures pour patients et assurances</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Facture
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Factures</p>
                <p className="text-xl font-bold text-text-primary">{filteredData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Montant Total</p>
                <p className="text-xl font-bold text-text-primary">{totalAmountTTC.toFixed(2)} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Payé</p>
                <p className="text-xl font-bold text-text-primary">{paidAmount.toFixed(2)} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">En Attente</p>
                <p className="text-xl font-bold text-text-primary">{unpaidAmount.toFixed(2)} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                placeholder="Rechercher..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Payé">Payé</SelectItem>
                <SelectItem value="Partiel">Partiel</SelectItem>
                <SelectItem value="Non payé">Non payé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.paymentMethod} onValueChange={(value) => setFilters({ ...filters, paymentMethod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Mode de paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Espèces">Espèces</SelectItem>
                <SelectItem value="Carte">Carte</SelectItem>
                <SelectItem value="Virement">Virement</SelectItem>
                <SelectItem value="Assurance">Assurance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.createdFrom} onValueChange={(value) => setFilters({ ...filters, createdFrom: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Créé depuis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Rendez-vous">Rendez-vous</SelectItem>
                <SelectItem value="Manuel">Manuel</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="Date début"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            />

            <Input
              type="date"
              placeholder="Date fin"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Factures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((invoice) => (
              <div 
                key={invoice.id} 
                className="flex items-center justify-between p-4 border border-border-primary rounded-lg hover:bg-hover-surface cursor-pointer transition-colors"
                onClick={() => handleRowClick(invoice)}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {getStatusIcon(invoice.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{invoice.invoiceNumber}</h4>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                      <Badge variant="outline">
                        {invoice.createdFrom}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">
                          <User className="w-3 h-3 inline mr-1" />
                          {invoice.patient}
                        </p>
                        <p className="text-text-secondary">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {invoice.date}
                        </p>
                        <p className="text-text-muted">
                          Échéance: {invoice.dueDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">
                          Services: {invoice.services.join(', ')}
                        </p>
                        <p className="text-text-muted">
                          Mode: {invoice.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-text-subtle mt-2">{invoice.notes}</p>
                  </div>
                </div>
                
                <div className="text-right mr-6">
                  <p className="font-semibold text-text-primary">
                    {invoice.amountTTC.toFixed(2)} TND
                  </p>
                  <p className="text-sm text-text-secondary">
                    HT: {invoice.amountHT.toFixed(2)} TND
                  </p>
                  <p className="text-sm text-text-muted">
                    TVA: {invoice.vatAmount.toFixed(2)} TND
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
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Création Automatique</h3>
            <p className="text-sm text-text-secondary mb-4">
              Génération depuis rendez-vous terminés
            </p>
            <Button variant="outline" size="sm">Configurer</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Send className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Envoi Automatique</h3>
            <p className="text-sm text-text-secondary mb-4">
              Email/SMS de factures automatiques
            </p>
            <Button variant="outline" size="sm">Paramétrer</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Liaison Comptable</h3>
            <p className="text-sm text-text-secondary mb-4">
              Synchronisation avec encaissements
            </p>
            <Button variant="outline" size="sm">Synchroniser</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceBillingView;
