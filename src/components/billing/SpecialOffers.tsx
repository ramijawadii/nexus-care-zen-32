
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sparkles, Crown, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const SpecialOffers = () => {
  // Plan comparison data
  const planComparison = [
    {
      feature: 'Allocation de Tokens',
      basic: '100K tokens/mois',
      advanced: '300K tokens/mois'
    },
    {
      feature: 'Assistant Copilot',
      basic: 'Mode Basique',
      advanced: 'Mode Avancé Complet'
    },
    {
      feature: 'Limite de Débit API',
      basic: 'Accès Standard',
      advanced: 'Accès Prioritaire'
    },
    {
      feature: 'Vitesse du Modèle IA',
      basic: 'Normale',
      advanced: 'Rapide'
    },
    {
      feature: 'Support Technique',
      basic: 'Support Standard',
      advanced: 'Support Prioritaire'
    },
    {
      feature: 'Analyses Avancées',
      basic: 'Limitées',
      advanced: 'Complètes'
    }
  ];

  const currentPlan = 'basic'; // Mock current plan

  const handleUpgrade = () => {
    console.log('Initiating upgrade to Advanced AI plan');
  };

  return (
    <div className="space-y-6">
      {/* Plan Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Comparaison des Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Fonctionnalité</TableHead>
                  <TableHead className="text-center bg-muted/50">
                    <div className="flex flex-col items-center space-y-1">
                      <span className="font-semibold">Basic AI</span>
                      <span className="text-sm text-muted-foreground">300 DT/mois</span>
                      {currentPlan === 'basic' && (
                        <Badge variant="default" className="bg-blue-100 text-blue-800 text-xs">
                          Plan Actuel
                        </Badge>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-center bg-gradient-to-r from-primary/10 to-primary/5">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex items-center space-x-1">
                        <Crown className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Advanced AI</span>
                      </div>
                      <span className="text-sm text-muted-foreground">500 DT/mois</span>
                      <Badge variant="default" className="bg-primary text-white text-xs">
                        Recommandé
                      </Badge>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planComparison.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.feature}</TableCell>
                    <TableCell className="text-center bg-muted/20">{item.basic}</TableCell>
                    <TableCell className="text-center bg-gradient-to-r from-primary/5 to-primary/2 font-medium">
                      {item.advanced}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Special Upgrade Offers */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Limited Time Offer */}
        <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Offre Limitée
              </CardTitle>
              <Badge variant="destructive" className="animate-pulse">
                48h restantes
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Passez à Advanced AI</h3>
              <p className="text-muted-foreground">
                Mettez à niveau maintenant et obtenez +50K tokens gratuits pendant 2 mois!
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>300K tokens/mois (au lieu de 100K)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Copilot avancé avec toutes les fonctionnalités</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Accès prioritaire & vitesse rapide</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary font-medium">
                <Sparkles className="w-4 h-4" />
                <span>BONUS: +50K tokens gratuits x2 mois</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Prix mensuel:</span>
                <div>
                  <span className="text-lg font-bold">500 DT</span>
                  <span className="text-sm text-muted-foreground">/mois</span>
                </div>
              </div>
              <Button onClick={handleUpgrade} className="w-full" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Mettre à Niveau Maintenant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Value Proposition */}
        <Card>
          <CardHeader>
            <CardTitle>Pourquoi Choisir Advanced AI?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">3x Plus de Tokens</h4>
                  <p className="text-sm text-muted-foreground">
                    300K tokens par mois pour tous vos besoins IA
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Copilot Complet</h4>
                  <p className="text-sm text-muted-foreground">
                    Assistant IA avancé pour diagnostics et recommandations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Performance Optimale</h4>
                  <p className="text-sm text-muted-foreground">
                    Réponses plus rapides et accès prioritaire aux API
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium">Support Prioritaire</h4>
                  <p className="text-sm text-muted-foreground">
                    Assistance technique dédiée et temps de réponse réduit
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm text-center">
                <span className="font-medium">Économisez 17%</span> en passant à l'abonnement annuel
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpecialOffers;
