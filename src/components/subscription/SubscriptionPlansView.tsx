
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, Crown, Calendar, CreditCard } from 'lucide-react';

const SubscriptionPlansView = () => {
  const [currentPlan, setCurrentPlan] = useState('pro');
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 200,
      description: 'Perfect pour débuter avec HealthCRM',
      features: [
        'Gestion de 500 patients',
        'Rendez-vous basiques',
        'Rapports standards',
        'Support email',
        '1 mois gratuit',
        'Migration gratuite'
      ],
      buttonText: 'Sélectionner Basic',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 499,
      description: 'Pour les cabinets qui veulent croître',
      features: [
        'Gestion illimitée des patients',
        'IA Copilote avancée',
        'Analyses prédictives',
        'Intégrations premium',
        'Support prioritaire 24/7',
        'API personnalisée',
        'Rapports avancés',
        'Automatisation complète'
      ],
      buttonText: 'Sélectionner Pro',
      popular: true
    }
  ];

  const handlePlanSelection = (planId: string) => {
    console.log(`Selecting plan: ${planId}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">
          Choisissez votre plan HealthCRM
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Utilisez HealthCRM pour développer votre cabinet médical. Solutions adaptées à tous les besoins.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative transition-all duration-300 hover:shadow-lg ${
              plan.popular 
                ? 'border-2 border-primary bg-gradient-to-br from-primary/5 to-background' 
                : 'border border-border-primary'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-1 text-sm font-medium">
                  <Sparkles className="w-3 h-3 mr-1" />
                  PLUS POPULAIRE
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                {plan.popular ? (
                  <Crown className="w-6 h-6 text-primary mr-2" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-2" />
                )}
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              </div>
              <p className="text-text-muted">{plan.description}</p>
              
              <div className="flex items-baseline justify-center space-x-2 mt-4">
                <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                <span className="text-xl font-semibold text-text-primary">DT</span>
                <span className="text-text-muted">par mois</span>
              </div>
              <p className="text-sm text-text-muted">facturé mensuellement</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => handlePlanSelection(plan.id)}
                className={`w-full py-3 text-base font-medium ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-white' 
                    : 'bg-text-primary hover:bg-text-primary/90 text-white'
                }`}
                size="lg"
              >
                {plan.buttonText} →
              </Button>

              {currentPlan === plan.id && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-emerald-800">Plan Actuel</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Plan Status */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Statut de l'Abonnement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-text-muted">Plan Actuel</p>
              <p className="text-lg font-semibold text-text-primary">
                HealthCRM Pro
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-text-muted">Prochain Paiement</p>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-text-muted" />
                <p className="text-lg font-semibold text-text-primary">15 Février 2025</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-text-muted">Montant</p>
              <p className="text-lg font-semibold text-text-primary">499 DT</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlansView;
