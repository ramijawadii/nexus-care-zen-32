
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Zap, 
  TrendingUp, 
  Crown, 
  CheckCircle, 
  Sparkles,
  Shield,
  Headphones,
  Clock,
  BarChart3
} from 'lucide-react';

const CurrentPlanOverview = () => {
  // Mock data - replace with actual data later
  const currentPlan = {
    name: 'HealthCRM Pro',
    price: 300,
    currency: 'DT',
    renewalDate: '2025-03-14',
    remainingDays: 28,
    features: [
      'Gestion illimitée des patients',
      'IA Copilote avancée',
      'Analyses et rapports détaillés',
      'Support prioritaire 24/7',
      'Intégrations premium',
      'Sauvegarde automatique'
    ]
  };

  const tokenUsage = {
    used: 75000,
    total: 100000,
    percentage: 75
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Sécurité Maximale',
      description: 'Données cryptées et conformité RGPD'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avancés',
      description: 'Insights en temps réel sur votre cabinet'
    },
    {
      icon: Headphones,
      title: 'Support 24/7',
      description: 'Assistance technique prioritaire'
    },
    {
      icon: Clock,
      title: 'Gain de Temps',
      description: 'Automatisation des tâches répétitives'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Crown className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {currentPlan.name}
              </h1>
              <p className="text-text-muted">La solution complète pour votre cabinet médical</p>
            </div>
          </div>
          <Badge variant="default" className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-1" />
            Plan Actif
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Details */}
          <div className="space-y-6">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-primary">{currentPlan.price}</span>
              <span className="text-2xl font-semibold text-primary">{currentPlan.currency}</span>
              <span className="text-text-muted">/mois</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Renouvellement: {currentPlan.renewalDate}</span>
              </div>
              <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                {currentPlan.remainingDays} jours restants
              </div>
            </div>

            {/* Token Usage */}
            <div className="space-y-3 bg-background/60 rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="font-medium">Utilisation IA</span>
                </div>
                <span className="text-sm text-text-muted">
                  {tokenUsage.used.toLocaleString()} / {tokenUsage.total.toLocaleString()} tokens
                </span>
              </div>
              <Progress value={tokenUsage.percentage} className="h-2" />
              <div className="flex justify-between text-xs text-text-muted">
                <span>{tokenUsage.percentage}% utilisé</span>
                <span>{(tokenUsage.total - tokenUsage.used).toLocaleString()} tokens restants</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary" />
              Fonctionnalités Incluses
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-background/60 rounded-lg p-3 border">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <TrendingUp className="w-4 h-4 mr-2" />
            Passer à Premium
          </Button>
          <Button variant="outline" size="lg">
            Modifier le Plan
          </Button>
          <Button variant="ghost" size="lg">
            Voir la Facturation
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Pourquoi HealthCRM Pro ?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{benefit.title}</h4>
                  <p className="text-sm text-text-muted mt-1">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-blue-700 mt-1">Satisfaction Client</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600">40%</div>
            <div className="text-sm text-emerald-700 mt-1">Temps Économisé</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-purple-700 mt-1">Support Disponible</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CurrentPlanOverview;
