
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  FileCheck, 
  Clock, 
  XCircle, 
  Send, 
  Download, 
  Upload, 
  RefreshCw,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

const InsuranceRecoveryView = () => {
  const [activeTab, setActiveTab] = useState('claims');

  // Mock data for insurance claims
  const mockClaims = [
    {
      id: 'CLM-001',
      patient: 'Ahmed Ben Ali',
      insuranceCompany: 'CNSS',
      claimNumber: 'CNSS-2024-001',
      amount: 385.00,
      status: 'En cours',
      submissionDate: '2024-01-15',
      processedDate: null,
      services: ['Consultation', 'Analyses'],
      priority: 'Normale'
    },
    {
      id: 'CLM-002',
      patient: 'Fatma Cherif',
      insuranceCompany: 'Assurance Maghreb',
      claimNumber: 'AM-2024-002',
      amount: 250.00,
      status: 'Approuvé',
      submissionDate: '2024-02-01',
      processedDate: '2024-02-10',
      services: ['Examen physique'],
      priority: 'Normale'
    },
    {
      id: 'CLM-003',
      patient: 'Mohamed Trabelsi',
      insuranceCompany: 'Star Assurance',
      claimNumber: 'STAR-2024-003',
      amount: 450.00,
      status: 'Rejeté',
      submissionDate: '2024-01-25',
      processedDate: '2024-02-02',
      services: ['Chirurgie', 'Suivi'],
      priority: 'Élevée'
    }
  ];

  // Mock data for recovery actions
  const mockRecoveryActions = [
    {
      id: 'REC-001',
      claimId: 'CLM-003',
      patient: 'Mohamed Trabelsi',
      insuranceCompany: 'Star Assurance',
      amount: 450.00,
      actionType: 'Réclamation',
      status: 'En cours',
      dueDate: '2024-03-15',
      lastAction: '2024-02-20',
      assignedTo: 'Dr. Benali',
      notes: 'Dossier médical complémentaire envoyé'
    },
    {
      id: 'REC-002',
      claimId: 'CLM-001',
      patient: 'Ahmed Ben Ali',
      insuranceCompany: 'CNSS',
      amount: 385.00,
      actionType: 'Suivi',
      status: 'Planifié',
      dueDate: '2024-03-10',
      lastAction: '2024-02-15',
      assignedTo: 'Admin Finance',
      notes: 'Relance téléphonique prévue'
    }
  ];

  // Mock data for insurance companies
  const mockInsuranceCompanies = [
    {
      id: 'INS-001',
      name: 'CNSS',
      contactPerson: 'Mme. Slim',
      phone: '+216 71 123 456',
      email: 'contact@cnss.nat.tn',
      address: 'Tunis, Tunisie',
      totalClaims: 45,
      approvedClaims: 42,
      rejectedClaims: 2,
      pendingClaims: 1,
      averageProcessingTime: 8,
      totalAmount: 18750.00,
      status: 'Actif'
    },
    {
      id: 'INS-002',
      name: 'Assurance Maghreb',
      contactPerson: 'M. Karim',
      phone: '+216 71 987 654',
      email: 'claims@maghreb-assurance.tn',
      address: 'Sfax, Tunisie',
      totalClaims: 32,
      approvedClaims: 28,
      rejectedClaims: 3,
      pendingClaims: 1,
      averageProcessingTime: 12,
      totalAmount: 14200.00,
      status: 'Actif'
    },
    {
      id: 'INS-003',
      name: 'Star Assurance',
      contactPerson: 'Mme. Amina',
      phone: '+216 71 456 789',
      email: 'service@star-assurance.tn',
      address: 'Sousse, Tunisie',
      totalClaims: 28,
      approvedClaims: 22,
      rejectedClaims: 5,
      pendingClaims: 1,
      averageProcessingTime: 15,
      totalAmount: 11800.00,
      status: 'En révision'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approuvé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      case 'Planifié': return 'bg-blue-100 text-blue-800';
      case 'Actif': return 'bg-green-100 text-green-800';
      case 'En révision': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approuvé': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'En cours': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Rejeté': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Planifié': return <Calendar className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Gestion des Assurances & Recouvrement</h2>
          <p className="text-text-secondary">Gérez les demandes d'assurance et les actions de recouvrement</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Demande
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Demandes Approuvées</p>
                <p className="text-xl font-bold text-text-primary">92</p>
                <p className="text-sm text-green-600">24,200 TND</p>
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
                <p className="text-xl font-bold text-text-primary">15</p>
                <p className="text-sm text-yellow-600">4,850 TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Rejetées</p>
                <p className="text-xl font-bold text-text-primary">8</p>
                <p className="text-sm text-red-600">2,100 TND</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Taux de Succès</p>
                <p className="text-xl font-bold text-text-primary">89.2%</p>
                <p className="text-sm text-blue-600">+3.1% ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="claims" className="flex items-center">
            <FileCheck className="w-4 h-4 mr-2" />
            Demandes d'Assurance
          </TabsTrigger>
          <TabsTrigger value="recovery" className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actions de Recouvrement
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Compagnies d'Assurance
          </TabsTrigger>
        </TabsList>

        {/* Claims Tab */}
        <TabsContent value="claims">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Demandes d'Assurance</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Rechercher..." className="max-w-xs" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="approved">Approuvé</SelectItem>
                      <SelectItem value="pending">En cours</SelectItem>
                      <SelectItem value="rejected">Rejeté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockClaims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {getStatusIcon(claim.status)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-text-primary">{claim.id}</h4>
                          <Badge className={getStatusColor(claim.status)}>
                            {claim.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{claim.patient} • {claim.insuranceCompany}</p>
                        <p className="text-xs text-text-muted">
                          Réf: {claim.claimNumber} • Soumis: {claim.submissionDate}
                        </p>
                        <p className="text-xs text-text-subtle">
                          Services: {claim.services.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">{claim.amount.toFixed(2)} TND</p>
                      {claim.processedDate && (
                        <p className="text-xs text-text-muted">
                          Traité: {claim.processedDate}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recovery Tab */}
        <TabsContent value="recovery">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Actions de Recouvrement</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Action
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecoveryActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <RefreshCw className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-text-primary">{action.id}</h4>
                          <Badge className={getStatusColor(action.status)}>
                            {action.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{action.patient} • {action.insuranceCompany}</p>
                        <p className="text-xs text-text-muted">
                          Demande: {action.claimId} • Type: {action.actionType}
                        </p>
                        <p className="text-xs text-text-subtle">
                          Assigné à: {action.assignedTo} • Échéance: {action.dueDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">{action.amount.toFixed(2)} TND</p>
                      <p className="text-xs text-text-muted">
                        Dernière action: {action.lastAction}
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
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Compagnies d'Assurance</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter Compagnie
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockInsuranceCompanies.map((company) => (
                  <div key={company.id} className="p-4 border border-border-primary rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-text-primary">{company.name}</h3>
                      <Badge className={getStatusColor(company.status)}>
                        {company.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Contact:</span>
                        <span className="font-medium">{company.contactPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Téléphone:</span>
                        <span className="font-medium">{company.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Email:</span>
                        <span className="font-medium text-xs">{company.email}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Total Demandes:</span>
                        <span className="font-medium">{company.totalClaims}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Taux d'Approbation:</span>
                        <span className="font-medium text-green-600">
                          {((company.approvedClaims / company.totalClaims) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Temps Moyen:</span>
                        <span className="font-medium">{company.averageProcessingTime} jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Montant Total:</span>
                        <span className="font-medium">{company.totalAmount.toFixed(2)} TND</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceRecoveryView;
