import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, User, FileText, Calendar } from 'lucide-react';

interface InvoicePreviewProps {
  invoiceData: any;
  template: string;
}

const ProfessionalTemplate = ({ invoiceData }) => (
  <Card className="bg-white shadow-2xl print:shadow-none border-0 overflow-hidden">
    <CardContent className="p-0">
      {/* Enhanced Header with Logo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur border border-white/20">
              {invoiceData.doctorInfo.logo ? (
                <img 
                  src={invoiceData.doctorInfo.logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <Building2 className="w-10 h-10 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">FACTURE</h1>
              <p className="text-blue-100 mt-2 text-lg">Cabinet Médical Professionnel</p>
            </div>
          </div>
          <div className="text-right bg-white/15 p-6 rounded-xl backdrop-blur border border-white/20">
            <div className="text-3xl font-bold">{invoiceData.invoiceNumber}</div>
            <div className="text-sm text-blue-100 mt-2 space-y-1">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date: {new Date(invoiceData.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Échéance: {new Date(invoiceData.dueDate).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Doctor Info */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <Building2 className="w-6 h-6 mr-2 text-blue-600" />
              Émetteur
            </h3>
            <div className="space-y-3">
              <p className="font-bold text-xl text-gray-900">{invoiceData.doctorInfo.name}</p>
              <p className="text-blue-600 font-semibold text-lg">{invoiceData.doctorInfo.specialty}</p>
              <div className="text-gray-600 space-y-1">
                <p>{invoiceData.doctorInfo.address}</p>
              </div>
              <div className="pt-3 border-t border-gray-200 space-y-1 text-sm">
                <p><span className="font-medium">Tél:</span> {invoiceData.doctorInfo.phone}</p>
                <p><span className="font-medium">Email:</span> {invoiceData.doctorInfo.email}</p>
                <p><span className="font-medium">N° Ordre:</span> {invoiceData.doctorInfo.registrationNumber}</p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Facturé à
            </h3>
            <div className="space-y-3">
              <p className="font-bold text-xl text-gray-900">
                {invoiceData.clientInfo.name || 'Nom du client'}
              </p>
              <Badge variant="outline" className="mb-3 text-sm px-3 py-1">
                {invoiceData.clientInfo.type}
              </Badge>
              {invoiceData.clientInfo.address && (
                <p className="text-gray-600">{invoiceData.clientInfo.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center text-xl">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Détail des prestations
          </h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="text-left p-4 font-bold text-gray-700">Description</th>
                  <th className="text-center p-4 font-bold text-gray-700 w-20">Qté</th>
                  <th className="text-right p-4 font-bold text-gray-700 w-32">Prix Unit.</th>
                  <th className="text-right p-4 font-bold text-gray-700 w-32">Total HT</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.services.map((service, index) => (
                  <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{service.description}</div>
                    </td>
                    <td className="p-4 text-center border-b border-gray-100 font-medium">
                      {service.quantity}
                    </td>
                    <td className="p-4 text-right border-b border-gray-100 font-medium">
                      {service.unitPrice.toFixed(3)} {invoiceData.currency}
                    </td>
                    <td className="p-4 text-right border-b border-gray-100 font-bold text-blue-600">
                      {(service.quantity * service.unitPrice).toFixed(3)} {invoiceData.currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Section */}
        <div className="flex justify-end">
          <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-600">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="font-medium text-gray-700">Total TTC:</span>
                <span className="font-bold text-2xl text-blue-600">
                  {invoiceData.services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0).toFixed(3)} {invoiceData.currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ModernTemplate = ({ invoiceData }) => (
  <Card className="bg-white shadow-lg border-0 overflow-hidden">
    <CardContent className="p-0">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light">INVOICE</h1>
            <p className="text-purple-100 mt-1">{invoiceData.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Date: {new Date(invoiceData.date).toLocaleDateString('fr-FR')}</div>
            <div className="text-sm opacity-90">Due: {new Date(invoiceData.dueDate).toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">From</h3>
            <div className="space-y-1">
              <p className="font-bold text-lg">{invoiceData.doctorInfo.name}</p>
              <p className="text-purple-600">{invoiceData.doctorInfo.specialty}</p>
              <p className="text-gray-600 text-sm">{invoiceData.doctorInfo.address}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">To</h3>
            <div className="space-y-1">
              <p className="font-bold text-lg">{invoiceData.clientInfo.name || 'Client Name'}</p>
              <p className="text-gray-600 text-sm">{invoiceData.clientInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-800">Services</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {invoiceData.services.map((service, index) => (
                <div key={service.id} className="px-4 py-3 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{service.description}</p>
                    <p className="text-sm text-gray-500">Qty: {service.quantity} × {service.unitPrice} {invoiceData.currency}</p>
                  </div>
                  <div className="font-bold text-purple-600">
                    {(service.quantity * service.unitPrice).toFixed(3)} {invoiceData.currency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-end">
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-purple-600">
                {invoiceData.services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0).toFixed(3)} {invoiceData.currency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MinimalTemplate = ({ invoiceData }) => (
  <Card className="bg-white shadow-sm border overflow-hidden">
    <CardContent className="p-8">
      {/* Simple Header */}
      <div className="border-b pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice</h1>
            <p className="text-gray-600 mt-1">{invoiceData.invoiceNumber}</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>Date: {new Date(invoiceData.date).toLocaleDateString('fr-FR')}</p>
            <p>Due: {new Date(invoiceData.dueDate).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>

      {/* Simple Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Billed by:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">{invoiceData.doctorInfo.name}</p>
            <p>{invoiceData.doctorInfo.specialty}</p>
            <p>{invoiceData.doctorInfo.address}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Billed to:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">{invoiceData.clientInfo.name || 'Client Name'}</p>
            <p>{invoiceData.clientInfo.address}</p>
          </div>
        </div>
      </div>

      {/* Simple Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-semibold text-gray-900">Description</th>
            <th className="text-center py-2 font-semibold text-gray-900 w-20">Qty</th>
            <th className="text-right py-2 font-semibold text-gray-900 w-32">Price</th>
            <th className="text-right py-2 font-semibold text-gray-900 w-32">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.services.map((service, index) => (
            <tr key={service.id} className="border-b border-gray-100">
              <td className="py-3">{service.description}</td>
              <td className="py-3 text-center">{service.quantity}</td>
              <td className="py-3 text-right">{service.unitPrice.toFixed(3)}</td>
              <td className="py-3 text-right font-medium">
                {(service.quantity * service.unitPrice).toFixed(3)} {invoiceData.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Simple Total */}
      <div className="flex justify-end">
        <div className="text-right">
          <div className="text-xl font-bold">
            Total: {invoiceData.services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0).toFixed(3)} {invoiceData.currency}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ClassicTemplate = ({ invoiceData }) => (
  <Card className="bg-white shadow-lg border-2 border-gray-300 overflow-hidden">
    <CardContent className="p-0">
      {/* Classic Header */}
      <div className="bg-gray-800 text-white p-6 text-center">
        <h1 className="text-3xl font-serif">INVOICE</h1>
        <div className="mt-2 text-gray-300">
          <p>Invoice No: {invoiceData.invoiceNumber}</p>
          <p>Date: {new Date(invoiceData.date).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      <div className="p-8">
        {/* Classic Layout */}
        <div className="border-2 border-gray-300 p-6 mb-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg border-b border-gray-300 pb-2 mb-3">Service Provider</h3>
              <div className="space-y-1">
                <p className="font-bold">{invoiceData.doctorInfo.name}</p>
                <p className="italic">{invoiceData.doctorInfo.specialty}</p>
                <p>{invoiceData.doctorInfo.address}</p>
                <p>Tel: {invoiceData.doctorInfo.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg border-b border-gray-300 pb-2 mb-3">Bill To</h3>
              <div className="space-y-1">
                <p className="font-bold">{invoiceData.clientInfo.name || 'Client Name'}</p>
                <p>{invoiceData.clientInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Classic Table */}
        <table className="w-full border-2 border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left font-serif">Service Description</th>
              <th className="border border-gray-300 p-3 text-center font-serif w-20">Qty</th>
              <th className="border border-gray-300 p-3 text-right font-serif w-32">Unit Price</th>
              <th className="border border-gray-300 p-3 text-right font-serif w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.services.map((service, index) => (
              <tr key={service.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 p-3">{service.description}</td>
                <td className="border border-gray-300 p-3 text-center">{service.quantity}</td>
                <td className="border border-gray-300 p-3 text-right">{service.unitPrice.toFixed(3)}</td>
                <td className="border border-gray-300 p-3 text-right font-medium">
                  {(service.quantity * service.unitPrice).toFixed(3)} {invoiceData.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Classic Total */}
        <div className="flex justify-end">
          <div className="border-2 border-gray-300 p-4 bg-gray-50">
            <div className="text-right">
              <p className="font-serif text-lg">TOTAL AMOUNT DUE</p>
              <p className="text-2xl font-bold font-serif">
                {invoiceData.services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0).toFixed(3)} {invoiceData.currency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData, template }) => {
  switch (template) {
    case 'modern':
      return <ModernTemplate invoiceData={invoiceData} />;
    case 'minimal':
      return <MinimalTemplate invoiceData={invoiceData} />;
    case 'classic':
      return <ClassicTemplate invoiceData={invoiceData} />;
    default:
      return <ProfessionalTemplate invoiceData={invoiceData} />;
  }
};

export default InvoicePreview;