import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface StepNotesProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  setSaveStatus: (status: string) => void;
}

const StepNotes: React.FC<StepNotesProps> = ({ invoiceData, setInvoiceData, setSaveStatus }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Notes et Remarques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="notes">Notes Publiques (visibles sur la facture)</Label>
          <Textarea
            id="notes"
            value={invoiceData.notes}
            onChange={(e) => {
              setInvoiceData({...invoiceData, notes: e.target.value});
              setSaveStatus('modified');
            }}
            placeholder="Informations complémentaires, modalités de paiement..."
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="privateNotes">Notes Privées (internes seulement)</Label>
          <Textarea
            id="privateNotes"
            value={invoiceData.privateNotes}
            onChange={(e) => {
              setInvoiceData({...invoiceData, privateNotes: e.target.value});
              setSaveStatus('modified');
            }}
            placeholder="Notes internes, rappels..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StepNotes;