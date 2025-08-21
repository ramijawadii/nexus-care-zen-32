
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users,
  FileText
} from 'lucide-react';

interface PayrollCalculation {
  employeeId: string;
  nom: string;
  salaireBase: number;
  heuresSupp: number;
  primes: number;
  indemnites: number;
  retenues: {
    cnss: number;
    irpp: number;
    assurance: number;
  };
  chargesPatronales: number;
  netAPayer: number;
}

interface EmployeePayrollCardProps {
  calc: PayrollCalculation;
}

const EmployeePayrollCard = ({ calc }: EmployeePayrollCardProps) => {
  return (
    <div className="p-4 border border-border-primary rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">{calc.nom}</h4>
            <p className="text-sm text-text-secondary">{calc.employeeId}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">{calc.netAPayer.toLocaleString()} €</p>
          <p className="text-sm text-text-secondary">Net à payer</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-text-secondary">Salaire Base</p>
          <p className="font-semibold text-green-600">{calc.salaireBase.toLocaleString()} €</p>
        </div>
        
        {calc.heuresSupp > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-text-secondary">Heures Supp ({calc.heuresSupp}h)</p>
            <p className="font-semibold text-blue-600">+{(calc.heuresSupp * 25).toLocaleString()} €</p>
          </div>
        )}
        
        {calc.primes > 0 && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-text-secondary">Primes</p>
            <p className="font-semibold text-purple-600">+{calc.primes.toLocaleString()} €</p>
          </div>
        )}
        
        {calc.indemnites > 0 && (
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-text-secondary">Indemnités</p>
            <p className="font-semibold text-orange-600">+{calc.indemnites.toLocaleString()} €</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-text-secondary">CNSS</p>
          <p className="font-semibold text-red-600">-{calc.retenues.cnss.toLocaleString()} €</p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-text-secondary">IRPP</p>
          <p className="font-semibold text-red-600">-{calc.retenues.irpp.toLocaleString()} €</p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm text-text-secondary">Assurance</p>
          <p className="font-semibold text-red-600">-{calc.retenues.assurance.toLocaleString()} €</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-text-secondary">Charges Patronales</p>
          <p className="font-semibold text-gray-600">{calc.chargesPatronales.toLocaleString()} €</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="ghost" size="sm">Modifier</Button>
        <Button variant="ghost" size="sm">
          <FileText className="w-4 h-4 mr-1" />
          Bulletin
        </Button>
      </div>
    </div>
  );
};

export default EmployeePayrollCard;
