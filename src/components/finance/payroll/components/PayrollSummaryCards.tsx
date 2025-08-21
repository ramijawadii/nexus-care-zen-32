
import { Card, CardContent } from '@/components/ui/card';
import { 
  DollarSign,
  TrendingDown,
  TrendingUp,
  Calculator
} from 'lucide-react';

interface PayrollSummaryCardsProps {
  totalBrut: number;
  totalRetenues: number;
  totalChargesPatronales: number;
  totalNet: number;
}

const PayrollSummaryCards = ({ 
  totalBrut, 
  totalRetenues, 
  totalChargesPatronales, 
  totalNet 
}: PayrollSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Total Brut</p>
              <p className="text-xl font-bold text-text-primary">
                {totalBrut.toLocaleString()} €
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <TrendingDown className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Total Retenues</p>
              <p className="text-xl font-bold text-text-primary">
                {totalRetenues.toLocaleString()} €
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Charges Patronales</p>
              <p className="text-xl font-bold text-text-primary">
                {totalChargesPatronales.toLocaleString()} €
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-text-secondary">Total Net</p>
              <p className="text-xl font-bold text-text-primary">
                {totalNet.toLocaleString()} €
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollSummaryCards;
