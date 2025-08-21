
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  Mail,
  Calendar,
  AlertTriangle,
  DollarSign,
  Clock,
  Settings,
  Zap,
  Target,
  CheckCircle,
  Smartphone,
  TrendingUp
} from 'lucide-react';

const AutomatisationsAlertes = () => {
  const alertesActives = [
    {
      type: 'Factures impayées',
      description: 'Patients avec factures > 30 jours',
      nombre: 12,
      montant: 3240,
      prochaine: '2024-02-08',
      statut: 'active',
      priorite: 'haute'
    },
    {
      type: 'Échéances fournisseurs',
      description: 'Paiements dus dans 3 jours',
      nombre: 5,
      montant: 2800,
      prochaine: '2024-02-09',
      statut: 'active',
      priorite: 'moyenne'
    },
    {
      type: 'Solde bancaire bas',
      description: 'Seuil de 10 000€ atteint',
      nombre: 1,
      montant: 8500,
      prochaine: 'Immédiat',
      statut: 'declenchee',
      priorite: 'haute'
    },
    {
      type: 'Dépassement budget',
      description: 'Catégorie fournitures médicales',
      nombre: 1,
      montant: 450,
      prochaine: 'N/A',
      statut: 'declenchee',
      priorite: 'moyenne'
    }
  ];

  const rappelsAutomatiques = [
    {
      type: 'Relance Patient - Niveau 1',
      delai: '15 jours après échéance',
      canal: ['Email', 'SMS'],
      personnalise: true,
      actif: true,
      dernier: '2024-02-05 - 8 patients contactés'
    },
    {
      type: 'Relance Patient - Niveau 2',
      delai: '30 jours après échéance',
      canal: ['Email', 'Courrier'],
      personnalise: true,
      actif: true,
      dernier: '2024-02-03 - 3 patients contactés'
    },
    {
      type: 'Relance Assurance',
      delai: '20 jours après soumission',
      canal: ['Email', 'Portail web'],
      personnalise: false,
      actif: true,
      dernier: '2024-02-04 - 2 dossiers relancés'
    },
    {
      type: 'Rappel RDV Consultation',
      delai: '24h avant RDV',
      canal: ['SMS', 'Email'],
      personnalise: true,
      actif: true,
      dernier: '2024-02-05 - 15 patients prévenus'
    }
  ];

  const notificationsDepassement = [
    {
      categorie: 'Budget mensuel cabinet',
      seuil: 95,
      actuel: 87.2,
      alerte: false,
      action: 'Notification médecin + comptable'
    },
    {
      categorie: 'Charges fixes mensuelles',
      seuil: 100,
      actuel: 96.8,
      alerte: true,
      action: 'Email automatique + SMS urgence'
    },
    {
      categorie: 'Frais pharmaceutiques',
      seuil: 90,
      actuel: 78.5,
      alerte: false,
      action: 'Rapport hebdomadaire'
    },
    {
      categorie: 'Délai paiement patients',
      seuil: 25,
      actuel: 23.5,
      alerte: false,
      action: 'Alerte si > 25 jours moyenne'
    }
  ];

  const automationsDashboard = [
    {
      nom: 'Mise à jour KPI matinale',
      frequence: 'Quotidienne à 8h00',
      derniere: '2024-02-05 08:00',
      statut: 'active',
      elements: ['Soldes bancaires', 'Factures nuit', 'CA quotidien']
    },
    {
      nom: 'Rapport mensuel automatique',
      frequence: 'Le 1er de chaque mois',
      derniere: '2024-02-01 09:00',
      statut: 'active',
      elements: ['P&L', 'Trésorerie', 'Performance praticiens']
    },
    {
      nom: 'Synchronisation bancaire',
      frequence: 'Toutes les 4 heures',
      derniere: '2024-02-05 14:00',
      statut: 'active',
      elements: ['Relevés', 'Virements', 'Prélèvements']
    },
    {
      nom: 'Backup données financières',
      frequence: 'Quotidienne à 23h00',
      derniere: '2024-02-04 23:00',
      statut: 'active',
      elements: ['Factures', 'Paiements', 'Écritures comptables']
    }
  ];

  const canaux_notification = [
    {
      nom: 'Email Professionnel',
      actif: true,
      destinataires: ['dr.martin@cabinet.fr', 'comptable@cabinet.fr'],
      types: ['Alertes urgentes', 'Rapports', 'Relances']
    },
    {
      nom: 'SMS Manager',
      actif: true,
      destinataires: ['+33 6 XX XX XX XX'],
      types: ['Alertes critiques', 'Soldes bas', 'Échéances urgentes']
    },
    {
      nom: 'Dashboard Cabinet',
      actif: true,
      destinataires: ['Tous utilisateurs'],
      types: ['Notifications temps réel', 'Widgets alertes']
    },
    {
      nom: 'App Mobile Cabinet',
      actif: false,
      destinataires: ['Médecins', 'Gestionnaire'],
      types: ['Push notifications', 'Alertes mobiles']
    }
  ];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'declenchee': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'haute': return 'bg-red-100 text-red-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Automatisations & Alertes</h2>
          <p className="text-text-secondary">Gestion intelligente des notifications et rappels automatiques</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurer
          </Button>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Nouvelle Automation
          </Button>
        </div>
      </div>

      {/* Alertes Actives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            Alertes Actives et Déclenchées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertesActives.map((alerte, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{alerte.type}</h4>
                      <Badge className={getStatutColor(alerte.statut)}>
                        {alerte.statut}
                      </Badge>
                      <Badge className={getPrioriteColor(alerte.priorite)}>
                        {alerte.priorite}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{alerte.description}</p>
                    <p className="text-xs text-text-muted">
                      Prochaine action: {alerte.prochaine}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-text-primary">
                    {alerte.nombre} {alerte.nombre > 1 ? 'éléments' : 'élément'}
                  </p>
                  <p className="text-lg font-bold text-orange-600">
                    {alerte.montant.toLocaleString()} €
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    Traiter
                  </Button>
                  <Button variant="ghost" size="sm">
                    Reporter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rappels Automatiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-blue-600" />
            Rappels Automatiques aux Patients/Assurances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rappelsAutomatiques.map((rappel, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-text-primary">{rappel.type}</h4>
                    <p className="text-sm text-text-secondary">Délai: {rappel.delai}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {rappel.personnalise && (
                      <Badge variant="outline" className="text-blue-600">
                        Personnalisé
                      </Badge>
                    )}
                    <Badge className={rappel.actif ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rappel.actif ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {rappel.canal.map((canal, idx) => (
                      <Badge key={idx} variant="outline">
                        {canal}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted">{rappel.dernier}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Dépassement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Notifications Dépassement Budgétaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notificationsDepassement.map((notif, index) => (
                <div key={index} className={`p-3 border rounded-lg ${
                  notif.alerte ? 'border-orange-300 bg-orange-50' : 'border-border-primary'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-text-primary">{notif.categorie}</h4>
                    {notif.alerte && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Seuil atteint
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-sm text-text-secondary">Seuil d'alerte</p>
                      <p className="font-semibold">{notif.seuil}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Niveau actuel</p>
                      <p className={`font-semibold ${notif.alerte ? 'text-orange-600' : 'text-green-600'}`}>
                        {notif.actuel}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${notif.alerte ? 'bg-orange-500' : 'bg-blue-500'}`}
                      style={{ width: `${notif.actuel}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-text-muted">{notif.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Canaux de Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-green-600" />
              Canaux de Notification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {canaux_notification.map((canal, index) => (
                <div key={index} className="p-3 border border-border-primary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{canal.nom}</h4>
                      <Badge className={canal.actif ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {canal.actif ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-text-secondary">Destinataires:</p>
                      <p className="text-text-primary">{canal.destinataires.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Types d'alertes:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {canal.types.map((type, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automations Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-indigo-600" />
            Mises à Jour Automatiques du Tableau de Bord
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationsDashboard.map((automation, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-text-primary">{automation.nom}</h4>
                  <Badge className={getStatutColor(automation.statut)}>
                    {automation.statut}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Fréquence:</span>
                    <span className="text-text-primary">{automation.frequence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Dernière exécution:</span>
                    <span className="text-text-primary">{automation.derniere}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-text-secondary mb-1">Éléments automatisés:</p>
                  <div className="flex flex-wrap gap-1">
                    {automation.elements.map((element, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions Rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides - Automatisations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Bell className="w-8 h-8 text-blue-600" />
              <span className="font-medium">Nouvelle Alerte</span>
              <span className="text-xs text-text-muted">Configurer seuil</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Mail className="w-8 h-8 text-green-600" />
              <span className="font-medium">Rappel Personnalisé</span>
              <span className="text-xs text-text-muted">Templates emails</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span className="font-medium">Planifier Action</span>
              <span className="text-xs text-text-muted">Automatisation</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <span className="font-medium">Rapport Alertes</span>
              <span className="text-xs text-text-muted">Historique</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatisationsAlertes;
