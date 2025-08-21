
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Save,
  Mail
} from 'lucide-react';

const ReportsSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Paramètres des Rapports</h3>
          <p className="text-text-muted">Configuration des rapports et exports</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Automated Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Rapports Automatiques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Rapport quotidien</h4>
                <p className="text-sm text-text-muted">Activité quotidienne du cabinet</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <Select defaultValue="email">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="both">Les deux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Rapport hebdomadaire</h4>
                <p className="text-sm text-text-muted">Synthèse hebdomadaire</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <Select defaultValue="email">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="both">Les deux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Rapport mensuel</h4>
                <p className="text-sm text-text-muted">Bilan mensuel complet</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked />
                <Select defaultValue="email">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="both">Les deux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2 text-green-600" />
            Paramètres d'Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Format par défaut</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compression</label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  <SelectItem value="zip">ZIP</SelectItem>
                  <SelectItem value="rar">RAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Inclure les données sensibles</h4>
                <p className="text-sm text-text-muted">Exporter les informations confidentielles</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Horodatage automatique</h4>
                <p className="text-sm text-text-muted">Ajouter la date dans le nom de fichier</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Modèles de Rapports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Activité Médicale', icon: Users, description: 'Consultations, patients, statistiques' },
              { name: 'Rapport Financier', icon: DollarSign, description: 'Revenus, dépenses, bénéfices' },
              { name: 'Gestion du Temps', icon: Clock, description: 'Horaires, temps de consultation' },
              { name: 'Rapport Personnalisé', icon: FileText, description: 'Modèle configurable' }
            ].map((template) => (
              <div key={template.name} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <template.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-medium">{template.name}</h4>
                </div>
                <p className="text-sm text-text-muted mb-3">{template.description}</p>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-orange-600" />
            Paramètres de Diffusion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email par défaut</label>
              <Input type="email" placeholder="direction@cabinet.fr" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heure d'envoi</label>
              <Input type="time" defaultValue="08:00" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Destinataires supplémentaires</label>
            <div className="space-y-2">
              <Input placeholder="comptable@cabinet.fr" />
              <Button variant="outline" size="sm">Ajouter un destinataire</Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Copie de sauvegarde</h4>
                <p className="text-sm text-text-muted">Sauvegarder une copie sur le serveur</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Confirmation de lecture</h4>
                <p className="text-sm text-text-muted">Demander un accusé de réception</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSettings;
