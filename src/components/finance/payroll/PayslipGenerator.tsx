
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText,
  Download,
  Mail,
  Calendar,
  Building,
  User,
  CreditCard,
  Printer
} from 'lucide-react';

const PayslipGenerator = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('EMP-001');
  const [selectedMonth, setSelectedMonth] = useState('2024-02');

  const cabinetInfo = {
    nom: 'Cabinet Médical des Oliviers',
    adresse: '123 Avenue de la Santé, 75013 Paris',
    telephone: '+33 1 42 34 56 78',
    siret: '12345678901234',
    numeroFiscal: 'FR12345678901'
  };

  const employee = {
    id: 'EMP-001',
    nom: 'Johnson',
    prenom: 'Dr. Sarah',
    fonction: 'Médecin Généraliste',
    numeroSecu: '1234567890123',
    numeroFiscal: 'ABC123456',
    dateEmbauche: '2020-01-15',
    typeContrat: 'CDI',
    modePaiement: 'Virement bancaire',
    rib: 'FR76 1234 5678 9012 3456 789'
  };

  const salaryComponents = [
    { libelle: 'Salaire de base', type: 'brut', montant: 4200.00, taux: null, retenue: 0 },
    { libelle: 'Heures supplémentaires (8h)', type: 'brut', montant: 200.00, taux: null, retenue: 0 },
    { libelle: 'Prime de performance', type: 'brut', montant: 500.00, taux: null, retenue: 0 },
    { libelle: 'Indemnité transport', type: 'brut', montant: 150.00, taux: null, retenue: 0 },
    { libelle: 'Cotisation CNSS', type: 'retenue', montant: 5050.00, taux: 9.18, retenue: 463.59 },
    { libelle: 'Assurance maladie', type: 'retenue', montant: 5050.00, taux: 4.75, retenue: 239.88 },
    { libelle: 'Assurance retraite', type: 'retenue', montant: 5050.00, taux: 2.80, retenue: 141.40 },
    { libelle: 'Impôt sur le revenu', type: 'retenue', montant: 5050.00, taux: 0, retenue: 520.00 },
    { libelle: 'TVA sur primes', type: 'retenue', montant: 500.00, taux: 19.00, retenue: 95.00 }
  ];

  const calculateTotals = () => {
    const totalBrut = salaryComponents
      .filter(c => c.type === 'brut')
      .reduce((sum, c) => sum + c.montant, 0);
    
    const totalRetenues = salaryComponents
      .filter(c => c.type === 'retenue')
      .reduce((sum, c) => sum + c.retenue, 0);
    
    const netImposable = totalBrut - salaryComponents
      .filter(c => c.libelle.includes('CNSS') || c.libelle.includes('Assurance'))
      .reduce((sum, c) => sum + c.retenue, 0);
    
    const netAPayer = totalBrut - totalRetenues;

    return { totalBrut, totalRetenues, netImposable, netAPayer };
  };

  const totals = calculateTotals();
  const bulletinNumber = `PAY-${selectedMonth.replace('-', '')}-${employee.id}`;

  const generatePDF = () => {
    console.log('Génération PDF du bulletin de paie...');
    // Ici on intégrerait une librairie PDF comme jsPDF ou react-pdf
  };

  const sendByEmail = () => {
    console.log('Envoi par email...');
    // Intégration avec service email
  };

  return (
    <div className="space-y-6">
      {/* Employee Selection */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Génération Bulletin de Paie
            </CardTitle>
            <div className="flex space-x-2">
              <select 
                value={selectedEmployee} 
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="EMP-001">Dr. Sarah Johnson</option>
                <option value="EMP-002">Maria Rodriguez</option>
              </select>
              <input 
                type="month" 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Payslip Preview */}
      <Card>
        <CardHeader className="bg-blue-50">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold">{cabinetInfo.nom}</h2>
              </div>
              <p className="text-sm text-gray-600">{cabinetInfo.adresse}</p>
              <p className="text-sm text-gray-600">Tél: {cabinetInfo.telephone}</p>
              <p className="text-sm text-gray-600">SIRET: {cabinetInfo.siret}</p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-semibold">BULLETIN DE PAIE</h3>
              <p className="text-sm text-gray-600">Période: {new Date(selectedMonth).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
              <p className="text-sm text-gray-600">N° {bulletinNumber}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Employee Info */}
          <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Informations Employé
              </h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Nom:</span> {employee.nom}</p>
                <p><span className="font-medium">Prénom:</span> {employee.prenom}</p>
                <p><span className="font-medium">Fonction:</span> {employee.fonction}</p>
                <p><span className="font-medium">N° CNSS:</span> {employee.numeroSecu}</p>
                <p><span className="font-medium">N° Fiscal:</span> {employee.numeroFiscal}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Informations Contrat
              </h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Date d'embauche:</span> {new Date(employee.dateEmbauche).toLocaleDateString()}</p>
                <p><span className="font-medium">Type de contrat:</span> {employee.typeContrat}</p>
                <p><span className="font-medium">Mode de paiement:</span> {employee.modePaiement}</p>
                <p><span className="font-medium">RIB:</span> {employee.rib}</p>
              </div>
            </div>
          </div>

          {/* Salary Table */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Détail des Rémunérations et Retenues</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Base</TableHead>
                  <TableHead className="text-right">Taux (%)</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryComponents.map((component, index) => (
                  <TableRow key={index} className={component.type === 'retenue' ? 'bg-red-50' : 'bg-green-50'}>
                    <TableCell className="font-medium">
                      {component.libelle}
                      {component.type === 'retenue' && <Badge variant="outline" className="ml-2 text-xs">Retenue</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      {component.type === 'brut' ? `${component.montant.toFixed(2)} €` : 
                       component.type === 'retenue' && component.montant > 0 ? `${component.montant.toFixed(2)} €` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {component.taux ? `${component.taux}%` : '-'}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {component.type === 'brut' ? 
                        `+${component.montant.toFixed(2)} €` : 
                        `-${component.retenue.toFixed(2)} €`
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Total Brut:</span>
                <span className="font-bold text-green-600">{totals.totalBrut.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Retenues:</span>
                <span className="font-bold text-red-600">-{totals.totalRetenues.toFixed(2)} €</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Net Imposable:</span>
                <span className="font-bold">{totals.netImposable.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-lg border-t pt-2">
                <span className="font-bold">NET À PAYER:</span>
                <span className="font-bold text-blue-600">{totals.netAPayer.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Date de paiement: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="text-sm text-gray-600">
                Ce bulletin annule et remplace tout bulletin antérieur pour la même période.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={generatePDF}>
                <Download className="w-4 h-4 mr-2" />
                Télécharger PDF
              </Button>
              <Button variant="outline" onClick={sendByEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Envoyer par Email
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimer
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost">Brouillon</Button>
              <Button>Valider & Archiver</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayslipGenerator;
