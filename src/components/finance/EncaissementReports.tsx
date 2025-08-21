import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  DollarSign,
  CreditCard,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users
} from 'lucide-react';

interface EncaissementReportsProps {
  onBack: () => void;
}

const EncaissementReports: React.FC<EncaissementReportsProps> = ({ onBack }) => {
  const [reportPeriod, setReportPeriod] = useState('monthly');

  // Sample data for reports
  const monthlyCollections = [
    { month: 'Jan', encaisse: 12500, prevu: 15000, enAttente: 2500 },
    { month: 'Fév', encaisse: 13200, prevu: 15000, enAttente: 1800 },
    { month: 'Mar', encaisse: 14100, prevu: 15000, enAttente: 900 },
    { month: 'Avr', encaisse: 13800, prevu: 15000, enAttente: 1200 },
    { month: 'Mai', encaisse: 14500, prevu: 15000, enAttente: 500 },
    { month: 'Jun', encaisse: 14200, prevu: 15000, enAttente: 800 }
  ];

  const paymentMethodDistribution = [
    { name: 'Carte', value: 8500, color: '#3b82f6', percentage: 45 },
    { name: 'Espèces', value: 4200, color: '#10b981', percentage: 22 },
    { name: 'Virement', value: 3800, color: '#f59e0b', percentage: 20 },
    { name: 'Chèque', value: 2500, color: '#8b5cf6', percentage: 13 }
  ];

  const serviceTypeRevenue = [
    { service: 'Consultation générale', revenue: 6500, transactions: 130, avgPrice: 50 },
    { service: 'Consultation spécialisée', revenue: 4800, transactions: 40, avgPrice: 120 },
    { service: 'Acte technique', revenue: 3600, transactions: 20, avgPrice: 180 },
    { service: 'Téléconsultation', revenue: 2250, transactions: 50, avgPrice: 45 },
    { service: 'Suivi médical', revenue: 1850, transactions: 22, avgPrice: 85 }
  ];

  const insuranceAnalysis = [
    { insurance: 'Patient direct', amount: 11200, transactions: 156, percentage: 59 },
    { insurance: 'CPAM', amount: 4800, transactions: 32, percentage: 25 },
    { insurance: 'Mutuelles privées', amount: 2400, transactions: 18, percentage: 13 },
    { insurance: 'CNAM', amount: 600, transactions: 6, percentage: 3 }
  ];

  const totalCollected = paymentMethodDistribution.reduce((sum, method) => sum + method.value, 0);
  const totalPending = 3200;
  const collectionRate = (totalCollected / (totalCollected + totalPending)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Retour
          </Button>
          <h2 className="text-2xl font-semibold text-text-primary">Rapports d'Encaissement</h2>
          <p className="text-text-secondary">Analyse détaillée des collections et revenus</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="quarterly">Trimestriel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* KPIs Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Total Encaissé</p>
                <p className="text-xl font-bold text-text-primary">{totalCollected.toLocaleString()} TND</p>
                <p className="text-sm text-green-600">+8.2% vs mois dernier</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Taux d'Encaissement</p>
                <p className="text-xl font-bold text-text-primary">{collectionRate.toFixed(1)}%</p>
                <p className="text-sm text-blue-600">Objectif: 95%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">En Attente</p>
                <p className="text-xl font-bold text-text-primary">{totalPending.toLocaleString()} TND</p>
                <p className="text-sm text-orange-600">À encaisser</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-text-secondary">Patients</p>
                <p className="text-xl font-bold text-text-primary">262</p>
                <p className="text-sm text-purple-600">Ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="insurance">Assurances</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Encaissements Mensuels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyCollections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} TND`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="encaisse" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Encaissé"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prevu" 
                    stroke="#3b82f6" 
                    strokeDasharray="5 5"
                    name="Prévu"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="enAttente" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="En attente"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Mode de Paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} TND`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détail des Modes de Paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethodDistribution.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: method.color }}
                        />
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{method.value.toLocaleString()} TND</p>
                        <p className="text-sm text-text-secondary">{method.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus par Type de Service</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={serviceTypeRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} TND`, '']} />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse des Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceTypeRevenue.map((service, index) => (
                    <div key={index} className="p-4 border border-border-primary rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-text-primary">{service.service}</h4>
                        <Badge variant="outline">{service.transactions} actes</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-secondary">Prix moyen: {service.avgPrice} TND</span>
                        <span className="font-semibold text-lg">{service.revenue.toLocaleString()} TND</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={insuranceAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="insurance" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} TND`, '']} />
                    <Bar dataKey="amount" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse des Assurances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insuranceAnalysis.map((insurance, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border-primary rounded-lg">
                      <div>
                        <h4 className="font-medium text-text-primary">{insurance.insurance}</h4>
                        <p className="text-sm text-text-secondary">
                          {insurance.transactions} transaction(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-text-primary">{insurance.amount.toLocaleString()} TND</p>
                        <Badge variant="outline">{insurance.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EncaissementReports;