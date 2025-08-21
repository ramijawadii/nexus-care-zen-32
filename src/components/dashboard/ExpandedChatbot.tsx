
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ExpandedChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Bonjour ! Je suis votre assistant médical. Je peux vous renseigner sur votre planning d\'aujourd\'hui, vos prochains rendez-vous, et bien plus encore. Comment puis-je vous aider ?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Quels sont mes rendez-vous aujourd\'hui ?',
    'Combien de patients ai-je cette semaine ?',
    'Y a-t-il des urgences en attente ?',
    'Résumé de ma journée',
    'Prochains rendez-vous importants'
  ];

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const generateAIResponse = (question: string) => {
    const responses = {
      'rendez-vous': 'Aujourd\'hui vous avez 8 rendez-vous prévus. Le prochain est à 14h30 avec Marie Dupont pour un suivi hypertension. Vous avez aussi une consultation urgente à 16h15.',
      'patients': 'Cette semaine, vous avez 42 patients programmés. 8 aujourd\'hui, 12 demain, et le pic sera jeudi avec 15 consultations.',
      'urgences': 'Il y a actuellement 2 urgences en attente : un patient avec douleurs thoraciques arrivé il y a 15 minutes, et une consultation pédiatrique urgente programmée à 15h.',
      'journée': 'Votre journée : 8 RDV, 2 urgences, 1 téléconsultation. Taux d\'occupation 95%. Dernière consultation prévue à 18h30. Pensez à valider les ordonnances en attente.',
      'prochains': 'Vos prochains RDV importants : Demain 9h - Contrôle post-opératoire, Jeudi 14h - Bilan annuel VIP, Vendredi 10h - Consultation familiale complexe.'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (question.toLowerCase().includes(key)) {
        return response;
      }
    }

    return 'Je peux vous aider avec votre planning, vos rendez-vous, les urgences en cours, et les statistiques de votre pratique. Posez-moi une question plus spécifique !';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(question),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className={`w-full h-full shadow-xl border-2 transition-all duration-700 ease-out transform ${
      isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
    }`}>
      {/* Header */}
      <CardHeader className={`p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b transition-all duration-500 delay-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center transition-all duration-500 delay-300 ${
              isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className={`transition-all duration-500 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              <CardTitle className="text-xl font-semibold">Assistant IA Médical</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-text-muted">En ligne - Mode Étendu</span>
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-full flex flex-col">
        {/* Messages */}
        <ScrollArea className={`flex-1 p-6 transition-all duration-500 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300 ease-out`}
                style={{ 
                  animationDelay: `${600 + (index * 100)}ms`,
                  animation: isVisible ? 'fade-in 0.5s ease-out forwards' : 'none'
                }}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                      : 'bg-surface border border-border-primary rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className={`text-xs mt-2 block ${
                    message.type === 'user' ? 'text-blue-100' : 'text-text-subtle'
                  }`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-surface border border-border-primary p-4 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        <div className={`p-6 border-t bg-surface-muted transition-all duration-500 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-sm text-text-muted mb-3 font-medium">Questions rapides :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {quickQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`cursor-pointer hover:bg-blue-50 hover:border-blue-300 text-xs py-2 px-3 justify-start h-auto whitespace-normal transition-all duration-200 hover:scale-105`}
                onClick={() => handleQuickQuestion(question)}
                style={{ 
                  animationDelay: `${700 + (index * 50)}ms`,
                  animation: isVisible ? 'fade-in 0.3s ease-out forwards' : 'none'
                }}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className={`p-6 border-t bg-white transition-all duration-500 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Demandez-moi votre planning, des informations médicales..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-full h-12 text-base"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-12 px-6 hover:scale-105 transition-all duration-200"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpandedChatbot;
