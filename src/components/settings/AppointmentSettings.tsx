
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Clock,
  Users,
  Bell,
  MapPin,
  Video,
  Phone,
  Mail,
  Settings,
  Save
} from 'lucide-react';

const AppointmentSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Paramètres des Rendez-vous</h3>
          <p className="text-text-muted">Configuration du système de planification</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      {/* Booking Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Paramètres de Réservation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Durée par défaut (minutes)</label>
              <Input type="number" defaultValue="30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Délai minimum de réservation (heures)</label>
              <Input type="number" defaultValue="2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Délai maximum de réservation (jours)</label>
              <Input type="number" defaultValue="90" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Créneaux simultanés max</label>
              <Input type="number" defaultValue="3" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Réservation en ligne</h4>
                <p className="text-sm text-text-muted">Autoriser les patients à réserver en ligne</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Double réservation</h4>
                <p className="text-sm text-text-muted">Permettre plusieurs RDV simultanés</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Confirmation automatique</h4>
                <p className="text-sm text-text-muted">Confirmer automatiquement les créneaux</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Horaires de Travail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, index) => (
              <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Switch defaultChecked={index < 5} />
                  <span className="font-medium w-20">{day}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Input type="time" defaultValue="09:00" className="w-32" />
                  <span>à</span>
                  <Input type="time" defaultValue="18:00" className="w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Types de Rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { name: 'Consultation', duration: 30, color: 'blue', price: 25 },
              { name: 'Suivi', duration: 20, color: 'green', price: 20 },
              { name: 'Urgence', duration: 15, color: 'red', price: 35 },
              { name: 'Téléconsultation', duration: 25, color: 'purple', price: 25 }
            ].map((type, index) => (
              <div key={type.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge className={`bg-${type.color}-100 text-${type.color}-800`}>
                    {type.name}
                  </Badge>
                  <span className="text-sm text-text-muted">{type.duration} min</span>
                  <span className="text-sm font-medium">{type.price}€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline">Ajouter un type</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            Notifications & Rappels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">SMS de rappel</h4>
                <p className="text-sm text-text-muted">24h avant le RDV</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email de confirmation</h4>
                <p className="text-sm text-text-muted">Immédiatement après réservation</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Rappel de présence</h4>
                <p className="text-sm text-text-muted">15 minutes avant</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notification d'annulation</h4>
                <p className="text-sm text-text-muted">Prévenir en cas d'annulation</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-indigo-600" />
            Canaux de Communication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Téléphone</span>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Visioconférence</span>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Sur site</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentSettings;
