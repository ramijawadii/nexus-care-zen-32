
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Brain,
  AlertCircle,
  CheckCircle,
  Calendar,
  Download,
  Zap,
  Users,
  Activity,
  Stethoscope
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const PredictiveAnalysis = () => {
  const [predictionPeriod, setPredictionPeriod] = useState('12months');
  const [scenario, setScenario] = useState('realistic');

  // Mock predictive data based on medical cabinet accounting and payroll
  const monthlyPredictions = [
    // Historical data (last 6 months)
    { month: 'Jul 2024', actual: 145600, predicted: null, type: 'historical', staff: 8, patients: 623, consultations: 798 },
    { month: 'Aoû 2024', actual: 159800, predicted: null, type: 'historical', staff: 8, patients: 698, consultations: 856 },
    { month: 'Sep 2024', actual: 165400, predicted: null, type: 'historical', staff: 8, patients: 723, consultations: 891 },
    { month: 'Oct 2024', actual: 158900, predicted: null, type: 'historical', staff: 9, patients: 687, consultations: 834 },
    { month: 'Nov 2024', actual: 172600, predicted: null, type: 'historical', staff: 9, patients: 756, consultations: 945 },
    { month: 'Déc 2024', actual: 175200, predicted: null, type: 'historical', staff: 9, patients: 789, consultations: 978 },
    
    // Predictions (next 6 months)
    { month: 'Jan 2025', actual: null, predicted: 178400, type: 'prediction', staff: 9, patients: 812, consultations: 1012 },
    { month: 'Fév 2025', actual: null, predicted: 182100, type: 'prediction', staff: 10, patients: 834, consultations: 1045 },
    { month: 'Mar 2025', actual: null, predicted: 186800, type: 'prediction', staff: 10, patients: 856, consultations: 1078 },
    { month: 'Avr 2025', actual: null, predicted: 184200, type: 'prediction', staff: 10, patients: 842, consultations: 1056 },
    { month: 'Mai 2025', actual: null, predicted: 191500, type: 'prediction', staff: 10, patients: 867, consultations: 1089 },
    { month: 'Jun 2025', actual: null, predicted: 195800, type: 'prediction', staff: 11, patients: 889, consultations: 1123 }
  ];

  const quarterlyForecasts = [
    {
      quarter: 'Q1 2025',
      revenueMin: 525000,
      revenueMost: 547300,
      revenueMax: 578000,
      expensesMin: 268000,
      expensesMost: 285400,
      expensesMax: 312000,
      staffCost: 98500,
      consultationsPrevu: 3135,
      confidence: 87
    },
    {
      quarter: 'Q2 2025',
      revenueMin: 548000,
      revenueMost: 571500,
      revenueMax: 601000,
      expensesMin: 274000,
      expensesMost: 291800,
      expensesMax: 318500,
      staffCost: 101200,
      consultationsPrevu: 3201,
      confidence: 82
    },
    {
      quarter: 'Q3 2025',
      revenueMin: 552000,
      revenueMost: 576800,
      revenueMax: 608000,
      expensesMin: 278000,
      expensesMost: 295600,
      expensesMax: 323000,
      staffCost: 103800,
      consultationsPrevu: 3156,
      confidence: 76
    },
    {
      quarter: 'Q4 2025',
      revenueMin: 568000,
      revenueMost: 594200,
      revenueMax: 626000,
      expensesMin: 285000,
      expensesMost: 304100,
      expensesMax: 332000,
      staffCost: 106500,
      consultationsPrevu: 3298,
      confidence: 71
    }
  ];

  const medicalRiskFactors = [
    {
      factor: 'Augmentation des charges de personnel médical',
      probability: 'Élevée (78%)',
      impact: 'Moyen (-12K€/mois)',
      timeframe: 'Q2 2025',
      severity: 'warning',
      mitigation: 'Optimisation des plannings, recrutement différé, téléconsultations'
    },
    {
      factor: 'Baisse saisonnière activité été',
      probability: 'Moyenne (65%)',
      impact: 'Fort (-25K€/mois)',
      timeframe: 'Jul-Août 2025',
      severity: 'high',
      mitigation: 'Développement préventif, campagnes vaccination, consultations de suivi'
    },
    {
      factor: 'Évolution tarifs conventionnels CPAM',
      probability: 'Faible (23%)',
      impact: 'Variable (±15K€/mois)',
      timeframe: '2025',
      severity: 'low',
      mitigation: 'Veille réglementaire, développement secteur libre, actes non conventionnés'
    },
    {
      factor: 'Concurrence médicale locale accrue',
      probability: 'Moyenne (45%)',
      impact: 'Moyen (-8K€/mois)',
      timeframe: 'Q3-Q4 2025',
      severity: 'warning',
      mitigation: 'Amélioration qualité service, spécialisation, fidélisation patients'
    },
    {
      factor: 'Épidémie/crise sanitaire',
      probability: 'Faible (15%)',
      impact: 'Très Variable (±50K€/mois)',
      timeframe: 'Imprévisible',
      severity: 'high',
      mitigation: 'Protocoles sanitaires, téléconsultations, réserve de trésorerie'
    }
  ];

  const medicalGrowthDrivers = [
    {
      driver: 'Nouveau médecin spécialiste',
      impact: '+25K€/mois',
      probability: 85,
      timeline: 'Mars 2025',
      investment: '45K€',
      roi: '18 mois'
    },
    {
      driver: 'Extension plages horaires consultation',
      impact: '+12K€/mois',
      probability: 92,
      timeline: 'Février 2025',
      investment: '8K€',
      roi: '4 mois'
    },
    {
      driver: 'Nouveaux équipements diagnostiques',
      impact: '+18K€/mois',
      probability: 67,
      timeline: 'Juin 2025',
      investment: '85K€',
      roi: '24 mois'
    },
    {
      driver: 'Partenariat centre sportif/entreprises',
      impact: '+8K€/mois',
      probability: 78,
      timeline: 'Avril 2025',
      investment: '3K€',
      roi: '2 mois'
    },
    {
      driver: 'Développement téléconsultations',
      impact: '+6K€/mois',
      probability: 88,
      timeline: 'Janvier 2025',
      investment: '5K€',
      roi: '3 mois'
    }
  ];

  const medicalKpiPredictions = [
    {
      kpi: 'Chiffre d\'Affaires 2025',
      current: 1679600,
      predicted: 1854200,
      growth: '+10.4%',
      confidence: 83,
      range: '1.78M - 1.95M €'
    },
    {
      kpi: 'Résultat Net 2025',
      current: 949100,
      predicted: 1098600,
      growth: '+15.8%',
      confidence: 79,
      range: '1.02M - 1.18M €'
    },
    {
      kpi: 'Nombre de Patients',
      current: 2847,
      predicted: 3245,
      growth: '+14.0%',
      confidence: 88,
      range: '3.1K - 3.4K'
    },
    {
      kpi: 'Consultations Annuelles',
      current: 4234,
      predicted: 4867,
      growth: '+14.9%',
      confidence: 85,
      range: '4.6K - 5.1K'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Analyse Prédictive Médicale</h2>
          <p className="text-text-secondary">Prévisions basées sur les données comptables, RH et activité médicale</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={scenario} onValueChange={setScenario}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="optimistic">Optimiste</SelectItem>
              <SelectItem value="realistic">Réaliste</SelectItem>
              <SelectItem value="pessimistic">Pessimiste</SelectItem>
            </SelectContent>
          </Select>
          <Select value={predictionPeriod} onValueChange={setPredictionPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 mois</SelectItem>
              <SelectItem value="12months">12 mois</SelectItem>
              <SelectItem value="24months">24 mois</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Medical KPI Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {medicalKpiPredictions.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-text-secondary">{kpi.kpi}</h4>
                  <Badge className={getConfidenceColor(kpi.confidence)}>
                    <Brain className="w-3 h-3 mr-1" />
                    {kpi.confidence}%
                  </Badge>
                </div>
                
                <div>
                  <p className="text-lg font-bold text-text-primary">
                    {typeof kpi.predicted === 'number' && kpi.predicted > 1000 
                      ? `${kpi.predicted.toLocaleString()}${kpi.kpi.includes('€') ? ' €' : ''}`
                      : kpi.predicted.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 font-medium">{kpi.growth}</p>
                </div>
                
                <div className="border-t pt-2">
                  <p className="text-xs text-text-muted">Fourchette prévue</p>
                  <p className="text-xs font-medium text-text-secondary">{kpi.range}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Medical Revenue Prediction Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
            Prédiction Revenus Cabinet Médical (Historique + Prévisions)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyPredictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${Number(value).toLocaleString()} €`, 
                  name === 'actual' ? 'Revenus Réels' : 'Prévisions'
                ]} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Historique"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#22c55e" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Prédiction"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Medical Activity Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Prévisions d'Activité Médicale</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyPredictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="patients" 
                stackId="1"
                stroke="#8884d8" 
                fill="#8884d8"
                fillOpacity={0.6}
                name="Patients"
              />
              <Area 
                type="monotone" 
                dataKey="consultations" 
                stackId="2"
                stroke="#82ca9d" 
                fill="#82ca9d"
                fillOpacity={0.6}
                name="Consultations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quarterly Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle>Prévisions Trimestrielles Cabinet Médical 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quarterlyForecasts.map((forecast, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-text-primary">{forecast.quarter}</h4>
                  <Badge className={getConfidenceColor(forecast.confidence)}>
                    Confiance: {forecast.confidence}%
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">Revenus Prévus</p>
                    <p className="font-bold text-green-600">{forecast.revenueMost.toLocaleString()} €</p>
                    <p className="text-xs text-text-secondary">
                      {forecast.revenueMin.toLocaleString()} - {forecast.revenueMax.toLocaleString()} €
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-muted">Charges Prévues</p>
                    <p className="font-bold text-red-600">{forecast.expensesMost.toLocaleString()} €</p>
                    <p className="text-xs text-text-secondary">
                      {forecast.expensesMin.toLocaleString()} - {forecast.expensesMax.toLocaleString()} €
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-muted">Coût Personnel</p>
                    <p className="font-bold text-blue-600">{forecast.staffCost.toLocaleString()} €</p>
                    <p className="text-xs text-text-secondary">Personnel médical</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-muted">Consultations Prévues</p>
                    <p className="font-bold text-purple-600">{forecast.consultationsPrevu.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary">Tous types confondus</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-text-muted">Résultat Estimé</p>
                    <p className="font-bold text-green-600">
                      {(forecast.revenueMost - forecast.expensesMost).toLocaleString()} €
                    </p>
                    <p className="text-xs text-green-600">
                      Marge: {((forecast.revenueMost - forecast.expensesMost) / forecast.revenueMost * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            Facteurs de Risque Médicaux Identifiés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalRiskFactors.map((risk, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-text-primary">{risk.factor}</h4>
                  <Badge className={getSeverityColor(risk.severity)}>
                    {risk.severity === 'high' ? 'Élevé' : 
                     risk.severity === 'warning' ? 'Moyen' : 'Faible'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Probabilité</p>
                    <p className="font-medium">{risk.probability}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Impact Financier</p>
                    <p className="font-medium">{risk.impact}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Échéance</p>
                    <p className="font-medium">{risk.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Actions Préventives Médicales</p>
                    <p className="font-medium text-blue-600">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Growth Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-green-600" />
            Opportunités de Développement Médical
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicalGrowthDrivers.map((driver, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-text-primary">{driver.driver}</h4>
                  <Badge className={getConfidenceColor(driver.probability)}>
                    Prob: {driver.probability}%
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted">Impact Mensuel</p>
                    <p className="font-bold text-green-600">{driver.impact}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Mise en Œuvre</p>
                    <p className="font-medium">{driver.timeline}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Investissement</p>
                    <p className="font-medium text-red-600">{driver.investment}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">ROI</p>
                    <p className="font-medium text-blue-600">{driver.roi}</p>
                  </div>
                  <div>
                    <p className="text-text-muted">Statut</p>
                    <Badge variant="outline">À évaluer</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Medical Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Recommandations IA pour le Cabinet Médical
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-800">Action Prioritaire Médicale</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Planifier le recrutement du nouveau médecin spécialiste pour Mars 2025. 
                    Impact prévu: +25K€/mois avec ROI en 18 mois. Permettra d'augmenter la capacité de consultations spécialisées.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Activity className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-800">Développement Téléconsultations</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Accélérer le déploiement des téléconsultations. Investissement minimal (5K€) pour un ROI rapide (3 mois).
                    Permet de maintenir l'activité en cas de crise sanitaire.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Vigilance Charges Personnel</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Surveiller l'évolution des charges de personnel médical. Prévoir des mesures d'optimisation 
                    pour maintenir la marge bénéficiaire au-dessus de 55%. Optimiser les plannings et heures supplémentaires.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-800">Objectif Cabinet 2025</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Viser 1.85M€ de CA avec 4.867 consultations et 3.245 patients uniques. 
                    Probabilité d'atteinte: 83% avec les actions recommandées. Focus sur la fidélisation et nouveaux services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalysis;
