import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Upload } from 'lucide-react';

interface StepDoctorInfoProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  setSaveStatus: (status: string) => void;
}

const StepDoctorInfo: React.FC<StepDoctorInfoProps> = ({ invoiceData, setInvoiceData, setSaveStatus }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInvoiceData({
          ...invoiceData,
          doctorInfo: { ...invoiceData.doctorInfo, logo: e.target?.result }
        });
        setSaveStatus('modified');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Building2 className="w-5 h-5 mr-2" />
          Informations du Cabinet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            {invoiceData.doctorInfo.logo ? (
              <img 
                src={invoiceData.doctorInfo.logo} 
                alt="Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <Upload className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mb-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              Télécharger Logo
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500">PNG, JPG jusqu'à 2MB</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="doctorName">Nom</Label>
            <Input
              id="doctorName"
              value={invoiceData.doctorInfo.name}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData,
                  doctorInfo: {...invoiceData.doctorInfo, name: e.target.value}
                });
                setSaveStatus('modified');
              }}
            />
          </div>
          <div>
            <Label htmlFor="doctorSpecialty">Spécialité</Label>
            <Input
              id="doctorSpecialty"
              value={invoiceData.doctorInfo.specialty}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData,
                  doctorInfo: {...invoiceData.doctorInfo, specialty: e.target.value}
                });
                setSaveStatus('modified');
              }}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="doctorAddress">Adresse</Label>
            <Textarea
              id="doctorAddress"
              value={invoiceData.doctorInfo.address}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData,
                  doctorInfo: {...invoiceData.doctorInfo, address: e.target.value}
                });
                setSaveStatus('modified');
              }}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="doctorPhone">Téléphone</Label>
            <Input
              id="doctorPhone"
              value={invoiceData.doctorInfo.phone}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData,
                  doctorInfo: {...invoiceData.doctorInfo, phone: e.target.value}
                });
                setSaveStatus('modified');
              }}
            />
          </div>
          <div>
            <Label htmlFor="doctorEmail">Email</Label>
            <Input
              id="doctorEmail"
              type="email"
              value={invoiceData.doctorInfo.email}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData,
                  doctorInfo: {...invoiceData.doctorInfo, email: e.target.value}
                });
                setSaveStatus('modified');
              }}
            />
          </div>
          <div>
            <Label htmlFor="doctorRegistrationNumber">N° Ordre</Label>
            <Input
              id="doctorRegistrationNumber"
              value={invoiceData.doctorInfo.registrationNumber}
              onChange={(e) => {
                setInvoiceData({
                  ...invoiceData,
                  doctorInfo: {...invoiceData.doctorInfo, registrationNumber: e.target.value}
                });
                setSaveStatus('modified');
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepDoctorInfo;