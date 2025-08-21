
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Users, 
  Gift, 
  Download,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Wallet,
  TrendingUp,
  Copy
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BillingSettings = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [refundRequested, setRefundRequested] = useState(false);
  const [referralCode] = useState('MED2024REF');

  // Mock data - in real app, this would come from your billing system
  const subscription = {
    plan: 'Premium',
    status: 'active',
    renewalDate: '2024-02-15',
    amount: 99.99,
    currency: 'USD',
    cycle: 'monthly'
  };

  const balance = {
    current: 250.75,
    pending: 45.00,
    total: 295.75
  };

  const referralStats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalEarned: 480.00
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Code copié",
      description: "Le code de parrainage a été copié dans le presse-papiers",
    });
  };

  const handleRequestRefund = () => {
    setRefundRequested(true);
    toast({
      title: "Demande de remboursement envoyée",
      description: "Votre demande sera traitée sous 5-7 jours ouvrables",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Facturation & Abonnements</h2>
        <p className="text-text-muted">Gérez vos abonnements, factures et paramètres de paiement</p>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Abonnement Actuel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="default" className="bg-primary text-white">
                {subscription.plan}
              </Badge>
              <Badge 
                variant={subscription.status === 'active' ? 'default' : 'destructive'}
                className={subscription.status === 'active' ? 'bg-green-100 text-green-800' : ''}
              >
                {subscription.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-text-primary">
                ${subscription.amount}
              </p>
              <p className="text-sm text-text-muted">/{subscription.cycle === 'monthly' ? 'mois' : 'an'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Prochaine facture</p>
                <p className="font-medium text-text-primary">{subscription.renewalDate}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">Renouvellement automatique</span>
              </div>
              <Switch checked={autoRenewal} onCheckedChange={setAutoRenewal} />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Télécharger la facture
            </Button>
            <Button variant="outline" size="sm">
              Changer de plan
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleRequestRefund}
              disabled={refundRequested}
            >
              {refundRequested ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Demande envoyée
                </>
              ) : (
                'Demander un remboursement'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Balance & Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Solde & Crédits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-elevated p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-text-secondary">Solde actuel</p>
                  <p className="text-xl font-bold text-text-primary">${balance.current}</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-elevated p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-text-secondary">En attente</p>
                  <p className="text-xl font-bold text-text-primary">${balance.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-elevated p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-text-secondary">Total disponible</p>
                  <p className="text-xl font-bold text-text-primary">${balance.total}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="default">
              Ajouter des crédits
            </Button>
            <Button variant="outline">
              Historique des transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Program */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            Programme de Parrainage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
            <h3 className="font-semibold text-text-primary mb-2">Parrainez et gagnez!</h3>
            <p className="text-sm text-text-muted mb-3">
              Invitez vos collègues et gagnez $60 pour chaque abonnement réussi. 
              Ils recevront également 30% de réduction sur leur premier mois.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Label htmlFor="referral-code" className="text-sm">Votre code de parrainage</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input 
                    id="referral-code"
                    value={referralCode} 
                    readOnly 
                    className="font-mono"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyReferralCode}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-text-primary">{referralStats.totalReferrals}</p>
              <p className="text-xs text-text-secondary">Total invités</p>
            </div>
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-text-primary">{referralStats.successfulReferrals}</p>
              <p className="text-xs text-text-secondary">Conversions</p>
            </div>
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <AlertCircle className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-2xl font-bold text-text-primary">{referralStats.pendingReferrals}</p>
              <p className="text-xs text-text-secondary">En attente</p>
            </div>
            <div className="text-center p-3 bg-surface-elevated rounded-lg">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-text-primary">${referralStats.totalEarned}</p>
              <p className="text-xs text-text-secondary">Gains totaux</p>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Voir l'historique des parrainages
          </Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Méthodes de Paiement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border-primary rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-text-primary">•••• •••• •••• 4242</p>
                  <p className="text-sm text-text-secondary">Expire 12/25</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Principal
              </Badge>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              Ajouter une carte
            </Button>
            <Button variant="outline">
              Gérer les méthodes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique de Facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '15 Jan 2024', amount: '$99.99', status: 'Payé', invoice: 'INV-2024-001' },
              { date: '15 Déc 2023', amount: '$99.99', status: 'Payé', invoice: 'INV-2023-012' },
              { date: '15 Nov 2023', amount: '$99.99', status: 'Payé', invoice: 'INV-2023-011' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-text-primary">{item.invoice}</p>
                    <p className="text-sm text-text-secondary">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {item.status}
                  </Badge>
                  <p className="font-medium text-text-primary">{item.amount}</p>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
