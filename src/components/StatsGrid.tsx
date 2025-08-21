
import { Users, Calendar, TrendingUp, AlertTriangle, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  onClick?: () => void;
  isClickable?: boolean;
}

const StatCard = ({ title, value, change, changeType, icon, onClick, isClickable }: StatCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success';
      case 'decrease':
        return 'text-error';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div 
      className={`card-elevated p-6 hover:shadow-lg transition-shadow ${isClickable ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="text-text-muted text-sm">{title}</p>
            <p className="text-2xl font-semibold text-text-primary">{value}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <TrendingUp className={`w-4 h-4 ${getChangeColor()}`} />
        <span className={`text-sm ${getChangeColor()}`}>{change}</span>
        <span className="text-text-muted text-sm">vs last month</span>
      </div>
    </div>
  );
};

const StatsGrid = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: <Users className="w-5 h-5 text-info" />
    },
    {
      title: 'Rendez-vous Aujourd\'hui',
      value: '24',
      change: '+8.1%',
      changeType: 'increase' as const,
      icon: <Calendar className="w-5 h-5 text-success" />
    },
    {
      title: 'Révisions en Attente',
      value: '156',
      change: '-5.2%',
      changeType: 'decrease' as const,
      icon: <AlertTriangle className="w-5 h-5 text-warning" />
    },
    {
      title: 'Assistant Copilote IA',
      value: 'Actif',
      change: 'Disponible 24/7',
      changeType: 'neutral' as const,
      icon: <Bot className="w-5 h-5 text-blue-600" />,
      onClick: () => navigate('/copilot'),
      isClickable: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          onClick={stat.onClick}
          isClickable={stat.isClickable}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
