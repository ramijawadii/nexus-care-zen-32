
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart,
  Zap,
  Wrench,
  Building,
  Plus,
  Download,
  Calendar,
  TrendingDown,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';

const DepensesFournisseurs = () => {
  const categoriesDepenses = [
    { nom: 'Fournitures Médicales', montant: 8450, budget: 9000, couleur: 'text-blue-600', icon: Wrench },
    { nom: 'Charges Fixes', montant: 4200, budget: 4200, couleur: 'text-green-600', icon: Building },
    { nom: 'Utilities/Énergie', montant: 1280, budget: 1500, couleur: 'text-yellow-600', icon: Zap },
    { nom: 'Personnel/Salaires', montant: 12800, budget: 13000, couleur: 'text-purple-600', icon: Users },
    { nom: 'Équipements', montant: 3200, budget: 5000, couleur: 'text-orange-600', icon: ShoppingCart },
    { nom: 'Logiciels/Abonnements', montant: 680, budget: 800, couleur: 'text-indigo-600', icon: Building }
  ];

  const depensesRecentes = [
    {
      id: 'DEP-001',
      fournisseur: 'MedSupply France',
      categorie: 'Fournitures Médicales',
      description: 'Matériel stérilisation + consommables',
      montant: 1450.00,
      date: '2024-02-05',
      statut: 'payee',
      echeance: '2024-02-05',
      recurrente: false
    },
    {
      id: 'DEP-002',
      fournisseur: 'EDF Entreprises',
      categorie: 'Utilities',
      description: 'Facture électricité cabinet - Février',
      montant: 420.00,
      date: '2024-02-01',
      statut: 'en_attente',
      echeance: '2024-02-15',
      recurrente: true
    },
    {
      id: 'DEP-003',
      fournisseur: 'Pharmagest Interactive',
      categorie: 'Logiciels',
      description: 'Abonnement logiciel cabinet médical',
      montant: 180.00,
      date: '2024-02-01',
      statut: 'payee',
      echeance: '2024-02-01',
      recurrente: true
    },
    {
      id: 'DEP-004',
      fournisseur: 'Cabinet Nettoyage Pro',
      categorie: 'Services',
      description: 'Nettoyage mensuel des locaux',
      montant: 320.00,
      date: '2024-01-30',
      statut: 'en_retard',
      echeance: '2024-01-30',
      recurrente: true
    }
  ];

  const fournisseursActifs = [
    { nom: 'MedSupply France', montantMensuel: 2800, nbFactures: 8, delaiPaiement: 15, fiabilite: 'Excellente' },
    { nom: 'EDF Entreprises', montantMensuel: 420, nbFactures: 1, delaiPaiement: 30, fiabilite: 'Bonne' },
    { nom: 'Pharmagest Interactive', montantMensuel: 180, nbFactures: 1, delaiPaiement: 15, fiabilite: 'Excellente' },
    { nom: 'Cabinet Nettoyage Pro', montantMensuel: 320, nbFactures: 1, delaiPaiement: 30, fiabilite: 'Bonne' }
  ];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'payee': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'en_retard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'payee': return CheckCircle;
      case 'en_attente': return Clock;
      case 'en_retard': return AlertTriangle;
      default: return Clock;
    }
  };

  const totalDepenses = categoriesDepenses.reduce((acc, cat) => acc + cat.montant, 0);
  const totalBudget = categoriesDepenses.reduce((acc, cat) => acc + cat.budget, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Dépenses & Gestion des Fournisseurs</h2>
          <p className="text-text-secondary">Suivi complet des dépenses et relations fournisseurs</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Dépense
          </Button>
        </div>
      </div>

      {/* Vue d'ensemble des dépenses */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Dépenses</p>
                <p className="text-xl font-bold text-text-primary">{totalDepenses.toLocaleString()} €</p>
                <p className="text-sm text-green-600">-3.2% vs mois dernier</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Budget Restant</p>
                <p className="text-xl font-bold text-text-primary">{(totalBudget - totalDepenses).toLocaleString()} €</p>
                <p className="text-sm text-blue-600">{((totalBudget - totalDepenses) / totalBudget * 100).toFixed(1)}% disponible</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Factures en Attente</p>
                <p className="text-xl font-bold text-text-primary">8</p>
                <p className="text-sm text-orange-600">2 450 € à payer</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Fournisseurs Actifs</p>
                <p className="text-xl font-bold text-text-primary">{fournisseursActifs.length}</p>
                <p className="text-sm text-purple-600">Tous validés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catégories de Dépenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
            Dépenses par Catégorie (Février 2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoriesDepenses.map((categorie) => (
              <div key={categorie.nom} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <categorie.icon className={`w-5 h-5 ${categorie.couleur}`} />
                    <span className="font-medium text-text-primary">{categorie.nom}</span>
                  </div>
                  <Badge variant="outline">
                    {((categorie.montant / categorie.budget) * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dépensé:</span>
                    <span className="font-semibold">{categorie.montant.toLocaleString()} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Budget:</span>
                    <span>{categorie.budget.toLocaleString()} €</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${categorie.montant > categorie.budget ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min((categorie.montant / categorie.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dépenses Récentes */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Dépenses Récentes</CardTitle>
              <div className="flex items-center space-x-2">
                <Input placeholder="Rechercher..." className="max-w-xs" />
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {depensesRecentes.map((depense) => {
                const StatutIcon = getStatutIcon(depense.statut);
                return (
                  <div key={depense.id} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <StatutIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-text-primary">{depense.id}</h4>
                          <Badge className={getStatutColor(depense.statut)}>
                            {depense.statut.replace('_', ' ')}
                          </Badge>
                          {depense.recurrente && (
                            <Badge variant="outline">Récurrente</Badge>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary font-medium">{depense.fournisseur}</p>
                        <p className="text-xs text-text-muted">{depense.description}</p>
                        <p className="text-xs text-text-muted">
                          Échéance: {depense.echeance}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">{depense.montant.toFixed(2)} €</p>
                      <p className="text-xs text-text-muted">{depense.categorie}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Fournisseurs Actifs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-purple-600" />
              Fournisseurs Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fournisseursActifs.map((fournisseur) => (
                <div key={fournisseur.nom} className="p-4 border border-border-primary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-text-primary">{fournisseur.nom}</h4>
                    <Badge variant="outline" className="text-green-600">
                      {fournisseur.fiabilite}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-text-muted">Montant mensuel</p>
                      <p className="font-semibold">{fournisseur.montantMensuel} €</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Factures</p>
                      <p className="font-semibold">{fournisseur.nbFactures}/mois</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Délai paiement</p>
                      <p className="font-semibold">{fournisseur.delaiPaiement}j</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes de Paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alertes de Paiement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">Échéances cette semaine</h4>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mb-1">3 factures</p>
              <p className="text-sm text-yellow-700">1 420 € à payer</p>
            </div>
            
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-800">Factures en retard</h4>
              </div>
              <p className="text-2xl font-bold text-red-600 mb-1">1 facture</p>
              <p className="text-sm text-red-700">320 € en retard</p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Building className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Budget dépassé</h4>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-1">0 catégorie</p>
              <p className="text-sm text-blue-700">Sous contrôle</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepensesFournisseurs;
