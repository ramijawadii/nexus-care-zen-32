
import { useState } from 'react';
import { Bell, Calendar, Users, Package, MessageSquare, Settings, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

interface Notification {
  id: string;
  type: 'appointment' | 'contact' | 'inventory' | 'staff';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

const NotificationMegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Prochain Rendez-vous',
      message: 'Dr. Martin a un rendez-vous avec Sarah Johnson dans 15 minutes',
      time: '2 min',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'contact',
      title: 'Contact Patient Récent',
      message: 'Michael Chen a envoyé un message concernant ses résultats',
      time: '5 min',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'inventory',
      title: 'Stock Faible',
      message: 'Seringues jetables - Stock critique (5 unités restantes)',
      time: '1h',
      isRead: true,
      priority: 'high'
    },
    {
      id: '4',
      type: 'staff',
      title: 'Message Équipe',
      message: 'Infirmière Julie: "Patient en salle 3 prêt pour consultation"',
      time: '30 min',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'appointment',
      title: 'Rendez-vous Annulé',
      message: 'Emma Rodriguez a annulé son rendez-vous de demain 14h',
      time: '2h',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    patientContacts: true,
    inventory: true,
    staffMessages: true,
    emailNotifications: false,
    pushNotifications: true
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'contact': return <Users className="w-4 h-4" />;
      case 'inventory': return <Package className="w-4 h-4" />;
      case 'staff': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const filterNotifications = () => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(n => n.type === activeTab);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-hover-surface rounded-lg transition-colors relative"
      >
        <Bell className="w-5 h-5 text-text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-border-primary z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Tout lire
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="appointment">RDV</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="inventory">Stock</TabsTrigger>
                  <TabsTrigger value="staff">Équipe</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-4">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filterNotifications().map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          notification.isRead 
                            ? 'bg-surface border-border-primary' 
                            : 'bg-white border-primary'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-1.5 rounded-full ${getPriorityColor(notification.priority)}`}>
                            {getIcon(notification.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-text-primary truncate">
                                {notification.title}
                              </p>
                              <span className="text-xs text-text-subtle flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getPriorityColor(notification.priority)}`}
                              >
                                {notification.priority}
                              </Badge>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filterNotifications().length === 0 && (
                      <div className="text-center py-6">
                        <Bell className="w-12 h-12 mx-auto text-text-subtle mb-2" />
                        <p className="text-text-secondary">Aucune notification</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Notification Settings */}
            <div className="p-4 border-t border-border-primary">
              <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Préférences de Notification
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Rendez-vous</span>
                  <Switch 
                    checked={notificationSettings.appointments}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, appointments: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Contacts Patients</span>
                  <Switch 
                    checked={notificationSettings.patientContacts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, patientContacts: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Inventaire</span>
                  <Switch 
                    checked={notificationSettings.inventory}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, inventory: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Messages Équipe</span>
                  <Switch 
                    checked={notificationSettings.staffMessages}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, staffMessages: checked }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Notifications Push</span>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationMegaMenu;
