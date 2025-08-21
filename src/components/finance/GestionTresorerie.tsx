
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Building,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';

const GestionTresorerie = () => {
  const comptesBancaires = [
    {
      nom: 'Compte Professionnel Principal',
      banque: 'BNP Paribas',
      solde: 85600,
      evolution: '+15.2%',
      type: 'courant'
    },
    {
      nom: 'Compte Épargne Cabinet',
      banque: 'Crédit Agricole',
      solde: 45000,
      evolution: '+2.1%',
      type: 'epargne'
    },
    {
      nom: 'Compte TVA',
      banque: 'BNP Paribas',
      solde: 12500,
      evolution: '-8.3%',
      type: 'reserve'
    }
  ];

  const previsionsTresorerie = {
    '30_jours': {
      encaissements: 28750,
      decaissements: 15200,
      solde_projete: 99150
    },
    '60_jours': {
      encaissements: 52400,
      decaissements: 28900,
      solde_projete: 122650
    },
    '90_jours': {
      encaissements: 78600,
      decaissements: 42100,
      solde_projete: 158150
    }
  };

  const echeancier = [
    {
      date: '2024-02-08',
      type: 'encaissement',
      description: 'Remboursement CPAM - Lot janvier',
      montant: 8500,
      probabilite: 95
    },
    {
      date: '2024-02-12',
      type: 'decaissement',
      description: 'Salaire secrétaire + charges',
      montant: 3200,
      probabilite: 100
    },
    {
      date: '2024-02-15',
      type: 'encaissement',
      description: 'Paiements patients - Semaine 1',
      montant: 4200,
      probabilite: 85
    },
    {
      date: '2024-02-20',
      type: 'decaissement',
      description: 'TVA mensuelle',
      montant: 2450,
      probabilite: 100
    },
    {
      date: '2024-02-25',
      type: 'encaissement',
      description: 'Téléconsultations février',
      montant: 1850,
      probabilite: 90
    }
  ];

  const alertesTresorerie = [
    {
      type: 'info',
      titre: 'Solde confortable',
      message: 'Trésorerie suffisante pour les 3 prochains mois',
      niveau: 'success'
    },
    {
      type: 'attention',
      titre: 'Prélèvement automatique',
      message: 'Assurance cabinet prélevée le 15/02 - 850€',
      niveau: 'warning'
    },
    {
      type: 'opportunite',
      titre: 'Placement conseillé',
      message: 'Excédent de 45K€ éligible au placement court terme',
      niveau: 'info'
    }
  ];

  const simulationsImpact = [
    {
      scenario: 'Achat nouvel équipement',
      montant: -25000,
      impact_30j: -25000,
      impact_60j: -23500,
      impact_90j: -21000,
      recommandation: 'Financement recommandé'
    },
    {
      scenario: 'Embauche assistant(e)',
      montant: -2800,
      impact_30j: -2800,
      impact_60j: -5600,
      impact_90j: -8400,
      recommandation: 'Trésorerie suffisante'
    },
    {
      scenario: 'Travaux aménagement',
      montant: -15000,
      impact_30j: -15000,
      impact_60j: -14200,
      impact_90j: -12800,
      recommandation: 'Étalement sur 2 mois conseillé'
    }
  ];

  const getAlertColor = (niveau: string) => {
    switch (niveau) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Gestion de Trésorerie</h2>
          <p className="text-text-secondary">Suivi en temps réel et prévisions de liquidité</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Rapport Trésorerie
          </Button>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Simuler Scenario
          </Button>
        </div>
      </div>

      {/* Soldes des Comptes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-600" />
            Soldes des Comptes Bancaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comptesBancaires.map((compte, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-text-primary">{compte.nom}</h4>
                  <Badge variant="outline">
                    {compte.type}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary mb-3">{compte.banque}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">
                      {compte.solde.toLocaleString()} €
                    </p>
                    <p className={`text-sm ${compte.evolution.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {compte.evolution} ce mois
                    </p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prévisions de Trésorerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Prévisions de Trésorerie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(previsionsTresorerie).map(([periode, data]) => (
              <div key={periode} className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-4">
                  Prévision {periode.replace('_', ' ')}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">Encaissements:</span>
                    <span className="font-semibold text-green-600">
                      +{data.encaissements.toLocaleString()} €
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">Décaissements:</span>
                    <span className="font-semibold text-red-600">
                      -{data.decaissements.toLocaleString()} €
                    </span>
                  </div>
                  
                  <div className="border-t border-blue-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-800">Solde projeté:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {data.solde_projete.toLocaleString()} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Échéancier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-600" />
            Échéancier des Flux (15 prochains jours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {echeancier.map((flux, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    flux.type === 'encaissement' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {flux.type === 'encaissement' ? 
                      <TrendingUp className="w-4 h-4 text-green-600" /> :
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    }
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{flux.description}</h4>
                    <p className="text-sm text-text-secondary">Échéance: {flux.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    flux.type === 'encaissement' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {flux.type === 'encaissement' ? '+' : '-'}{flux.montant.toLocaleString()} €
                  </p>
                  <Badge variant="outline" className="text-blue-600">
                    {flux.probabilite}% probable
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertes de Trésorerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alertes & Recommandations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertesTresorerie.map((alerte, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getAlertColor(alerte.niveau)}`}>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {alerte.niveau === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {alerte.niveau === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    {alerte.niveau === 'info' && <Activity className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{alerte.titre}</h4>
                    <p className="text-sm">{alerte.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simulations d'Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-indigo-600" />
            Simulations d'Impact Financier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulationsImpact.map((simulation, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-text-primary">{simulation.scenario}</h4>
                  <Badge variant="outline" className="text-purple-600">
                    {simulation.recommandation}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Coût initial</p>
                    <p className="font-semibold text-red-600">
                      {simulation.montant.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted">Impact 30j</p>
                    <p className="font-semibold">
                      {simulation.impact_30j.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted">Impact 60j</p>
                    <p className="font-semibold">
                      {simulation.impact_60j.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted">Impact 90j</p>
                    <p className="font-semibold">
                      {simulation.impact_90j.toLocaleString()} €
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestionTresorerie;
