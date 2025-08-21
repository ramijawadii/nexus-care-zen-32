import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Eye,
  Edit,
  Trash2,
  Download,
  Search,
  Plus,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface TaxTransaction {
  id: number;
  date: string;
  type: string;
  description: string;
  amount: number;
  taxAmount: number;
  taxRate: number;
  category: string;
  status: string;
  reference?: string;
}

interface TaxTransactionsTableProps {
  transactions: TaxTransaction[];
  onAddTransaction: () => void;
  onEditTransaction: (transaction: TaxTransaction) => void;
  onDeleteTransaction: (transactionId: number) => void;
}

const TaxTransactionsTable: React.FC<TaxTransactionsTableProps> = ({
  transactions,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction
}) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  React.useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.category === categoryFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date(today);
      
      switch (dateFilter) {
        case 'this_month':
          filterDate.setMonth(today.getMonth());
          filtered = filtered.filter(transaction => 
            new Date(transaction.date).getMonth() === filterDate.getMonth() &&
            new Date(transaction.date).getFullYear() === filterDate.getFullYear()
          );
          break;
        case 'last_month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(transaction => 
            new Date(transaction.date).getMonth() === filterDate.getMonth() &&
            new Date(transaction.date).getFullYear() === filterDate.getFullYear()
          );
          break;
        case 'this_year':
          filtered = filtered.filter(transaction => 
            new Date(transaction.date).getFullYear() === today.getFullYear()
          );
          break;
      }
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, categoryFilter, typeFilter, dateFilter]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'income': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'deductible': 'bg-blue-100 text-blue-800 border-blue-200',
      'payment': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'recorded': 'bg-amber-100 text-amber-800 border-amber-200',
      'processed': 'bg-blue-100 text-blue-800 border-blue-200',
      'verified': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} DT`;
  };

  const calculateSummary = () => {
    const totalCollected = filteredTransactions
      .filter(t => t.category === 'income')
      .reduce((sum, t) => sum + t.taxAmount, 0);
    
    const totalDeductible = filteredTransactions
      .filter(t => t.category === 'deductible')
      .reduce((sum, t) => sum + t.taxAmount, 0);
    
    const netTax = totalCollected - totalDeductible;
    
    return { totalCollected, totalDeductible, netTax };
  };

  const summary = calculateSummary();
  const uniqueTypes = [...new Set(transactions.map(t => t.type))];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">TVA Collectée</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {formatCurrency(summary.totalCollected)}
                </p>
                <p className="text-xs text-emerald-600">Sur les ventes</p>
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
                  {formatCurrency(summary.totalDeductible)}
                </p>
                <p className="text-xs text-blue-600">Sur les achats</p>
              </div>
              <TrendingDown className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">TVA Nette</p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatCurrency(summary.netTax)}
                </p>
                <p className="text-xs text-purple-600">À reverser</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transactions TVA</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button size="sm" onClick={onAddTransaction}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Transaction
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="income">Revenus</SelectItem>
                <SelectItem value="deductible">Déductible</SelectItem>
                <SelectItem value="payment">Paiements</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes périodes</SelectItem>
                <SelectItem value="this_month">Ce mois</SelectItem>
                <SelectItem value="last_month">Mois dernier</SelectItem>
                <SelectItem value="this_year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Montant HT</TableHead>
                  <TableHead>Taux</TableHead>
                  <TableHead>TVA</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="outline">{transaction.type}</Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{transaction.description}</p>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getCategoryColor(transaction.category)}>
                        {transaction.category === 'income' ? 'Revenus' :
                         transaction.category === 'deductible' ? 'Déductible' : 'Paiement'}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    
                    <TableCell>{transaction.taxRate}%</TableCell>
                    
                    <TableCell className="font-semibold">
                      <span className={transaction.category === 'income' ? 'text-emerald-600' : 'text-blue-600'}>
                        {transaction.category === 'income' ? '+' : '-'}{formatCurrency(transaction.taxAmount)}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status === 'recorded' ? 'Enregistré' :
                         transaction.status === 'processed' ? 'Traité' :
                         transaction.status === 'verified' ? 'Vérifié' : transaction.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      {transaction.reference && (
                        <span className="font-mono text-xs text-muted-foreground">
                          {transaction.reference}
                        </span>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onEditTransaction(transaction)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => onDeleteTransaction(transaction.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucune transaction trouvée</h3>
              <p className="text-muted-foreground mb-4">
                Aucune transaction ne correspond aux critères de filtrage sélectionnés.
              </p>
              <Button onClick={onAddTransaction}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une transaction
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxTransactionsTable;