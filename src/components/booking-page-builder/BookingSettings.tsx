
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, CreditCard, Shield, Settings, Bell } from 'lucide-react';
import { BookingPageData } from './BookingPageBuilder';

interface BookingSettingsProps {
  pageData: BookingPageData;
  onDataChange: (data: Partial<BookingPageData>) => void;
}

const BookingSettings: React.FC<BookingSettingsProps> = ({ pageData, onDataChange }) => {
  const handleSettingsChange = (key: keyof BookingPageData['settings'], value: any) => {
    onDataChange({
      settings: {
        ...pageData.settings,
        [key]: value
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* General Booking Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Paramètres Généraux de Réservation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Réservation en Ligne</Label>
              <p className="text-sm text-muted-foreground">
                Permettre aux patients de réserver directement en ligne
              </p>
            </div>
            <Switch
              checked={pageData.settings.allowOnlineBooking}
              onCheckedChange={(checked) => handleSettingsChange('allowOnlineBooking', checked)}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="advanceBooking">Réservation à l'Avance (jours)</Label>
              <Input
                id="advanceBooking"
                type="number"
                value={pageData.settings.advanceBookingDays}
                onChange={(e) => handleSettingsChange('advanceBookingDays', parseInt(e.target.value))}
                min="1"
                max="365"
              />
              <p className="text-xs text-muted-foreground">
                Nombre maximum de jours à l'avance pour réserver
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bufferTime">Temps de Battement (minutes)</Label>
              <Input
                id="bufferTime"
                type="number"
                value={pageData.settings.bufferTime}
                onChange={(e) => handleSettingsChange('bufferTime', parseInt(e.target.value))}
                min="0"
                max="60"
              />
              <p className="text-xs text-muted-foreground">
                Temps libre entre chaque rendez-vous
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Paramètres de Paiement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Pré-paiement Obligatoire</Label>
              <p className="text-sm text-muted-foreground">
                Exiger un paiement lors de la réservation
              </p>
            </div>
            <Switch
              checked={pageData.settings.requirePrePayment}
              onCheckedChange={(checked) => handleSettingsChange('requirePrePayment', checked)}
            />
          </div>

          {pageData.settings.requirePrePayment && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm">Options de Paiement</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="card" defaultChecked />
                  <Label htmlFor="card" className="text-sm">Carte Bancaire</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="paypal" />
                  <Label htmlFor="paypal" className="text-sm">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="apple" />
                  <Label htmlFor="apple" className="text-sm">Apple Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="google" />
                  <Label htmlFor="google" className="text-sm">Google Pay</Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Politique d'Annulation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cancellationPolicy">Conditions d'Annulation</Label>
            <Textarea
              id="cancellationPolicy"
              value={pageData.settings.cancellationPolicy}
              onChange={(e) => handleSettingsChange('cancellationPolicy', e.target.value)}
              placeholder="Décrivez vos conditions d'annulation..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minCancelTime">Délai Minimum d'Annulation</Label>
              <Select defaultValue="24h">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 heure</SelectItem>
                  <SelectItem value="2h">2 heures</SelectItem>
                  <SelectItem value="4h">4 heures</SelectItem>
                  <SelectItem value="12h">12 heures</SelectItem>
                  <SelectItem value="24h">24 heures</SelectItem>
                  <SelectItem value="48h">48 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancelFee">Frais d'Annulation Tardive</Label>
              <Input
                id="cancelFee"
                type="number"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications et Rappels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Rappels par Email</Label>
                <p className="text-sm text-muted-foreground">
                  Envoyer des rappels automatiques par email
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-medium">Rappels par SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Envoyer des rappels automatiques par SMS
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Timing des Rappels</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remind24" defaultChecked />
                <Label htmlFor="remind24" className="text-sm">24h avant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remind2h" defaultChecked />
                <Label htmlFor="remind2h" className="text-sm">2h avant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remind30min" />
                <Label htmlFor="remind30min" className="text-sm">30min avant</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Horaires de Travail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {Object.entries(pageData.clinicInfo.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-20 text-sm font-medium capitalize">
                  {day === 'monday' && 'Lundi'}
                  {day === 'tuesday' && 'Mardi'}
                  {day === 'wednesday' && 'Mercredi'}
                  {day === 'thursday' && 'Jeudi'}
                  {day === 'friday' && 'Vendredi'}
                  {day === 'saturday' && 'Samedi'}
                  {day === 'sunday' && 'Dimanche'}
                </div>
                <Switch
                  checked={!hours.closed}
                  onCheckedChange={(checked) => {
                    onDataChange({
                      clinicInfo: {
                        ...pageData.clinicInfo,
                        hours: {
                          ...pageData.clinicInfo.hours,
                          [day]: { ...hours, closed: !checked }
                        }
                      }
                    });
                  }}
                />
                {!hours.closed && (
                  <>
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => {
                        onDataChange({
                          clinicInfo: {
                            ...pageData.clinicInfo,
                            hours: {
                              ...pageData.clinicInfo.hours,
                              [day]: { ...hours, open: e.target.value }
                            }
                          }
                        });
                      }}
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">à</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => {
                        onDataChange({
                          clinicInfo: {
                            ...pageData.clinicInfo,
                            hours: {
                              ...pageData.clinicInfo.hours,
                              [day]: { ...hours, close: e.target.value }
                            }
                          }
                        });
                      }}
                      className="w-32"
                    />
                  </>
                )}
                {hours.closed && (
                  <span className="text-sm text-muted-foreground flex-1">Fermé</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Paramètres Avancés
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Confirmation Manuelle</Label>
              <p className="text-sm text-muted-foreground">
                Nécessite une confirmation avant validation du RDV
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Liste d'Attente</Label>
              <p className="text-sm text-muted-foreground">
                Permet aux patients de s'inscrire sur liste d'attente
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Réservation Récurrente</Label>
              <p className="text-sm text-muted-foreground">
                Permet de programmer des RDV réguliers
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSettings;
