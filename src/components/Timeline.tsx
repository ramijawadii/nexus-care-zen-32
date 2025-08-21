import { Clock, User, FileText, Calendar, Phone } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'appointment' | 'call' | 'note' | 'visit';
  title: string;
  description: string;
  time: string;
  user: string;
}

const mockEvents: TimelineEvent[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Appointment Scheduled',
    description: 'Sarah Johnson - Cardiology follow-up',
    time: '10:30 AM',
    user: 'Dr. Smith'
  },
  {
    id: '2',
    type: 'call',
    title: 'Patient Call',
    description: 'Michael Chen - Medication inquiry',
    time: '09:15 AM',
    user: 'Nurse Adams'
  },
  {
    id: '3',
    type: 'note',
    title: 'Clinical Note Added',
    description: 'Emma Rodriguez - Lab results reviewed',
    time: '08:45 AM',
    user: 'Dr. Wilson'
  },
  {
    id: '4',
    type: 'visit',
    title: 'Patient Visit',
    description: 'David Thompson - Routine checkup completed',
    time: 'Yesterday',
    user: 'Dr. Smith'
  }
];

const getEventIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return <Calendar className="w-4 h-4 text-info" />;
    case 'call':
      return <Phone className="w-4 h-4 text-warning" />;
    case 'note':
      return <FileText className="w-4 h-4 text-success" />;
    case 'visit':
      return <User className="w-4 h-4 text-text-primary" />;
    default:
      return <Clock className="w-4 h-4 text-text-muted" />;
  }
};

const Timeline = () => {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-text-muted hover:text-text-primary text-sm transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockEvents.map((event, index) => (
          <div key={event.id} className="timeline-item">
            <div className="flex items-center justify-center w-8 h-8 bg-surface rounded-full border border-border-primary flex-shrink-0">
              {getEventIcon(event.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-text-primary truncate">
                  {event.title}
                </h4>
                <span className="text-xs text-text-muted flex-shrink-0 ml-2">
                  {event.time}
                </span>
              </div>
              
              <p className="text-sm text-text-muted mb-1">{event.description}</p>
              
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3 text-text-subtle" />
                <span className="text-xs text-text-subtle">{event.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border-primary">
        <button className="w-full text-center text-sm text-text-muted hover:text-text-primary transition-colors">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default Timeline;