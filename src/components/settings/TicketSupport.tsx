
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, 
  Paperclip, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  MessageSquare,
  Settings,
  Bug,
  HelpCircle,
  Zap
} from 'lucide-react';

interface SupportTeam {
  id: string;
  name: string;
  department: string;
  online: boolean;
  responseTime: string;
  expertise: string[];
  avatar?: string;
}

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'bug-report';
  assignedTeam: string;
  createdAt: string;
  lastMessage: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'doctor' | 'support';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

const supportTeams: SupportTeam[] = [
  {
    id: 'tech-support',
    name: 'Support technique',
    department: 'IT',
    online: true,
    responseTime: '< 30 min',
    expertise: ['Installation', 'Configuration', 'Bugs', 'Mise à jour'],
    avatar: '/avatars/tech-team.png'
  },
  {
    id: 'billing-support',
    name: 'Support facturation',
    department: 'Finance',
    online: true,
    responseTime: '< 1 heure',
    expertise: ['Facturation', 'Paiements', 'Abonnements', 'Remboursements'],
    avatar: '/avatars/billing-team.png'
  },
  {
    id: 'medical-support',
    name: 'Support médical',
    department: 'Médical',
    online: false,
    responseTime: '< 2 heures',
    expertise: ['Protocoles', 'Réglementation', 'Formation', 'Bonnes pratiques'],
    avatar: '/avatars/medical-team.png'
  },
  {
    id: 'general-support',
    name: 'Support général',
    department: 'Service client',
    online: true,
    responseTime: '< 45 min',
    expertise: ['Questions générales', 'Utilisation', 'Formation', 'Aide'],
    avatar: '/avatars/general-team.png'
  }
];

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Problème de synchronisation des rendez-vous',
    status: 'open',
    priority: 'high',
    category: 'technical',
    assignedTeam: 'tech-support',
    createdAt: 'Il y a 2 heures',
    lastMessage: 'Le calendrier ne se synchronise plus depuis ce matin...',
    messages: [
      {
        id: '1',
        sender: 'doctor',
        senderName: 'Dr. Martin',
        content: 'Bonjour, j\'ai un problème avec la synchronisation de mon calendrier depuis ce matin. Les nouveaux rendez-vous n\'apparaissent plus.',
        timestamp: '14:30',
      },
      {
        id: '2',
        sender: 'support',
        senderName: 'Thomas - Support technique',
        content: 'Bonjour Dr. Martin, je vais vérifier cela immédiatement. Pouvez-vous me dire quel navigateur vous utilisez ?',
        timestamp: '14:35',
      }
    ]
  },
  {
    id: '2',
    title: 'Question sur la facturation des consultations',
    status: 'resolved',
    priority: 'medium',
    category: 'billing',
    assignedTeam: 'billing-support',
    createdAt: 'Hier',
    lastMessage: 'Merci pour votre aide, c\'est résolu !',
    messages: []
  }
];

const TicketSupport = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [message, setMessage] = useState('');
  const [ticketCategory, setTicketCategory] = useState('general');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Settings className="w-4 h-4" />;
      case 'billing': return <Users className="w-4 h-4" />;
      case 'bug-report': return <Bug className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const createNewTicket = () => {
    if (!newTicketTitle.trim() || !selectedTeam) return;

    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: newTicketTitle,
      status: 'open',
      priority: 'medium',
      category: ticketCategory as 'technical' | 'billing' | 'general' | 'bug-report',
      assignedTeam: selectedTeam,
      createdAt: 'À l\'instant',
      lastMessage: 'Nouveau ticket créé',
      messages: []
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketTitle('');
    setShowNewTicketForm(false);
    setSelectedTicket(newTicket);
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedTicket) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'doctor',
      senderName: 'Dr. Martin',
      content: message,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
      lastMessage: message
    };

    setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Support technique</h2>
          <p className="text-text-secondary">Contactez notre équipe de support pour obtenir de l'aide</p>
        </div>
        <Button onClick={() => setShowNewTicketForm(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouveau ticket</span>
        </Button>
      </div>

      {/* Support Teams Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportTeams.map((team) => (
          <Card key={team.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className={`w-3 h-3 rounded-full ${team.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {team.responseTime}
                </Badge>
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{team.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{team.department}</p>
              <div className="flex flex-wrap gap-1">
                {team.expertise.slice(0, 2).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {team.expertise.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{team.expertise.length - 2}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Mes tickets</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 p-4">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                        selectedTicket?.id === ticket.id 
                          ? 'bg-primary-50 border-primary-200' 
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(ticket.category)}
                          <h4 className="font-medium text-sm text-text-primary truncate">
                            {ticket.title}
                          </h4>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary truncate mb-2">
                        {ticket.lastMessage}
                      </p>
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>{ticket.createdAt}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{supportTeams.find(t => t.id === ticket.assignedTeam)?.responseTime}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b border-border-primary">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedTicket.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`text-xs ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </Badge>
                      <span className="text-sm text-text-muted">
                        Assigné à: {supportTeams.find(t => t.id === selectedTicket.assignedTeam)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'doctor' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-surface border border-border-primary'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{msg.senderName}</span>
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {selectedTicket.messages.length === 0 && (
                    <div className="text-center py-8 text-text-muted">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun message pour le moment</p>
                      <p className="text-sm">Commencez la conversation avec l'équipe de support</p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border-primary">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Tapez votre message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 border border-border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-focus-ring bg-surface"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          sendMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <Button onClick={sendMessage} size="icon" className="rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : showNewTicketForm ? (
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Créer un nouveau ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Équipe de support</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une équipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportTeams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${team.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            <span>{team.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <Select value={ticketCategory} onValueChange={setTicketCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technique</SelectItem>
                      <SelectItem value="billing">Facturation</SelectItem>
                      <SelectItem value="general">Général</SelectItem>
                      <SelectItem value="bug-report">Rapport de bug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Titre du ticket</label>
                  <input
                    type="text"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    className="w-full p-3 border border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-focus-ring"
                    placeholder="Décrivez brièvement votre problème..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowNewTicketForm(false)}>
                    Annuler
                  </Button>
                  <Button onClick={createNewTicket}>
                    Créer le ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <Headphones className="h-12 w-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted mb-2">Sélectionnez un ticket ou créez-en un nouveau</p>
                <p className="text-sm text-text-secondary">Notre équipe de support est là pour vous aider</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketSupport;
