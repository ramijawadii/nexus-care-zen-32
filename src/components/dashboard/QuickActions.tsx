
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  Users, 
  UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Ajouter un Rendez-vous',
      icon: Calendar,
      action: () => navigate('/appointments')
    },
    {
      title: 'Ajouter un Patient',
      icon: UserPlus,
      action: () => console.log('Add patient')
    },
    {
      title: 'Planifier un Rendez-vous',
      icon: Clock,
      action: () => navigate('/appointments')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                onClick={action.action}
                className="h-12 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                variant="outline"
              >
                <action.icon className="w-4 h-4" />
                <span>{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
