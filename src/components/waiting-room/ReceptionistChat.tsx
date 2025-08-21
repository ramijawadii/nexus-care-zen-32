import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  MessageSquare, 
  Clock, 
  User, 
  Pin,
  Paperclip,
  Smile
} from 'lucide-react';
import PatientMentionSuggestions from './PatientMentionSuggestions';

interface Message {
  id: string;
  sender: 'doctor' | 'receptionist';
  content: string;
  timestamp: Date;
  type: 'text' | 'quick-action';
  patientTag?: string;
}

const ReceptionistChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'receptionist',
      content: 'Bonjour Docteur, Marie Dubois est arrivée pour son RDV de 9h',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      sender: 'doctor',
      content: 'Parfait, je finis avec le patient précédent dans 5 minutes',
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    },
    {
      id: '3',
      sender: 'receptionist',
      content: 'Jean Martin attend depuis 20 minutes, dois-je le prévenir du retard?',
      timestamp: new Date(Date.now() - 120000),
      type: 'text',
      patientTag: 'Jean Martin'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    'Patient arrivé',
    'Retard de 10 min',
    'Annulation urgente',
    'Demande de report',
    'Prescription prête',
    'Analyses reçues'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    // Check for @ mentions
    const words = value.split(' ');
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('@') && lastWord.length > 1) {
      const query = lastWord.slice(1);
      setMentionQuery(query);
      setShowMentions(true);

      // Calculate position for suggestions
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setMentionPosition({
          x: rect.left,
          y: rect.top
        });
      }
    } else {
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const handleMentionSelect = (mention: string) => {
    const words = newMessage.split(' ');
    words[words.length - 1] = mention;
    const newValue = words.join(' ') + ' ';
    setNewMessage(newValue);
    setShowMentions(false);
    setMentionQuery('');
    inputRef.current?.focus();
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'doctor',
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleQuickAction = (action: string) => {
    const message: Message = {
      id: Date.now().toString(),
      sender: 'doctor',
      content: action,
      timestamp: new Date(),
      type: 'quick-action'
    };
    setMessages([...messages, message]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MessageSquare className="w-5 h-5 mr-2" />
            Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            <div className="flex items-center p-3 hover:bg-muted cursor-pointer border-l-4 border-l-blue-500 bg-blue-50">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarFallback className="bg-blue-100">R</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Réceptionniste</p>
                <p className="text-xs text-text-muted truncate">En ligne</p>
              </div>
              <Badge className="bg-blue-500 text-white">3</Badge>
            </div>

            <div className="flex items-center p-3 hover:bg-muted cursor-pointer">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarFallback className="bg-gray-100">A</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Assistant médical</p>
                <p className="text-xs text-text-muted truncate">Hors ligne</p>
              </div>
            </div>

            <div className="flex items-center p-3 hover:bg-muted cursor-pointer">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarFallback className="bg-green-100">S</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Secrétaire</p>
                <p className="text-xs text-text-muted truncate">Il y a 5 min</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chat */}
      <Card className="lg:col-span-3">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarFallback className="bg-blue-100">R</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Réceptionniste</h3>
                <p className="text-sm text-green-600">En ligne</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Pin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[500px]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'doctor'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-text-primary'
                    }`}
                  >
                    {message.patientTag && (
                      <Badge className="mb-2 bg-orange-100 text-orange-800">
                        @{message.patientTag}
                      </Badge>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-end mt-1">
                      <Clock className="w-3 h-3 mr-1 opacity-70" />
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-3 border-t bg-gray-50">
            <p className="text-xs text-text-muted mb-2">Actions rapides:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t relative">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                ref={inputRef}
                placeholder="Tapez votre message... (@patient pour mentionner)"
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && !showMentions && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" variant="ghost">
                <Smile className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <PatientMentionSuggestions
              query={mentionQuery}
              onSelect={handleMentionSelect}
              position={mentionPosition}
              visible={showMentions}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistChat;
