
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Stethoscope,
  FileText,
  Calendar,
  Clock,
  AlertTriangle,
  Pill,
  Users,
  Shield,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

const MedicalSettings = () => {
  const [appointmentSettings, setAppointmentSettings] = useState({
    defaultDuration: 30,
    bufferTime: 15,
    maxBookingAdvance: 60,
    cancellationDeadline: 24,
    overbookingAllowed: false,
    reminderEnabled: true,
    reminderTime: 24
  });

  const [specialties, setSpecialties] = useState([
    { id: 1, name: 'Médecine Générale', code: 'MG', duration: 30, price: 25, active: true },
    { id: 2, name: 'Cardiologie', code: 'CARDIO', duration: 45, price: 50, active: true },
    { id: 3, name: 'Dermatologie', code: 'DERMATO', duration: 30, price: 40, active: true },
    { id: 4, name: 'Pédiatrie', code: 'PEDIATRIE', duration: 30, price: 30, active: false }
  ]);

  const [prescriptionSettings, setPrescriptionSettings] = useState({
    electronicSignature: true,
    drugInteractionCheck: true,
    allergyCheck: true,
    posologyValidation: true,
    automaticRenewal: false,
    validityPeriod: 365
  });

  const [complianceSettings, setComplianceSettings] = useState({
    gdprCompliance: true,
    dataRetention: 20,
    auditTrail: true,
    encryptionEnabled: true,
    accessLogging: true,
    backupEncryption: true
  });

  return (
    <div className="space-y-6">
      {/* Appointment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Paramètres Rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Durée par défaut (min)</label>
              <Input 
                type="number"
                value={appointmentSettings.defaultDuration}
                onChange={(e) => setAppointmentSettings(prev => ({ ...prev, defaultDuration: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Temps tampon (min)</label>
              <Input 
                type="number"
                value={appointmentSettings.bufferTime}
                onChange={(e) => setAppointmentSettings(prev => ({ ...prev, bufferTime: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Réservation max (jours)</label>
              <Input 
                type="number"
                value={appointmentSettings.maxBookingAdvance}
                onChange={(e) => setAppointmentSettings(prev => ({ ...prev, maxBookingAdvance: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Surbooking autorisé</h4>
                <p className="text-sm text-text-muted">Permettre plus de RDV que la capacité</p>
              </div>
              <Switch 
                checked={appointmentSettings.overbookingAllowed}
                onCheckedChange={(checked) => setAppointmentSettings(prev => ({ ...prev, overbookingAllowed: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Rappels automatiques</h4>
                <p className="text-sm text-text-muted">SMS/Email avant rendez-vous</p>
              </div>
              <Switch 
                checked={appointmentSettings.reminderEnabled}
                onCheckedChange={(checked) => setAppointmentSettings(prev => ({ ...prev, reminderEnabled: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Specialties */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
              Spécialités Médicales
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Spécialité
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Spécialité</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="text-right">Durée (min)</TableHead>
                <TableHead className="text-right">Tarif (€)</TableHead>
                <TableHead className="text-center">Statut</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialties.map((specialty) => (
                <TableRow key={specialty.id}>
                  <TableCell className="font-medium">{specialty.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{specialty.code}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{specialty.duration}</TableCell>
                  <TableCell className="text-right">{specialty.price}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={specialty.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {specialty.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Prescription Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="w-5 h-5 mr-2 text-purple-600" />
            Paramètres Prescriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Signature électronique</h4>
                <p className="text-sm text-text-muted">Signature numérique des ordonnances</p>
              </div>
              <Switch 
                checked={prescriptionSettings.electronicSignature}
                onCheckedChange={(checked) => setPrescriptionSettings(prev => ({ ...prev, electronicSignature: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Vérification interactions</h4>
                <p className="text-sm text-text-muted">Contrôle automatique des interactions médicamenteuses</p>
              </div>
              <Switch 
                checked={prescriptionSettings.drugInteractionCheck}
                onCheckedChange={(checked) => setPrescriptionSettings(prev => ({ ...prev, drugInteractionCheck: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Contrôle allergies</h4>
                <p className="text-sm text-text-muted">Vérification des allergies connues</p>
              </div>
              <Switch 
                checked={prescriptionSettings.allergyCheck}
                onCheckedChange={(checked) => setPrescriptionSettings(prev => ({ ...prev, allergyCheck: checked }))}
              />
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Durée de validité (jours)</label>
              <Input 
                type="number"
                value={prescriptionSettings.validityPeriod}
                onChange={(e) => setPrescriptionSettings(prev => ({ ...prev, validityPeriod: parseInt(e.target.value) }))}
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600" />
            Conformité & Sécurité Médicale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Conformité RGPD</h4>
                <p className="text-sm text-text-muted">Respect des règles de protection des données</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Conforme</Badge>
                <Switch checked={complianceSettings.gdprCompliance} />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Journal d'audit</h4>
                <p className="text-sm text-text-muted">Traçabilité de tous les accès aux dossiers</p>
              </div>
              <Switch 
                checked={complianceSettings.auditTrail}
                onCheckedChange={(checked) => setComplianceSettings(prev => ({ ...prev, auditTrail: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
              <div>
                <h4 className="font-medium">Chiffrement des données</h4>
                <p className="text-sm text-text-muted">Chiffrement AES-256 des données sensibles</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
                <Switch checked={complianceSettings.encryptionEnabled} />
              </div>
            </div>

            <div className="p-3 border border-border-primary rounded-lg">
              <label className="block text-sm font-medium mb-2">Rétention des données (années)</label>
              <Input 
                type="number"
                value={complianceSettings.dataRetention}
                onChange={(e) => setComplianceSettings(prev => ({ ...prev, dataRetention: parseInt(e.target.value) }))}
                className="w-32"
              />
              <p className="text-xs text-text-muted mt-1">Durée légale de conservation des dossiers médicaux</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates & Forms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-600" />
            Modèles & Formulaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border-primary rounded-lg">
              <h4 className="font-medium mb-2">Ordonnances</h4>
              <p className="text-sm text-text-muted mb-3">Modèles d'ordonnances personnalisables</p>
              <Button variant="outline" size="sm">Gérer les modèles</Button>
            </div>
            
            <div className="p-4 border border-border-primary rounded-lg">
              <h4 className="font-medium mb-2">Certificats médicaux</h4>
              <p className="text-sm text-text-muted mb-3">Templates pour certificats d'arrêt, sport, etc.</p>
              <Button variant="outline" size="sm">Gérer les modèles</Button>
            </div>
            
            <div className="p-4 border border-border-primary rounded-lg">
              <h4 className="font-medium mb-2">Courriers de sortie</h4>
              <p className="text-sm text-text-muted mb-3">Modèles de courriers vers confrères</p>
              <Button variant="outline" size="sm">Gérer les modèles</Button>
            </div>
            
            <div className="p-4 border border-border-primary rounded-lg">
              <h4 className="font-medium mb-2">Consentements</h4>
              <p className="text-sm text-text-muted mb-3">Formulaires de consentement éclairé</p>
              <Button variant="outline" size="sm">Gérer les modèles</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalSettings;
