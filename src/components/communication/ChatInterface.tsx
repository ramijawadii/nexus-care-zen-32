import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical,
  Users,
  Building2,
  MessageSquare,
  Smartphone,
  Facebook,
  Hash
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  type: 'team' | 'supplier' | 'client';
  role?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  avatar?: string;
  channel?: 'app' | 'sms' | 'whatsapp' | 'facebook' | 'direct';
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Dr. Martin',
    type: 'team',
    role: 'Médecin généraliste',
    lastMessage: 'Bonjour, l\'équipe ! N\'oubliez pas la réunion de demain à 10h.',
    timestamp: '10:24',
    unread: 0,
    online: true,
    avatar: '/avatars/1.png',
    channel: 'app'
  },
  {
    id: '2',
    name: 'Fournisseur ABC',
    type: 'supplier',
    lastMessage: 'Votre commande a été expédiée et arrivera dans 2 jours.',
    timestamp: 'Hier',
    unread: 1,
    online: false,
    avatar: '/avatars/2.png',
    channel: 'sms'
  },
  {
    id: '3',
    name: 'Marie Dupont',
    type: 'client',
    role: 'Patiente',
    lastMessage: 'Bonjour docteur, j\'aimerais prendre rendez-vous pour la semaine prochaine.',
    timestamp: '14:32',
    unread: 0,
    online: false,
    avatar: '/avatars/3.png',
    channel: 'whatsapp'
  },
  {
    id: '4',
    name: 'Jean-Pierre Martin',
    type: 'client',
    lastMessage: 'Merci pour votre consultation !',
    timestamp: '1 semaine',
    unread: 2,
    online: false,
    avatar: '/avatars/4.png',
    channel: 'facebook'
  },
  {
    id: '5',
    name: 'Sophie Leduc',
    type: 'team',
    role: 'Infirmière',
    lastMessage: 'J\'ai préparé les dossiers pour les patients de demain.',
    timestamp: '1 semaine',
    unread: 0,
    online: true,
    avatar: '/avatars/5.png',
    channel: 'app'
  },
  {
    id: '6',
    name: 'Paul Bernard',
    type: 'client',
    lastMessage: 'Je me sens beaucoup mieux depuis votre traitement.',
    timestamp: '2 semaines',
    unread: 0,
    online: false,
    avatar: '/avatars/6.png',
    channel: 'direct'
  },
  {
    id: '7',
    name: 'Laura Garcia',
    type: 'client',
    lastMessage: 'Avez-vous reçu mes analyses ?',
    timestamp: '2 semaines',
    unread: 3,
    online: false,
    avatar: '/avatars/7.png',
    channel: 'whatsapp'
  },
  {
    id: '8',
    name: 'David Leclerc',
    type: 'supplier',
    lastMessage: 'Nouvelle promotion sur les équipements médicaux !',
    timestamp: '3 semaines',
    unread: 0,
    online: false,
    avatar: '/avatars/8.png',
    channel: 'sms'
  },
  {
    id: '9',
    name: 'Isabelle Roux',
    type: 'client',
    lastMessage: 'Je voudrais annuler mon prochain rendez-vous.',
    timestamp: '3 semaines',
    unread: 1,
    online: false,
    channel: 'facebook'
  },
  {
    id: '10',
    name: 'Thomas Dubois',
    type: 'team',
    role: 'Secrétaire',
    lastMessage: 'Les rappels de rendez-vous ont été envoyés.',
    timestamp: '4 semaines',
    unread: 0,
    online: true,
    channel: 'app'
  },
];

