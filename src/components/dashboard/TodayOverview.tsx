
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Phone,
  Video,
  MessageSquare,
  Activity,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  UserPlus,
  CalendarPlus,
  Play,
  Plus,
  TrendingDown,
  Euro,
  Stethoscope
} from 'lucide-react';

const TodayOverview = () => {
  const navigate = useNavigate();

  // Mock data for upcoming patient sessions
  const upcomingAppointments = [
    {
      id: 1,
      time: '14:30',
      patient: 'Marie Dupont',
      type: 'Suivi Hypertension',
      status: 'confirmed',
      avatar: 'MD',
      duration: '30 min',
      isUrgent: false,
      fee: 60
    },
    {
      id: 2,
      time: '15:15',
      patient: 'Jean Martin',
      type: 'Consultation Urgente',
      status: 'urgent',
      avatar: 'JM',
      duration: '45 min',
      isUrgent: true,
      fee: 85
    },
    {
      id: 3,
      time: '16:00',
      patient: 'Sophie Leclerc',
      type: 'Téléconsultation',
      status: 'pending',
      avatar: 'SL',
      duration: '20 min',
      isUrgent: false,
      fee: 45
    }
  ];

  // Today's medical practice stats
  const todayMedicalStats = [
    {
      label: 'Sessions Aujourd\'hui',
      value: '8',
      change: '+2',
      trend: 'up',
      comparison: 'vs hier',
      icon: '👥',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      label: 'Revenus Projetés',
      value: '520€',
      change: '+80€',
      trend: 'up',
      comparison: 'vs hier', 
      icon: '💰',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      label: 'Taux d\'Occupation',
      value: '87%',
      change: '+5%',
      trend: 'up',
      comparison: 'vs hier',
      icon: '📊',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      label: 'Sessions Restantes',
      value: '3',
      change: 'Fin à 17h30',
      trend: 'neutral',
      comparison: 'aujourd\'hui',
      icon: '⏰',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    }
  ];

  const handleAddPatient = () => {
    navigate('/patients');
  };

  const handleScheduleConsultation = () => {
    navigate('/appointments');
  };

  const handleStartConsultation = () => {
    navigate('/waiting-room');
  };

  return (
    <div className="space-y-6">
      {/* Medical Practice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayMedicalStats.map((stat, index) => (
          <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                {stat.trend !== 'neutral' && (
                  <Badge className={`${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                  }`}>
                    {stat.change}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center space-x-2 text-sm">
                  {stat.trend === 'up' ? (
                    <span className="text-green-600 font-medium flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </span>
                  ) : stat.trend === 'down' ? (
                    <span className="text-red-600 font-medium flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      {stat.change}
                    </span>
                  ) : (
                    <span className="text-gray-600 font-medium">{stat.change}</span>
                  )}
                  <span className="text-gray-500">{stat.comparison}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Patient Sessions */}
      <Card className="bg-white border border-gray-200 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
              <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
              Prochaines Sessions Patients
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleScheduleConsultation}
              className="text-blue-500 border-blue-200 hover:bg-blue-50"
            >
              <CalendarPlus className="w-4 h-4 mr-1" />
              Nouveau RDV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                        {appointment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                    <span>•</span>
                    <span>{appointment.duration}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{appointment.fee}€</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge
                    variant={appointment.isUrgent ? "destructive" : "secondary"}
                    className={
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : appointment.status === 'urgent'
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    }
                  >
                    {appointment.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {appointment.status === 'urgent' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {appointment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                    {appointment.status === 'confirmed' ? 'Confirmé' : 
                     appointment.status === 'urgent' ? 'Urgent' : 'En attente'}
                  </Badge>
                  
                  <Button 
                    size="sm" 
                    onClick={handleStartConsultation}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Démarrer
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Total revenus prévus:</span>
                <span className="ml-2 text-green-600 font-semibold">
                  {upcomingAppointments.reduce((total, apt) => total + apt.fee, 0)}€
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/appointments')}
                className="text-blue-600 hover:bg-blue-50"
              >
                Voir tout le planning
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 rounded-xl cursor-pointer" onClick={handleAddPatient}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Nouveau Patient</h3>
            <p className="text-sm text-gray-600">Ajouter un nouveau patient au système</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 rounded-xl cursor-pointer" onClick={handleScheduleConsultation}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Planifier RDV</h3>
            <p className="text-sm text-gray-600">Programmer une nouvelle consultation</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 rounded-xl cursor-pointer" onClick={() => navigate('/waiting-room')}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Salle d'Attente</h3>
            <p className="text-sm text-gray-600">Gérer les patients en attente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodayOverview;
