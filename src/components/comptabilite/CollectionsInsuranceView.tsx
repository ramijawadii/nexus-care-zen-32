
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  Phone, 
  Mail,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Calendar,
  DollarSign,
  User,
  FileText
} from 'lucide-react';

const CollectionsInsuranceView = () => {
  const [collectionsData, setCollectionsData] = useState([
    {
      id: 'COL-001',
      patient: 'Ahmed Ben Ali',
      insurance: 'CNSS',
      contractNumber: 'CNSS-123456',
      amountDue: 385.00,
      amountReceived: 0,
      status: 'En attente',
      dueDate: '2024-03-15',
      submissionDate: '2024-02-01',
      lastContact: '2024-02-20',
      contactMethod: 'Email',
      notes: 'Dossier soumis, en attente de traitement',
      priority: 'Normale'
    },
    {
      id: 'COL-002',
      patient: 'Fatma Cherif',
      insurance: 'Assurance Maghreb',
      contractNumber: 'AM-789012',
      amountDue: 250.00,
      amountReceived: 125.00,
      status: 'Partiel',
      dueDate: '2024-03-10',
      submissionDate: '2024-01-25',
      lastContact: '2024-02-18',
      contactMethod: 'Téléphone',
      notes: 'Paiement partiel reçu, relance pour solde',
      priority: 'Élevée'
    },
    {
      id: 'COL-003',
      patient: 'Mohamed Trabelsi',
      insurance: 'Star Assurance',
      contractNumber: 'STAR-345678',
      amountDue: 450.00,
      amountReceived: 450.00,
      status: 'Complet',
      dueDate: '2024-02-28',
      submissionDate: '2024-01-15',
      lastContact: '2024-02-25',
      contactMethod: 'Email',
      notes: 'Paiement complet reçu',
      priority: 'Normale'
    }
  ]);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    insurance: '',
    priority: '',
    dateFrom: '',
    dateTo: ''
  });

  const [filteredData, setFilteredData] = useState(collectionsData);

  React.useEffect(() => {
    let filtered = collectionsData.filter(item => {
      const matchesSearch = filters.searchTerm === '' || 
        item.patient.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.insurance.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.contractNumber.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === '' || filters.status === 'all' || item.status === filters.status;
      const matchesInsurance = filters.insurance === '' || filters.insurance === 'all' || item.insurance === filters.insurance;
      const matchesPriority = filters.priority === '' || filters.priority === 'all' || item.priority === filters.priority;
      
      const matchesDateFrom = filters.dateFrom === '' || item.submissionDate >= filters.dateFrom;
      const matchesDateTo = filters.dateTo === '' || item.submissionDate <= filters.dateTo;

      return matchesSearch && matchesStatus && matchesInsurance && matchesPriority && 
             matchesDateFrom && matchesDateTo;
    });
    setFilteredData(filtered);
  }, [filters, collectionsData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complet': return 'bg-green-100 text-green-800';
      case 'Partiel': return 'bg-yellow-100 text-yellow-800';
      case 'En attente': return 'bg-blue-100 text-blue-800';
      case 'En retard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente': return 'bg-red-100 text-red-800';
      case 'Élevée': return 'bg-orange-100 text-orange-800';
      case 'Normale': return 'bg-blue-100 text-blue-800';
      case 'Faible': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complet': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Partiel': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'En attente': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'En retard': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalAmountDue = filteredData.reduce((sum, item) => sum + item.amountDue, 0);
  const totalAmountReceived = filteredData.reduce((sum, item) => sum + item.amountReceived, 0);
  const pendingAmount = totalAmountDue - totalAmountReceived;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Recouvrement et Assurances</h2>
          <p className="text-text-secondary">Suivi des paiements des patients via assurance et recouvrement</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapport Mensuel
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Recouvrement
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Montant Total Dû</p>
                <p className="text-xl font-bold text-text-primary">{totalAmountDue.toFixed(2)} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Montant Reçu</p>
                <p className="text-xl font-bold text-text-primary">{totalAmountReceived.toFixed(2)} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">En Attente</p>
                <p className="text-xl font-bold text-text-primary">{pendingAmount.toFixed(2)} TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Taux de Recouvrement</p>
                <p className="text-xl font-bold text-text-primary">
                  {totalAmountDue > 0 ? ((totalAmountReceived / totalAmountDue) * 100).toFixed(1) : 0}%
                </p>
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
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Partiel">Partiel</SelectItem>
                <SelectItem value="Complet">Complet</SelectItem>
                <SelectItem value="En retard">En retard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.insurance} onValueChange={(value) => setFilters({ ...filters, insurance: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Assurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les assurances</SelectItem>
                <SelectItem value="CNSS">CNSS</SelectItem>
                <SelectItem value="Assurance Maghreb">Assurance Maghreb</SelectItem>
                <SelectItem value="Star Assurance">Star Assurance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="Urgente">Urgente</SelectItem>
                <SelectItem value="Élevée">Élevée</SelectItem>
                <SelectItem value="Normale">Normale</SelectItem>
                <SelectItem value="Faible">Faible</SelectItem>
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

      {/* Collections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Suivi des Recouvrements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg hover:bg-hover-surface">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{item.id}</h4>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">
                          <User className="w-3 h-3 inline mr-1" />
                          {item.patient}
                        </p>
                        <p className="text-text-secondary">
                          <Shield className="w-3 h-3 inline mr-1" />
                          {item.insurance}
                        </p>
                        <p className="text-text-muted">
                          Contrat: {item.contractNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-secondary">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Échéance: {item.dueDate}
                        </p>
                        <p className="text-text-muted">
                          Soumis: {item.submissionDate}
                        </p>
                        <p className="text-text-muted">
                          Dernier contact: {item.lastContact} ({item.contactMethod})
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-text-subtle mt-2">{item.notes}</p>
                  </div>
                </div>
                
                <div className="text-right mr-6">
                  <p className="font-semibold text-text-primary">
                    {item.amountDue.toFixed(2)} TND
                  </p>
                  <p className="text-sm text-green-600">
                    Reçu: {item.amountReceived.toFixed(2)} TND
                  </p>
                  <p className="text-sm text-orange-600">
                    Restant: {(item.amountDue - item.amountReceived).toFixed(2)} TND
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
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
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
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Alertes Automatiques</h3>
            <p className="text-sm text-text-secondary mb-4">
              Notifications sur paiements en retard
            </p>
            <Button variant="outline" size="sm">Configurer</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Historique Complet</h3>
            <p className="text-sm text-text-secondary mb-4">
              Suivi détaillé des interactions
            </p>
            <Button variant="outline" size="sm">Consulter</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Rapports Mensuels</h3>
            <p className="text-sm text-text-secondary mb-4">
              Rapprochement avec assurances
            </p>
            <Button variant="outline" size="sm">Générer</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionsInsuranceView;
