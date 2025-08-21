
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Languages,
  Shield,
  Save
} from 'lucide-react';
import { useState } from 'react';

const GeneralSettings = () => {
  const [clinicInfo, setClinicInfo] = useState({
    name: 'Cabinet Médical des Oliviers',
    legalName: 'SAS Cabinet Médical des Oliviers',
    address: '123 Avenue de la Santé',
    city: 'Paris',
    postalCode: '75013',
    country: 'France',
    phone: '+33 1 45 67 89 10',
    fax: '+33 1 45 67 89 11',
    email: 'contact@cabinet-oliviers.fr',
    website: 'www.cabinet-oliviers.fr',
    siret: '12345678901234',
    naf: '8610Z',
    tva: 'FR12345678901',
    logo: null
  });

  const [operationalSettings, setOperationalSettings] = useState({
    timezone: 'Europe/Paris',
    language: 'fr',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    weekStart: 'monday',
    fiscalYearStart: 'january'
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    sessionTimeout: 30,
    maintenanceMode: false,
    debugMode: false,
    analyticsEnabled: true,
    crashReporting: true
  });

  return (
    <div className="space-y-6">
      {/* Clinic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-blue-600" />
            Informations du Cabinet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom du Cabinet</label>
              <Input 
                value={clinicInfo.name}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Raison Sociale</label>
              <Input 
                value={clinicInfo.legalName}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, legalName: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Adresse</label>
              <Input 
                value={clinicInfo.address}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ville</label>
              <Input 
                value={clinicInfo.city}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Code Postal</label>
              <Input 
                value={clinicInfo.postalCode}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, postalCode: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <Input 
                value={clinicInfo.phone}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input 
                type="email"
                value={clinicInfo.email}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SIRET</label>
              <Input 
                value={clinicInfo.siret}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, siret: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Code NAF</label>
              <Input 
                value={clinicInfo.naf}
                onChange={(e) => setClinicInfo(prev => ({ ...prev, naf: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Paramètres Opérationnels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fuseau Horaire</label>
              <Select value={operationalSettings.timezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Langue</label>
              <Select value={operationalSettings.language}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Devise</label>
              <Select value={operationalSettings.currency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar ($)</SelectItem>
                  <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Format de Date</label>
              <Select value={operationalSettings.dateFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Format d'Heure</label>
              <Select value={operationalSettings.timeFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 heures</SelectItem>
                  <SelectItem value="12h">12 heures (AM/PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Début de Semaine</label>
              <Select value={operationalSettings.weekStart}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Lundi</SelectItem>
                  <SelectItem value="sunday">Dimanche</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-600" />
            Paramètres Système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Sauvegarde Automatique</h4>
                <p className="text-sm text-text-muted">Sauvegarde quotidienne des données</p>
              </div>
              <Switch 
                checked={systemSettings.autoBackup}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoBackup: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Analytics</h4>
                <p className="text-sm text-text-muted">Collecte des données d'utilisation</p>
              </div>
              <Switch 
                checked={systemSettings.analyticsEnabled}
                onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, analyticsEnabled: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Mode Maintenance</h4>
                <p className="text-sm text-text-muted">Désactive l'accès utilisateurs</p>
              </div>
              <div className="flex items-center space-x-2">
                {systemSettings.maintenanceMode && (
                  <Badge variant="destructive">Actif</Badge>
                )}
                <Switch 
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Timeout Session (minutes)</label>
              <Input 
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-end">
            <Button className="w-full md:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les Paramètres
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
