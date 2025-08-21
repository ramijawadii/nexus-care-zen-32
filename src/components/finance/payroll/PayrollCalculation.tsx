
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator,
  FileText,
  TrendingUp
} from 'lucide-react';
import PayrollSummaryCards from './components/PayrollSummaryCards';
import EmployeePayrollCard from './components/EmployeePayrollCard';

const PayrollCalculation = () => {
  const payrollCalculations = [
    {
      employeeId: 'EMP-001',
      nom: 'Dr. Sarah Johnson',
      salaireBase: 4200,
      heuresSupp: 8,
      primes: 500,
      indemnites: 200,
      retenues: {
        cnss: 378,
        irpp: 520,
        assurance: 150
      },
      chargesPatronales: 1176,
      netAPayer: 3852
    },
    {
      employeeId: 'EMP-002',
      nom: 'Maria Rodriguez',
      salaireBase: 2100,
      heuresSupp: 4,
      primes: 150,
      indemnites: 100,
      retenues: {
        cnss: 189,
        irpp: 210,
        assurance: 75
      },
      chargesPatronales: 588,
      netAPayer: 1876
    }
  ];

  const totalCalculations = {
    totalBrut: payrollCalculations.reduce((sum, calc) => sum + calc.salaireBase + (calc.primes || 0) + (calc.indemnites || 0), 0),
    totalRetenues: payrollCalculations.reduce((sum, calc) => sum + calc.retenues.cnss + calc.retenues.irpp + calc.retenues.assurance, 0),
    totalChargesPatronales: payrollCalculations.reduce((sum, calc) => sum + calc.chargesPatronales, 0),
    totalNet: payrollCalculations.reduce((sum, calc) => sum + calc.netAPayer, 0)
  };

  return (
    <div className="space-y-6">
      {/* Calculation Summary */}
      <PayrollSummaryCards {...totalCalculations} />

      {/* Individual Calculations */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Calculs Individuels - Février 2024</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Valider Tout
              </Button>
              <Button size="sm">
                <Calculator className="w-4 h-4 mr-2" />
                Recalculer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollCalculations.map((calc) => (
              <EmployeePayrollCard key={calc.employeeId} calc={calc} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax and Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>TVA & Fiscalité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">TVA sur Primes</h3>
              <p className="text-2xl font-bold text-blue-600">125 €</p>
              <p className="text-sm text-text-muted">Ce mois</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Déclarations Auto</h3>
              <p className="text-sm text-green-600">CNSS, IRPP générés</p>
              <Button variant="outline" size="sm" className="mt-2">Valider</Button>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-2">Export Comptable</h3>
              <p className="text-sm text-purple-600">Écritures prêtes</p>
              <Button variant="outline" size="sm" className="mt-2">Exporter</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollCalculation;
