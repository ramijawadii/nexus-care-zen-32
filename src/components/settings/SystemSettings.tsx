
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Database,
  HardDrive,
  Wifi,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Save,
  Trash2
} from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Paramètres Système</h3>
          <p className="text-text-muted">Configuration système et maintenance</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            État du Système
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Serveur</p>
                  <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Base de données</p>
                  <Badge className="bg-blue-100 text-blue-800">Opérationnelle</Badge>
                </div>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Réseau</p>
                  <Badge className="bg-orange-100 text-orange-800">Latence: 45ms</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-purple-600" />
            Gestion du Stockage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Espace utilisé</span>
              <span className="text-sm text-text-muted">2.4 GB / 10 GB</span>
            </div>
            <Progress value={24} className="h-2" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <p className="text-sm text-text-muted">Documents</p>
                <p className="font-semibold">850 MB</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-muted">Images</p>
                <p className="font-semibold">620 MB</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-muted">Sauvegardes</p>
                <p className="font-semibold">720 MB</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-text-muted">Autres</p>
                <p className="font-semibold">210 MB</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Nettoyer le cache
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Archiver les données
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-600" />
            Paramètres de Sauvegarde
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fréquence automatique</label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Toutes les heures</SelectItem>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heure de sauvegarde</label>
              <Input type="time" defaultValue="02:00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rétention (jours)</label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compression</label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sauvegarde cloud</h4>
                <p className="text-sm text-text-muted">Synchronisation avec le stockage cloud</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Chiffrement des sauvegardes</h4>
                <p className="text-sm text-text-muted">Chiffrer les données sauvegardées</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notification de fin</h4>
                <p className="text-sm text-text-muted">Prévenir à la fin de la sauvegarde</p>
              </div>
              <Switch />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="default">
              <Download className="w-4 h-4 mr-2" />
              Sauvegarder maintenant
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Restaurer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-orange-600" />
            Paramètres de Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Timeout connexion (sec)</label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cache durée (min)</label>
              <Input type="number" defaultValue="15" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max utilisateurs simultanés</label>
              <Input type="number" defaultValue="50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Taille max upload (MB)</label>
              <Input type="number" defaultValue="25" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Optimisation automatique</h4>
                <p className="text-sm text-text-muted">Optimiser la base de données automatiquement</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Compression images</h4>
                <p className="text-sm text-text-muted">Compresser automatiquement les images</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Mode maintenance programmé</h4>
                <p className="text-sm text-text-muted">Maintenance automatique la nuit</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600" />
            Surveillance Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Détection d'intrusion</h4>
                <p className="text-sm text-text-muted">Surveillance des tentatives d'accès</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Audit des actions</h4>
                <p className="text-sm text-text-muted">Enregistrer toutes les actions utilisateurs</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Alertes sécurité</h4>
                <p className="text-sm text-text-muted">Notifications en temps réel</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Dernière alerte</p>
                <p className="text-sm text-yellow-700">Tentative de connexion suspecte - 15/02/2024 14:30</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
