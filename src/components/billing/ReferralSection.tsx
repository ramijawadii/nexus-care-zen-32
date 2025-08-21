
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Copy, Gift, DollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ReferralSection = () => {
  const referralLink = 'https://medicalapp.com/ref/user123456';
  
  // Mock referral data
  const referralStats = {
    totalReferred: 8,
    activeReferrals: 5,
    totalRewards: 250, // DT
    pendingRewards: 50, // DT
    extraTokens: 160000, // bonus tokens earned
    nextPayout: '2025-02-15'
  };

  const recentReferrals = [
    { name: 'Dr. Ahmed B.', joinDate: '2025-01-10', status: 'active', reward: '50 DT' },
    { name: 'Dr. Sarah M.', joinDate: '2025-01-08', status: 'active', reward: '50 DT' },
    { name: 'Dr. Karim L.', joinDate: '2025-01-05', status: 'pending', reward: '50 DT' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Lien copié!",
      description: "Le lien de parrainage a été copié dans le presse-papiers",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Programme de Parrainage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Referral Link */}
        <div className="space-y-2">
          <h4 className="font-medium">Votre Lien de Parrainage</h4>
          <div className="flex space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-muted"
            />
            <Button onClick={handleCopyLink}>
              <Copy className="w-4 h-4 mr-2" />
              Copier
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Partagez ce lien et gagnez 50 DT + 20K tokens pour chaque utilisateur payant que vous parrainez!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{referralStats.totalReferred}</div>
            <div className="text-sm text-blue-700">Total Parrainés</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{referralStats.activeReferrals}</div>
            <div className="text-sm text-green-700">Actifs</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{referralStats.totalRewards} DT</div>
            <div className="text-sm text-purple-700">Récompenses Gagnées</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{(referralStats.extraTokens / 1000).toFixed(0)}K</div>
            <div className="text-sm text-yellow-700">Tokens Bonus</div>
          </div>
        </div>

        {/* Rewards Summary */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold">Récompenses Disponibles</h4>
                <p className="text-sm text-muted-foreground">
                  {referralStats.pendingRewards} DT en attente • Prochain paiement: {referralStats.nextPayout}
                </p>
              </div>
            </div>
            <Button variant="default">
              <DollarSign className="w-4 h-4 mr-2" />
              Retirer
            </Button>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="space-y-3">
          <h4 className="font-medium">Parrainages Récents</h4>
          <div className="space-y-2">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{referral.name}</p>
                  <p className="text-sm text-muted-foreground">Rejoint le {referral.joinDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="default" 
                    className={referral.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {referral.status === 'active' ? 'Actif' : 'En attente'}
                  </Badge>
                  <span className="font-medium text-sm">{referral.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Program Details */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Comment ça marche?</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Partagez votre lien de parrainage unique</li>
            <li>• Gagnez 50 DT + 20K tokens pour chaque utilisateur payant</li>
            <li>• Les récompenses sont créditées après 30 jours d'abonnement actif</li>
            <li>• Retirez vos gains à partir de 100 DT minimum</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSection;
