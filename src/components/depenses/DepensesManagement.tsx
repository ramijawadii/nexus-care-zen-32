
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EditExpenseModal from './EditExpenseModal';
import DepensesReports from './DepensesReports';
import DepenseContextMenu from './DepenseContextMenu';
import { 
  TrendingDown, 
  AlertTriangle, 
  Building, 
  Stethoscope, 
  Package, 
  Users, 
  Shield, 
  Plus,
  Download,
  Filter,
  Search,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  AlertCircle
} from 'lucide-react';

const DepensesManagement = () => {
  console.log('DepensesManagement component rendering');

  const [showReports, setShowReports] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Sample expense data
  const [expensesData, setExpensesData] = useState([
    {
      id: 'DEP-001',
      date: '2024-02-08',
      supplier: 'MedSupply Tunisie',
      category: 'Matériel médical',
      amount: 1250.00,
      paymentMethod: 'Virement',
      receipt: 'MS-2024-001.pdf',
      status: 'Payé',
      notes: 'Équipement stérilisation nouvelle génération',
      budgetCategory: 'Équipement'
    },
    {
      id: 'DEP-002',
      date: '2024-02-07',
      supplier: 'STEG',
      category: 'Loyer',
      amount: 850.00,
      paymentMethod: 'Prélèvement',
      receipt: 'STEG-FEB-2024.pdf',
      status: 'Payé',
      notes: 'Facture électricité février',
      budgetCategory: 'Charges fixes'
    },
    {
      id: 'DEP-003',
      date: '2024-02-06',
      supplier: 'PharmaTech Solutions',
      category: 'Fournitures',
      amount: 680.00,
      paymentMethod: 'Carte',
      receipt: 'PTS-2024-045.pdf',
      status: 'En attente',
      notes: 'Consommables pour analyses',
      budgetCategory: 'Fournitures'
    },
    {
      id: 'DEP-004',
      date: '2024-02-05',
      supplier: 'Cabinet Comptable Sfax',
      category: 'Divers',
      amount: 420.00,
      paymentMethod: 'Chèque',
      receipt: 'CCS-2024-012.pdf',
      status: 'Payé',
      notes: 'Honoraires comptable mensuel',
      budgetCategory: 'Services'
    },
    {
      id: 'DEP-005',
      date: '2024-02-04',
      supplier: 'Assurance Médicale Plus',
      category: 'Assurance',
      amount: 1100.00,
      paymentMethod: 'Virement',
      receipt: 'AMP-2024-Q1.pdf',
      status: 'Payé',
      notes: 'Prime assurance responsabilité civile T1',
      budgetCategory: 'Assurances'
    }
  ]);

  // Budget data for comparison
  const budgetData = [
    { category: 'Équipement', budget: 5000, spent: 1250, color: '#3b82f6' },
    { category: 'Charges fixes', budget: 2000, spent: 850, color: '#10b981' },
    { category: 'Fournitures', budget: 1500, spent: 680, color: '#f59e0b' },
    { category: 'Services', budget: 800, spent: 420, color: '#8b5cf6' },
    { category: 'Assurances', budget: 1200, spent: 1100, color: '#ef4444' },
    { category: 'Salaires', budget: 8000, spent: 0, color: '#06b6d4' }
  ];

  // Filters state
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    paymentMethod: 'all',
    status: 'all',
    supplier: 'all',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleSaveExpense = (updatedExpense) => {
    setExpensesData(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const handleDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (expenseToDelete) {
      setExpensesData(prev => 
        prev.filter(expense => expense.id !== expenseToDelete.id)
      );
      setDeleteConfirmOpen(false);
      setExpenseToDelete(null);
    }
  };

  // Filtered data
  const filteredExpenses = useMemo(() => {
    return expensesData.filter(expense => {
      const matchesSearch = filters.searchTerm === '' || 
        expense.supplier.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        expense.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || expense.category === filters.category;
      const matchesPaymentMethod = filters.paymentMethod === 'all' || expense.paymentMethod === filters.paymentMethod;
      const matchesStatus = filters.status === 'all' || expense.status === filters.status;
      const matchesSupplier = filters.supplier === 'all' || expense.supplier === filters.supplier;
      
      const matchesDateFrom = filters.dateFrom === '' || expense.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || expense.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || expense.amount >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || expense.amount <= parseFloat(filters.amountMax);

      return matchesSearch && matchesCategory && matchesPaymentMethod && matchesStatus && 
             matchesSupplier && matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
  }, [filters, expensesData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Matériel médical': return Stethoscope;
      case 'Loyer': return Building;
      case 'Fournitures': return Package;
      case 'Salaires': return Users;
      case 'Assurance': return Shield;
      default: return FileText;
    }
  };

  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);

  if (showReports) {
    return <DepensesReports onBack={() => setShowReports(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Dépenses Totales</p>
                <p className="text-xl font-bold text-text-primary">{totalSpent.toLocaleString()} TND</p>
                <p className="text-sm text-red-600">Ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Alertes Budget</p>
                <p className="text-xl font-bold text-text-primary">2</p>
                <p className="text-sm text-orange-600">Dépassements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Factures</p>
                <p className="text-xl font-bold text-text-primary">{filteredExpenses.length}</p>
                <p className="text-sm text-purple-600">Ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">En Attente</p>
                <p className="text-xl font-bold text-text-primary">
                  {filteredExpenses.filter(e => e.status === 'En attente').length}
                </p>
                <p className="text-sm text-blue-600">À traiter</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtres de Recherche
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowReports(true)}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Rapports
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="Matériel médical">Matériel médical</SelectItem>
                <SelectItem value="Loyer">Loyer</SelectItem>
                <SelectItem value="Fournitures">Fournitures</SelectItem>
                <SelectItem value="Salaires">Salaires</SelectItem>
                <SelectItem value="Assurance">Assurance</SelectItem>
                <SelectItem value="Divers">Divers</SelectItem>
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
                <SelectItem value="Chèque">Chèque</SelectItem>
                <SelectItem value="Prélèvement">Prélèvement</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Payé">Payé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Annulé">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1 block">Du</label>
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1 block">Au</label>
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Montant min"
                value={filters.amountMin}
                onChange={(e) => setFilters({ ...filters, amountMin: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Montant max"
                value={filters.amountMax}
                onChange={(e) => setFilters({ ...filters, amountMax: e.target.value })}
              />
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => setFilters({
                  searchTerm: '',
                  category: 'all',
                  paymentMethod: 'all',
                  status: 'all',
                  supplier: 'all',
                  dateFrom: '',
                  dateTo: '',
                  amountMin: '',
                  amountMax: ''
                })}
                className="w-full"
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Liste des Dépenses ({filteredExpenses.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button size="sm" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Dépense
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-background/50 rounded-lg border border-border-primary/10">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-elevated/50 hover:bg-surface-elevated/70">
                  <TableHead className="font-semibold text-text-primary">Date</TableHead>
                  <TableHead className="font-semibold text-text-primary">Fournisseur</TableHead>
                  <TableHead className="font-semibold text-text-primary">Catégorie</TableHead>
                  <TableHead className="font-semibold text-text-primary">Montant</TableHead>
                  <TableHead className="font-semibold text-text-primary">Mode de paiement</TableHead>
                  <TableHead className="font-semibold text-text-primary">Statut</TableHead>
                  <TableHead className="font-semibold text-text-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => {
                  const CategoryIcon = getCategoryIcon(expense.category);
                  return (
                    <DepenseContextMenu
                      key={expense.id}
                      expense={expense}
                      onView={() => console.log('View:', expense.id)}
                      onEdit={() => handleEditExpense(expense)}
                      onDelete={() => handleDeleteExpense(expense)}
                      onDuplicate={() => console.log('Duplicate:', expense.id)}
                      onMarkPaid={() => console.log('Mark paid:', expense.id)}
                      onMarkPending={() => console.log('Mark pending:', expense.id)}
                      onDownloadReceipt={() => console.log('Download receipt:', expense.id)}
                    >
                      <TableRow className="hover:bg-surface-elevated/30 transition-colors cursor-pointer">
                        <TableCell className="font-medium py-3">{expense.date}</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{expense.supplier}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">{expense.category}</TableCell>
                        <TableCell className="font-semibold py-3">{expense.amount.toLocaleString()} TND</TableCell>
                        <TableCell className="py-3">{expense.paymentMethod}</TableCell>
                        <TableCell className="py-3">
                          <Badge className={getStatusColor(expense.status)}>
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="hover:bg-surface-elevated">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-surface-elevated"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditExpense(expense);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteExpense(expense);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </DepenseContextMenu>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <EditExpenseModal
        expense={editingExpense}
        open={!!editingExpense}
        onClose={() => setEditingExpense(null)}
        onSave={handleSaveExpense}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Confirmer la Suppression
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-text-secondary">
              Êtes-vous sûr de vouloir supprimer cette dépense ? Cette action est irréversible.
            </p>
            {expenseToDelete && (
              <div className="p-3 bg-surface-elevated border border-border-primary rounded-lg">
                <p className="font-medium">{expenseToDelete.supplier}</p>
                <p className="text-sm text-text-secondary">
                  {expenseToDelete.category} • {expenseToDelete.amount.toLocaleString()} TND
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Supprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepensesManagement;
