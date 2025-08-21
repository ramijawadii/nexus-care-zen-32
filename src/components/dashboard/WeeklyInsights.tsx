
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  Target,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WeeklyInsights = () => {
  const weeklyData = [
    { day: 'Lun', appointments: 12, revenue: 960, patients: 11 },
    { day: 'Mar', appointments: 15, revenue: 1200, patients: 14 },
    { day: 'Mer', appointments: 8, revenue: 640, patients: 8 },
    { day: 'Jeu', appointments: 18, revenue: 1440, patients: 16 },
    { day: 'Ven', appointments: 14, revenue: 1120, patients: 13 },
    { day: 'Sam', appointments: 6, revenue: 480, patients: 6 },
    { day: 'Dim', appointments: 3, revenue: 240, patients: 3 }
  ];

  const weeklyMetrics = [
    {
      title: 'Revenus Total',
      value: '6 080 TND',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs semaine dernière',
      color: 'text-green-600'
    },
    {
      title: 'Rendez-vous Total',
      value: '76',
      change: '+8.1%',
      trend: 'up',
      icon: Calendar,
      description: 'vs semaine dernière',
      color: 'text-blue-600'
    },
    {
      title: 'Nouveaux Patients',
      value: '12',
      change: '+25%',
      trend: 'up',
      icon: Users,
      description: 'vs semaine dernière',
      color: 'text-purple-600'
    },
    {
      title: 'Taux de Satisfaction',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      description: 'retour patients',
      color: 'text-green-600'
    }
  ];

  const patientTypes = [
    { type: 'Suivi régulier', count: 45, percentage: 59, color: 'bg-blue-500' },
    { type: 'Nouvelles consultations', count: 20, percentage: 26, color: 'bg-green-500' },
    { type: 'Consultations urgentes', count: 8, percentage: 11, color: 'bg-orange-500' },
    { type: 'Téléconsultations', count: 3, percentage: 4, color: 'bg-purple-500' }
  ];

  const goals = [
    { 
      name: 'Objectif Revenus Mensuel', 
      current: 18240, 
      target: 25000, 
      unit: 'TND',
      progress: 73
    },
    { 
      name: 'Objectif Patients Mensuel', 
      current: 285, 
      target: 350, 
      unit: 'patients',
      progress: 81
    }
  ];

  return (
    <div className="space-y-6">
      {/* Weekly Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyMetrics.map((metric) => (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <Badge variant="outline" className={`${
                  metric.trend === 'up' 
                    ? 'text-green-600 border-green-200 bg-green-50' 
                    : 'text-red-600 border-red-200 bg-red-50'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Évolution des Revenus (TND)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} TND`, 'Revenus']}
                  labelFormatter={(label) => `${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Rendez-vous par Jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Rendez-vous']}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar dataKey="appointments" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Patient Types & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Répartition des Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientTypes.map((type) => (
                <div key={type.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{type.type}</span>
                    <span className="text-sm text-gray-600">{type.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${type.color}`}
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-600" />
              Objectifs Mensuels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{goal.name}</span>
                  <span className="text-sm text-gray-600">
                    {goal.progress}%
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{goal.current.toLocaleString()} {goal.unit}</span>
                  <span>Objectif: {goal.target.toLocaleString()} {goal.unit}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-600" />
            Insights de la Semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Performance Excellente</span>
              </div>
              <p className="text-sm text-green-700">
                Jeudi a été votre meilleur jour avec 18 rendez-vous et 1 440 TND de revenus.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Tendance Positive</span>
              </div>
              <p className="text-sm text-blue-700">
                Augmentation de 25% de nouveaux patients cette semaine.
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">Optimisation Possible</span>
              </div>
              <p className="text-sm text-orange-700">
                Considérez ajouter plus de créneaux le jeudi pour maximiser les revenus.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyInsights;
