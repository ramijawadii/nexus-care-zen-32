
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Clock, MessageSquare, Phone, Mail, AlertTriangle } from 'lucide-react';

const DelayNotifications = () => {
  return (
    <div className="space-y-6">
      {/* Current Delays Alert */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          Retard détecté: 3 patients attendent depuis plus de 30 minutes. 
          Temps d'attente moyen: 35 minutes.
        </AlertDescription>
      </Alert>

      {/* Auto Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications automatiques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS de retard</p>
              <p className="text-sm text-text-muted">Envoyer un SMS après 15min de retard</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Appel automatique</p>
              <p className="text-sm text-text-muted">Appeler après 30min d'attente</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email de suivi</p>
              <p className="text-sm text-text-muted">Email d'excuse en fin de journée</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alerte docteur</p>
              <p className="text-sm text-text-muted">Alerter si plus de 5 patients en attente</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Manual Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <MessageSquare className="w-6 h-6" />
              <span>SMS groupé</span>
              <span className="text-xs text-text-muted">Informer tous les patients</span>
            </Button>

            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Phone className="w-6 h-6" />
              <span>Appel d'urgence</span>
              <span className="text-xs text-text-muted">Patients prioritaires</span>
            </Button>

            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Mail className="w-6 h-6" />
              <span>Email de reprogrammation</span>
              <span className="text-xs text-text-muted">Reporter les RDV</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications Log */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '10:45', type: 'SMS', patient: 'Marie Dubois', message: 'Retard de 15min envoyé' },
              { time: '10:30', type: 'Appel', patient: 'Jean Martin', message: 'Appel manqué - boîte vocale' },
              { time: '10:15', type: 'SMS', patient: 'Sophie Bernard', message: 'Confirmation d\'arrivée' },
              { time: '09:45', type: 'Email', patient: 'Pierre Moreau', message: 'Rappel RDV envoyé' }
            ].map((notif, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{notif.patient}</p>
                    <p className="text-xs text-text-muted">{notif.message}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {notif.type}
                  </Badge>
                  <span className="text-xs text-text-muted">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelayNotifications;
