
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings,
  Clock,
  Calendar,
  Bell,
  Users,
  Shield,
  Save
} from 'lucide-react';

const EmployeeSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Paramètres Employés</h3>
          <p className="text-text-muted">Configuration générale du système de gestion des employés</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Working Hours Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Horaires de Travail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Heure de début standard</label>
              <Input type="time" defaultValue="08:00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heure de fin standard</label>
              <Input type="time" defaultValue="17:00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Durée pause déjeuner (minutes)</label>
              <Input type="number" defaultValue="60" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heures par semaine</label>
              <Input type="number" defaultValue="35" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Heures supplémentaires automatiques</h4>
                <p className="text-sm text-text-muted">Calculer automatiquement les heures sup après 35h/semaine</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Pointage flexible</h4>
                <p className="text-sm text-text-muted">Autoriser ±15 minutes sans pénalité</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Pause obligatoire</h4>
                <p className="text-sm text-text-muted">Forcer la pause après 6h de travail</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Management Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Gestion des Congés
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Congés payés annuels</label>
              <Input type="number" defaultValue="25" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Congés maladie annuels</label>
              <Input type="number" defaultValue="10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Préavis minimum (jours)</label>
              <Input type="number" defaultValue="7" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Approbation automatique</h4>
                <p className="text-sm text-text-muted">Approuver automatiquement certains types de congés</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Report des congés non pris</h4>
                <p className="text-sm text-text-muted">Autoriser le report sur l'année suivante</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Congés fractionnés</h4>
                <p className="text-sm text-text-muted">Autoriser les demi-journées</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Types de congés personnalisés</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input placeholder="Formation professionnelle" />
                <Button variant="outline" size="sm">Ajouter</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            Notifications & Alertes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notifications de retard</h4>
                <p className="text-sm text-text-muted">Alerter après 15 minutes de retard</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Rappels de pointage</h4>
                <p className="text-sm text-text-muted">Rappeler aux employés de pointer</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Alertes heures supplémentaires</h4>
                <p className="text-sm text-text-muted">Notifier en cas de dépassement</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Demandes de congé en attente</h4>
                <p className="text-sm text-text-muted">Notifier les managers</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email des notifications</label>
              <Input type="email" placeholder="rh@cabinet.fr" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fréquence des rapports</label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-600" />
            Sécurité & Accès
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Géolocalisation obligatoire</h4>
                <p className="text-sm text-text-muted">Vérifier la position lors du pointage</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Photo lors du pointage</h4>
                <p className="text-sm text-text-muted">Prendre une photo de vérification</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Modification des pointages</h4>
                <p className="text-sm text-text-muted">Autoriser les employés à corriger leurs heures</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rayon de géolocalisation (mètres)</label>
              <Input type="number" defaultValue="100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Délai de modification (heures)</label>
              <Input type="number" defaultValue="24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-red-600" />
            Données & Confidentialité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Conservation des données</h4>
                <p className="text-sm text-text-muted">Durée de conservation des pointages</p>
              </div>
              <Select defaultValue="3years">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1year">1 an</SelectItem>
                  <SelectItem value="3years">3 ans</SelectItem>
                  <SelectItem value="5years">5 ans</SelectItem>
                  <SelectItem value="10years">10 ans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Exportation des données</h4>
                <p className="text-sm text-text-muted">Permettre aux employés d'exporter leurs données</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Anonymisation automatique</h4>
                <p className="text-sm text-text-muted">Anonymiser les données après départ</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeSettings;
