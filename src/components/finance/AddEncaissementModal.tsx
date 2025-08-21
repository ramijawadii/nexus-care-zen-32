import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';

interface Encaissement {
  date: string;
  patient: string;
  type: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  status: string;
  notes: string;
  insurance: string | null;
}

interface AddEncaissementModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (encaissement: Encaissement) => void;
}

const AddEncaissementModal: React.FC<AddEncaissementModalProps> = ({
  open,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Encaissement>({
    date: new Date().toISOString().split('T')[0],
    patient: '',
    type: '',
    amount: 0,
    paymentMethod: '',
    reference: '',
    status: 'En attente',
    notes: '',
    insurance: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      patient: '',
      type: '',
      amount: 0,
      paymentMethod: '',
      reference: '',
      status: 'En attente',
      notes: '',
      insurance: null
    });
  };

  const handleChange = (field: keyof Encaissement, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Nouvel Encaissement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Montant (TND)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Input
              id="patient"
              value={formData.patient}
              onChange={(e) => handleChange('patient', e.target.value)}
              required
              placeholder="Nom du patient"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de service</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Consultation spécialisée">Consultation spécialisée</SelectItem>
                  <SelectItem value="Acte technique">Acte technique</SelectItem>
                  <SelectItem value="Téléconsultation">Téléconsultation</SelectItem>
                  <SelectItem value="Suivi médical">Suivi médical</SelectItem>
                  <SelectItem value="Urgence">Urgence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Référence facture</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                placeholder="FACT-2024-XXX"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Mode de Paiement</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => handleChange('paymentMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Espèces">Espèces</SelectItem>
                  <SelectItem value="Carte">Carte</SelectItem>
                  <SelectItem value="Virement">Virement</SelectItem>
                  <SelectItem value="Chèque">Chèque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Encaissé">Encaissé</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Partiel">Partiel</SelectItem>
                  <SelectItem value="En litige">En litige</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Assurance (optionnel)</Label>
            <Select
              value={formData.insurance || 'none'}
              onValueChange={(value) => handleChange('insurance', value === 'none' ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner l'assurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucune</SelectItem>
                <SelectItem value="CPAM">CPAM</SelectItem>
                <SelectItem value="CNAM">CNAM</SelectItem>
                <SelectItem value="Mutuelle MAAF">Mutuelle MAAF</SelectItem>
                <SelectItem value="AG2R">AG2R</SelectItem>
                <SelectItem value="Malakoff Humanis">Malakoff Humanis</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Notes supplémentaires..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEncaissementModal;