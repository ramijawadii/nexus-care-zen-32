
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  CreditCard,
  MapPin,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { BookingPageData } from './BookingPageBuilder';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageData: BookingPageData;
}

interface BookingForm {
  service: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  paymentMethod: 'online' | 'cabinet';
}

const BookingModal = ({ isOpen, onClose, pageData }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingForm>({
    service: '',
    date: '',
    timeSlot: '',
    name: '',
    phone: '',
    paymentMethod: 'cabinet'
  });

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', form);
    setStep(5); // Go to confirmation
  };

  const resetModal = () => {
    setStep(1);
    setForm({
      service: '',
      date: '',
      timeSlot: '',
      name: '',
      phone: '',
      paymentMethod: 'cabinet'
    });
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 1: return form.service !== '';
      case 2: return form.date !== '';
      case 3: return form.timeSlot !== '';
      case 4: return form.name !== '' && form.phone !== '';
      default: return false;
    }
  };

  const getSelectedService = () => {
    return pageData.services.find(s => s.id === form.service);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Réserver un rendez-vous
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6 px-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= stepNum
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div
                  className={`h-0.5 w-16 mx-2 transition-colors ${
                    step > stepNum ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choisissez un service</h3>
              <div className="grid gap-3">
                {pageData.services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      form.service === service.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setForm(prev => ({ ...prev, service: service.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{service.name}</h4>
                            <Badge variant="outline">{service.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration} min</span>
                            </div>
                            <div className="flex items-center gap-1 font-medium text-primary">
                              <span>{service.price}€</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choisissez une date</h3>
              <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                {availableDates.map((date, index) => {
                  const dateString = date.toISOString().split('T')[0];
                  const isSelected = form.date === dateString;
                  
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center"
                      onClick={() => setForm(prev => ({ ...prev, date: dateString }))}
                    >
                      <div className="text-xs opacity-75">
                        {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                      </div>
                      <div className="font-medium">
                        {date.getDate()}
                      </div>
                      <div className="text-xs opacity-75">
                        {date.toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choisissez un créneau</h3>
              <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={form.timeSlot === time ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setForm(prev => ({ ...prev, timeSlot: time }))}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Vos informations</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom complet"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone *</Label>
                  <Input
                    id="phone"
                    placeholder="+33 6 12 34 56 78"
                    value={form.phone}
                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Mode de paiement</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={form.paymentMethod === 'cabinet' ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'cabinet' }))}
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm">Au cabinet</span>
                    </Button>
                    <Button
                      variant={form.paymentMethod === 'online' ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'online' }))}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-sm">En ligne</span>
                    </Button>
                  </div>
                </div>

                {/* Booking Summary */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Récapitulatif</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service :</span>
                        <span className="font-medium">{getSelectedService()?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date :</span>
                        <span className="font-medium">
                          {form.date && new Date(form.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure :</span>
                        <span className="font-medium">{form.timeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Durée :</span>
                        <span className="font-medium">{getSelectedService()?.duration} min</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-medium">Total :</span>
                        <span className="font-bold text-primary">{getSelectedService()?.price}€</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-green-600">
                  Rendez-vous confirmé !
                </h3>
                <p className="text-muted-foreground">
                  Votre rendez-vous a été réservé avec succès
                </p>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{pageData.doctorInfo.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{form.date && new Date(form.date).toLocaleDateString('fr-FR')} à {form.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{pageData.clinicInfo.address}</span>
                  </div>
                </CardContent>
              </Card>

              <p className="text-sm text-muted-foreground">
                Un SMS de confirmation a été envoyé au {form.phone}
              </p>

              <Button onClick={resetModal} className="w-full">
                Fermer
              </Button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 5 && (
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="ghost"
              onClick={step === 1 ? onClose : handlePrevious}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {step === 1 ? 'Annuler' : 'Précédent'}
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
              >
                Confirmer le rendez-vous
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
