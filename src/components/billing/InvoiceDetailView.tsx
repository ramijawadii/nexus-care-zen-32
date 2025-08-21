
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Printer, Mail, ArrowLeft } from 'lucide-react';

interface InvoiceDetailViewProps {
  invoice: {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: string;
    invoice: string;
  };
  onBack: () => void;
}

const InvoiceDetailView = ({ invoice, onBack }: InvoiceDetailViewProps) => {
  const handleDownload = () => {
    console.log(`Downloading invoice: ${invoice.invoice}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    console.log(`Emailing invoice: ${invoice.invoice}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux Transactions
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleEmail}>
            <Mail className="w-4 h-4 mr-2" />
            Envoyer par Email
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>

      {/* Invoice Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Facture {invoice.invoice}</CardTitle>
              <p className="text-text-muted mt-1">HealthCRM - Solutions Médicales</p>
            </div>
            <Badge 
              variant="default" 
              className={
                invoice.status === 'paid' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : invoice.status === 'pending'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-red-100 text-red-800'
              }
            >
              {invoice.status === 'paid' ? 'Payé' : invoice.status === 'pending' ? 'En attente' : 'Échoué'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">De:</h3>
              <div className="space-y-1 text-text-muted">
                <p className="font-medium text-text-primary">HealthCRM SAS</p>
                <p>123 Avenue de la Santé</p>
                <p>1001 Tunis, Tunisie</p>
                <p>contact@healthcrm.tn</p>
                <p>+216 71 123 456</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">À:</h3>
              <div className="space-y-1 text-text-muted">
                <p className="font-medium text-text-primary">Dr. Ahmed Benali</p>
                <p>Cabinet Médical Benali</p>
                <p>456 Rue de la République</p>
                <p>2000 Le Bardo, Tunisie</p>
                <p>ahmed.benali@gmail.com</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-text-muted text-sm">Date de Facture</p>
              <p className="font-semibold">{invoice.date}</p>
            </div>
            <div>
              <p className="text-text-muted text-sm">Numéro de Facture</p>
              <p className="font-semibold">{invoice.invoice}</p>
            </div>
            <div>
              <p className="text-text-muted text-sm">Échéance</p>
              <p className="font-semibold">{invoice.date}</p>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-surface-muted">
                  <tr>
                    <th className="text-left p-4 font-medium">Description</th>
                    <th className="text-right p-4 font-medium">Quantité</th>
                    <th className="text-right p-4 font-medium">Prix Unitaire</th>
                    <th className="text-right p-4 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{invoice.description}</p>
                        <p className="text-sm text-text-muted">Période: Janvier 2025</p>
                      </div>
                    </td>
                    <td className="text-right p-4">1</td>
                    <td className="text-right p-4">{invoice.amount} DT</td>
                    <td className="text-right p-4 font-semibold">{invoice.amount} DT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{invoice.amount} DT</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (19%):</span>
                <span>{Math.round(invoice.amount * 0.19)} DT</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{Math.round(invoice.amount * 1.19)} DT</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-surface-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">Informations de Paiement</h4>
            <p className="text-sm text-text-muted">
              Paiement effectué par carte bancaire le {invoice.date}
            </p>
            <p className="text-sm text-text-muted">
              Transaction ID: TXN-{invoice.id}-2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDetailView;
