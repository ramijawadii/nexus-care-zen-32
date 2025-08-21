
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Users,
  Building,
  Download,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const CashFlowStatement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2024-12');

  // Mock data for cash flow
  const monthlyData = [
    {
      month: 'Jul 2024',
      entrees: {
        paiementsPatients: 89400,
        remboursementsAssurances: 67200,
        autresRevenus: 8900
      },
      sorties: {
        salairesCharges: 45600,
        fournisseurs: 23400,
        loyerCharges: 8900,
        investissements: 12000
      }
    },
    {
      month: 'Aoû 2024',
      entrees: {
        paiementsPatients: 95200,
        remboursementsAssurances: 71800,
        autresRevenus: 6400
      },
      sorties: {
        salairesCharges: 46200,
        fournisseurs: 25100,
        loyerCharges: 8900,
        investissements: 0
      }
    },
    {
      month: 'Sep 2024',
      entrees: {
        paiementsPatients: 98600,
        remboursementsAssurances: 68900,
        autresRevenus: 12300
      },
      sorties: {
        salairesCharges: 47800,
        fournisseurs: 28200,
        loyerCharges: 8900,
        investissements: 5600
      }
    },
    {
      month: 'Oct 2024',
      entrees: {
        paiementsPatients: 92800,
        remboursementsAssurances: 73400,
        autresRevenus: 9200
      },
      sorties: {
        salairesCharges: 48500,
        fournisseurs: 24800,
        loyerCharges: 8900,
        investissements: 18000
      }
    },
    {
      month: 'Nov 2024',
      entrees: {
        paiementsPatients: 104200,
        remboursementsAssurances: 76800,
        autresRevenus: 11600
      },
      sorties: {
        salairesCharges: 49200,
        fournisseurs: 31200,
        loyerCharges: 8900,
        investissements: 7200
      }
    },
    {
      month: 'Déc 2024',
      entrees: {
        paiementsPatients: 108900,
        remboursementsAssurances: 79200,
        autresRevenus: 14800
      },
      sorties: {
        salairesCharges: 52400,
        fournisseurs: 29800,
        loyerCharges: 8900,
        investissements: 25000
      }
    }
  ];

  // Calculate totals and net cash flow for each month
  const processedData = monthlyData.map(data => {
    const totalEntrees = Object.values(data.entrees).reduce((sum, val) => sum + val, 0);
    const totalSorties = Object.values(data.sorties).reduce((sum, val) => sum + val, 0);
    const soldeTresorerie = totalEntrees - totalSorties;
    
    return {
      ...data,
      totalEntrees,
      totalSorties,
      soldeTresorerie
    };
  });

  const currentMonthData = processedData[processedData.length - 1];
  const previousMonthData = processedData[processedData.length - 2];

  // Cumulative cash flow
  let cumulativeCash = 45600; // Starting balance
  const cashFlowTrend = processedData.map(data => {
    cumulativeCash += data.soldeTresorerie;
    return {
      month: data.month,
      solde: cumulativeCash,
      variation: data.soldeTresorerie
    };
  });

  const entryCategories = [
    { name: 'Patients', value: currentMonthData.entrees.paiementsPatients, color: '#22c55e' },
    { name: 'Assurances', value: currentMonthData.entrees.remboursementsAssurances, color: '#3b82f6' },
    { name: 'Autres', value: currentMonthData.entrees.autresRevenus, color: '#f59e0b' }
  ];

  const exitCategories = [
    { name: 'Salaires', value: currentMonthData.sorties.salairesCharges, color: '#ef4444' },
    { name: 'Fournisseurs', value: currentMonthData.sorties.fournisseurs, color: '#f97316' },
    { name: 'Loyer', value: currentMonthData.sorties.loyerCharges, color: '#8b5cf6' },
    { name: 'Investissements', value: currentMonthData.sorties.investissements, color: '#06b6d4' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Flux de Trésorerie</h2>
          <p className="text-text-secondary">Suivi des entrées et sorties d'argent réelles</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="quarterly">Trimestriel</SelectItem>
              <SelectItem value="annual">Annuel</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-12">Déc 2024</SelectItem>
              <SelectItem value="2024-11">Nov 2024</SelectItem>
              <SelectItem value="2024-10">Oct 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Cash Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Entrées Totales</p>
                <p className="text-2xl font-bold text-green-600">
                  {currentMonthData.totalEntrees.toLocaleString()} €
                </p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUpCircle className="w-4 h-4 mr-1" />
                  +{((currentMonthData.totalEntrees - previousMonthData.totalEntrees) / previousMonthData.totalEntrees * 100).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Sorties Totales</p>
                <p className="text-2xl font-bold text-red-600">
                  {currentMonthData.totalSorties.toLocaleString()} €
                </p>
                <p className="text-sm text-red-600 flex items-center">
                  <ArrowDownCircle className="w-4 h-4 mr-1" />
                  +{((currentMonthData.totalSorties - previousMonthData.totalSorties) / previousMonthData.totalSorties * 100).toFixed(1)}%
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Solde Mensuel</p>
                <p className={`text-2xl font-bold ${currentMonthData.soldeTresorerie >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentMonthData.soldeTresorerie >= 0 ? '+' : ''}{currentMonthData.soldeTresorerie.toLocaleString()} €
                </p>
                <p className={`text-sm ${currentMonthData.soldeTresorerie >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currentMonthData.soldeTresorerie >= 0 ? 'Positif' : 'Déficitaire'}
                </p>
              </div>
              <DollarSign className={`w-8 h-8 ${currentMonthData.soldeTresorerie >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Trésorerie Actuelle</p>
                <p className="text-2xl font-bold text-blue-600">
                  {cashFlowTrend[cashFlowTrend.length - 1].solde.toLocaleString()} €
                </p>
                <p className="text-sm text-blue-600">Cumul de l'année</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution de la Trésorerie</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={cashFlowTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              <Line 
                type="monotone" 
                dataKey="solde" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Solde Trésorerie"
              />
              <Line 
                type="monotone" 
                dataKey="variation" 
                stroke="#22c55e" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Variation Mensuelle"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Current Month Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entrées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <ArrowUpCircle className="w-5 h-5 mr-2" />
              Entrées - {currentMonthData.month}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Paiements Patients</p>
                    <p className="text-sm text-text-muted">Espèces, CB, virement</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">
                  {currentMonthData.entrees.paiementsPatients.toLocaleString()} €
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Remboursements Assurances</p>
                    <p className="text-sm text-text-muted">CPAM, mutuelles</p>
                  </div>
                </div>
                <span className="font-bold text-blue-600">
                  {currentMonthData.entrees.remboursementsAssurances.toLocaleString()} €
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium">Autres Revenus</p>
                    <p className="text-sm text-text-muted">Formations, partenariats</p>
                  </div>
                </div>
                <span className="font-bold text-yellow-600">
                  {currentMonthData.entrees.autresRevenus.toLocaleString()} €
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Entrées</span>
                  <span className="text-green-600">{currentMonthData.totalEntrees.toLocaleString()} €</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sorties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <ArrowDownCircle className="w-5 h-5 mr-2" />
              Sorties - {currentMonthData.month}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium">Salaires et Charges Sociales</p>
                    <p className="text-sm text-text-muted">Personnel, cotisations</p>
                  </div>
                </div>
                <span className="font-bold text-red-600">
                  {currentMonthData.sorties.salairesCharges.toLocaleString()} €
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium">Paiements Fournisseurs</p>
                    <p className="text-sm text-text-muted">Matériel, fournitures</p>
                  </div>
                </div>
                <span className="font-bold text-orange-600">
                  {currentMonthData.sorties.fournisseurs.toLocaleString()} €
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium">Loyer et Charges</p>
                    <p className="text-sm text-text-muted">Eau, électricité, internet</p>
                  </div>
                </div>
                <span className="font-bold text-purple-600">
                  {currentMonthData.sorties.loyerCharges.toLocaleString()} €
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-cyan-600 mr-3" />
                  <div>
                    <p className="font-medium">Investissements</p>
                    <p className="text-sm text-text-muted">Nouveau matériel</p>
                  </div>
                </div>
                <span className="font-bold text-cyan-600">
                  {currentMonthData.sorties.investissements.toLocaleString()} €
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Sorties</span>
                  <span className="text-red-600">{currentMonthData.totalSorties.toLocaleString()} €</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Comparaison Mensuelle des Flux</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              <Bar dataKey="totalEntrees" fill="#22c55e" name="Entrées" />
              <Bar dataKey="totalSorties" fill="#ef4444" name="Sorties" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cash Flow Statement Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé du Flux de Trésorerie - {currentMonthData.month}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {((currentMonthData.entrees.paiementsPatients / currentMonthData.totalEntrees) * 100).toFixed(0)}%
                </div>
                <div className="text-sm font-medium text-green-700">Paiements Directs Patients</div>
                <div className="text-xs text-text-muted mt-1">Part des entrées</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {((currentMonthData.sorties.salairesCharges / currentMonthData.totalSorties) * 100).toFixed(0)}%
                </div>
                <div className="text-sm font-medium text-red-700">Charges de Personnel</div>
                <div className="text-xs text-text-muted mt-1">Part des sorties</div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.ceil(Math.abs(cashFlowTrend[cashFlowTrend.length - 1].solde / currentMonthData.totalSorties))}
                </div>
                <div className="text-sm font-medium text-blue-700">Mois de Couverture</div>
                <div className="text-xs text-text-muted mt-1">Trésorerie disponible</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Analyse de la Période</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-600">Points Positifs :</p>
                  <ul className="mt-1 space-y-1 text-text-muted">
                    <li>• Croissance continue des entrées</li>
                    <li>• Diversification des sources de revenus</li>
                    <li>• Trésorerie en amélioration</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-orange-600">Points d'Attention :</p>
                  <ul className="mt-1 space-y-1 text-text-muted">
                    <li>• Investissements ponctuels importants</li>
                    <li>• Charges de personnel en hausse</li>
                    <li>• Délais de remboursement assurances</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowStatement;
