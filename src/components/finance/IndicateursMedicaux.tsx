import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield,
  Clock,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  CheckCircle,
  CreditCard
} from 'lucide-react';

const IndicateursMedicaux = () => {
  const indicateursAssurance = [
    {
      assurance: 'CPAM (Sécurité Sociale)',
      delaiMoyenRemboursement: 12.5,
      montantEnAttente: 18750,
      tauxRemboursement: 96.8,
      evolution: '+0.5j',
      fiabilite: 'Excellente'
    },
    {
      assurance: 'Mutuelle MAAF',
      delaiMoyenRemboursement: 8.2,
      montantEnAttente: 4520,
      tauxRemboursement: 98.2,
      evolution: '-1.2j',
      fiabilite: 'Excellente'
    },
    {
      assurance: 'AXA Santé',
      delaiMoyenRemboursement: 15.8,
      montantEnAttente: 2830,
      tauxRemboursement: 94.1,
      evolution: '+2.1j',
      fiabilite: 'Bonne'
    },
    {
      assurance: 'MGEN',
      delaiMoyenRemboursement: 6.5,
      montantEnAttente: 1950,
      tauxRemboursement: 99.1,
      evolution: '-0.8j',
      fiabilite: 'Excellente'
    }
  ];

  const facturationTiersPayant = {
    totalFacture: 145250,
    tiersPayant: 98430,
    paiementDirect: 46820,
    pourcentageTiersPayant: 67.8,
    evolutionTiersPayant: '+5.2%'
  };

  const creancesEnCours = [
    {
      type: 'Créances Patients',
      montant: 12450,
      nombre: 89,
      delaiMoyen: 23.5,
      anciennete: 'Moins de 30j: 68%, 30-60j: 23%, Plus de 60j: 9%'
    },
    {
      type: 'Créances Assurances',
      montant: 28070,
      nombre: 156,
      delaiMoyen: 11.2,
      anciennete: 'Moins de 30j: 89%, 30-60j: 11%, Plus de 60j: 0%'
    }
  ];

  const actesRentables = [
    {
      acte: 'Consultation cardiologie',
      tarifConventionne: 200,
      tarifPratique: 200,
      margeUnitaire: 180,
      volumeMensuel: 226,
      caTotal: 45200,
      rentabilite: 'Très élevée'
    },
    {
      acte: 'Échographie abdominale',
      tarifConventionne: 120,
      tarifPratique: 120,
      margeUnitaire: 95,
      volumeMensuel: 89,
      caTotal: 10680,
      rentabilite: 'Élevée'
    },
    {
      acte: 'Consultation générale',
      tarifConventionne: 60,
      tarifPratique: 60,
      margeUnitaire: 45,
      volumeMensuel: 1140,
      caTotal: 68400,
      rentabilite: 'Moyenne'
    },
    {
      acte: 'Téléconsultation',
      tarifConventionne: 50,
      tarifPratique: 50,
      margeUnitaire: 42,
      volumeMensuel: 374,
      caTotal: 18700,
      rentabilite: 'Moyenne'
    }
  ];

  const plafonds = [
    {
      patient: 'Marie Dubois',
      assurance: 'Mutuelle MAAF',
      plafondAnnuel: 2500,
    consomme: 2120,
      restant: 380,
      pourcentageAtteint: 84.8,
      alerteProximite: true
    },
    {
      patient: 'Jean Martin',
      assurance: 'AXA Santé',
      plafondAnnuel: 3000,
      consomme: 1850,
      restant: 1150,
      pourcentageAtteint: 61.7,
      alerteProximite: false
    }
  ];

  const getFiabiliteColor = (fiabilite: string) => {
    switch (fiabilite) {
      case 'Excellente': return 'bg-green-100 text-green-800';
      case 'Bonne': return 'bg-blue-100 text-blue-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRentabiliteColor = (rentabilite: string) => {
    switch (rentabilite) {
      case 'Très élevée': return 'text-green-600';
      case 'Élevée': return 'text-blue-600';
      case 'Moyenne': return 'text-orange-600';
      case 'Faible': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Indicateurs Spécifiques Secteur Médical</h2>
          <p className="text-text-secondary">Métriques avancées pour optimiser la gestion financière du cabinet</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Optimiser Tarifs
          </Button>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Rapport Performance
          </Button>
        </div>
      </div>

      {/* Délais Remboursement par Assurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Délais de Remboursement par Assurance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {indicateursAssurance.map((assurance, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-text-primary">{assurance.assurance}</h4>
                    <Badge className={getFiabiliteColor(assurance.fiabilite)}>
                      {assurance.fiabilite}
                    </Badge>
                  </div>
                  <Badge variant="outline" className={
                    assurance.evolution.startsWith('+') ? 'text-orange-600' : 'text-green-600'
                  }>
                    {assurance.evolution}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary">Délai moyen</p>
                    <p className="text-xl font-bold text-blue-600">
                      {assurance.delaiMoyenRemboursement} j
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">En attente</p>
                    <p className="text-xl font-bold text-orange-600">
                      {assurance.montantEnAttente.toLocaleString()} €
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Taux remboursement</p>
                    <p className="text-xl font-bold text-green-600">
                      {assurance.tauxRemboursement}%
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${assurance.tauxRemboursement}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facturation Tiers Payant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-600" />
            Répartition Facturation Tiers Payant vs Paiement Direct
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800 mb-2">Tiers Payant</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                {facturationTiersPayant.tiersPayant.toLocaleString()} €
              </p>
              <p className="text-sm text-blue-700">
                {facturationTiersPayant.pourcentageTiersPayant}% du CA
              </p>
              <Badge variant="outline" className="text-green-600 mt-2">
                {facturationTiersPayant.evolutionTiersPayant}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800 mb-2">Paiement Direct</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">
                {facturationTiersPayant.paiementDirect.toLocaleString()} €
              </p>
              <p className="text-sm text-green-700">
                {(100 - facturationTiersPayant.pourcentageTiersPayant).toFixed(1)}% du CA
              </p>
              <Badge variant="outline" className="text-blue-600 mt-2">
                Stable
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800 mb-2">Total Facturé</h3>
              <p className="text-2xl font-bold text-purple-600 mb-1">
                {facturationTiersPayant.totalFacture.toLocaleString()} €
              </p>
              <p className="text-sm text-purple-700">
                Ce mois
              </p>
              <Badge variant="outline" className="text-green-600 mt-2">
                +12.5%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Créances en Cours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-orange-600" />
              Montant des Créances en Cours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creancesEnCours.map((creance, index) => (
                <div key={index} className="p-4 border border-border-primary rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-text-primary">{creance.type}</h4>
                    <Badge variant="outline">
                      {creance.nombre} dossiers
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-text-secondary">Montant total</p>
                      <p className="text-xl font-bold text-orange-600">
                        {creance.montant.toLocaleString()} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Délai moyen</p>
                      <p className="text-xl font-bold text-blue-600">
                        {creance.delaiMoyen} j
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-text-secondary">
                    <p className="font-medium mb-1">Répartition par ancienneté:</p>
                    <p>{creance.anciennete}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plafonds de Remboursement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Alertes Plafonds de Remboursement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plafonds.map((plafond, index) => (
                <div key={index} className={`p-4 border rounded-lg ${
                  plafond.alerteProximite ? 'border-orange-300 bg-orange-50' : 'border-border-primary'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-text-primary">{plafond.patient}</h4>
                      <p className="text-sm text-text-secondary">{plafond.assurance}</p>
                    </div>
                    {plafond.alerteProximite && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Plafond proche
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-text-secondary">Plafond annuel</p>
                      <p className="font-semibold text-text-primary">
                        {plafond.plafondAnnuel.toLocaleString()} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Consommé</p>
                      <p className="font-semibold text-blue-600">
                        {plafond.consomme.toLocaleString()} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Restant</p>
                      <p className={`font-semibold ${plafond.alerteProximite ? 'text-orange-600' : 'text-green-600'}`}>
                        {plafond.restant.toLocaleString()} €
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        plafond.pourcentageAtteint > 80 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${plafond.pourcentageAtteint}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    {plafond.pourcentageAtteint.toFixed(1)}% utilisé
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyse des Actes les Plus Rentables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Analyse de Rentabilité par Acte Médical
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-primary">
                  <th className="text-left py-3 px-4 font-medium text-text-primary">Acte</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">Tarif Conv.</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">Tarif Pratiqué</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">Marge Unit.</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">Volume</th>
                  <th className="text-right py-3 px-4 font-medium text-text-primary">CA Total</th>
                  <th className="text-center py-3 px-4 font-medium text-text-primary">Rentabilité</th>
                </tr>
              </thead>
              <tbody>
                {actesRentables.map((acte, index) => (
                  <tr key={index} className="border-b border-border-primary/50">
                    <td className="py-3 px-4 font-medium text-text-primary">{acte.acte}</td>
                    <td className="py-3 px-4 text-right">{acte.tarifConventionne} €</td>
                    <td className="py-3 px-4 text-right font-semibold">{acte.tarifPratique} €</td>
                    <td className="py-3 px-4 text-right font-semibold text-green-600">{acte.margeUnitaire} €</td>
                    <td className="py-3 px-4 text-right">{acte.volumeMensuel}</td>
                    <td className="py-3 px-4 text-right font-semibold text-blue-600">
                      {acte.caTotal.toLocaleString()} €
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${getRentabiliteColor(acte.rentabilite)}`}>
                        {acte.rentabilite}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndicateursMedicaux;
