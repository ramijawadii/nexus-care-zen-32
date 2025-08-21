
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  User,
  Download,
  FileText,
  CreditCard,
  Calendar,
  DollarSign,
  MessageSquare,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';

const EmployeePortal = () => {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [advanceRequest, setAdvanceRequest] = useState({ amount: '', reason: '', urgency: 'normal' });

  const employee = {
    nom: 'Dr. Sarah Johnson',
    fonction: 'Médecin Généraliste',
    dateEmbauche: '2020-01-15',
    salaireBrut: 4200,
    derniereConnexion: '2024-02-15'
  };

  const payslips = [
    {
      id: 'PAY-202402-001',
      mois: '2024-02',
      brut: 4900.00,
      net: 3852.00,
      statut: 'validé',
      dateCreation: '2024-02-28'
    },
    {
      id: 'PAY-202401-001', 
      mois: '2024-01',
      brut: 4200.00,
      net: 3425.00,
      statut: 'validé',
      dateCreation: '2024-01-31'
    },
    {
      id: 'PAY-202312-001',
      mois: '2023-12', 
      brut: 4500.00,
      net: 3650.00,
      statut: 'validé',
      dateCreation: '2023-12-29'
    }
  ];

  const leaveBalance = {
    congesPayes: { acquis: 25, pris: 12, restant: 13 },
    rtt: { acquis: 10, pris: 4, restant: 6 },
    congesMaladie: { utilise: 2, limite: 60 }
  };

  const advanceHistory = [
    {
      id: 'ADV-001',
      montant: 500,
      motif: 'Frais médicaux urgents',
      datedemande: '2024-01-15',
      statut: 'approuvé',
      dateRemboursement: '2024-02-28'
    },
    {
      id: 'ADV-002',
      montant: 800,
      motif: 'Achat équipement médical',
      datedemande: '2024-02-01',
      statut: 'en_cours',
      dateRemboursement: null
    }
  ];

  const submitAdvanceRequest = () => {
    console.log('Demande d\'avance soumise:', advanceRequest);
    setAdvanceRequest({ amount: '', reason: '', urgency: 'normal' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validé': return 'bg-green-100 text-green-800';
      case 'approuvé': return 'bg-green-100 text-green-800';
      case 'en_cours': return 'bg-orange-100 text-orange-800';
      case 'refusé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Bienvenue, {employee.nom}</CardTitle>
                <p className="text-sm text-gray-600">
                  {employee.fonction} • Embauché le {new Date(employee.dateEmbauche).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{employee.salaireBrut.toLocaleString()} €</p>
              <p className="text-sm text-gray-600">Salaire de base</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Bulletins</p>
                <p className="text-xl font-bold">{payslips.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Congés restants</p>
                <p className="text-xl font-bold">{leaveBalance.congesPayes.restant} jours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">RTT restants</p>
                <p className="text-xl font-bold">{leaveBalance.rtt.restant} jours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Dernier net</p>
                <p className="text-xl font-bold">{payslips[0]?.net.toLocaleString()} €</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payslips Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Mes Bulletins de Paie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Période</TableHead>
                <TableHead className="text-right">Brut</TableHead>
                <TableHead className="text-right">Net</TableHead>
                <TableHead className="text-center">Statut</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell className="font-medium">
                    {new Date(payslip.mois).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="text-right">{payslip.brut.toLocaleString()} €</TableCell>
                  <TableCell className="text-right font-semibold">{payslip.net.toLocaleString()} €</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(payslip.statut)}>{payslip.statut}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Leave Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Solde de Congés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Congés Payés</h4>
              <div className="space-y-1 text-sm">
                <p>Acquis: {leaveBalance.congesPayes.acquis} jours</p>
                <p>Pris: {leaveBalance.congesPayes.pris} jours</p>
                <p className="font-bold">Restant: {leaveBalance.congesPayes.restant} jours</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">RTT</h4>
              <div className="space-y-1 text-sm">
                <p>Acquis: {leaveBalance.rtt.acquis} jours</p>
                <p>Pris: {leaveBalance.rtt.pris} jours</p>
                <p className="font-bold">Restant: {leaveBalance.rtt.restant} jours</p>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Congés Maladie</h4>
              <div className="space-y-1 text-sm">
                <p>Utilisé cette année: {leaveBalance.congesMaladie.utilise} jours</p>
                <p>Limite annuelle: {leaveBalance.congesMaladie.limite} jours</p>
                <p className="font-bold">Disponible: {leaveBalance.congesMaladie.limite - leaveBalance.congesMaladie.utilise} jours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advance Request */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
              Demande d'Avance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Montant demandé (€)</label>
                <Input 
                  type="number"
                  placeholder="Ex: 500"
                  value={advanceRequest.amount}
                  onChange={(e) => setAdvanceRequest(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Motif de la demande</label>
                <Textarea 
                  placeholder="Décrivez brièvement le motif de votre demande..."
                  value={advanceRequest.reason}
                  onChange={(e) => setAdvanceRequest(prev => ({ ...prev, reason: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Urgence</label>
                <select 
                  value={advanceRequest.urgency}
                  onChange={(e) => setAdvanceRequest(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="normal">Normal (traitement sous 5 jours)</option>
                  <option value="urgent">Urgent (traitement sous 48h)</option>
                  <option value="emergency">Urgence médicale (traitement immédiat)</option>
                </select>
              </div>

              <Button onClick={submitAdvanceRequest} className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Soumettre la Demande
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique des Avances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {advanceHistory.map((advance) => (
                <div key={advance.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{advance.montant.toLocaleString()} €</p>
                      <p className="text-sm text-gray-600">{advance.motif}</p>
                    </div>
                    <Badge className={getStatusColor(advance.statut)}>
                      {advance.statut.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    Demandé le {new Date(advance.datedemande).toLocaleDateString()}
                    {advance.dateRemboursement && 
                      ` • Remboursé le ${new Date(advance.dateRemboursement).toLocaleDateString()}`
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePortal;
