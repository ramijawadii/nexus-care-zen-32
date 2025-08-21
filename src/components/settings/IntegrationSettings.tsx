
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Zap,
  Database,
  Cloud,
  Smartphone,
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Settings,
  Key
} from 'lucide-react';
import { useState } from 'react';

const IntegrationSettings = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'supabase',
      name: 'Supabase Database',
      description: 'Base de données principale et authentification',
      status: 'connected',
      category: 'database',
      config: {
        url: 'https://xxx.supabase.co',
        key: '••••••••••••••••'
      }
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      description: 'Traitement des paiements en ligne',
      status: 'pending',
      category: 'payment',
      config: {
        publicKey: '',
        secretKey: ''
      }
    },
    {
      id: 'twilio',
      name: 'Twilio SMS',
      description: 'Envoi de SMS et notifications',
      status: 'disconnected',
      category: 'communication',
      config: {
        accountSid: '',
        authToken: '',
        phoneNumber: ''
      }
    },
    {
      id: 'openai',
      name: 'OpenAI API',
      description: 'Intelligence artificielle pour le copilot médical',
      status: 'connected',
      category: 'ai',
      config: {
        apiKey: '••••••••••••••••',
        model: 'gpt-4'
      }
    },
    {
      id: 'docusign',
      name: 'DocuSign',
      description: 'Signature électronique des documents',
      status: 'disconnected',
      category: 'documents',
      config: {
        clientId: '',
        clientSecret: ''
      }
    }
  ]);

  const apiSettings = [
    {
      name: 'API REST',
      description: 'Interface de programmation pour intégrations externes',
      enabled: true,
      endpoint: 'https://api.cabinet-oliviers.fr/v1',
      rateLimit: '1000/hour',
      authentication: 'Bearer Token'
    },
    {
      name: 'Webhooks',
      description: 'Notifications en temps réel vers applications externes',
      enabled: true,
      endpoints: ['appointments', 'patients', 'payments'],
      retryPolicy: '3 attempts'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'disconnected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'database': return <Database className="w-5 h-5" />;
      case 'payment': return <Shield className="w-5 h-5" />;
      case 'communication': return <Smartphone className="w-5 h-5" />;
      case 'ai': return <Zap className="w-5 h-5" />;
      case 'documents': return <FileText className="w-5 h-5" />;
      default: return <Cloud className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* External Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Intégrations Externes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(integration.category)}
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-text-muted">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration.status)}
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status === 'connected' ? 'Connecté' : 
                       integration.status === 'pending' ? 'En attente' : 'Déconnecté'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {integration.status === 'connected' && (
                  <div className="space-y-2 pt-3 border-t">
                    {Object.entries(integration.config).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{key}:</span>
                        <span className="font-mono text-text-muted">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2 text-green-600" />
            Configuration API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiSettings.map((api) => (
              <div key={api.name} className="p-4 border border-border-primary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{api.name}</h4>
                    <p className="text-sm text-text-muted">{api.description}</p>
                  </div>
                  <Switch checked={api.enabled} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {api.endpoint && (
                    <div>
                      <span className="font-medium">Endpoint:</span>
                      <p className="font-mono text-text-muted">{api.endpoint}</p>
                    </div>
                  )}
                  {api.rateLimit && (
                    <div>
                      <span className="font-medium">Rate Limit:</span>
                      <p className="text-text-muted">{api.rateLimit}</p>
                    </div>
                  )}
                  {api.authentication && (
                    <div>
                      <span className="font-medium">Authentification:</span>
                      <p className="text-text-muted">{api.authentication}</p>
                    </div>
                  )}
                  {api.endpoints && (
                    <div>
                      <span className="font-medium">Endpoints disponibles:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {api.endpoints.map((endpoint) => (
                          <Badge key={endpoint} variant="outline" className="text-xs">
                            {endpoint}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup & Sync */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-purple-600" />
            Sauvegarde & Synchronisation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Sauvegarde automatique</h4>
                <p className="text-sm text-text-muted">Sauvegarde quotidienne vers le cloud</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Synchronisation temps réel</h4>
                <p className="text-sm text-text-muted">Sync instantanée entre appareils</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Fréquence de sauvegarde</label>
              <select className="w-full p-2 border border-border-primary rounded">
                <option>Quotidienne</option>
                <option>Bi-quotidienne</option>
                <option>Hebdomadaire</option>
              </select>
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Durée de rétention (jours)</label>
              <Input type="number" defaultValue="365" className="w-32" />
            </div>
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
              <Key className="w-6 h-6 mb-2" />
              Générer API Key
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="w-6 h-6 mb-2" />
              Test Connexions
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Cloud className="w-6 h-6 mb-2" />
              Sauvegarde Manuelle
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Logs d'Intégration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
