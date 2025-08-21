
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  Download,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';

const ComparativeAnalysis = () => {
  const [comparisonType, setComparisonType] = useState('monthly');
  const [analysisCategory, setAnalysisCategory] = useState('revenues');

  // Mock comparative data for medical cabinet
  const monthlyComparison = [
    {
      period: 'Jan 2024',
      current: 142800,
      previous: 131200,
      consultationsGenerales: 89400,
      consultationsSpecialisees: 45600,
      teleconsultations: 7800,
      chargesPersonnel: 48200,
      chargesOperationnelles: 23400
    },
    {
      period: 'Fév 2024',
      current: 156200,
      previous: 138900,
      consultationsGenerales: 95600,
      consultationsSpecialisees: 52800,
      teleconsultations: 7800,
      chargesPersonnel: 49800,
      chargesOperationnelles: 24100
    },
    {
      period: 'Mar 2024',
      current: 149500,
      previous: 145600,
      consultationsGenerales: 92300,
      consultationsSpecialisees: 48900,
      teleconsultations: 8300,
      chargesPersonnel: 50400,
      chargesOperationnelles: 25200
    },
    {
      period: 'Avr 2024',
      current: 138900,
      previous: 142100,
      consultationsGenerales: 85600,
      consultationsSpecialisees: 44700,
      teleconsultations: 8600,
      chargesPersonnel: 51200,
      chargesOperationnelles: 23800
    },
    {
      period: 'Mai 2024',
      current: 167400,
      previous: 149800,
      consultationsGenerales: 102300,
      consultationsSpecialisees: 56700,
      teleconsultations: 8400,
      chargesPersonnel: 52100,
      chargesOperationnelles: 26400
    },
    {
      period: 'Jun 2024',
      current: 171200,
      previous: 155900,
      consultationsGenerales: 108900,
      consultationsSpecialisees: 54600,
      teleconsultations: 7700,
      chargesPersonnel: 52800,
      chargesOperationnelles: 27900
    }
  ];

  const yearlyComparison = {
    2024: {
      revenus: 1854200,
      charges: 945600,
      resultatNet: 908600,
      margeNette: 49.0,
      patients: 3245,
      consultations: 4867
    },
    2023: {
      revenus: 1679600,
      charges: 856300,
      resultatNet: 823300,
      margeNette: 49.0,
      patients: 2847,
      consultations: 4234
    },
    2022: {
      revenus: 1456800,
      charges: 742100,
      resultatNet: 714700,
      margeNette: 49.1,
      patients: 2456,
      consultations: 3678
    }
  };

  const prestationTypes = [
    {
      type: 'Consultations Générales',
      current: 1285600,
      previous: 1145800,
      volume: 3245,
      prixMoyen: 396
    },
    {
      type: 'Consultations Spécialisées',
      current: 458900,
      previous: 398700,
      volume: 756,
      prixMoyen: 607
    },
    {
      type: 'Téléconsultations',
      current: 89700,
      previous: 67200,
      volume: 287,
      prixMoyen: 312
    },
    {
      type: 'Actes Complémentaires',
      current: 67800,
      previous: 54900,
      volume: 189,
      prixMoyen: 359
    }
  ];

  const ratiosComparison = [
    {
      ratio: 'Marge Nette (%)',
      current: 49.0,
      previous: 49.0,
      target: 50.0,
      status: 'stable'
    },
    {
      ratio: 'Masse Salariale / CA (%)',
      current: 22.2,
      previous: 21.8,
      target: 22.0,
      status: 'warning'
    },
    {
      ratio: 'Délai Moyen Paiement (jours)',
      current: 18.5,
      previous: 21.2,
      target: 15.0,
      status: 'improving'
    },
    {
      ratio: 'Taux de Retour Patients (%)',
      current: 78.5,
      previous: 76.2,
      target: 80.0,
      status: 'improving'
    }
  ];

  const getGrowthPercentage = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'stable': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Analyse Comparative</h2>
          <p className="text-text-secondary">Comparer et suivre l'évolution du cabinet médical</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={comparisonType} onValueChange={setComparisonType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="yearly">Annuel</SelectItem>
              <SelectItem value="quarterly">Trimestriel</SelectItem>
            </SelectContent>
          </Select>
          <Select value={analysisCategory} onValueChange={setAnalysisCategory}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenues">Revenus</SelectItem>
              <SelectItem value="expenses">Dépenses</SelectItem>
              <SelectItem value="ratios">Ratios</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Croissance CA Annuelle</p>
                <p className="text-2xl font-bold text-text-primary">
                  +{getGrowthPercentage(yearlyComparison[2024].revenus, yearlyComparison[2023].revenus)}%
                </p>
                <p className="text-sm text-green-600">Très bonne performance</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Évolution Patients</p>
                <p className="text-2xl font-bold text-text-primary">
                  +{getGrowthPercentage(yearlyComparison[2024].patients, yearlyComparison[2023].patients)}%
                </p>
                <p className="text-sm text-blue-600">+{yearlyComparison[2024].patients - yearlyComparison[2023].patients} nouveaux</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Marge Nette</p>
                <p className="text-2xl font-bold text-text-primary">
                  {yearlyComparison[2024].margeNette.toFixed(1)}%
                </p>
                <p className="text-sm text-green-600">Stable et optimale</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Résultat Net</p>
                <p className="text-2xl font-bold text-text-primary">
                  {yearlyComparison[2024].resultatNet.toLocaleString()} €
                </p>
                <p className="text-sm text-green-600">
                  +{getGrowthPercentage(yearlyComparison[2024].resultatNet, yearlyComparison[2023].resultatNet)}%
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution Mensuelle - Année en Cours vs Année Précédente</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="2024"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="#94a3b8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="2023"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue by Medical Service Type */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse par Type de Prestation Médicale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prestationTypes.map((prestation, index) => {
              const growth = getGrowthPercentage(prestation.current, prestation.previous);
              const isPositive = parseFloat(growth) >= 0;
              
              return (
                <div key={index} className="p-4 border border-border-primary rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-text-primary">{prestation.type}</h4>
                    <Badge className={isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {isPositive ? '+' : ''}{growth}%
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-text-muted">Revenus 2024</p>
                      <p className="font-bold text-text-primary">{prestation.current.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Revenus 2023</p>
                      <p className="font-medium text-text-secondary">{prestation.previous.toLocaleString()} €</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Volume d'Actes</p>
                      <p className="font-medium text-blue-600">{prestation.volume.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Prix Moyen</p>
                      <p className="font-medium text-purple-600">{prestation.prixMoyen} €</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((prestation.current / Math.max(...prestationTypes.map(p => p.current))) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Service Revenue Breakdown Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparaison par Type de Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              <Bar dataKey="consultationsGenerales" fill="#22c55e" name="Consultations Générales" />
              <Bar dataKey="consultationsSpecialisees" fill="#3b82f6" name="Consultations Spécialisées" />
              <Bar dataKey="teleconsultations" fill="#f59e0b" name="Téléconsultations" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Ratios Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Ratios Financiers - Évolution et Objectifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ratiosComparison.map((ratio, index) => (
              <div key={index} className="p-4 border border-border-primary rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-text-primary">{ratio.ratio}</h4>
                  <Badge className={getStatusColor(ratio.status)}>
                    {ratio.status === 'improving' ? 'En amélioration' :
                     ratio.status === 'warning' ? 'Attention' : 'Stable'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-text-muted text-sm">Valeur Actuelle</p>
                    <p className="font-bold text-lg text-text-primary">
                      {typeof ratio.current === 'number' ? ratio.current.toFixed(1) : ratio.current}
                      {ratio.ratio.includes('%') || ratio.ratio.includes('jours') ? '' : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Période Précédente</p>
                    <p className="font-medium text-text-secondary">
                      {typeof ratio.previous === 'number' ? ratio.previous.toFixed(1) : ratio.previous}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Objectif</p>
                    <p className="font-medium text-green-600">
                      {typeof ratio.target === 'number' ? ratio.target.toFixed(1) : ratio.target}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Évolution</p>
                    <div className="flex items-center">
                      {ratio.current > ratio.previous ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      ) : ratio.current < ratio.previous ? (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                      ) : (
                        <Activity className="w-4 h-4 text-blue-600 mr-1" />
                      )}
                      <span className={`text-sm ${
                        ratio.current > ratio.previous ? 'text-green-600' :
                        ratio.current < ratio.previous ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {ratio.current === ratio.previous ? 'Stable' :
                         `${Math.abs(((ratio.current - ratio.previous) / ratio.previous * 100)).toFixed(1)}%`}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar to target */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-text-muted mb-1">
                    <span>Progress vers l'objectif</span>
                    <span>{Math.min((ratio.current / ratio.target * 100), 100).toFixed(0)}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        ratio.current >= ratio.target ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((ratio.current / ratio.target * 100), 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charges Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des Charges - Fixes vs Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
              <Area 
                type="monotone" 
                dataKey="chargesPersonnel" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef4444"
                fillOpacity={0.6}
                name="Charges Personnel"
              />
              <Area 
                type="monotone" 
                dataKey="chargesOperationnelles" 
                stackId="1"
                stroke="#f97316" 
                fill="#f97316"
                fillOpacity={0.6}
                name="Charges Opérationnelles"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary and Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé de l'Analyse Comparative</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">Points Forts</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Croissance soutenue du chiffre d'affaires (+10.4% vs N-1)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Augmentation du nombre de patients (+14% sur l'année)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Amélioration des délais de paiement (-2.7 jours)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Taux de retour patients en progression (78.5%)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange-600 mb-3">Points d'Amélioration</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Masse salariale légèrement au-dessus de l'objectif (22.2% vs 22%)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Développement des téléconsultations à accélérer</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Optimisation des charges opérationnelles possibles</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Diversification des actes complémentaires</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparativeAnalysis;
