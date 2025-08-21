import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Download, 
  Calendar,
  DollarSign,
  TrendingUp,
  Receipt,
  CreditCard,
  Banknote,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EncaissementReportsProps {
  onBack: () => void;
}

const EncaissementReports: React.FC<EncaissementReportsProps> = ({ onBack }) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  
  const [reportType, setReportType] = useState('monthly');

  // Mock data for reports
  const reportData = useMemo(() => {
    return {
      totalRevenue: 45250,
      totalTransactions: 312,
      averageTransaction: 145,
      cashPayments: 15400,
      cardPayments: 18650,
      checkPayments: 7200,
      transferPayments: 2800,
      insurancePayments: 1200,
      dailyBreakdown: [
        { date: '2024-02-01', total: 1250, transactions: 8 },
        { date: '2024-02-02', total: 980, transactions: 6 },
        { date: '2024-02-03', total: 1560, transactions: 12 },
        { date: '2024-02-04', total: 2100, transactions: 15 },
        { date: '2024-02-05', total: 1890, transactions: 11 },
      ]
    };
  }, [dateRange, reportType]);

  const handleExportReport = () => {
    const csv = [
      ['Période', 'Total Revenus', 'Nb Transactions', 'Moyenne', 'Espèces', 'Cartes', 'Chèques', 'Virements', 'Assurances'].join(','),
      [
        `${dateRange.from} au ${dateRange.to}`,
        reportData.totalRevenue.toFixed(2),
        reportData.totalTransactions,
        reportData.averageTransaction.toFixed(2),
        reportData.cashPayments.toFixed(2),
        reportData.cardPayments.toFixed(2),
        reportData.checkPayments.toFixed(2),
        reportData.transferPayments.toFixed(2),
        reportData.insurancePayments.toFixed(2)
      ].join(',')
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-encaissements-${dateRange.from}-${dateRange.to}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux encaissements
          </Button>
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">Rapports d'encaissements</h2>
            <p className="text-text-secondary">Analyse détaillée des encaissements</p>
          </div>
        </div>
        <Button onClick={handleExportReport}>
          <Download className="w-4 h-4 mr-2" />
          Exporter le rapport
        </Button>
      </div>

      {/* Date Range & Report Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du rapport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date de début</label>
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date de fin</label>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Type de rapport</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Générer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Revenus</p>
                <p className="text-xl font-bold text-text-primary">
                  {reportData.totalRevenue.toLocaleString()} TND
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Receipt className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Nb Transactions</p>
                <p className="text-xl font-bold text-text-primary">
                  {reportData.totalTransactions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Moyenne/Transaction</p>
                <p className="text-xl font-bold text-text-primary">
                  {reportData.averageTransaction} TND
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Période</p>
                <p className="text-lg font-medium text-text-primary">
                  {Math.ceil((new Date(dateRange.to).getTime() - new Date(dateRange.from).getTime()) / (1000 * 3600 * 24))} jours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par mode de paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Banknote className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Espèces</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {reportData.cashPayments.toLocaleString()} TND
              </p>
              <p className="text-sm text-text-muted">
                {((reportData.cashPayments / reportData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Cartes</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {reportData.cardPayments.toLocaleString()} TND
              </p>
              <p className="text-sm text-text-muted">
                {((reportData.cardPayments / reportData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Receipt className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Chèques</h3>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {reportData.checkPayments.toLocaleString()} TND
              </p>
              <p className="text-sm text-text-muted">
                {((reportData.checkPayments / reportData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Virements</h3>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {reportData.transferPayments.toLocaleString()} TND
              </p>
              <p className="text-sm text-text-muted">
                {((reportData.transferPayments / reportData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <h3 className="font-semibold text-text-primary">Assurances</h3>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {reportData.insurancePayments.toLocaleString()} TND
              </p>
              <p className="text-sm text-text-muted">
                {((reportData.insurancePayments / reportData.totalRevenue) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Détail par jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-right p-2">Total</th>
                  <th className="text-right p-2">Nb Transactions</th>
                  <th className="text-right p-2">Moyenne</th>
                </tr>
              </thead>
              <tbody>
                {reportData.dailyBreakdown.map((day) => (
                  <tr key={day.date} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      {format(new Date(day.date), 'dd MMMM yyyy', { locale: fr })}
                    </td>
                    <td className="text-right p-2 font-semibold">
                      {day.total.toLocaleString()} TND
                    </td>
                    <td className="text-right p-2">
                      {day.transactions}
                    </td>
                    <td className="text-right p-2">
                      {(day.total / day.transactions).toFixed(0)} TND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EncaissementReports;