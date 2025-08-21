
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Pill, 
  Wrench, 
  AlertTriangle, 
  Building, 
  DollarSign,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Settings,
  BarChart3,
  RefreshCw,
  Bell,
  Edit,
  Trash2,
  Eye,
  Archive,
  ShoppingCart,
  Clipboard
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: 'medication' | 'supply' | 'equipment';
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  expiryDate?: string;
  batchNumber?: string;
  vendor: string;
  costPerUnit: number;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
  lastRestocked: string;
  nextMaintenance?: string;
}

interface Vendor {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  rating: number;
  deliveryTime: string;
  paymentTerms: string;
  status: 'active' | 'inactive';
}

interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'calibration';
  scheduledDate: string;
  completedDate?: string;
  technician: string;
  cost: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  notes: string;
}

const MedicalInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('supplies');

  // Mock data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Paracétamol 500mg',
      category: 'medication',
      currentStock: 150,
      minStock: 50,
      maxStock: 500,
      unit: 'comprimés',
      expiryDate: '2025-03-15',
      batchNumber: 'PAR2024-001',
      vendor: 'PharmaCorp',
      costPerUnit: 0.25,
      location: 'Pharmacie - Étagère A1',
      status: 'in-stock',
      lastRestocked: '2024-01-15'
    },
    {
      id: '2',
      name: 'Seringues 10ml',
      category: 'supply',
      currentStock: 25,
      minStock: 100,
      maxStock: 1000,
      unit: 'unités',
      vendor: 'MedSupply Ltd',
      costPerUnit: 0.85,
      location: 'Stock - Zone B2',
      status: 'low-stock',
      lastRestocked: '2023-12-10'
    },
    {
      id: '3',
      name: 'Échographe Portable',
      category: 'equipment',
      currentStock: 1,
      minStock: 1,
      maxStock: 1,
      unit: 'appareil',
      vendor: 'UltraSound Tech',
      costPerUnit: 15000,
      location: 'Salle de consultation 2',
      status: 'in-stock',
      lastRestocked: '2023-06-01',
      nextMaintenance: '2024-06-01'
    },
    {
      id: '4',
      name: 'Amoxicilline 250mg',
      category: 'medication',
      currentStock: 0,
      minStock: 30,
      maxStock: 200,
      unit: 'gélules',
      expiryDate: '2024-12-01',
      batchNumber: 'AMX2023-078',
      vendor: 'PharmaCorp',
      costPerUnit: 0.45,
      location: 'Pharmacie - Étagère A2',
      status: 'out-of-stock',
      lastRestocked: '2023-10-20'
    }
  ];

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'PharmaCorp',
      contact: 'Marie Dubois',
      email: 'marie@pharmacorp.fr',
      phone: '01 23 45 67 89',
      rating: 4.8,
      deliveryTime: '2-3 jours',
      paymentTerms: '30 jours',
      status: 'active'
    },
    {
      id: '2',
      name: 'MedSupply Ltd',
      contact: 'Jean Martin',
      email: 'contact@medsupply.fr',
      phone: '01 98 76 54 32',
      rating: 4.2,
      deliveryTime: '1-2 jours',
      paymentTerms: '15 jours',
      status: 'active'
    },
    {
      id: '3',
      name: 'UltraSound Tech',
      contact: 'Dr. Pierre Lambert',
      email: 'support@ultrasoundtech.fr',
      phone: '01 11 22 33 44',
      rating: 4.9,
      deliveryTime: '5-7 jours',
      paymentTerms: '60 jours',
      status: 'active'
    }
  ];

  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      equipmentId: '3',
      equipmentName: 'Échographe Portable',
      type: 'preventive',
      scheduledDate: '2024-06-01',
      technician: 'Service Technique UltraSound',
      cost: 350,
      status: 'scheduled',
      notes: 'Maintenance préventive annuelle'
    },
    {
      id: '2',
      equipmentId: '5',
      equipmentName: 'Autoclave',
      type: 'calibration',
      scheduledDate: '2024-02-15',
      completedDate: '2024-02-16',
      technician: 'TechMed Services',
      cost: 180,
      status: 'completed',
      notes: 'Calibration effectuée avec succès'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return <CheckCircle className="w-4 h-4" />;
      case 'low-stock': return <AlertTriangle className="w-4 h-4" />;
      case 'out-of-stock': return <XCircle className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medication': return <Pill className="w-4 h-4" />;
      case 'supply': return <Package className="w-4 h-4" />;
      case 'equipment': return <Wrench className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStockPercentage = (current: number, min: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Key Metrics */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventaire Médical</h2>
          <p className="text-muted-foreground">Gestion complète des stocks et équipements</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter Article
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Articles Totaux</p>
                <p className="text-2xl font-bold">{inventoryItems.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertes Stock</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valeur Totale</p>
                <p className="text-2xl font-bold">{totalValue.toLocaleString('fr-FR')} €</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenances</p>
                <p className="text-2xl font-bold">{maintenanceRecords.filter(r => r.status === 'scheduled').length}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="supplies" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Stocks Médicaux</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center space-x-2">
            <Pill className="w-4 h-4" />
            <span>Médicaments</span>
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center space-x-2">
            <Wrench className="w-4 h-4" />
            <span>Équipements</span>
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center space-x-2">
            <Building className="w-4 h-4" />
            <span>Fournisseurs</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analyses</span>
          </TabsTrigger>
        </TabsList>

        {/* Supplies Tab */}
        <TabsContent value="supplies" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4 bg-muted/30 p-4 rounded-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Toutes catégories</option>
              <option value="medication">Médicaments</option>
              <option value="supply">Fournitures</option>
              <option value="equipment">Équipements</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Low Stock Alerts */}
          {lowStockItems.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Alertes de Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-md">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(item.category)}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Stock: {item.currentStock} {item.unit} (Min: {item.minStock})
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Commander
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inventory Items List */}
          <Card>
            <CardHeader>
              <CardTitle>Articles en Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-2 bg-muted rounded-lg">
                            {getCategoryIcon(item.category)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusIcon(item.status)}
                                <span className="ml-1">{item.status}</span>
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Stock actuel</p>
                                <p className="font-medium">{item.currentStock} {item.unit}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Localisation</p>
                                <p className="font-medium">{item.location}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Fournisseur</p>
                                <p className="font-medium">{item.vendor}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Coût unitaire</p>
                                <p className="font-medium">{item.costPerUnit.toFixed(2)} €</p>
                              </div>
                            </div>

                            {/* Stock Level Progress */}
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                <span>Niveau de stock</span>
                                <span>{Math.round(getStockPercentage(item.currentStock, item.minStock, item.maxStock))}%</span>
                              </div>
                              <Progress 
                                value={getStockPercentage(item.currentStock, item.minStock, item.maxStock)} 
                                className="h-2"
                              />
                            </div>

                            {item.expiryDate && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Expire: {new Date(item.expiryDate).toLocaleDateString('fr-FR')}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Gestion des Médicaments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {inventoryItems.filter(item => item.category === 'medication').map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Lot</p>
                            <p className="font-medium">{item.batchNumber}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expiration</p>
                            <p className="font-medium">
                              {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('fr-FR') : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Stock</p>
                            <p className="font-medium">{item.currentStock} {item.unit}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Bell className="w-4 h-4 mr-2" />
                          Alerte
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Réapprovisionner
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment Tab */}
        <TabsContent value="equipment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="w-5 h-5 mr-2" />
                Équipements et Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Equipment List */}
                <div className="grid gap-4">
                  {inventoryItems.filter(item => item.category === 'equipment').map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{item.name}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Localisation</p>
                              <p className="font-medium">{item.location}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Prochaine maintenance</p>
                              <p className="font-medium">
                                {item.nextMaintenance ? new Date(item.nextMaintenance).toLocaleDateString('fr-FR') : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Statut</p>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Planifier
                          </Button>
                          <Button variant="outline" size="sm">
                            <Clipboard className="w-4 h-4 mr-2" />
                            Historique
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Maintenance Schedule */}
                <div>
                  <h4 className="font-semibold mb-4">Calendrier de Maintenance</h4>
                  <div className="space-y-3">
                    {maintenanceRecords.map((record) => (
                      <div key={record.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium">{record.equipmentName}</h5>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Type: {record.type}</span>
                              <span>Date: {new Date(record.scheduledDate).toLocaleDateString('fr-FR')}</span>
                              <span>Technicien: {record.technician}</span>
                              <span>Coût: {record.cost} €</span>
                            </div>
                          </div>
                          <Badge className={
                            record.status === 'completed' ? 'bg-green-100 text-green-800' :
                            record.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            record.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Gestion des Fournisseurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{vendor.name}</h3>
                          <Badge className={vendor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {vendor.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Contact</p>
                            <p className="font-medium">{vendor.contact}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Téléphone</p>
                            <p className="font-medium">{vendor.phone}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Délai livraison</p>
                            <p className="font-medium">{vendor.deliveryTime}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Évaluation</p>
                            <p className="font-medium">⭐ {vendor.rating}/5</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4 mr-2" />
                          Commander
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Consommation par Mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Graphique de consommation mensuelle
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Évolution des Coûts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Graphique d'évolution des coûts
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Pill className="w-4 h-4 text-blue-500" />
                      <span>Médicaments</span>
                    </div>
                    <span className="font-medium">
                      {inventoryItems.filter(i => i.category === 'medication').length} articles
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-green-500" />
                      <span>Fournitures</span>
                    </div>
                    <span className="font-medium">
                      {inventoryItems.filter(i => i.category === 'supply').length} articles
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4 text-purple-500" />
                      <span>Équipements</span>
                    </div>
                    <span className="font-medium">
                      {inventoryItems.filter(i => i.category === 'equipment').length} articles
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertes et Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>{lowStockItems.length} articles en rupture/stock faible</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span>3 médicaments expirent dans 30 jours</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Settings className="w-4 h-4 text-blue-500" />
                    <span>2 maintenances programmées cette semaine</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalInventory;
