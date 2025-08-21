
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const WaitingRoomStats = () => {
  const dailyStats = [
    { hour: '8h', patients: 3, avgWait: 12 },
    { hour: '9h', patients: 8, avgWait: 18 },
    { hour: '10h', patients: 12, avgWait: 25 },
    { hour: '11h', patients: 15, avgWait: 32 },
    { hour: '12h', patients: 6, avgWait: 15 },
    { hour: '14h', patients: 10, avgWait: 22 },
    { hour: '15h', patients: 14, avgWait: 28 },
    { hour: '16h', patients: 11, avgWait: 20 },
    { hour: '17h', patients: 7, avgWait: 14 }
  ];

  const weeklyTrends = [
    { day: 'Lun', patients: 45, satisfaction: 85 },
    { day: 'Mar', patients: 52, satisfaction: 78 },
    { day: 'Mer', patients: 38, satisfaction: 92 },
    { day: 'Jeu', patients: 61, satisfaction: 74 },
    { day: 'Ven', patients: 48, satisfaction: 88 },
  ];

  const waitTimeDistribution = [
    { range: '0-15min', count: 25, color: '#22c55e' },
    { range: '15-30min', count: 18, color: '#eab308' },
    { range: '30-45min', count: 8, color: '#f97316' },
    { range: '+45min', count: 3, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Temps moyen aujourd'hui</p>
                <p className="text-2xl font-bold text-text-primary">22min</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -3min vs hier
                </div>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Patients vus</p>
                <p className="text-2xl font-bold text-text-primary">48</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5 vs hier
                </div>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Taux de satisfaction</p>
                <p className="text-2xl font-bold text-text-primary">87%</p>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2% vs semaine
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Retards évités</p>
                <p className="text-2xl font-bold text-text-primary">12</p>
                <div className="flex items-center text-orange-600 text-sm">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  3 en cours
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Flux de patients par heure</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wait Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Temps d'attente moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgWait" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Tendances hebdomadaires</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wait Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition temps d'attente</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={waitTimeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, count }) => `${range}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {waitTimeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations intelligentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="font-medium text-blue-900">Optimisation détectée</p>
              <p className="text-blue-800 text-sm">Réduire les créneaux de 30min à 25min entre 10h-11h pourrait améliorer le flux de 15%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="font-medium text-green-900">Performance excellente</p>
              <p className="text-green-800 text-sm">Votre ponctualité s'améliore: 87% des patients vus à l'heure cette semaine</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <p className="font-medium text-orange-900">Attention requise</p>
              <p className="text-orange-800 text-sm">3 patients attendent plus de 30min. Considérer l'envoi de notifications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitingRoomStats;
