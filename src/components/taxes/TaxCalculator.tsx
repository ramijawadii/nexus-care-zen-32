import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator,
  DollarSign,
  Percent,
  TrendingUp,
  FileText,
  Info,
  Save
} from 'lucide-react';

interface CalculationResult {
  baseAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  deductions?: number;
  netTaxable?: number;
}

interface TaxCalculatorProps {
  onCalculationComplete: (result: CalculationResult) => void;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ onCalculationComplete }) => {
  const [calculationType, setCalculationType] = useState('vat');
  const [formData, setFormData] = useState({
    amount: '',
    taxRate: '19',
    deductions: '',
    period: 'monthly',
    medicalSpecialty: 'general',
    professionalExpenses: '',
    equipmentPurchases: ''
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [savedCalculations, setSavedCalculations] = useState<Array<CalculationResult & { date: string; type: string }>>([]);

  // Tax rates for medical profession in Tunisia
  const taxRates = {
    vat: {
      'normal': 19,
      'reduced': 13,
      'super_reduced': 7,
      'exempt': 0
    },
    income: {
      'tranche1': 0,    // 0 - 5000 DT
      'tranche2': 26,   // 5001 - 20000 DT
      'tranche3': 28,   // 20001 - 30000 DT
      'tranche4': 32,   // 30001 - 50000 DT
      'tranche5': 35    // > 50000 DT
    },
    social: {
      'cnss_employee': 9.18,
      'cnss_employer': 16.57,
      'total': 25.75
    }
  };

  const medicalServices = {
    'general': { baseRate: 19, description: 'Médecine générale' },
    'specialist': { baseRate: 19, description: 'Médecine spécialisée' },
    'surgery': { baseRate: 19, description: 'Chirurgie' },
    'dentistry': { baseRate: 19, description: 'Dentisterie' },
    'pharmacy': { baseRate: 19, description: 'Pharmacie' }
  };

  const calculateVAT = () => {
    const amount = parseFloat(formData.amount) || 0;
    const rate = parseFloat(formData.taxRate) || 0;
    const deductions = parseFloat(formData.deductions) || 0;
    
    const netTaxable = amount - deductions;
    const taxAmount = (netTaxable * rate) / 100;
    
    return {
      baseAmount: amount,
      taxRate: rate,
      taxAmount,
      totalAmount: amount + taxAmount,
      deductions,
      netTaxable
    };
  };

  const calculateIncomeTax = () => {
    const grossIncome = parseFloat(formData.amount) || 0;
    const deductions = parseFloat(formData.professionalExpenses) || 0;
    const netIncome = grossIncome - deductions;
    
    let taxAmount = 0;
    let remaining = netIncome;
    
    // Progressive tax calculation
    if (remaining > 5000) {
      const taxable1 = Math.min(remaining - 5000, 15000);
      taxAmount += taxable1 * 0.26;
      remaining -= taxable1 + 5000;
      
      if (remaining > 0) {
        const taxable2 = Math.min(remaining, 10000);
        taxAmount += taxable2 * 0.28;
        remaining -= taxable2;
        
        if (remaining > 0) {
          const taxable3 = Math.min(remaining, 20000);
          taxAmount += taxable3 * 0.32;
          remaining -= taxable3;
          
          if (remaining > 0) {
            taxAmount += remaining * 0.35;
          }
        }
      }
    }
    
    return {
      baseAmount: grossIncome,
      taxRate: netIncome > 0 ? (taxAmount / netIncome) * 100 : 0,
      taxAmount,
      totalAmount: grossIncome,
      deductions,
      netTaxable: netIncome
    };
  };

  const calculateSocialContributions = () => {
    const salary = parseFloat(formData.amount) || 0;
    const employeeContribution = salary * 0.0918;
    const employerContribution = salary * 0.1657;
    const totalContribution = employeeContribution + employerContribution;
    
    return {
      baseAmount: salary,
      taxRate: 25.75,
      taxAmount: totalContribution,
      totalAmount: salary + employerContribution,
      deductions: 0,
      netTaxable: salary
    };
  };

  const handleCalculate = () => {
    let calculationResult: CalculationResult;
    
    switch (calculationType) {
      case 'vat':
        calculationResult = calculateVAT();
        break;
      case 'income':
        calculationResult = calculateIncomeTax();
        break;
      case 'social':
        calculationResult = calculateSocialContributions();
        break;
      default:
        return;
    }
    
    setResult(calculationResult);
    onCalculationComplete(calculationResult);
  };

  const saveCalculation = () => {
    if (result) {
      const savedCalc = {
        ...result,
        date: new Date().toISOString(),
        type: calculationType
      };
      setSavedCalculations(prev => [savedCalc, ...prev.slice(0, 9)]); // Keep last 10
    }
  };

  useEffect(() => {
    if (formData.amount) {
      handleCalculate();
    }
  }, [formData, calculationType]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculateur Fiscal Médical
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={calculationType} onValueChange={setCalculationType} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vat">TVA</TabsTrigger>
              <TabsTrigger value="income">Impôt sur le Revenu</TabsTrigger>
              <TabsTrigger value="social">Cotisations Sociales</TabsTrigger>
            </TabsList>

            <TabsContent value="vat" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Montant HT (DT)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Montant hors taxes"
                    />
                  </div>

                  <div>
                    <Label htmlFor="taxRate">Taux de TVA</Label>
                    <Select value={formData.taxRate} onValueChange={(value) => setFormData(prev => ({ ...prev, taxRate: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="19">19% - Taux normal</SelectItem>
                        <SelectItem value="13">13% - Taux réduit</SelectItem>
                        <SelectItem value="7">7% - Taux super réduit</SelectItem>
                        <SelectItem value="0">0% - Exonéré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="deductions">TVA Déductible (DT)</Label>
                    <Input
                      id="deductions"
                      type="number"
                      step="0.01"
                      value={formData.deductions}
                      onChange={(e) => setFormData(prev => ({ ...prev, deductions: e.target.value }))}
                      placeholder="TVA sur achats déductibles"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialty">Spécialité Médicale</Label>
                    <Select value={formData.medicalSpecialty} onValueChange={(value) => setFormData(prev => ({ ...prev, medicalSpecialty: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(medicalServices).map(([key, service]) => (
                          <SelectItem key={key} value={key}>
                            {service.description} - {service.baseRate}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Real-time calculation display */}
                {result && (
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Résultat du Calcul TVA
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Montant HT:</span>
                        <span className="font-semibold">{result.baseAmount.toFixed(2)} DT</span>
                      </div>
                      {result.deductions > 0 && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">TVA Déductible:</span>
                          <span className="font-semibold text-green-600">-{result.deductions.toFixed(2)} DT</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-text-secondary">TVA ({result.taxRate}%):</span>
                        <span className="font-semibold text-blue-600">{result.taxAmount.toFixed(2)} DT</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total TTC:</span>
                        <span className="font-bold text-blue-700">{result.totalAmount.toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">TVA Nette à Payer:</span>
                        <span className="font-bold text-red-600">
                          {Math.max(0, result.taxAmount - (result.deductions || 0)).toFixed(2)} DT
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="income" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="income">Revenu Brut Annuel (DT)</Label>
                    <Input
                      id="income"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Revenu annuel total"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expenses">Frais Professionnels (DT)</Label>
                    <Input
                      id="expenses"
                      type="number"
                      step="0.01"
                      value={formData.professionalExpenses}
                      onChange={(e) => setFormData(prev => ({ ...prev, professionalExpenses: e.target.value }))}
                      placeholder="Frais déductibles"
                    />
                  </div>

                  <div>
                    <Label htmlFor="equipment">Achats d'Équipement (DT)</Label>
                    <Input
                      id="equipment"
                      type="number"
                      step="0.01"
                      value={formData.equipmentPurchases}
                      onChange={(e) => setFormData(prev => ({ ...prev, equipmentPurchases: e.target.value }))}
                      placeholder="Équipement médical"
                    />
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Barème Progressif IRPP</h4>
                    <div className="text-sm space-y-1 text-blue-800">
                      <div>0 - 5,000 DT: 0%</div>
                      <div>5,001 - 20,000 DT: 26%</div>
                      <div>20,001 - 30,000 DT: 28%</div>
                      <div>30,001 - 50,000 DT: 32%</div>
                      <div>&gt; 50,000 DT: 35%</div>
                    </div>
                  </div>
                </div>

                {result && (
                  <Card className="bg-gradient-to-br from-green-50 to-green-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Percent className="w-5 h-5 text-green-600" />
                        Calcul Impôt sur le Revenu
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Revenu Brut:</span>
                        <span className="font-semibold">{result.baseAmount.toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Déductions:</span>
                        <span className="font-semibold text-blue-600">-{(result.deductions || 0).toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Revenu Net Imposable:</span>
                        <span className="font-semibold">{(result.netTaxable || 0).toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Taux Effectif:</span>
                        <span className="font-semibold">{result.taxRate.toFixed(2)}%</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Impôt à Payer:</span>
                        <span className="font-bold text-red-600">{result.taxAmount.toFixed(2)} DT</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="salary">Salaire Mensuel (DT)</Label>
                    <Input
                      id="salary"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Salaire brut mensuel"
                    />
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Taux CNSS</h4>
                    <div className="text-sm space-y-1 text-purple-800">
                      <div>Part Employé: 9.18%</div>
                      <div>Part Employeur: 16.57%</div>
                      <div className="font-medium">Total: 25.75%</div>
                    </div>
                  </div>
                </div>

                {result && (
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        Cotisations Sociales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Salaire Brut:</span>
                        <span className="font-semibold">{result.baseAmount.toFixed(2)} DT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Cotisation Employé (9.18%):</span>
                        <span className="font-semibold text-red-600">
                          -{(result.baseAmount * 0.0918).toFixed(2)} DT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Cotisation Employeur (16.57%):</span>
                        <span className="font-semibold text-blue-600">
                          {(result.baseAmount * 0.1657).toFixed(2)} DT
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Salaire Net:</span>
                        <span className="font-bold text-green-600">
                          {(result.baseAmount - result.baseAmount * 0.0918).toFixed(2)} DT
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Coût Total Employeur:</span>
                        <span className="font-bold text-purple-600">
                          {(result.baseAmount * 1.1657).toFixed(2)} DT
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={saveCalculation} disabled={!result}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={handleCalculate}>
              <Calculator className="w-4 h-4 mr-2" />
              Recalculer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Calculations */}
      {savedCalculations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Calculs Sauvegardés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedCalculations.map((calc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline">
                      {calc.type === 'vat' ? 'TVA' : calc.type === 'income' ? 'IRPP' : 'CNSS'}
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      {new Date(calc.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{calc.taxAmount.toFixed(2)} DT</p>
                    <p className="text-xs text-text-secondary">Base: {calc.baseAmount.toFixed(2)} DT</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxCalculator;