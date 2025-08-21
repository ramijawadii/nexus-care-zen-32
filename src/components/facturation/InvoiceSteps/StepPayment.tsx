import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';

interface StepPaymentProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  setSaveStatus: (status: string) => void;
}

const StepPayment: React.FC<StepPaymentProps> = ({ invoiceData, setInvoiceData, setSaveStatus }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Paiement et Coordonnées Bancaires
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="paymentMethod">Mode de Règlement</Label>
            <Select 
              value={invoiceData.paymentMethod} 
              onValueChange={(value) => {
                setInvoiceData({...invoiceData, paymentMethod: value});
                setSaveStatus('modified');
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Espèces">Espèces</SelectItem>
                <SelectItem value="Carte">Carte Bancaire</SelectItem>
                <SelectItem value="Virement">Virement</SelectItem>
                <SelectItem value="Chèque">Chèque</SelectItem>
                <SelectItem value="Assurance">Prise en charge Assurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="paymentTerms">Conditions de Paiement</Label>
            <Input
              id="paymentTerms"
              value={invoiceData.paymentTerms}
              onChange={(e) => {
                setInvoiceData({...invoiceData, paymentTerms: e.target.value});
                setSaveStatus('modified');
              }}
              placeholder="Payable à réception"
            />
          </div>
        </div>
        
        {/* Bank Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Coordonnées Bancaires</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Banque</Label>
              <Input
                value={invoiceData.bankDetails.bankName}
                onChange={(e) => {
                  setInvoiceData({
                    ...invoiceData, 
                    bankDetails: {...invoiceData.bankDetails, bankName: e.target.value}
                  });
                  setSaveStatus('modified');
                }}
                placeholder="Nom de la banque"
              />
            </div>
            <div>
              <Label>Numéro de Compte</Label>
              <Input
                value={invoiceData.bankDetails.accountNumber}
                onChange={(e) => {
                  setInvoiceData({
                    ...invoiceData, 
                    bankDetails: {...invoiceData.bankDetails, accountNumber: e.target.value}
                  });
                  setSaveStatus('modified');
                }}
                placeholder="RIB/IBAN"
              />
            </div>
            <div>
              <Label>Code SWIFT</Label>
              <Input
                value={invoiceData.bankDetails.swift}
                onChange={(e) => {
                  setInvoiceData({
                    ...invoiceData, 
                    bankDetails: {...invoiceData.bankDetails, swift: e.target.value}
                  });
                  setSaveStatus('modified');
                }}
                placeholder="Code SWIFT/BIC"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepPayment;