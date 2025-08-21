
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Settings, Palette, Calculator, Receipt } from 'lucide-react';
import TemplateSelectionModal from '../TemplateSelectionModal';

interface StepBasicInfoProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  setSaveStatus: (status: string) => void;
}

const StepBasicInfo: React.FC<StepBasicInfoProps> = ({ invoiceData, setInvoiceData, setSaveStatus }) => {
  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    setInvoiceData({...invoiceData, template: templateId});
    setSaveStatus('modified');
    setTemplateModalOpen(false);
  };

  const handleTaxChange = (field: string, value: any) => {
    setInvoiceData({
      ...invoiceData,
      tax: {
        ...invoiceData.tax,
        [field]: value
      }
    });
    setSaveStatus('modified');
  };

  return (
    <div className="space-y-6">
      {/* Template & Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Configuration de Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="template">Modèle</Label>
              <div className="flex gap-2">
                <Select 
                  value={invoiceData.template} 
                  onValueChange={(value) => setInvoiceData({...invoiceData, template: value})}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professionnel</SelectItem>
                    <SelectItem value="modern">Moderne</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="classic">Classique</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setTemplateModalOpen(true)}
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="language">Langue</Label>
              <Select 
                value={invoiceData.language} 
                onValueChange={(value) => setInvoiceData({...invoiceData, language: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Devise</Label>
              <Select 
                value={invoiceData.currency} 
                onValueChange={(value) => setInvoiceData({...invoiceData, currency: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TND">TND (Dinar Tunisien)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="USD">USD (Dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={invoiceData.status} 
                onValueChange={(value) => setInvoiceData({...invoiceData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                  <SelectItem value="Envoyée">Envoyée</SelectItem>
                  <SelectItem value="Payée">Payée</SelectItem>
                  <SelectItem value="En retard">En retard</SelectItem>
                  <SelectItem value="Annulée">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Invoice Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Informations de Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Numéro de Facture</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => {
                  setInvoiceData({...invoiceData, invoiceNumber: e.target.value});
                  setSaveStatus('modified');
                }}
              />
            </div>
            <div>
              <Label htmlFor="date">Date de Facturation</Label>
              <Input
                id="date"
                type="date"
                value={invoiceData.date}
                onChange={(e) => {
                  setInvoiceData({...invoiceData, date: e.target.value});
                  setSaveStatus('modified');
                }}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Date d'Échéance</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => {
                  setInvoiceData({...invoiceData, dueDate: e.target.value});
                  setSaveStatus('modified');
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Configuration Fiscale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* VAT Configuration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="includeVAT" className="font-medium">Inclure la TVA</Label>
                <Switch
                  id="includeVAT"
                  checked={invoiceData.tax?.includeVAT || false}
                  onCheckedChange={(checked) => handleTaxChange('includeVAT', checked)}
                />
              </div>
              
              {invoiceData.tax?.includeVAT && (
                <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                  <div>
                    <Label htmlFor="vatNumber">Numéro TVA</Label>
                    <Input
                      id="vatNumber"
                      placeholder="TN-1234567-ABC"
                      value={invoiceData.tax?.vatNumber || ''}
                      onChange={(e) => handleTaxChange('vatNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vatRate">Taux TVA par défaut (%)</Label>
                    <Input
                      id="vatRate"
                      type="number"
                      placeholder="7"
                      value={invoiceData.tax?.defaultVatRate || ''}
                      onChange={(e) => handleTaxChange('defaultVatRate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Fiscal Stamp Configuration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="includeFiscalStamp" className="font-medium">Timbre Fiscal</Label>
                <Switch
                  id="includeFiscalStamp"
                  checked={invoiceData.tax?.includeFiscalStamp || false}
                  onCheckedChange={(checked) => handleTaxChange('includeFiscalStamp', checked)}
                />
              </div>
              
              {invoiceData.tax?.includeFiscalStamp && (
                <div className="space-y-3 pl-4 border-l-2 border-green-200">
                  <div>
                    <Label htmlFor="fiscalStampAmount">Montant Timbre Fiscal</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fiscalStampAmount"
                        type="number"
                        step="0.001"
                        placeholder="0.600"
                        value={invoiceData.tax?.fiscalStampAmount || ''}
                        onChange={(e) => handleTaxChange('fiscalStampAmount', parseFloat(e.target.value) || 0)}
                      />
                      <div className="flex items-center px-3 bg-gray-100 rounded-md text-sm text-gray-600">
                        {invoiceData.currency}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="fiscalStampType">Type de Timbre</Label>
                    <Select 
                      value={invoiceData.tax?.fiscalStampType || 'fixed'} 
                      onValueChange={(value) => handleTaxChange('fiscalStampType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Montant Fixe</SelectItem>
                        <SelectItem value="percentage">Pourcentage du Total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        currentTemplate={invoiceData.template}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
};

export default StepBasicInfo;
