import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Download, 
  DollarSign,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Calendar,
  User,
  FileText,
  BarChart3,
  Building
} from 'lucide-react';
import ExpensesPurchases from '../finance/ExpensesPurchases';
import DepensesReports from './DepensesReports';
import EditExpenseModal from './EditExpenseModal';
import DepenseContextMenu from './DepenseContextMenu';
import InvoiceDetailView from '../billing/InvoiceDetailView';

const DepensesManagement = () => {
  const [activeTab, setActiveTab] = useState('management');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [expensesData, setExpensesData] = useState([
    {
      id: 'DEP-001',
      date: '2024-02-05',
      description: 'Fournitures médicales - Gants et masques',
      amount: 450.00,
      status: 'Payé',
      supplier: 'MedSupply Co.',
      category: 'Fournitures médicales',
      invoice: 'FOURNISSEUR-001',
      paymentMethod: 'Virement',
      recurring: false
    },
    {
      id: 'DEP-002',
      date: '2024-02-04',
      description: 'Facture électricité mensuelle',
      amount: 280.00,
      status: 'En attente',
      supplier: 'Compagnie d\'électricité',
      category: 'Utilities',
      invoice: 'ELEC-001',
      paymentMethod: 'Prélèvement',
      recurring: true
    },
    {
      id: 'DEP-003',
      date: '2024-02-03',
      description: 'Tensiomètre digital',
      amount: 850.00,
      status: 'Payé',
      supplier: 'MedTech Solutions',
      category: 'Équipement',
      invoice: 'EQUIP-001',
      paymentMethod: 'Carte',
      recurring: false
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    category: '',
    supplier: '',
    dateFrom: '',
    dateTo: ''
  });

  const [filteredData, setFilteredData] = useState(expensesData);

  React.useEffect(() => {
    let filtered = expensesData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.invoice.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === '' || filters.status === 'all' || item.status === filters.status;
      const matchesCategory = filters.category === '' || filters.category === 'all' || item.category === filters.category;
      const matchesSupplier = filters.supplier === '' || filters.supplier === 'all' || item.supplier === filters.supplier;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;

      return matchesSearch && matchesStatus && matchesCategory && matchesSupplier && 
             matchesDateFrom && matchesDateTo;
    });
    setFilteredData(filtered);
  }, [filters, expensesData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Refusé': return 'bg-red-100 text-red-800';
      case 'Annulé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Payé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En attente': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Refusé': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Annulé': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleRowClick = (expense) => {
    // Convert expense to invoice format for the detail view
    const invoiceData = {
      id: expense.id,
      date: expense.date,
      description: expense.description,
      amount: expense.amount,
      status: expense.status === 'Payé' ? 'paid' : expense.status === 'En attente' ? 'pending' : 'failed',
      invoice: expense.invoice
    };
    setSelectedInvoice(invoiceData);
    setShowInvoiceDetail(true);
  };

  const handleBackToList = () => {
    setShowInvoiceDetail(false);
    setSelectedInvoice(null);
  };

  const totalPaid = filteredData.filter(item => item.status === 'Payé').reduce((sum, item) => sum + item.amount, 0);
  const totalPending = filteredData.filter(item => item.status === 'En attente').reduce((sum, item) => sum + item.amount, 0);
  const totalRejected = filteredData.filter(item => item.status === 'Refusé').reduce((sum, item) => sum + item.amount, 0);
  const recurringTotal = filteredData.filter(item => item.recurring).reduce((sum, item) => sum + item.amount, 0);

  if (activeTab === 'purchases') {
    return <ExpensesPurchases />;
  }

  if (activeTab === 'reports') {
    return <DepensesReports onBack={() => setActiveTab('management')} />;
  }

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
          <h2 className="text-2xl font-semibold text-text-primary">Gestion des Dépenses</h2>
          <p className="text-text-secondary">Suivi des dépenses et factures fournisseurs</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setActiveTab('reports')}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Rapports
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Dépense
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="management">Gestion Dépenses</TabsTrigger>
          <TabsTrigger value="purchases">Achats & Commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="management" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">Total Dépenses</p>
                    <p className="text-xl font-bold text-text-primary">{totalPaid.toFixed(2)} TND</p>
                    <p className="text-sm text-red-600">Ce mois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">En Attente</p>
                    <p className="text-xl font-bold text-text-primary">{totalPending.toFixed(2)} TND</p>
                    <p className="text-sm text-yellow-600">À payer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">Refusées</p>
                    <p className="text-xl font-bold text-text-primary">{totalRejected.toFixed(2)} TND</p>
                    <p className="text-sm text-red-600">À traiter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">Récurrentes</p>
                    <p className="text-xl font-bold text-text-primary">{recurringTotal.toFixed(2)} TND</p>
                    <p className="text-sm text-blue-600">Mensuel</p>
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
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="Refusé">Refusé</SelectItem>
                    <SelectItem value="Annulé">Annulé</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    <SelectItem value="Fournitures médicales">Fournitures médicales</SelectItem>
                    <SelectItem value="Équipement">Équipement</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Formation">Formation</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.supplier} onValueChange={(value) => setFilters({ ...filters, supplier: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous fournisseurs</SelectItem>
                    <SelectItem value="MedSupply Co.">MedSupply Co.</SelectItem>
                    <SelectItem value="MedTech Solutions">MedTech Solutions</SelectItem>
                    <SelectItem value="Compagnie d'électricité">Compagnie d'électricité</SelectItem>
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

          {/* Expenses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.map((expense) => (
                  <DepenseContextMenu
                    key={expense.id}
                    expense={expense}
                    onView={() => handleRowClick(expense)}
                    onEdit={() => {
                      setSelectedExpense(expense);
                      setShowEditModal(true);
                    }}
                    onDelete={() => {
                      setExpensesData(prev => prev.filter(e => e.id !== expense.id));
                    }}
                    onDuplicate={() => {
                      const newExpense = { 
                        ...expense, 
                        id: 'DEP-' + String(Date.now()).slice(-3),
                        date: new Date().toISOString().split('T')[0]
                      };
                      setExpensesData(prev => [newExpense, ...prev]);
                    }}
                    onMarkPaid={() => {
                      setExpensesData(prev => 
                        prev.map(e => e.id === expense.id ? { ...e, status: 'Payé' } : e)
                      );
                    }}
                    onMarkPending={() => {
                      setExpensesData(prev => 
                        prev.map(e => e.id === expense.id ? { ...e, status: 'En attente' } : e)
                      );
                    }}
                    onDownloadReceipt={() => {
                      console.log('Downloading receipt for', expense.invoice);
                    }}
                  >
                    <div 
                      className="flex items-center justify-between p-4 border border-border-primary rounded-lg hover:bg-hover-surface cursor-pointer transition-colors"
                      onClick={() => handleRowClick(expense)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          {getStatusIcon(expense.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-text-primary">{expense.id}</h4>
                            <Badge className={getStatusColor(expense.status)}>
                              {expense.status}
                            </Badge>
                            {expense.recurring && (
                              <Badge variant="outline">Récurrente</Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-text-secondary">
                                <Building className="w-3 h-3 inline mr-1" />
                                {expense.supplier}
                              </p>
                              <p className="text-text-secondary">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {expense.date}
                              </p>
                            </div>
                            <div>
                              <p className="text-text-secondary">
                                <FileText className="w-3 h-3 inline mr-1" />
                                {expense.invoice}
                              </p>
                              <p className="text-text-secondary">
                                <CreditCard className="w-3 h-3 inline mr-1" />
                                {expense.paymentMethod}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-text-muted mt-1">{expense.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right mr-6">
                        <p className="font-semibold text-lg text-text-primary">
                          {expense.amount.toFixed(2)} TND
                        </p>
                        <p className="text-sm text-text-secondary">{expense.category}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </DepenseContextMenu>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showEditModal && selectedExpense && (
        <EditExpenseModal
          expense={selectedExpense}
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedExpense(null);
          }}
          onSave={(updatedExpense) => {
            setExpensesData(prev => 
              prev.map(e => e.id === updatedExpense.id ? updatedExpense : e)
            );
            setShowEditModal(false);
            setSelectedExpense(null);
          }}
        />
      )}
    </div>
  );
};

export default DepensesManagement;
