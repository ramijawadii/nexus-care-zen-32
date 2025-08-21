
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Settings, Building, Plus, Edit, Trash2 } from 'lucide-react';

const BillingSettings = () => {
  const [autoRenew, setAutoRenew] = useState(true);
  const [invoiceSettings, setInvoiceSettings] = useState({
    companyName: 'Clinique Médicale Tunis',
    vatNumber: 'TN123456789',
    address: '123 Avenue Habib Bourguiba, Tunis 1000',
    email: 'billing@clinique.tn'
  });

  // Mock payment methods
  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false
    }
  ];

  const handleInvoiceSettingChange = (field: string, value: string) => {
    setInvoiceSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCardBrandColor = (brand: string) => {
    switch (brand) {
      case 'visa':
        return 'bg-blue-600';
      case 'mastercard':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Méthodes de Paiement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-6 ${getCardBrandColor(method.brand)} rounded text-white text-xs flex items-center justify-center font-bold`}>
                    {method.brand.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• {method.last4}</p>
                    <p className="text-sm text-muted-foreground">Expire {method.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Principal
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une Méthode de Paiement
          </Button>

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Méthodes acceptées:</strong> Cartes Visa/Mastercard, PayPal, Virement bancaire (pour les entreprises)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Paramètres de Facturation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'Entreprise</Label>
              <Input
                id="companyName"
                value={invoiceSettings.companyName}
                onChange={(e) => handleInvoiceSettingChange('companyName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vatNumber">Numéro TVA</Label>
              <Input
                id="vatNumber"
                value={invoiceSettings.vatNumber}
                onChange={(e) => handleInvoiceSettingChange('vatNumber', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse de Facturation</Label>
            <Input
              id="address"
              value={invoiceSettings.address}
              onChange={(e) => handleInvoiceSettingChange('address', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingEmail">Email de Facturation</Label>
            <Input
              id="billingEmail"
              type="email"
              value={invoiceSettings.email}
              onChange={(e) => handleInvoiceSettingChange('email', e.target.value)}
            />
          </div>

          <Button>Sauvegarder les Paramètres</Button>
        </CardContent>
      </Card>

      {/* Auto-renewal Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Paramètres d'Abonnement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Renouvellement Automatique</h4>
              <p className="text-sm text-muted-foreground">
                Renouvelez automatiquement votre abonnement chaque mois
              </p>
            </div>
            <Switch
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Notifications de Facturation</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rappel avant renouvellement (7 jours)</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Confirmation de paiement</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Alerte de dépassement de tokens</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Factures mensuelles</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800">Zone de Danger</h4>
            <p className="text-sm text-yellow-700 mt-1 mb-3">
              La suppression de votre compte est irréversible et supprimera toutes vos données.
            </p>
            <Button variant="destructive" size="sm">
              Supprimer le Compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