const ChatInterface = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [activeFilter, setActiveFilter] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const contactTypes = [
    { key: 'tous', label: 'Tous', count: mockContacts.length, icon: Hash },
    { key: 'team', label: 'Équipe', count: mockContacts.filter(c => c.type === 'team').length, icon: Users },
    { key: 'supplier', label: 'Fournisseurs', count: mockContacts.filter(c => c.type === 'supplier').length, icon: Building2 },
    { key: 'client', label: 'Patients', count: mockContacts.filter(c => c.type === 'client').length, icon: MessageSquare },
  ];

  const getChannelIcon = (channel?: string) => {
    switch (channel) {
      case 'sms': return <Smartphone className="h-3 w-3" />;
      case 'whatsapp': return <MessageSquare className="h-3 w-3 text-green-600" />;
      case 'facebook': return <Facebook className="h-3 w-3 text-blue-600" />;
      case 'app': return <Smartphone className="h-3 w-3 text-blue-500" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getChannelColor = (channel?: string) => {
    switch (channel) {
      case 'sms': return 'bg-gray-100 text-gray-700';
      case 'whatsapp': return 'bg-green-100 text-green-700';
      case 'facebook': return 'bg-blue-100 text-blue-700';
      case 'app': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredContacts = mockContacts.filter(contact => {
    const matchesFilter = activeFilter === 'tous' || contact.type === activeFilter;
    const matchesSearch = !searchQuery || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const quickReplies = {
    team: [
      "Bonjour l'équipe, comment allez-vous aujourd'hui ?",
      "N'oubliez pas de remplir vos rapports quotidiens.",
      "Y a-t-il des mises à jour importantes à partager ?",
    ],
    supplier: [
      "Bonjour, avez-vous des nouvelles de notre commande ?",
      "Pourriez-vous nous envoyer votre dernier catalogue ?",
      "Quelles sont vos conditions de paiement actuelles ?",
    ],
    client: [
      "Bonjour, comment vous sentez-vous aujourd'hui ?",
      "Avez-vous des questions concernant votre traitement ?",
      "N'hésitez pas à nous contacter pour toute urgence.",
    ],
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-surface-elevated rounded-lg border border-border-primary overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex flex-col border-r border-border-primary">
        {/* Header */}
        <div className="p-4 border-b border-border-primary">
          <div className="relative mb-4">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher des contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-focus-ring bg-surface"
            />
          </div>
          
          {/* Scrollable Tags */}
          <ScrollArea className="w-full">
            <div className="flex space-x-2 pb-2 min-w-max">
              {contactTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Button
                    key={type.key}
                    variant={activeFilter === type.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(type.key)}
                    className="flex items-center space-x-2 whitespace-nowrap flex-shrink-0"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{type.label}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {type.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Contacts List */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-hover-surface ${
                  selectedContact?.id === contact.id ? 'bg-hover-surface border border-border-primary' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-text-primary truncate">
                          {contact.name}
                        </h4>
                        {contact.channel && (
                          <div className={`px-1.5 py-0.5 rounded text-xs flex items-center space-x-1 ${getChannelColor(contact.channel)}`}>
                            {getChannelIcon(contact.channel)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-text-muted">
                          {contact.timestamp}
                        </span>
                        {contact.unread > 0 && (
                          <Badge variant="destructive" className="text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {contact.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {contact.role && (
                      <p className="text-xs text-text-secondary mb-1">{contact.role}</p>
                    )}
                    
                    <p className="text-sm text-text-secondary truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border-primary flex items-center justify-between bg-surface-muted">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">
                    {selectedContact.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {selectedContact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{selectedContact.name}</h3>
                <p className="text-sm text-text-secondary">
                  {selectedContact.online ? 'En ligne' : `Vu pour la dernière fois ${selectedContact.timestamp}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-surface border border-border-primary">
                  <p className="text-sm text-text-primary">Bonjour docteur, j'aimerais prendre rendez-vous pour la semaine prochaine.</p>
                  <span className="text-xs text-text-muted">14:32</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-primary text-primary-foreground">
                  <p className="text-sm">Bien sûr, je peux vous proposer mardi à 15h ou mercredi à 10h. Quelle option vous convient le mieux ?</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-90">14:35</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white opacity-60 rounded-full"></div>
                      <div className="w-1 h-1 bg-white opacity-60 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          <div className="p-4 border-t border-border-primary bg-surface-muted">
            <div className="flex space-x-2 mb-3 overflow-x-auto">
              {(quickReplies[selectedContact.type] || []).map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap flex-shrink-0"
                  onClick={() => setMessage(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

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
                  className="w-full p-3 pr-20 border border-border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-focus-ring bg-surface"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Sending:', message);
                      setMessage('');
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button size="icon" className="rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-surface">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted">Sélectionnez une conversation pour commencer</p>
          </div>
        </div>
      )}
    </div>
  );
};

const getQuickReplies = (contactType: string) => {
  switch (contactType) {
    case 'team':
      return [
        "Bonjour l'équipe, comment allez-vous aujourd'hui ?",
        "N'oubliez pas de remplir vos rapports quotidiens.",
        "Y a-t-il des mises à jour importantes à partager ?",
      ];
    case 'supplier':
      return [
        "Bonjour, avez-vous des nouvelles de notre commande ?",
        "Pourriez-vous nous envoyer votre dernier catalogue ?",
        "Quelles sont vos conditions de paiement actuelles ?",
      ];
    case 'client':
      return [
        "Bonjour, comment vous sentez-vous aujourd'hui ?",
        "Avez-vous des questions concernant votre traitement ?",
        "N'hésitez pas à nous contacter pour toute urgence.",
      ];
    default:
      return [];
  }
};

export default ChatInterface;
