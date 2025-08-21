import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddEncaissementModal from './AddEncaissementModal';
import EditEncaissementModal from './EditEncaissementModal';
import EncaissementReports from './EncaissementReports';
import EncaissementContextMenu from './EncaissementContextMenu';
import { 
  TrendingUp, 
  AlertTriangle, 
  CreditCard, 
  DollarSign, 
  Users, 
  CheckCircle, 
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
  AlertCircle,
  Clock,
  Banknote
} from 'lucide-react';

const EncaissementManagement = () => {
  const [showReports, setShowReports] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEncaissement, setEditingEncaissement] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [encaissementToDelete, setEncaissementToDelete] = useState(null);

  // Sample encaissement data
  const [encaissementsData, setEncaissementsData] = useState([
    {
      id: 'ENC-001',
      date: '2024-02-08',
      patient: 'Marie Dubois',
      type: 'Consultation',
      amount: 65.00,
      paymentMethod: 'Carte',
      reference: 'FACT-2024-001',
      status: 'Encaissé',
      notes: 'Paiement consultation générale',
      insurance: null
    },
    {
      id: 'ENC-002',
      date: '2024-02-07',
      patient: 'Jean Martin',
      type: 'Consultation spécialisée',
      amount: 120.00,
      paymentMethod: 'Virement',
      reference: 'FACT-2024-002',
      status: 'En attente',
      notes: 'Attente validation assurance',
      insurance: 'CPAM'
    },
    {
      id: 'ENC-003',
      date: '2024-02-06',
      patient: 'Sophie Laurent',
      type: 'Acte technique',
      amount: 180.00,
      paymentMethod: 'Chèque',
      reference: 'FACT-2024-003',
      status: 'Partiel',
      notes: 'Paiement partiel - reste 80€',
      insurance: 'Mutuelle MAAF'
    },
    {
      id: 'ENC-004',
      date: '2024-02-05',
      patient: 'Pierre Moreau',
      type: 'Téléconsultation',
      amount: 45.00,
      paymentMethod: 'Espèces',
      reference: 'FACT-2024-004',
      status: 'Encaissé',
      notes: 'Paiement immédiat',
      insurance: null
    },
    {
      id: 'ENC-005',
      date: '2024-02-04',
      patient: 'Anna Belabes',
      type: 'Suivi médical',
      amount: 85.00,
      paymentMethod: 'Carte',
      reference: 'FACT-2024-005',
      status: 'En litige',
      notes: 'Contestation assurance en cours',
      insurance: 'CNAM'
    }
  ]);

  // Filters state
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    paymentMethod: 'all',
    status: 'all',
    insurance: 'all',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  const handleAddEncaissement = (newEncaissement) => {
    const id = `ENC-${String(encaissementsData.length + 1).padStart(3, '0')}`;
    setEncaissementsData(prev => [...prev, { ...newEncaissement, id }]);
  };

  const handleEditEncaissement = (encaissement) => {
    setEditingEncaissement(encaissement);
  };

  const handleSaveEncaissement = (updatedEncaissement) => {
    setEncaissementsData(prev => 
      prev.map(enc => 
        enc.id === updatedEncaissement.id ? updatedEncaissement : enc
      )
    );
  };

  const handleDeleteEncaissement = (encaissement) => {
    setEncaissementToDelete(encaissement);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (encaissementToDelete) {
      setEncaissementsData(prev => 
        prev.filter(enc => enc.id !== encaissementToDelete.id)
      );
      setDeleteConfirmOpen(false);
      setEncaissementToDelete(null);
    }
  };

  // Filtered data
  const filteredEncaissements = useMemo(() => {
    return encaissementsData.filter(enc => {
      const matchesSearch = filters.searchTerm === '' || 
        enc.patient.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        enc.type.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        enc.reference.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesType = filters.type === 'all' || enc.type === filters.type;
      const matchesPaymentMethod = filters.paymentMethod === 'all' || enc.paymentMethod === filters.paymentMethod;
      const matchesStatus = filters.status === 'all' || enc.status === filters.status;
      const matchesInsurance = filters.insurance === 'all' || enc.insurance === filters.insurance;
      
      const matchesDateFrom = filters.dateFrom === '' || enc.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || enc.date <= filters.dateTo;
      
      const matchesAmountMin = filters.amountMin === '' || enc.amount >= parseFloat(filters.amountMin);
      const matchesAmountMax = filters.amountMax === '' || enc.amount <= parseFloat(filters.amountMax);

      return matchesSearch && matchesType && matchesPaymentMethod && matchesStatus && 
             matchesInsurance && matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
  }, [filters, encaissementsData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Encaissé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Partiel': return 'bg-orange-100 text-orange-800';
      case 'En litige': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Carte': return CreditCard;
      case 'Espèces': return Banknote;
      case 'Virement': return DollarSign;
      case 'Chèque': return FileText;
      default: return DollarSign;
    }
  };

  // Calculate stats
  const totalEncaisse = filteredEncaissements
    .filter(enc => enc.status === 'Encaissé')
    .reduce((sum, enc) => sum + enc.amount, 0);
  
  const totalEnAttente = filteredEncaissements
    .filter(enc => enc.status === 'En attente')
    .reduce((sum, enc) => sum + enc.amount, 0);

  const totalPartiel = filteredEncaissements
    .filter(enc => enc.status === 'Partiel')
    .reduce((sum, enc) => sum + enc.amount, 0);

  const enLitige = filteredEncaissements.filter(enc => enc.status === 'En litige').length;

  if (showReports) {
    return <EncaissementReports onBack={() => setShowReports(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Encaissé</p>
                <p className="text-xl font-bold text-text-primary">{totalEncaisse.toLocaleString()} TND</p>
                <p className="text-sm text-green-600">Ce mois</p>
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
                <p className="text-xl font-bold text-text-primary">{totalEnAttente.toLocaleString()} TND</p>
                <p className="text-sm text-yellow-600">À traiter</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Paiements Partiels</p>
                <p className="text-xl font-bold text-text-primary">{totalPartiel.toLocaleString()} TND</p>
                <p className="text-sm text-orange-600">À compléter</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">En Litige</p>
                <p className="text-xl font-bold text-text-primary">{enLitige}</p>
                <p className="text-sm text-red-600">À résoudre</p>
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
            
            <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Type de service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Consultation spécialisée">Consultation spécialisée</SelectItem>
                <SelectItem value="Acte technique">Acte technique</SelectItem>
                <SelectItem value="Téléconsultation">Téléconsultation</SelectItem>
                <SelectItem value="Suivi médical">Suivi médical</SelectItem>
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
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Encaissé">Encaissé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Partiel">Partiel</SelectItem>
                <SelectItem value="En litige">En litige</SelectItem>
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
                  type: 'all',
                  paymentMethod: 'all',
                  status: 'all',
                  insurance: 'all',
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

      {/* Encaissements Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Liste des Encaissements ({filteredEncaissements.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button size="sm" onClick={() => setShowAddModal(true)} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Encaissement
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
                  <TableHead className="font-semibold text-text-primary">Patient</TableHead>
                  <TableHead className="font-semibold text-text-primary">Service</TableHead>
                  <TableHead className="font-semibold text-text-primary">Montant</TableHead>
                  <TableHead className="font-semibold text-text-primary">Mode Paiement</TableHead>
                  <TableHead className="font-semibold text-text-primary">Statut</TableHead>
                  <TableHead className="font-semibold text-text-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEncaissements.map((encaissement) => {
                  const PaymentIcon = getPaymentIcon(encaissement.paymentMethod);
                  return (
                    <EncaissementContextMenu
                      key={encaissement.id}
                      encaissement={encaissement}
                      onView={() => console.log('View:', encaissement.id)}
                      onEdit={() => handleEditEncaissement(encaissement)}
                      onDelete={() => handleDeleteEncaissement(encaissement)}
                      onDuplicate={() => console.log('Duplicate:', encaissement.id)}
                      onMarkPaid={() => console.log('Mark paid:', encaissement.id)}
                      onMarkPending={() => console.log('Mark pending:', encaissement.id)}
                      onDownloadReceipt={() => console.log('Download receipt:', encaissement.id)}
                    >
                      <TableRow className="hover:bg-surface-elevated/30 transition-colors cursor-pointer">
                        <TableCell className="font-medium py-3">{encaissement.date}</TableCell>
                        <TableCell className="py-3">
                          <div>
                            <p className="font-medium">{encaissement.patient}</p>
                            <p className="text-sm text-text-secondary">{encaissement.reference}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">{encaissement.type}</TableCell>
                        <TableCell className="font-semibold py-3">{encaissement.amount.toFixed(2)} TND</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center space-x-2">
                            <PaymentIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{encaissement.paymentMethod}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge className={getStatusColor(encaissement.status)}>
                            {encaissement.status}
                          </Badge>
                          {encaissement.insurance && (
                            <p className="text-xs text-primary mt-1">{encaissement.insurance}</p>
                          )}
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
                                handleEditEncaissement(encaissement);
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
                                handleDeleteEncaissement(encaissement);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </EncaissementContextMenu>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <AddEncaissementModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEncaissement}
      />

      {/* Edit Modal */}
      <EditEncaissementModal
        encaissement={editingEncaissement}
        open={!!editingEncaissement}
        onClose={() => setEditingEncaissement(null)}
        onSave={handleSaveEncaissement}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Êtes-vous sûr de vouloir supprimer cet encaissement ?</p>
            {encaissementToDelete && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{encaissementToDelete.patient}</p>
                <p className="text-sm text-text-secondary">
                  {encaissementToDelete.type} - {encaissementToDelete.amount.toFixed(2)} TND
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

export default EncaissementManagement;