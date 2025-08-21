
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  Calendar,
  FileText,
  Bell,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const PayrollAutomation = () => {
  const automationSettings = [
    {
      id: 'auto-payroll',
      title: 'Génération Automatique de Paie',
      description: 'Traite automatiquement la paie le dernier jour du mois',
      enabled: true,
      lastRun: '2024-01-31',
      nextRun: '2024-02-29'
    },
    {
      id: 'auto-social',
      title: 'Calcul Cotisations Sociales',
      description: 'Calcule automatiquement CNSS, IRPP selon les barèmes en vigueur',
      enabled: true,
      lastRun: '2024-02-01',
      nextRun: 'Temps réel'
    },
    {
      id: 'auto-accounting',
      title: 'Écritures Comptables',
      description: 'Génère les écritures comptables automatiquement lors du traitement',
      enabled: true,
      lastRun: '2024-01-31',
      nextRun: 'Avec paie'
    },
    {
      id: 'auto-payslips',
      title: 'Bulletins de Paie PDF',
      description: 'Archive automatiquement les bulletins en PDF',
      enabled: true,
      lastRun: '2024-01-31',
      nextRun: 'Avec paie'
    }
  ];

  const notifications = [
    {
      id: 'payroll-reminder',
      title: 'Rappel Traitement Paie',
      description: 'Notification 3 jours avant échéance',
      enabled: true,
      frequency: '3 jours avant'
    },
    {
      id: 'social-declarations',
      title: 'Déclarations Sociales',
      description: 'Rappel déclarations CNSS mensuelles',
      enabled: true,
      frequency: 'Le 15 de chaque mois'
    },
    {
      id: 'tax-deadlines',
      title: 'Échéances Fiscales',
      description: 'Alertes sur les échéances IRPP et autres impôts',
      enabled: true,
      frequency: '5 jours avant'
    },
    {
      id: 'payslip-distribution',
      title: 'Distribution Bulletins',
      description: 'Envoi automatique par email aux employés',
      enabled: false,
      frequency: 'Jour de paie'
    }
  ];

  const integrations = [
    {
      name: 'Gestion RDV',
      description: 'Synchronisation avec les heures travaillées',
      status: 'connected',
      lastSync: '2024-02-15 14:30'
    },
    {
      name: 'Dossier Patient',
      description: 'Calcul des primes basées sur l\'activité',
      status: 'connected',
      lastSync: '2024-02-15 14:30'
    },
    {
      name: 'Comptabilité',
      description: 'Export automatique des écritures',
      status: 'connected',
      lastSync: '2024-02-15 14:30'
    },
    {
      name: 'Banque',
      description: 'Virements automatiques (à configurer)',
      status: 'pending',
      lastSync: 'Jamais'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Automatisations de Paie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{setting.title}</h4>
                    <Badge className={setting.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {setting.enabled ? 'Activé' : 'Désactivé'}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{setting.description}</p>
                  <div className="flex space-x-4 text-xs text-text-muted">
                    <span>Dernière exécution: {setting.lastRun}</span>
                    <span>Prochaine: {setting.nextRun}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch checked={setting.enabled} />
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            Notifications & Alertes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-text-primary">{notification.title}</h4>
                    <Badge className={notification.enabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                      {notification.frequency}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{notification.description}</p>
                </div>
                <Switch checked={notification.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-purple-600" />
            Intégrations Système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div key={integration.name} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-text-primary">{integration.name}</h4>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status === 'connected' ? 'Connecté' : 'En attente'}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary mb-3">{integration.description}</p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Dernière sync: {integration.lastSync}</span>
                  <Button variant="ghost" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="w-6 h-6 mb-2" />
              Programmer Paie
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Test Calculs
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="w-6 h-6 mb-2" />
              Valider Config
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="w-6 h-6 mb-2" />
              Journal Erreurs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollAutomation;
