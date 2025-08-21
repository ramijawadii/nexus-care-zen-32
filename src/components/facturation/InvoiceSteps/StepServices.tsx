import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Trash2 } from 'lucide-react';

interface StepServicesProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  setSaveStatus: (status: string) => void;
}

const StepServices: React.FC<StepServicesProps> = ({ invoiceData, setInvoiceData, setSaveStatus }) => {
  const updateService = (index: number, field: string, value: any) => {
    const updatedServices = [...invoiceData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setInvoiceData({ ...invoiceData, services: updatedServices });
    setSaveStatus('modified');
  };

  const addService = () => {
    const newService = {
      id: invoiceData.services.length + 1,
      description: '',
      quantity: 1,
      unitPrice: 0,
      vatRate: 7,
      discount: 0,
      total: 0
    };
    setInvoiceData({ 
      ...invoiceData, 
      services: [...invoiceData.services, newService] 
    });
    setSaveStatus('modified');
  };

  const removeService = (index: number) => {
    if (invoiceData.services.length > 1) {
      const updatedServices = invoiceData.services.filter((_: any, i: number) => i !== index);
      setInvoiceData({ ...invoiceData, services: updatedServices });
      setSaveStatus('modified');
    }
  };

  const calculateServiceTotal = (service: any) => {
    const subtotal = service.quantity * service.unitPrice;
    const discountAmount = (subtotal * service.discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateVAT = (service: any) => {
    return (calculateServiceTotal(service) * service.vatRate) / 100;
  };

  const calculateSubtotal = () => {
    return invoiceData.services.reduce((sum: number, service: any) => sum + calculateServiceTotal(service), 0);
  };

  const calculateTotalVAT = () => {
    return invoiceData.services.reduce((sum: number, service: any) => sum + calculateVAT(service), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalVAT();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Prestations Facturées
            </CardTitle>
            <Button size="sm" onClick={addService}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter Service
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoiceData.services.map((service: any, index: number) => (
            <Card key={service.id} className="p-4 bg-white border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
                <div className="md:col-span-2">
                  <Label>Description *</Label>
                  <Input
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    placeholder="Consultation, Acte médical..."
                    className={!service.description ? 'border-red-300' : ''}
                  />
                </div>
                <div>
                  <Label>Quantité</Label>
                  <Input
                    type="number"
                    min="1"
                    value={service.quantity}
                    onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div>
                  <Label>Prix Unit. ({invoiceData.currency})</Label>
                  <Input
                    type="number"
                    step="0.001"
                    value={service.unitPrice}
                    onChange={(e) => updateService(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>Remise (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={service.discount}
                    onChange={(e) => updateService(index, 'discount', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label>TVA (%)</Label>
                  <Select 
                    value={service.vatRate.toString()} 
                    onValueChange={(value) => updateService(index, 'vatRate', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="7">7%</SelectItem>
                      <SelectItem value="13">13%</SelectItem>
                      <SelectItem value="19">19%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {calculateServiceTotal(service).toFixed(3)} {invoiceData.currency}
                    </div>
                    <div className="text-xs text-gray-500">
                      +{calculateVAT(service).toFixed(3)} TVA
                    </div>
                  </div>
                  {invoiceData.services.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Récapitulatif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-600">Sous-total HT:</span>
              <span className="font-semibold">{calculateSubtotal().toFixed(3)} {invoiceData.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TVA:</span>
              <span className="font-semibold">{calculateTotalVAT().toFixed(3)} {invoiceData.currency}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-xl font-bold">
                <span>Total TTC:</span>
                <span className="text-blue-600">{calculateTotal().toFixed(3)} {invoiceData.currency}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepServices;