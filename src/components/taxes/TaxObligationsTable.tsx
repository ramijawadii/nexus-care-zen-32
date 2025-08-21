import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Eye,
  Edit,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Search,
  Calendar,
  DollarSign
} from 'lucide-react';

interface TaxObligation {
  id: number;
  type: string;
  period: string;
  description: string;
  dueDate: string;
  baseAmount: number;
  taxAmount: number;
  status: string;
  priority: string;
  paidAmount?: number;
  remainingAmount?: number;
  paymentMethod?: string;
  notes?: string;
}

interface TaxObligationsTableProps {
  obligations: TaxObligation[];
  onPayment: (obligationId: number, amount: number, method: string) => void;
  onStatusChange: (obligationId: number, status: string) => void;
}

const TaxObligationsTable: React.FC<TaxObligationsTableProps> = ({
  obligations,
  onPayment,
  onStatusChange
}) => {
  const [filteredObligations, setFilteredObligations] = useState(obligations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedObligation, setSelectedObligation] = useState<TaxObligation | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  React.useEffect(() => {
    let filtered = obligations;

    if (searchTerm) {
      filtered = filtered.filter(obligation =>
        obligation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obligation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obligation.period.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(obligation => obligation.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(obligation => obligation.type === typeFilter);
    }

    setFilteredObligations(filtered);
  }, [obligations, searchTerm, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    const colors = {
      'paid': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'pending': 'bg-amber-100 text-amber-800 border-amber-200',
      'overdue': 'bg-red-100 text-red-800 border-red-200',
      'partial': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'partial': return <DollarSign className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-500',
      'medium': 'bg-amber-500',
      'low': 'bg-emerald-500'
    };
    return colors[priority] || 'bg-gray-500';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handlePayment = () => {
    if (selectedObligation && paymentAmount && paymentMethod) {
      onPayment(selectedObligation.id, parseFloat(paymentAmount), paymentMethod);
      setShowPaymentDialog(false);
      setPaymentAmount('');
      setPaymentMethod('');
      setSelectedObligation(null);
    }
  };

  const uniqueTypes = [...new Set(obligations.map(o => o.type))];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Obligations Fiscales</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="overdue">En retard</SelectItem>
              <SelectItem value="partial">Partiel</SelectItem>
              <SelectItem value="paid">Payé</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>Montant Taxe</TableHead>
                <TableHead>Restant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredObligations.map((obligation) => {
                const daysUntilDue = getDaysUntilDue(obligation.dueDate);
                const remainingAmount = obligation.remainingAmount || obligation.taxAmount;
                
                return (
                  <TableRow key={obligation.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(obligation.priority)}`}></div>
                        <Badge variant="outline">{obligation.type}</Badge>
                      </div>
                    </TableCell>
                    
                    <TableCell className="font-medium">{obligation.period}</TableCell>
                    
                    <TableCell>
                      <div>
                        <p className="font-medium">{obligation.description}</p>
                        {obligation.notes && (
                          <p className="text-xs text-muted-foreground">{obligation.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {new Date(obligation.dueDate).toLocaleDateString('fr-FR')}
                        </div>
                        <div className={`text-xs ${
                          daysUntilDue < 0 ? 'text-red-600' : 
                          daysUntilDue <= 7 ? 'text-orange-600' : 
                          'text-muted-foreground'
                        }`}>
                          {daysUntilDue < 0 ? `En retard de ${Math.abs(daysUntilDue)} jours` : 
                           daysUntilDue === 0 ? 'Aujourd\'hui' :
                           `Dans ${daysUntilDue} jours`}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>{obligation.baseAmount.toLocaleString()} DT</TableCell>
                    
                    <TableCell className="font-semibold">
                      {obligation.taxAmount.toLocaleString()} DT
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <p className="font-semibold">{remainingAmount.toLocaleString()} DT</p>
                        {obligation.paidAmount && obligation.paidAmount > 0 && (
                          <p className="text-xs text-green-600">
                            Payé: {obligation.paidAmount.toLocaleString()} DT
                          </p>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={getStatusColor(obligation.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(obligation.status)}
                          <span>
                            {obligation.status === 'paid' ? 'Payé' :
                             obligation.status === 'pending' ? 'En attente' :
                             obligation.status === 'overdue' ? 'En retard' :
                             obligation.status === 'partial' ? 'Partiel' : obligation.status}
                          </span>
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
                        
                        {obligation.status !== 'paid' && (
                          <Dialog open={showPaymentDialog && selectedObligation?.id === obligation.id} onOpenChange={setShowPaymentDialog}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedObligation(obligation);
                                  setPaymentAmount(remainingAmount.toString());
                                }}
                              >
                                <CreditCard className="w-4 h-4 mr-1" />
                                Payer
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Paiement - {obligation.type}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="p-4 bg-muted rounded-lg">
                                  <h4 className="font-medium mb-2">{obligation.description}</h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">Montant total:</span>
                                      <p className="font-semibold">{obligation.taxAmount.toLocaleString()} DT</p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Restant:</span>
                                      <p className="font-semibold text-red-600">{remainingAmount.toLocaleString()} DT</p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Montant à payer (DT)</label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    max={remainingAmount}
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Méthode de paiement</label>
                                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choisir une méthode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                                      <SelectItem value="credit_card">Carte bancaire</SelectItem>
                                      <SelectItem value="mobile_payment">Paiement mobile</SelectItem>
                                      <SelectItem value="cash">Espèces</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                                    Annuler
                                  </Button>
                                  <Button onClick={handlePayment}>
                                    Confirmer le paiement
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredObligations.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Aucune obligation trouvée</h3>
            <p className="text-muted-foreground">
              Aucune obligation ne correspond aux critères de filtrage sélectionnés.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxObligationsTable;