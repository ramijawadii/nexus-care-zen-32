
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Send,
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  CreditCard,
  Shield
} from 'lucide-react';

const EncaissementFacturation = () => {
  const facturesData = [
    {
      id: 'FACT-2024-001',
      patient: 'Marie Dubois',
      type: 'Consultation + Ordonnance',
      date: '2024-02-05',
      montant: 65.00,
      tva: 0.00,
      total: 65.00,
      statut: 'payee',
      modePaiement: 'carte',
      typeFacturation: 'patient',
      assurance: null
    },
    {
      id: 'FACT-2024-002',
      patient: 'Jean Martin',
      type: 'Consultation spécialisée',
      date: '2024-02-04',
      montant: 120.00,
      tva: 0.00,
      total: 120.00,
      statut: 'en_attente',
      modePaiement: 'virement',
      typeFacturation: 'assurance',
      assurance: 'CPAM'
    },
    {
      id: 'FACT-2024-003',
      patient: 'Sophie Laurent',
      type: 'Acte technique + Consultation',
      date: '2024-02-03',
      montant: 180.00,
      tva: 0.00,
      total: 180.00,
      statut: 'partielle',
      modePaiement: 'cheque',
      typeFacturation: 'mixte',
      assurance: 'Mutuelle MAAF'
    },
    {
      id: 'FACT-2024-004',
      patient: 'Pierre Moreau',
      type: 'Téléconsultation',
      date: '2024-02-02',
      montant: 45.00,
      tva: 0.00,
      total: 45.00,
      statut: 'en_litige',
      modePaiement: 'en_ligne',
      typeFacturation: 'patient',
      assurance: null
    }
  ];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'payee': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'partielle': return 'bg-orange-100 text-orange-800';
      case 'en_litige': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'payee': return CheckCircle;
      case 'en_attente': return Clock;
      case 'partielle': return AlertTriangle;
      case 'en_litige': return AlertTriangle;
      default: return FileText;
    }
  };

  const statistiquesFacturation = [
    {
      titre: 'Factures du Mois',
      valeur: '185',
      evolution: '+12',
      icon: FileText,
      couleur: 'text-blue-600'
    },
    {
      titre: 'Montant Total',
      valeur: '28 450 €',
      evolution: '+8.5%',
      icon: DollarSign,
      couleur: 'text-green-600'
    },
    {
      titre: 'Taux de Recouvrement',
      valeur: '94.2%',
      evolution: '+2.1%',
      icon: CheckCircle,
      couleur: 'text-purple-600'
    },
    {
      titre: 'Délai Moyen',
      valeur: '12.5 j',
      evolution: '-1.2j',
      icon: Calendar,
      couleur: 'text-orange-600'
    }
  ];

  const repartitionFacturation = [
    { type: 'Facturation Patients', montant: 18200, pourcentage: 64, couleur: 'text-blue-600' },
    { type: 'Tiers Payant CPAM', montant: 7850, pourcentage: 28, couleur: 'text-green-600' },
    { type: 'Mutuelles/Assurances', montant: 2400, pourcentage: 8, couleur: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Encaissements & Facturation</h2>
          <p className="text-text-secondary">Gestion complète des factures et encaissements médicaux</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Facture
          </Button>
        </div>
      </div>

      {/* Statistiques Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statistiquesFacturation.map((stat) => (
          <Card key={stat.titre}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">{stat.titre}</p>
                  <p className="text-2xl font-bold text-text-primary">{stat.valeur}</p>
                  <p className="text-sm text-green-600">{stat.evolution}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <stat.icon className={`w-6 h-6 ${stat.couleur}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Répartition de la Facturation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Répartition de la Facturation (Ce Mois)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {repartitionFacturation.map((item) => (
              <div key={item.type} className="p-4 border border-border-primary rounded-lg text-center">
                <h3 className="font-semibold text-text-primary mb-2">{item.type}</h3>
                <p className={`text-2xl font-bold ${item.couleur} mb-1`}>
                  {item.montant.toLocaleString()} €
                </p>
                <p className="text-sm text-text-secondary">{item.pourcentage}% du total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recherche et Filtres */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Rechercher par patient, numéro facture..."
            className="pl-10"
          />
        </div>
        <select className="p-2 border border-border-primary rounded-md">
          <option>Tous les statuts</option>
          <option>Payées</option>
          <option>En attente</option>
          <option>Partielles</option>
          <option>En litige</option>
        </select>
        <select className="p-2 border border-border-primary rounded-md">
          <option>Ce mois</option>
          <option>Mois dernier</option>
          <option>Trimestre</option>
          <option>Année</option>
        </select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Plus de filtres
        </Button>
      </div>

      {/* Liste des Factures */}
      <Card>
        <CardHeader>
          <CardTitle>Factures Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {facturesData.map((facture) => {
              const StatutIcon = getStatutIcon(facture.statut);
              return (
                <div key={facture.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg hover:bg-hover-surface">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <StatutIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-text-primary">{facture.id}</h4>
                        <Badge className={getStatutColor(facture.statut)}>
                          {facture.statut.replace('_', ' ')}
                        </Badge>
                        {facture.typeFacturation === 'assurance' && (
                          <Badge variant="outline" className="text-green-600">
                            Tiers Payant
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary font-medium">{facture.patient}</p>
                      <p className="text-xs text-text-muted">
                        {facture.type} • {facture.date} • {facture.modePaiement}
                      </p>
                      {facture.assurance && (
                        <p className="text-xs text-blue-600">Assurance: {facture.assurance}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-text-primary text-lg">{facture.total.toFixed(2)} €</p>
                    <p className="text-sm text-text-secondary">
                      HT: {facture.montant.toFixed(2)} €
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
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions Rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides - Facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="font-medium">Facturation Groupée</span>
              <span className="text-xs text-text-muted">Patients du jour</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="font-medium">Tiers Payant</span>
              <span className="text-xs text-text-muted">CPAM/Mutuelles</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Send className="w-8 h-8 text-purple-600" />
              <span className="font-medium">Relances Automatiques</span>
              <span className="text-xs text-text-muted">Factures impayées</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <FileText className="w-8 h-8 text-orange-600" />
              <span className="font-medium">Rapports Assurances</span>
              <span className="text-xs text-text-muted">Export mensuel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EncaissementFacturation;
