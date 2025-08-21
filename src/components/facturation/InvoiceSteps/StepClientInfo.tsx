import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';

interface StepClientInfoProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  setSaveStatus: (status: string) => void;
}

const StepClientInfo: React.FC<StepClientInfoProps> = ({ invoiceData, setInvoiceData, setSaveStatus }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <User className="w-5 h-5 mr-2" />
          Informations Client
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientName">Nom du Client *</Label>
            <Input
              id="clientName"
              value={invoiceData.clientInfo.name}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData, 
                  clientInfo: {...invoiceData.clientInfo, name: e.target.value}
                });
                setSaveStatus('modified');
              }}
              placeholder="Nom du patient ou assurance"
              className={!invoiceData.clientInfo.name ? 'border-red-300' : ''}
            />
          </div>
          <div>
            <Label htmlFor="clientType">Type de Client</Label>
            <Select 
              value={invoiceData.clientInfo.type} 
              onValueChange={(value) => {
                setInvoiceData({
                  ...invoiceData, 
                  clientInfo: {...invoiceData.clientInfo, type: value}
                });
                setSaveStatus('modified');
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Particulier">Particulier</SelectItem>
                <SelectItem value="Assurance">Assurance</SelectItem>
                <SelectItem value="Entreprise">Entreprise</SelectItem>
                <SelectItem value="Mutuelle">Mutuelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="clientPhone">Téléphone</Label>
            <Input
              id="clientPhone"
              value={invoiceData.clientInfo.phone}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData, 
                  clientInfo: {...invoiceData.clientInfo, phone: e.target.value}
                });
                setSaveStatus('modified');
              }}
              placeholder="+216 XX XXX XXX"
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={invoiceData.clientInfo.email}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData, 
                  clientInfo: {...invoiceData.clientInfo, email: e.target.value}
                });
                setSaveStatus('modified');
              }}
              placeholder="email@exemple.com"
            />
          </div>
          {invoiceData.clientInfo.type === 'Entreprise' && (
            <div>
              <Label htmlFor="taxNumber">Numéro Fiscal</Label>
              <Input
                id="taxNumber"
                value={invoiceData.clientInfo.taxNumber}
                onChange={(e) => {
                  setInvoiceData({
                    ...invoiceData, 
                    clientInfo: {...invoiceData.clientInfo, taxNumber: e.target.value}
                  });
                  setSaveStatus('modified');
                }}
                placeholder="Numéro d'identification fiscale"
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="clientAddress">Adresse</Label>
          <Textarea
            id="clientAddress"
            value={invoiceData.clientInfo.address}
            onChange={(e) => {
              setInvoiceData({
                ...invoiceData, 
                clientInfo: {...invoiceData.clientInfo, address: e.target.value}
              });
              setSaveStatus('modified');
            }}
            placeholder="Adresse complète"
            rows={2}
          />
        </div>
        {invoiceData.clientInfo.type === 'Assurance' && (
          <div>
            <Label htmlFor="insuranceInfo">Informations Assurance</Label>
            <Input
              id="insuranceInfo"
              value={invoiceData.clientInfo.insuranceInfo}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData, 
                  clientInfo: {...invoiceData.clientInfo, insuranceInfo: e.target.value}
                });
                setSaveStatus('modified');
              }}
              placeholder="N° police, garanties, etc."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StepClientInfo;