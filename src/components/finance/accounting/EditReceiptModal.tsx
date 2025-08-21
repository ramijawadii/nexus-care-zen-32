import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CashReceipt {
  id: string;
  date: string;
  patientName: string;
  paymentMethod: 'Espèces' | 'Carte' | 'Chèque' | 'Virement' | 'Assurance';
  amountReceived: number;
  serviceType: 'Consultation' | 'Acte médical' | 'Vente produit' | 'Vaccination' | 'Échographie' | 'Autres';
  invoiceReference: string;
  notes: string;
  status: 'Confirmé' | 'En attente' | 'Annulé';
  receiptNumber: string;
}

interface EditReceiptModalProps {
  receipt: CashReceipt | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (receipt: CashReceipt) => void;
}

const EditReceiptModal: React.FC<EditReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose,
  onSave
}) => {
  const [editedReceipt, setEditedReceipt] = useState<CashReceipt | null>(receipt);

  React.useEffect(() => {
    setEditedReceipt(receipt);
  }, [receipt]);

  const handleSave = () => {
    if (editedReceipt) {
      onSave(editedReceipt);
      onClose();
    }
  };

  if (!editedReceipt) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier l'encaissement</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={editedReceipt.date}
              onChange={(e) => setEditedReceipt({...editedReceipt, date: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Input
              id="patient"
              value={editedReceipt.patientName}
              onChange={(e) => setEditedReceipt({...editedReceipt, patientName: e.target.value})}
              placeholder="Nom et prénom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Montant (TND)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={editedReceipt.amountReceived}
              onChange={(e) => setEditedReceipt({...editedReceipt, amountReceived: parseFloat(e.target.value) || 0})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-method">Mode de paiement</Label>
            <Select 
              value={editedReceipt.paymentMethod} 
              onValueChange={(value) => setEditedReceipt({...editedReceipt, paymentMethod: value as any})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Espèces">Espèces</SelectItem>
                <SelectItem value="Carte">Carte</SelectItem>
                <SelectItem value="Chèque">Chèque</SelectItem>
                <SelectItem value="Virement">Virement</SelectItem>
                <SelectItem value="Assurance">Assurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service-type">Type de prestation</Label>
            <Select 
              value={editedReceipt.serviceType} 
              onValueChange={(value) => setEditedReceipt({...editedReceipt, serviceType: value as any})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Acte médical">Acte médical</SelectItem>
                <SelectItem value="Vente produit">Vente produit</SelectItem>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="Échographie">Échographie</SelectItem>
                <SelectItem value="Autres">Autres</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select 
              value={editedReceipt.status} 
              onValueChange={(value) => setEditedReceipt({...editedReceipt, status: value as any})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Confirmé">Confirmé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Annulé">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="invoice-ref">Référence facture</Label>
            <Input
              id="invoice-ref"
              value={editedReceipt.invoiceReference}
              onChange={(e) => setEditedReceipt({...editedReceipt, invoiceReference: e.target.value})}
              placeholder="FACT-2024-XXX"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              value={editedReceipt.notes}
              onChange={(e) => setEditedReceipt({...editedReceipt, notes: e.target.value})}
              placeholder="Observations..."
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer les modifications
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditReceiptModal;