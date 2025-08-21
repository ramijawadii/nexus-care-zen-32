
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, AlertTriangle, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import WaitingPatientsList from './WaitingPatientsList';
import ReceptionistChat from './ReceptionistChat';
import WaitingRoomStats from './WaitingRoomStats';

const WaitingRoomDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">En attente</p>
                <p className="text-2xl font-bold text-text-primary">8</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Temps moyen</p>
                <p className="text-2xl font-bold text-text-primary">25min</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">En retard</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Consultés</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="waiting-list" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waiting-list">Liste d'attente</TabsTrigger>
          <TabsTrigger value="chat">Chat Réceptionniste</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="waiting-list" className="space-y-4">
          <WaitingPatientsList />
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <ReceptionistChat />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <WaitingRoomStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaitingRoomDashboard;
