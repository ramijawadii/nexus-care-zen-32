
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Settings,
  Percent,
  DollarSign,
  Calendar,
  Save,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';

const PayrollSettings = () => {
  const [socialRates, setSocialRates] = useState([
    { id: 'cnss', libelle: 'Cotisation CNSS', taux: 9.18, plafonned: true, plafond: 0, active: true },
    { id: 'health', libelle: 'Assurance Maladie', taux: 4.75, plafonned: false, plafond: 0, active: true },
    { id: 'retirement', libelle: 'Assurance Retraite', taux: 2.80, plafonned: true, plafond: 0, active: true },
    { id: 'unemployment', libelle: 'Assurance Chômage', taux: 1.45, plafonned: false, plafond: 0, active: false },
    { id: 'family', libelle: 'Allocations Familiales', taux: 5.40, plafonned: false, plafond: 0, active: true }
  ]);

  const [taxBrackets, setTaxBrackets] = useState([
    { tranche: 1, min: 0, max: 5000, taux: 0, description: 'Exonéré' },
    { tranche: 2, min: 5001, max: 20000, taux: 20, description: 'Taux normal' },
    { tranche: 3, min: 20001, max: 30000, taux: 30, description: 'Taux majoré' },
    { tranche: 4, min: 30001, max: 50000, taux: 35, description: 'Taux supérieur' },
    { tranche: 5, min: 50001, max: 999999, taux: 38, description: 'Taux maximum' }
  ]);

  const [companySettings, setCompanySettings] = useState({
    raisonSociale: 'Cabinet Médical des Oliviers',
    adresse: '123 Avenue de la Santé, 75013 Paris',
    siret: '12345678901234',
    codeNaf: '8610Z',
    numeroUrssaf: 'URSSAF123456',
    conventionCollective: 'Convention Collective Nationale du 15 mars 1966',
    autoCalculateCharges: true,
    autoGeneratePayslips: true,
    emailNotifications: true,
    archivageAutomatique: true
  });

  const [payrollCalendar, setPayrollCalendar] = useState({
    jourPaieMensuel: 28,
    heuresCoupure: 35,
    tauxHeuresSupp125: 25,
    tauxHeuresSupp150: 50,
    joursCongesAnnuels: 25,
    joursRTT: 10
  });

  const updateSocialRate = (id: string, field: string, value: number | boolean) => {
    setSocialRates(prev => prev.map(rate => 
      rate.id === id ? { ...rate, [field]: value } : rate
    ));
  };

  const saveSettings = () => {
    console.log('Sauvegarde des paramètres de paie...');
    // Ici on sauvegarderait en base de données
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-600" />
            Informations Entreprise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Raison Sociale</label>
              <Input 
                value={companySettings.raisonSociale}
                onChange={(e) => setCompanySettings(prev => ({ ...prev, raisonSociale: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SIRET</label>
              <Input 
                value={companySettings.siret}
                onChange={(e) => setCompanySettings(prev => ({ ...prev, siret: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Adresse</label>
              <Input 
                value={companySettings.adresse}
                onChange={(e) => setCompanySettings(prev => ({ ...prev, adresse: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Code NAF</label>
              <Input 
                value={companySettings.codeNaf}
                onChange={(e) => setCompanySettings(prev => ({ ...prev, codeNaf: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">N° URSSAF</label>
              <Input 
                value={companySettings.numeroUrssaf}
                onChange={(e) => setCompanySettings(prev => ({ ...prev, numeroUrssaf: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Security Rates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Percent className="w-5 h-5 mr-2 text-green-600" />
            Taux de Cotisations Sociales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Attention</p>
              <p>Ces taux doivent être mis à jour selon la législation en vigueur. Consultez votre expert-comptable.</p>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cotisation</TableHead>
                <TableHead className="text-right">Taux (%)</TableHead>
                <TableHead className="text-center">Plafonnée</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialRates.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.libelle}</TableCell>
                  <TableCell className="text-right">
                    <Input 
                      type="number" 
                      step="0.01" 
                      value={rate.taux}
                      onChange={(e) => updateSocialRate(rate.id, 'taux', parseFloat(e.target.value))}
                      className="w-20 text-right"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch 
                      checked={rate.plafonned}
                      onCheckedChange={(checked) => updateSocialRate(rate.id, 'plafonned', checked)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch 
                      checked={rate.active}
                      onCheckedChange={(checked) => updateSocialRate(rate.id, 'active', checked)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tax Brackets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
            Barème Impôt sur le Revenu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tranche</TableHead>
                <TableHead className="text-right">Minimum (€)</TableHead>
                <TableHead className="text-right">Maximum (€)</TableHead>
                <TableHead className="text-right">Taux (%)</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxBrackets.map((bracket) => (
                <TableRow key={bracket.tranche}>
                  <TableCell>
                    <Badge variant="outline">Tranche {bracket.tranche}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{bracket.min.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {bracket.max === 999999 ? '∞' : bracket.max.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">{bracket.taux}%</TableCell>
                  <TableCell>{bracket.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payroll Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-orange-600" />
            Paramètres Temporels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Jour de paie mensuel</label>
              <Input 
                type="number" 
                min="1" 
                max="31"
                value={payrollCalendar.jourPaieMensuel}
                onChange={(e) => setPayrollCalendar(prev => ({ ...prev, jourPaieMensuel: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heures normales/semaine</label>
              <Input 
                type="number" 
                value={payrollCalendar.heuresCoupure}
                onChange={(e) => setPayrollCalendar(prev => ({ ...prev, heuresCoupure: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Congés annuels (jours)</label>
              <Input 
                type="number" 
                value={payrollCalendar.joursCongesAnnuels}
                onChange={(e) => setPayrollCalendar(prev => ({ ...prev, joursCongesAnnuels: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Taux heures supp. 125% (%)</label>
              <Input 
                type="number" 
                value={payrollCalendar.tauxHeuresSupp125}
                onChange={(e) => setPayrollCalendar(prev => ({ ...prev, tauxHeuresSupp125: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Taux heures supp. 150% (%)</label>
              <Input 
                type="number" 
                value={payrollCalendar.tauxHeuresSupp150}
                onChange={(e) => setPayrollCalendar(prev => ({ ...prev, tauxHeuresSupp150: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jours RTT annuels</label>
              <Input 
                type="number" 
                value={payrollCalendar.joursRTT}
                onChange={(e) => setPayrollCalendar(prev => ({ ...prev, joursRTT: parseInt(e.target.value) }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres d'Automatisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Calcul automatique des charges</h4>
                <p className="text-sm text-gray-600">Applique automatiquement les taux de cotisations</p>
              </div>
              <Switch 
                checked={companySettings.autoCalculateCharges}
                onCheckedChange={(checked) => setCompanySettings(prev => ({ ...prev, autoCalculateCharges: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Génération automatique des bulletins</h4>
                <p className="text-sm text-gray-600">Crée les bulletins PDF automatiquement</p>
              </div>
              <Switch 
                checked={companySettings.autoGeneratePayslips}
                onCheckedChange={(checked) => setCompanySettings(prev => ({ ...prev, autoGeneratePayslips: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Notifications email</h4>
                <p className="text-sm text-gray-600">Envoie les bulletins aux employés par email</p>
              </div>
              <Switch 
                checked={companySettings.emailNotifications}
                onCheckedChange={(checked) => setCompanySettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Archivage automatique</h4>
                <p className="text-sm text-gray-600">Archive les bulletins pendant la durée légale</p>
              </div>
              <Switch 
                checked={companySettings.archivageAutomatique}
                onCheckedChange={(checked) => setCompanySettings(prev => ({ ...prev, archivageAutomatique: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Les modifications seront appliquées au prochain calcul de paie</span>
            </div>
            <Button onClick={saveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les Paramètres
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollSettings;
