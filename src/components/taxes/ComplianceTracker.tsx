import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Calendar,
  Target,
  TrendingUp,
  BookOpen,
  Bell,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'overdue' | 'not_applicable';
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  lastUpdated?: string;
  documents?: string[];
  notes?: string;
}

interface ComplianceTrackerProps {
  obligations: Array<{
    id: number;
    type: string;
    status: string;
    dueDate: string;
  }>;
  complianceScore: number;
  onComplianceUpdate: (updates: any) => void;
}

const ComplianceTracker: React.FC<ComplianceTrackerProps> = ({
  obligations,
  complianceScore,
  onComplianceUpdate
}) => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: 'tax_registration',
      category: 'Enregistrement',
      title: 'Immatriculation fiscale',
      description: 'Inscription au registre fiscal national',
      status: 'completed',
      priority: 'high',
      lastUpdated: '2024-01-15',
      documents: ['Certificat d\'immatriculation fiscale']
    },
    {
      id: 'vat_declaration',
      category: 'Déclarations',
      title: 'Déclarations TVA mensuelles',
      description: 'Dépôt régulier des déclarations TVA',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-04-20',
      notes: 'Déclaration de mars 2024 en cours'
    },
    {
      id: 'income_tax',
      category: 'Déclarations',
      title: 'Déclaration IRPP annuelle',
      description: 'Déclaration annuelle des revenus professionnels',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-05-31'
    },
    {
      id: 'social_contributions',
      category: 'Cotisations',
      title: 'Cotisations CNSS',
      description: 'Paiement des cotisations sociales mensuelles',
      status: 'overdue',
      priority: 'high',
      dueDate: '2024-04-15',
      notes: 'Retard de paiement - pénalités applicables'
    },
    {
      id: 'accounting_records',
      category: 'Comptabilité',
      title: 'Tenue de la comptabilité',
      description: 'Registre des recettes et dépenses professionnelles',
      status: 'completed',
      priority: 'high',
      lastUpdated: '2024-03-31'
    },
    {
      id: 'invoice_management',
      category: 'Facturation',
      title: 'Numérotation des factures',
      description: 'Numérotation séquentielle et archivage conforme',
      status: 'completed',
      priority: 'medium',
      lastUpdated: '2024-03-31'
    },
    {
      id: 'professional_insurance',
      category: 'Assurances',
      title: 'Assurance responsabilité civile',
      description: 'Couverture d\'assurance professionnelle médicale',
      status: 'completed',
      priority: 'high',
      lastUpdated: '2024-01-01',
      dueDate: '2024-12-31'
    },
    {
      id: 'medical_permits',
      category: 'Autorisations',
      title: 'Autorisation d\'exercice',
      description: 'Licence d\'exercice médical valide',
      status: 'completed',
      priority: 'high',
      lastUpdated: '2023-01-01',
      dueDate: '2026-01-01'
    },
    {
      id: 'continuing_education',
      category: 'Formation',
      title: 'Formation médicale continue',
      description: 'Crédits de formation professionnelle continue',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-12-31',
      notes: '20 heures sur 40 réalisées'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Enregistrement', 'Déclarations', 'Cotisations', 'Comptabilité', 'Facturation', 'Assurances', 'Autorisations', 'Formation'];

  const filteredItems = selectedCategory === 'all' 
    ? complianceItems 
    : complianceItems.filter(item => item.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'not_applicable': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'not_applicable': return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateCategoryScore = (category: string) => {
    const categoryItems = complianceItems.filter(item => 
      category === 'all' || item.category === category
    );
    const completedItems = categoryItems.filter(item => item.status === 'completed');
    return categoryItems.length > 0 ? (completedItems.length / categoryItems.length) * 100 : 100;
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    return complianceItems.filter(item => {
      if (!item.dueDate || item.status === 'completed') return false;
      const dueDate = new Date(item.dueDate);
      return dueDate <= thirtyDaysFromNow;
    }).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  };

  const getOverdueItems = () => {
    return complianceItems.filter(item => item.status === 'overdue');
  };

  const upcomingDeadlines = getUpcomingDeadlines();
  const overdueItems = getOverdueItems();

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {overdueItems.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{overdueItems.length} obligation(s) en retard</strong> nécessitent votre attention immédiate.
          </AlertDescription>
        </Alert>
      )}

      {upcomingDeadlines.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>{upcomingDeadlines.length} échéance(s) approchent</strong> dans les 30 prochains jours.
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Score Global</p>
                <p className="text-2xl font-bold text-emerald-900">{Math.round(complianceScore)}%</p>
                <Progress value={complianceScore} className="h-2 mt-2" />
              </div>
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Conformes</p>
                <p className="text-2xl font-bold text-blue-900">
                  {complianceItems.filter(i => i.status === 'completed').length}
                </p>
                <p className="text-xs text-blue-600">Sur {complianceItems.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">En Retard</p>
                <p className="text-2xl font-bold text-red-900">{overdueItems.length}</p>
                <p className="text-xs text-red-600">Action requise</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Prochaines</p>
                <p className="text-2xl font-bold text-amber-900">{upcomingDeadlines.length}</p>
                <p className="text-xs text-amber-600">30 prochains jours</p>
              </div>
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="checklist">Liste de contrôle</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.slice(1).map((category) => {
                  const score = calculateCategoryScore(category);
                  const itemCount = complianceItems.filter(item => item.category === category).length;
                  return (
                    <div key={category} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{category}</h4>
                        <span className="text-sm text-muted-foreground">{itemCount} items</span>
                      </div>
                      <div className="space-y-2">
                        <Progress value={score} className="h-2" />
                        <p className="text-sm font-medium">{Math.round(score)}% conforme</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Échéances Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.slice(0, 5).map((item) => {
                  const daysUntil = Math.ceil((new Date(item.dueDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {daysUntil <= 0 ? 'Aujourd\'hui' : `Dans ${daysUntil} jours`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.dueDate!).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Toutes' : category}
                {category !== 'all' && (
                  <Badge variant="secondary" className="ml-2">
                    {complianceItems.filter(item => item.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Compliance Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>
                Liste de Contrôle - {selectedCategory === 'all' ? 'Toutes les catégories' : selectedCategory}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getPriorityColor(item.priority)}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          
                          {item.dueDate && (
                            <p className="text-xs text-muted-foreground">
                              Échéance: {new Date(item.dueDate).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                          
                          {item.lastUpdated && (
                            <p className="text-xs text-muted-foreground">
                              Dernière mise à jour: {new Date(item.lastUpdated).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                          
                          {item.notes && (
                            <p className="text-xs text-blue-600 mt-1">{item.notes}</p>
                          )}

                          {item.documents && item.documents.length > 0 && (
                            <div className="flex items-center space-x-2 mt-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {item.documents.length} document(s)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(item.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(item.status)}
                            <span>
                              {item.status === 'completed' ? 'Conforme' :
                               item.status === 'pending' ? 'En cours' :
                               item.status === 'overdue' ? 'En retard' : 'N/A'}
                            </span>
                          </div>
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier de Conformité 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Monthly obligations */}
                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                  <h4 className="font-medium text-red-900">Mensuel</h4>
                  <ul className="text-sm text-red-800 mt-2 space-y-1">
                    <li>• Déclaration TVA (20 du mois)</li>
                    <li>• Cotisations CNSS (15 du mois)</li>
                    <li>• Comptabilité des recettes</li>
                  </ul>
                </div>

                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded">
                  <h4 className="font-medium text-amber-900">Trimestriel</h4>
                  <ul className="text-sm text-amber-800 mt-2 space-y-1">
                    <li>• Déclaration employeur</li>
                    <li>• Bilan comptable simplifié</li>
                    <li>• Formation continue</li>
                  </ul>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <h4 className="font-medium text-blue-900">Annuel</h4>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Déclaration IRPP (31 mai)</li>
                    <li>• Renouvellement assurance</li>
                    <li>• Audit comptable</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Documents de Conformité</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Certificats</h4>
                      <p className="text-sm text-muted-foreground">Autorisations officielles</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Immatriculation fiscale</span>
                      <Badge variant="outline">Valide</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Licence médicale</span>
                      <Badge variant="outline">Valide</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Registres</h4>
                      <p className="text-sm text-muted-foreground">Tenue comptable</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Livre des recettes</span>
                      <Badge variant="outline">À jour</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Facturier</span>
                      <Badge variant="outline">À jour</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Assurances</h4>
                      <p className="text-sm text-muted-foreground">Couvertures obligatoires</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>RC Professionnelle</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Local professionnel</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceTracker;