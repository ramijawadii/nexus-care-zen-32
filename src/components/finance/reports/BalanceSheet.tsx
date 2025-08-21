
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building,
  Wallet,
  CreditCard,
  Package,
  Users,
  Download,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BalanceSheet = () => {
  const [selectedDate, setSelectedDate] = useState('2024-12-31');

  // Mock data for balance sheet
  const assets = {
    current: {
      caisse: 12500,
      compteBancaire: 45600,
      creancesPatients: 28900,
      creancesAssurances: 67400,
      stocksMedicaux: 15200
    },
    fixed: {
      materielMedical: 125000,
      mobilier: 35000,
      informatique: 18000,
      vehicules: 25000
    }
  };

  const liabilities = {
    current: {
      fournisseurs: 23400,
      chargesSociales: 18700,
      chargesFiscales: 12300,
      autresDettes: 8600
    },
    longTerm: {
      emprunts: 45000
    }
  };

  const equity = {
    apportsPersonnels: 150000,
    resultatsAccumules: 89500,
    resultatsAnnee: 52800
  };

  const totalAssets = Object.values(assets.current).reduce((sum, val) => sum + val, 0) + 
                      Object.values(assets.fixed).reduce((sum, val) => sum + val, 0);
  const totalLiabilities = Object.values(liabilities.current).reduce((sum, val) => sum + val, 0) + 
                           Object.values(liabilities.longTerm).reduce((sum, val) => sum + val, 0);
  const totalEquity = Object.values(equity).reduce((sum, val) => sum + val, 0);

  const assetsBreakdown = [
    { name: 'Trésorerie', value: assets.current.caisse + assets.current.compteBancaire, color: '#3b82f6' },
    { name: 'Créances', value: assets.current.creancesPatients + assets.current.creancesAssurances, color: '#22c55e' },
    { name: 'Stocks', value: assets.current.stocksMedicaux, color: '#f59e0b' },
    { name: 'Immobilisations', value: Object.values(assets.fixed).reduce((sum, val) => sum + val, 0), color: '#8b5cf6' }
  ];

  const liquidityRatio = (assets.current.caisse + assets.current.compteBancaire) / 
                         Object.values(liabilities.current).reduce((sum, val) => sum + val, 0);
  const debtRatio = totalLiabilities / totalAssets;
  const equityRatio = totalEquity / totalAssets;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Bilan Comptable</h2>
          <p className="text-text-secondary">Photo financière du cabinet médical au {selectedDate}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-12-31">31 Déc 2024</SelectItem>
              <SelectItem value="2024-09-30">30 Sep 2024</SelectItem>
              <SelectItem value="2024-06-30">30 Juin 2024</SelectItem>
              <SelectItem value="2023-12-31">31 Déc 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Financial Ratios */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Total Actif</p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalAssets.toLocaleString()} €
                </p>
                <p className="text-sm text-blue-600">Patrimoine total</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Ratio de Liquidité</p>
                <p className="text-2xl font-bold text-text-primary">
                  {liquidityRatio.toFixed(2)}
                </p>
                <p className={`text-sm ${liquidityRatio > 1.5 ? 'text-green-600' : 'text-orange-600'}`}>
                  {liquidityRatio > 1.5 ? 'Excellente' : 'À surveiller'}
                </p>
              </div>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Ratio d'Endettement</p>
                <p className="text-2xl font-bold text-text-primary">
                  {(debtRatio * 100).toFixed(1)}%
                </p>
                <p className={`text-sm ${debtRatio < 0.3 ? 'text-green-600' : 'text-orange-600'}`}>
                  {debtRatio < 0.3 ? 'Faible risque' : 'Modéré'}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Capitaux Propres</p>
                <p className="text-2xl font-bold text-text-primary">
                  {totalEquity.toLocaleString()} €
                </p>
                <p className="text-sm text-green-600">
                  {(equityRatio * 100).toFixed(1)}% du total
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets vs Liabilities Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition de l'Actif</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetsBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {assetsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Structure Financière</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Total Actif</span>
                <span className="font-bold text-blue-600">{totalAssets.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium">Total Passif</span>
                <span className="font-bold text-red-600">{totalLiabilities.toLocaleString()} €</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Capitaux Propres</span>
                <span className="font-bold text-green-600">{totalEquity.toLocaleString()} €</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center font-bold">
                  <span>Équilibre Comptable</span>
                  <span className={totalAssets === (totalLiabilities + totalEquity) ? 'text-green-600' : 'text-red-600'}>
                    {totalAssets === (totalLiabilities + totalEquity) ? '✓ Équilibré' : '✗ Déséquilibré'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Balance Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ACTIF */}
        <Card>
          <CardHeader>
            <CardTitle className="bg-blue-100 p-3 rounded text-blue-800">ACTIF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Actif Circulant */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                Actif Circulant
              </h4>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Caisse</span>
                  <span className="font-medium">{assets.current.caisse.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Compte bancaire</span>
                  <span className="font-medium">{assets.current.compteBancaire.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Créances patients</span>
                  <span className="font-medium">{assets.current.creancesPatients.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Créances assurances/mutuelles</span>
                  <span className="font-medium">{assets.current.creancesAssurances.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Stocks médicaux</span>
                  <span className="font-medium">{assets.current.stocksMedicaux.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total Actif Circulant</span>
                  <span>{Object.values(assets.current).reduce((sum, val) => sum + val, 0).toLocaleString()} €</span>
                </div>
              </div>
            </div>

            {/* Immobilisations */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Immobilisations
              </h4>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Matériel médical</span>
                  <span className="font-medium">{assets.fixed.materielMedical.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobilier</span>
                  <span className="font-medium">{assets.fixed.mobilier.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Informatique</span>
                  <span className="font-medium">{assets.fixed.informatique.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Véhicules</span>
                  <span className="font-medium">{assets.fixed.vehicules.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total Immobilisations</span>
                  <span>{Object.values(assets.fixed).reduce((sum, val) => sum + val, 0).toLocaleString()} €</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded font-bold text-lg">
              <div className="flex justify-between">
                <span>TOTAL ACTIF</span>
                <span>{totalAssets.toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PASSIF */}
        <Card>
          <CardHeader>
            <CardTitle className="bg-red-100 p-3 rounded text-red-800">PASSIF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dettes à Court Terme */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Dettes à Court Terme
              </h4>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Fournisseurs à payer</span>
                  <span className="font-medium">{liabilities.current.fournisseurs.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Charges sociales à payer</span>
                  <span className="font-medium">{liabilities.current.chargesSociales.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Charges fiscales à payer</span>
                  <span className="font-medium">{liabilities.current.chargesFiscales.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Autres dettes</span>
                  <span className="font-medium">{liabilities.current.autresDettes.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total Dettes Court Terme</span>
                  <span>{Object.values(liabilities.current).reduce((sum, val) => sum + val, 0).toLocaleString()} €</span>
                </div>
              </div>
            </div>

            {/* Dettes à Long Terme */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Dettes à Long Terme</h4>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Emprunts</span>
                  <span className="font-medium">{liabilities.longTerm.emprunts.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total Dettes Long Terme</span>
                  <span>{Object.values(liabilities.longTerm).reduce((sum, val) => sum + val, 0).toLocaleString()} €</span>
                </div>
              </div>
            </div>

            {/* Capitaux Propres */}
            <div>
              <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Capitaux Propres
              </h4>
              <div className="space-y-2 ml-6">
                <div className="flex justify-between">
                  <span>Apports personnels du médecin</span>
                  <span className="font-medium">{equity.apportsPersonnels.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Résultats accumulés</span>
                  <span className="font-medium">{equity.resultatsAccumules.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Résultat de l'année</span>
                  <span className="font-medium">{equity.resultatsAnnee.toLocaleString()} €</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total Capitaux Propres</span>
                  <span>{totalEquity.toLocaleString()} €</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded font-bold text-lg">
              <div className="flex justify-between">
                <span>TOTAL PASSIF</span>
                <span>{(totalLiabilities + totalEquity).toLocaleString()} €</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Indicateurs de Santé Financière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">{(liquidityRatio).toFixed(2)}</div>
              <div className="text-sm font-medium mb-1">Ratio de Liquidité</div>
              <div className="text-xs text-text-muted">Trésorerie / Dettes court terme</div>
              <Badge className={liquidityRatio > 1.5 ? 'bg-green-100 text-green-800 mt-2' : 'bg-orange-100 text-orange-800 mt-2'}>
                {liquidityRatio > 1.5 ? 'Excellent' : 'À améliorer'}
              </Badge>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">{((totalEquity / totalAssets) * 100).toFixed(1)}%</div>
              <div className="text-sm font-medium mb-1">Autonomie Financière</div>
              <div className="text-xs text-text-muted">Capitaux propres / Total actif</div>
              <Badge className="bg-blue-100 text-blue-800 mt-2">Solide</Badge>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {((assets.current.creancesPatients + assets.current.creancesAssurances) / totalAssets * 100).toFixed(1)}%
              </div>
              <div className="text-sm font-medium mb-1">Part des Créances</div>
              <div className="text-xs text-text-muted">Créances / Total actif</div>
              <Badge className="bg-purple-100 text-purple-800 mt-2">Normal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSheet;
