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
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Calendar,
  User,
  FileText,
  BarChart3
} from 'lucide-react';
import AddEncaissementModal from './AddEncaissementModal';
import EditEncaissementModal from './EditEncaissementModal';
import EncaissementContextMenu from './EncaissementContextMenu';
import EncaissementReports from './EncaissementReports';
import InvoiceDetailView from '../billing/InvoiceDetailView';

const EncaissementManagement = () => {
  const [activeTab, setActiveTab] = useState('management');
  const [selectedEncaissement, setSelectedEncaissement] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [encaissementsData, setEncaissementsData] = useState([
    {
      id: 'ENC-001',
      date: '2024-02-05',
      description: 'Consultation générale - Dr. Ahmed',
      amount: 50.00,
      status: 'Encaissé',
      paymentMethod: 'Espèces',
      invoice: 'FAC-2024-001',
      patient: 'Ahmed Ben Ali',
      service: 'Consultation générale'
    },
    {
      id: 'ENC-002',
      date: '2024-02-04',
      description: 'Consultation spécialisée - Dr. Sarah',
      amount: 120.00,
      status: 'En attente',
      paymentMethod: 'Carte',
      invoice: 'FAC-2024-002',
      patient: 'Fatma Cherif',
      service: 'Consultation spécialisée'
    },
    {
      id: 'ENC-003',
      date: '2024-02-03',
      description: 'Suivi médical - Dr. Mohamed',
      amount: 75.00,
      status: 'Échoué',
      paymentMethod: 'Virement',
      invoice: 'FAC-2024-003',
      patient: 'Mohamed Trabelsi',
      service: 'Suivi médical'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: ''
  });

  const [filteredData, setFilteredData] = useState(encaissementsData);

  React.useEffect(() => {
    let filtered = encaissementsData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.patient.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.invoice.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === '' || filters.status === 'all' || item.status === filters.status;
      const matchesPaymentMethod = filters.paymentMethod === '' || filters.paymentMethod === 'all' || item.paymentMethod === filters.paymentMethod;
      
      const matchesDateFrom = filters.dateFrom === '' || item.date >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.date <= filters.dateTo;

      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateFrom && matchesDateTo;
    });
    setFilteredData(filtered);
  }, [filters, encaissementsData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Encaissé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Échoué': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Encaissé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En attente': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Échoué': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleRowClick = (encaissement) => {
    // Convert encaissement to invoice format for the detail view
    const invoiceData = {
      id: encaissement.id,
      date: encaissement.date,
      description: encaissement.description,
      amount: encaissement.amount,
      status: encaissement.status === 'Encaissé' ? 'paid' : encaissement.status === 'En attente' ? 'pending' : 'failed',
      invoice: encaissement.invoice
    };
    setSelectedInvoice(invoiceData);
    setShowInvoiceDetail(true);
  };

  const handleBackToList = () => {
    setShowInvoiceDetail(false);
    setSelectedInvoice(null);
  };

  const totalCollected = filteredData.filter(item => item.status === 'Encaissé').reduce((sum, item) => sum + item.amount, 0);
  const totalPending = filteredData.filter(item => item.status === 'En attente').reduce((sum, item) => sum + item.amount, 0);
  const totalFailed = filteredData.filter(item => item.status === 'Échoué').reduce((sum, item) => sum + item.amount, 0);

  if (activeTab === 'reports') {
    return <EncaissementReports onBack={() => setActiveTab('management')} />;
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
          <h2 className="text-2xl font-semibold text-text-primary">Encaissements & Collections</h2>
          <p className="text-text-secondary">Suivi des paiements et collections de votre cabinet</p>
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
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Encaissement
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Encaissé</p>
                <p className="text-xl font-bold text-text-primary">{totalCollected.toFixed(2)} TND</p>
                <p className="text-sm text-green-600">+8.2% vs mois dernier</p>
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
                <p className="text-sm text-yellow-600">À encaisser</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Échoués</p>
                <p className="text-xl font-bold text-text-primary">{totalFailed.toFixed(2)} TND</p>
                <p className="text-sm text-red-600">À retraiter</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Taux d'Encaissement</p>
                <p className="text-xl font-bold text-text-primary">
                  {((totalCollected / (totalCollected + totalPending + totalFailed)) * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-blue-600">Ce mois</p>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <SelectItem value="Encaissé">Encaissé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Échoué">Échoué</SelectItem>
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

      {/* Encaissements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Encaissements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((encaissement) => (
              <EncaissementContextMenu
                key={encaissement.id}
                encaissement={encaissement}
                onView={() => handleRowClick(encaissement)}
                onEdit={() => {
                  setSelectedEncaissement(encaissement);
                  setShowEditModal(true);
                }}
                onDelete={() => {
                  setEncaissementsData(prev => prev.filter(e => e.id !== encaissement.id));
                }}
                onDuplicate={() => {
                  const newEncaissement = { 
                    ...encaissement, 
                    id: 'ENC-' + String(Date.now()).slice(-3),
                    date: new Date().toISOString().split('T')[0]
                  };
                  setEncaissementsData(prev => [newEncaissement, ...prev]);
                }}
                onMarkPaid={() => {
                  setEncaissementsData(prev => 
                    prev.map(e => e.id === encaissement.id ? { ...e, status: 'Encaissé' } : e)
                  );
                }}
                onMarkPending={() => {
                  setEncaissementsData(prev => 
                    prev.map(e => e.id === encaissement.id ? { ...e, status: 'En attente' } : e)
                  );
                }}
                onDownloadReceipt={() => {
                  console.log('Downloading receipt for', encaissement.invoice);
                }}
              >
                <div 
                  className="flex items-center justify-between p-4 border border-border-primary rounded-lg hover:bg-hover-surface cursor-pointer transition-colors"
                  onClick={() => handleRowClick(encaissement)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      {getStatusIcon(encaissement.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-text-primary">{encaissement.id}</h4>
                        <Badge className={getStatusColor(encaissement.status)}>
                          {encaissement.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary">
                            <User className="w-3 h-3 inline mr-1" />
                            {encaissement.patient}
                          </p>
                          <p className="text-text-secondary">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {encaissement.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">
                            <FileText className="w-3 h-3 inline mr-1" />
                            {encaissement.invoice}
                          </p>
                          <p className="text-text-secondary">
                            <CreditCard className="w-3 h-3 inline mr-1" />
                            {encaissement.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{encaissement.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right mr-6">
                    <p className="font-semibold text-lg text-text-primary">
                      {encaissement.amount.toFixed(2)} TND
                    </p>
                    <p className="text-sm text-text-secondary">{encaissement.service}</p>
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
              </EncaissementContextMenu>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showAddModal && (
        <AddEncaissementModal 
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={(newEncaissement) => {
            // Map the modal data to the state structure
            const newEncaissementData = {
              id: 'ENC-' + String(Date.now()).slice(-3),
              date: newEncaissement.date || new Date().toISOString().split('T')[0],
              description: newEncaissement.notes || '',
              amount: newEncaissement.amount || 0,
              status: newEncaissement.status || 'En attente',
              paymentMethod: newEncaissement.paymentMethod || 'Espèces',
              invoice: newEncaissement.reference || '',
              patient: newEncaissement.patient || '',
              service: newEncaissement.type || ''
            };
            
            setEncaissementsData(prev => [newEncaissementData, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedEncaissement && (
        <EditEncaissementModal
          encaissement={{
            id: selectedEncaissement.id,
            date: selectedEncaissement.date,
            patient: selectedEncaissement.patient,
            type: selectedEncaissement.service,
            amount: selectedEncaissement.amount,
            paymentMethod: selectedEncaissement.paymentMethod,
            reference: selectedEncaissement.invoice,
            status: selectedEncaissement.status,
            notes: selectedEncaissement.description,
            insurance: null
          }}
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEncaissement(null);
          }}
          onSave={(updatedEncaissement) => {
            // Map the modal data back to the state structure
            const updatedEncaissementData = {
              id: selectedEncaissement.id,
              date: updatedEncaissement.date || selectedEncaissement.date,
              description: updatedEncaissement.notes || selectedEncaissement.description,
              amount: updatedEncaissement.amount || selectedEncaissement.amount,
              status: updatedEncaissement.status || selectedEncaissement.status,
              paymentMethod: updatedEncaissement.paymentMethod || selectedEncaissement.paymentMethod,
              invoice: updatedEncaissement.reference || selectedEncaissement.invoice,
              patient: updatedEncaissement.patient || selectedEncaissement.patient,
              service: updatedEncaissement.type || selectedEncaissement.service
            };
            
            setEncaissementsData(prev => 
              prev.map(e => e.id === updatedEncaissementData.id ? updatedEncaissementData : e)
            );
            setShowEditModal(false);
            setSelectedEncaissement(null);
          }}
        />
      )}
    </div>
  );
};

export default EncaissementManagement;
