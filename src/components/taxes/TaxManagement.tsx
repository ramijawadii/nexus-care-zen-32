
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator,
  FileText,
  Plus,
  Search,
  Download,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  Building,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  DollarSign
} from 'lucide-react';

const TaxManagement = () => {
  const [taxObligations, setTaxObligations] = useState([
    {
      id: 1,
      type: 'TVA',
      period: '2024-03',
      description: 'TVA Mensuelle Mars 2024',
      dueDate: '2024-04-20',
      baseAmount: 12500.00,
      taxAmount: 2375.00,
      status: 'À déclarer',
      priority: 'high',
      notes: 'Déclaration mensuelle obligatoire'
    },
    {
      id: 2,
      type: 'IRPP',
      period: '2023',
      description: 'Impôt sur le Revenu des Personnes Physiques 2023',
      dueDate: '2024-05-31',
      baseAmount: 85000.00,
      taxAmount: 12750.00,
      status: 'En cours',
      priority: 'medium',
      notes: 'Déclaration annuelle avec déductions professionnelles'
    },
    {
      id: 3,
      type: 'TFP',
      period: '2024',
      description: 'Taxe de Formation Professionnelle',
      dueDate: '2024-03-31',
      baseAmount: 8500.00,
      taxAmount: 170.00,
      status: 'Payé',
      priority: 'low',
      notes: 'Taxe basée sur la masse salariale'
    },
    {
      id: 4,
      type: 'CNSS',
      period: '2024-03',
      description: 'Cotisations Sociales Mars 2024',
      dueDate: '2024-04-15',
      baseAmount: 3200.00,
      taxAmount: 1088.00,
      status: 'À payer',
      priority: 'high',
      notes: 'Cotisations employeur et employé'
    }
  ]);

  const [taxTransactions, setTaxTransactions] = useState([
    {
      id: 1,
      date: '2024-03-15',
      type: 'TVA',
      description: 'Consultations et actes médicaux',
      revenue: 8500.00,
      taxCollected: 1615.00,
      taxRate: 19,
      category: 'Revenus'
    },
    {
      id: 2,
      date: '2024-03-14',
      type: 'TVA',
      description: 'Achat équipement médical',
      expense: 2500.00,
      taxDeductible: 475.00,
      taxRate: 19,
      category: 'Dépenses déductibles'
    },
    {
      id: 3,
      date: '2024-03-13',
      type: 'TVA',
      description: 'Frais de pharmacie',
      expense: 850.00,
      taxDeductible: 161.50,
      taxRate: 19,
      category: 'Dépenses déductibles'
    }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: '',
    type: 'TVA',
    description: '',
    amount: '',
    taxRate: '19',
    category: 'Revenus'
  });

  const [newObligation, setNewObligation] = useState({
    type: 'TVA',
    period: '',
    description: '',
    dueDate: '',
    baseAmount: '',
    notes: ''
  });

  const calculateTaxAmount = (amount: number, rate: number) => {
    return (amount * rate) / 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'bg-green-100 text-green-800';
      case 'À payer': return 'bg-red-100 text-red-800';
      case 'À déclarer': return 'bg-orange-100 text-orange-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En retard': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Payé': return <CheckCircle className="w-4 h-4" />;
      case 'À payer': return <CreditCard className="w-4 h-4" />;
      case 'À déclarer': return <FileText className="w-4 h-4" />;
      case 'En cours': return <Clock className="w-4 h-4" />;
      case 'En retard': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Tax calculations
  const totalTaxCollected = taxTransactions
    .filter(t => t.category === 'Revenus')
    .reduce((sum, t) => sum + (t.taxCollected || 0), 0);
  
  const totalTaxDeductible = taxTransactions
    .filter(t => t.category === 'Dépenses déductibles')
    .reduce((sum, t) => sum + (t.taxDeductible || 0), 0);
  
  const netTaxToPay = totalTaxCollected - totalTaxDeductible;
  
  const overdueTaxes = taxObligations.filter(o => 
    getDaysUntilDue(o.dueDate) < 0 && o.status !== 'Payé'
  );
  
  const upcomingTaxes = taxObligations.filter(o => 
    getDaysUntilDue(o.dueDate) <= 30 && getDaysUntilDue(o.dueDate) >= 0 && o.status !== 'Payé'
  );

  const handleAddTransaction = () => {
    if (newTransaction.date && newTransaction.amount && newTransaction.description) {
      const amount = parseFloat(newTransaction.amount);
      const taxRate = parseFloat(newTransaction.taxRate);
      const calculatedTax = calculateTaxAmount(amount, taxRate);
      
      const transaction = {
        id: taxTransactions.length + 1,
        date: newTransaction.date,
        type: newTransaction.type,
        description: newTransaction.description,
        taxRate,
        category: newTransaction.category,
        ...(newTransaction.category === 'Revenus' ? {
          revenue: amount,
          taxCollected: calculatedTax
        } : {
          expense: amount,
          taxDeductible: calculatedTax
        })
      };
      
      setTaxTransactions([...taxTransactions, transaction]);
      setNewTransaction({
        date: '',
        type: 'TVA',
        description: '',
        amount: '',
        taxRate: '19',
        category: 'Revenus'
      });
    }
  };

  const handleAddObligation = () => {
    if (newObligation.type && newObligation.period && newObligation.dueDate && newObligation.baseAmount) {
      const baseAmount = parseFloat(newObligation.baseAmount);
      let taxAmount = 0;
      
      // Calculate tax based on type
      switch (newObligation.type) {
        case 'TVA':
          taxAmount = calculateTaxAmount(baseAmount, 19);
          break;
        case 'IRPP':
          taxAmount = calculateTaxAmount(baseAmount, 15); // Simplified rate
          break;
        case 'TFP':
          taxAmount = calculateTaxAmount(baseAmount, 2);
          break;
        case 'CNSS':
          taxAmount = calculateTaxAmount(baseAmount, 34); // Total employer + employee
          break;
        default:
          taxAmount = 0;
      }
      
      const obligation = {
        id: taxObligations.length + 1,
        type: newObligation.type,
        period: newObligation.period,
        description: newObligation.description,
        dueDate: newObligation.dueDate,
        baseAmount,
        taxAmount,
        status: 'À déclarer',
        priority: getDaysUntilDue(newObligation.dueDate) <= 15 ? 'high' : 'medium',
        notes: newObligation.notes
      };
      
      setTaxObligations([...taxObligations, obligation]);
      setNewObligation({
        type: 'TVA',
        period: '',
        description: '',
        dueDate: '',
        baseAmount: '',
        notes: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Gestion Fiscale Cabinet Médical</h2>
          <p className="text-text-secondary">Suivi des obligations fiscales et déclarations</p>
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">TVA Nette à Payer</p>
                <p className="text-2xl font-bold text-text-primary">
                  {netTaxToPay.toFixed(2)} TND
                </p>
                <p className="text-sm text-green-600">Ce mois</p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Obligations en Retard</p>
                <p className="text-2xl font-bold text-red-600">
                  {overdueTaxes.length}
                </p>
                <p className="text-sm text-red-600">Urgent</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">À venir (30j)</p>
                <p className="text-2xl font-bold text-orange-600">
                  {upcomingTaxes.length}
                </p>
                <p className="text-sm text-orange-600">Prochainement</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">TVA Collectée</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalTaxCollected.toFixed(2)} TND
                </p>
                <p className="text-sm text-green-600">Ce mois</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="obligations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="obligations">Obligations Fiscales</TabsTrigger>
          <TabsTrigger value="transactions">Transactions TVA</TabsTrigger>
          <TabsTrigger value="add-transaction">Ajouter Transaction</TabsTrigger>
          <TabsTrigger value="add-obligation">Nouvelle Obligation</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="obligations">
          <Card>
            <CardHeader>
              <CardTitle>Obligations Fiscales du Cabinet</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead>Base</TableHead>
                    <TableHead>Montant Taxe</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxObligations.map((obligation) => {
                    const daysUntilDue = getDaysUntilDue(obligation.dueDate);
                    return (
                      <TableRow key={obligation.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(obligation.priority)}`}></div>
                            <Badge variant="outline">{obligation.type}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{obligation.period}</TableCell>
                        <TableCell>{obligation.description}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{obligation.dueDate}</div>
                            <div className={`text-xs ${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 7 ? 'text-orange-600' : 'text-gray-500'}`}>
                              {daysUntilDue < 0 ? `En retard de ${Math.abs(daysUntilDue)} jours` : 
                               daysUntilDue === 0 ? 'Aujourd\'hui' :
                               `Dans ${daysUntilDue} jours`}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{obligation.baseAmount.toLocaleString()} TND</TableCell>
                        <TableCell className="font-semibold">{obligation.taxAmount.toLocaleString()} TND</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(obligation.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(obligation.status)}
                              <span>{obligation.status}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {obligation.status === 'À payer' && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CreditCard className="w-4 h-4 mr-1" />
                                Payer
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions TVA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">TVA Collectée</p>
                    <p className="text-xl font-bold text-green-600">{totalTaxCollected.toFixed(2)} TND</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">TVA Déductible</p>
                    <p className="text-xl font-bold text-blue-600">{totalTaxDeductible.toFixed(2)} TND</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">TVA Nette</p>
                    <p className="text-xl font-bold text-purple-600">{netTaxToPay.toFixed(2)} TND</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Taux</TableHead>
                      <TableHead>TVA</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.type}</Badge>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Badge className={transaction.category === 'Revenus' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.revenue ? `${transaction.revenue.toLocaleString()} TND` : 
                           transaction.expense ? `${transaction.expense.toLocaleString()} TND` : ''}
                        </TableCell>
                        <TableCell>{transaction.taxRate}%</TableCell>
                        <TableCell className="font-semibold">
                          {transaction.taxCollected ? `+${transaction.taxCollected.toFixed(2)} TND` : 
                           transaction.taxDeductible ? `-${transaction.taxDeductible.toFixed(2)} TND` : ''}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-transaction">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une Transaction TVA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">Date de Transaction</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Type de Taxe</Label>
                    <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TVA">TVA</SelectItem>
                        <SelectItem value="Retenue à la source">Retenue à la source</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Revenus">Revenus (Consultations, Actes)</SelectItem>
                        <SelectItem value="Dépenses déductibles">Dépenses déductibles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      placeholder="Ex: Consultations généralistes mars"
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">Montant HT (TND)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxRate">Taux de TVA (%)</Label>
                    <Select value={newTransaction.taxRate} onValueChange={(value) => setNewTransaction({...newTransaction, taxRate: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="19">19% (Taux normal)</SelectItem>
                        <SelectItem value="13">13% (Taux réduit)</SelectItem>
                        <SelectItem value="7">7% (Taux super réduit)</SelectItem>
                        <SelectItem value="0">0% (Exonéré)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newTransaction.amount && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Montant HT:</span>
                          <span className="font-medium">{parseFloat(newTransaction.amount || '0').toFixed(2)} TND</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TVA ({newTransaction.taxRate}%):</span>
                          <span className="font-medium">
                            {calculateTaxAmount(parseFloat(newTransaction.amount || '0'), parseFloat(newTransaction.taxRate)).toFixed(2)} TND
                          </span>
                        </div>
                        <div className="flex justify-between font-bold border-t pt-2">
                          <span>Montant TTC:</span>
                          <span>
                            {(parseFloat(newTransaction.amount || '0') + 
                              calculateTaxAmount(parseFloat(newTransaction.amount || '0'), parseFloat(newTransaction.taxRate))
                            ).toFixed(2)} TND
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Button onClick={handleAddTransaction} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter la Transaction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-obligation">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une Obligation Fiscale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="obligationType">Type d'Obligation</Label>
                    <Select value={newObligation.type} onValueChange={(value) => setNewObligation({...newObligation, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TVA">TVA</SelectItem>
                        <SelectItem value="IRPP">IRPP (Impôt sur le Revenu)</SelectItem>
                        <SelectItem value="TFP">TFP (Taxe Formation Professionnelle)</SelectItem>
                        <SelectItem value="CNSS">CNSS (Cotisations Sociales)</SelectItem>
                        <SelectItem value="FOPROLOS">FOPROLOS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="period">Période</Label>
                    <Input
                      id="period"
                      value={newObligation.period}
                      onChange={(e) => setNewObligation({...newObligation, period: e.target.value})}
                      placeholder="Ex: 2024-03 ou 2024"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dueDate">Date d'Échéance</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newObligation.dueDate}
                      onChange={(e) => setNewObligation({...newObligation, dueDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newObligation.description}
                      onChange={(e) => setNewObligation({...newObligation, description: e.target.value})}
                      placeholder="Ex: TVA Mensuelle Mars 2024"
                    />
                  </div>

                  <div>
                    <Label htmlFor="baseAmount">Base de Calcul (TND)</Label>
                    <Input
                      id="baseAmount"
                      type="number"
                      step="0.01"
                      value={newObligation.baseAmount}
                      onChange={(e) => setNewObligation({...newObligation, baseAmount: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newObligation.notes}
                      onChange={(e) => setNewObligation({...newObligation, notes: e.target.value})}
                      placeholder="Informations complémentaires..."
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Button onClick={handleAddObligation} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer l'Obligation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Rapports et Déclarations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Déclaration TVA Mensuelle</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    TVA nette à reverser: {netTaxToPay.toFixed(2)} TND
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Générer PDF
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Récapitulatif Annuel</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Synthèse fiscale pour expert-comptable
                  </p>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Calendrier Fiscal</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Planning des échéances à venir
                  </p>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Voir Calendrier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxManagement;
