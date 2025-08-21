import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const GlobalChatbot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced context-aware quick questions based on current route
  const getContextualQuestions = () => {
    const path = location.pathname as string;
    
    const contextualQuestions: Record<string, string[]> = {
      '/': [
        'Résumé de ma journée',
        'Prochains rendez-vous',
        'Statistiques du cabinet',
        'Patients en attente',
        'Revenus du jour'
      ],
      '/patients': [
        'Rechercher un patient',
        'Ajouter un nouveau patient',
        'Patients à risque',
        'Historique médical récent',
        'Patients non contactés',
        'Rappels de suivi'
      ],
      '/appointments': [
        'Créneaux libres aujourd\'hui',
        'Planifier un rendez-vous',
        'Rendez-vous en retard',
        'Annulations du jour',
        'Planning de demain',
        'Optimiser mon planning'
      ],
      '/finance': [
        'Revenus du mois',
        'Factures impayées',
        'Créer une facture',
        'Rapports financiers',
        'Taux de recouvrement',
        'Analyse des coûts'
      ],
      '/payroll': [
        'Paie du personnel',
        'Heures travaillées',
        'Bulletins de paie',
        'Charges sociales',
        'Congés et absences',
        'Calcul des salaires'
      ],
      '/waiting-room': [
        'Qui est en attente ?',
        'Temps d\'attente moyen',
        'Prochaine consultation',
        'Notifier un retard',
        'Gérer la file d\'attente',
        'Statistiques d\'attente'
      ],
      '/billing': [
        'Créer une facture',
        'Factures en attente',
        'Paiements reçus',
        'Relances clients',
        'Taux de paiement',
        'Réconciliation comptable'
      ],
      '/analytics': [
        'Tendances consultations',
        'Performance du cabinet',
        'Analyse des revenus',
        'Satisfaction patients',
        'Indicateurs clés',
        'Rapport mensuel'
      ],
      '/inventory': [
        'Stock disponible',
        'Produits à commander',
        'Gestion des fournisseurs',
        'Coûts d\'inventaire',
        'Alertes de stock',
        'Consommation mensuelle'
      ],
      '/communication': [
        'Messages en attente',
        'Envoyer un SMS',
        'Rappels automatiques',
        'Notifications patients',
        'Campagnes marketing',
        'Statistiques communication'
      ],
      '/copilot': [
        'Aide au diagnostic',
        'Interactions médicamenteuses',
        'Guidelines cliniques',
        'Recherche médicale',
        'Calculateurs médicaux',
        'Recommandations thérapeutiques'
      ],
      '/medical-subscriptions': [
        'Nouvelles publications',
        'Articles recommandés',
        'Formation continue',
        'Congrès médicaux',
        'Mise à jour guidelines',
        'Veille scientifique'
      ],
      '/records': [
        'Créer un dossier',
        'Rechercher dossier',
        'Archiver dossiers',
        'Historique patient',
        'Documents manquants',
        'Conformité RGPD'
      ],
      '/settings': [
        'Paramètres utilisateur',
        'Configuration cabinet',
        'Gestion des accès',
        'Sauvegarde données',
        'Intégrations',
        'Sécurité système'
      ]
    };

    return contextualQuestions[path] || [
      'Comment utiliser cette section ?',
      'Fonctionnalités disponibles',
      'Raccourcis clavier'
    ];
  };

  const generateAIResponse = (question: string) => {
    const path = location.pathname as string;
    
    // Context-specific responses based on current page
    const contextualResponses: Record<string, Record<string, string>> = {
      '/patients': {
        'rechercher': `Je peux vous aider à rechercher un patient par nom, numéro de téléphone, ou date de naissance. Quelles informations avez-vous ?`,
        'ajouter': `Pour ajouter un nouveau patient, vous devez renseigner : nom, prénom, date de naissance, téléphone et adresse. Voulez-vous commencer ?`,
        'risque': `J'ai identifié 5 patients à risque nécessitant un suivi : 2 diabétiques non contrôlés et 3 hypertendus sans consultation récente.`,
        'historique': `Les consultations récentes montrent une augmentation des pathologies respiratoires de 20% ce mois-ci.`
      },
      '/payroll': {
        'paie': `Ce mois-ci : 8 employés, masse salariale de 24,500 TND. 2 bulletins en attente de validation.`,
        'heures': `Cette semaine : 312h travaillées sur 320h prévues. 2 employés en congé, 1 absence maladie.`,
        'bulletins': `Tous les bulletins du mois sont générés. 6 envoyés, 2 en attente de validation RH.`,
        'charges': `Charges sociales du mois : 6,125 TND (25% de la masse salariale). Échéance le 15.`,
        'congés': `Congés en cours : Marie (5 jours), Ahmed (3 jours). 12 demandes en attente.`
      },
      '/waiting-room': {
        'attente': `Il y a actuellement 3 patients en salle d'attente. Marie Dupont attend depuis 12 minutes, Jean Martin depuis 8 minutes, et Sarah Dubois vient d'arriver.`,
        'temps': `Le temps d'attente moyen aujourd'hui est de 15 minutes. C'est dans la normale pour un mardi après-midi.`,
        'prochaine': `Votre prochaine consultation est prévue à 14h30 avec Marie Dupont pour un suivi hypertension.`,
        'retard': `Je peux envoyer une notification automatique aux patients en attente pour les informer d'un éventuel retard. Voulez-vous que je le fasse ?`,
        'file': `La file d'attente est bien organisée. Vous avez 3 patients en attente et 2 autres arriveront dans l'heure.`
      },
      '/appointments': {
        'créneaux': `Vous avez 3 créneaux libres aujourd'hui : 15h30, 16h45 et 17h30. Lequel vous intéresse ?`,
        'planifier': `Je peux vous aider à planifier un rendez-vous. De quel type de consultation s'agit-il et quelle est l'urgence ?`,
        'retard': `2 rendez-vous sont en retard aujourd'hui. Marie Dupont (12 min) et Jean Martin (5 min). Voulez-vous les contacter ?`,
        'planning': `Demain vous avez 12 consultations prévues de 9h à 18h. Pic d'activité entre 14h et 16h avec 4 rendez-vous.`
      },
      '/finance': {
        'revenus': `Revenus du mois : 45,680 TND (+12% vs mois dernier). Objectif mensuel atteint à 89%.`,
        'impayées': `8 factures impayées pour un total de 8,450 TND. 3 dépassent 30 jours et nécessitent une relance.`,
        'facture': `Je peux vous guider pour créer une nouvelle facture. Avez-vous les informations du patient et les actes effectués ?`,
        'recouvrement': `Taux de recouvrement actuel : 94%. Excellent performance, 6% au-dessus de la moyenne du secteur.`
      },
      '/inventory': {
        'stock': `Stock actuel : 156 produits en stock, 12 en rupture, 8 alertes de seuil bas.`,
        'commander': `5 produits nécessitent une commande urgente : Amoxicilline, Seringues 5ml, Gants latex.`,
        'fournisseurs': `3 commandes en attente : Pharma Plus (livraison demain), MedSupply (retard 2 jours).`,
        'coûts': `Coût inventaire mensuel : 3,200 TND. Rotation stock : 2.3 fois/mois.`
      },
      '/copilot': {
        'diagnostic': `Assistant disponible pour analyser les symptômes et suggérer des diagnostics différentiels.`,
        'interactions': `Base de données de 50,000+ interactions médicamenteuses mise à jour quotidiennement.`,
        'guidelines': `Accès à 500+ guidelines cliniques actualisées par l'HAS et sociétés savantes.`,
        'recherche': `Recherche dans PubMed, Cochrane et bases médicales françaises en temps réel.`
      }
    };

    // Get responses for current page
    const pageResponses = contextualResponses[path] || {};
    
    // Check for matching keywords in question
    for (const [key, response] of Object.entries(pageResponses)) {
      if (question.toLowerCase().includes(key)) {
        return response;
      }
    }

    // Generic responses
    const genericResponses: Record<string, string> = {
      'rendez-vous': `Aujourd'hui vous avez 8 rendez-vous prévus. Le prochain est à 14h30 avec Marie Dupont.`,
      'patients': `Cette semaine, vous avez 42 patients programmés. 8 aujourd'hui, 12 demain.`,
      'urgences': `Il y a actuellement 2 urgences en attente nécessitant votre attention.`,
      'journée': `Votre journée : 8 RDV, 2 urgences, 1 téléconsultation. Taux d'occupation 95%.`,
      'revenus': `Revenus du mois : 45,680 TND (+12% vs mois dernier). Factures en attente : 8,450 TND.`,
      'statistiques': `Performance du cabinet : 95% de satisfaction patients, 94% de taux de recouvrement.`
    };

    for (const [key, response] of Object.entries(genericResponses)) {
      if (question.toLowerCase().includes(key)) {
        return response;
      }
    }

    // Default response based on current section
    const sectionNames: Record<string, string> = {
      '/': 'tableau de bord',
      '/patients': 'gestion des patients',
      '/appointments': 'planning des rendez-vous',
      '/finance': 'gestion financière',
      '/payroll': 'paie et rémunérations',
      '/waiting-room': 'salle d\'attente',
      '/billing': 'facturation',
      '/analytics': 'analyses et rapports',
      '/inventory': 'gestion d\'inventaire',
      '/communication': 'communication',
      '/copilot': 'assistant médical',
      '/medical-subscriptions': 'veille médicale',
      '/records': 'dossiers médicaux',
      '/settings': 'paramètres'
    };

    const currentSection = sectionNames[path] || 'cette section';
    return `Je suis votre assistant IA pour ${currentSection}. Je peux vous aider avec toutes les fonctionnalités de cette section. Posez-moi une question plus spécifique ou utilisez les suggestions rapides !`;
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

  // Initialize with welcome message based on current section
  useEffect(() => {
    const sectionNames: Record<string, string> = {
      '/': 'Tableau de bord',
      '/patients': 'Gestion des patients',
      '/appointments': 'Planning des rendez-vous',
      '/finance': 'Gestion financière',
      '/payroll': 'Paie & Rémunérations',
      '/waiting-room': 'Salle d\'attente',
      '/billing': 'Facturation',
      '/analytics': 'Analyses et rapports',
      '/inventory': 'Gestion d\'inventaire',
      '/communication': 'Communication',
      '/copilot': 'Assistant médical IA',
      '/medical-subscriptions': 'Veille Médicale',
      '/records': 'Dossiers Médicaux',
      '/settings': 'Paramètres'
    };
    
    const currentSection = sectionNames[location.pathname as string] || 'Cabinet médical';
    
    let welcomeMessage = `Bonjour ! Je suis votre assistant IA pour ${currentSection}. Je peux vous aider avec toutes les fonctionnalités spécifiques à cette section. Utilisez les questions rapides ci-dessous ou posez-moi directement vos questions !`;
    
    setMessages([{
      id: '1',
      type: 'ai',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
  }, [location.pathname]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-slate-900 hover:bg-slate-800 shadow-lg border border-slate-200"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl border-slate-200 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[550px]'
      }`}>
        {/* Header */}
        <CardHeader className="p-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Assistant IA</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-slate-500">En ligne</span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-full flex flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-slate-900 text-white rounded-br-md'
                          : 'bg-slate-100 text-slate-900 rounded-bl-md border border-slate-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className={`text-xs mt-1 block ${
                        message.type === 'user' ? 'text-slate-300' : 'text-slate-500'
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
                  <div className="flex justify-start">
                    <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            <div className="p-3 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-600 mb-2">Questions rapides :</p>
              <div className="grid grid-cols-2 gap-1">
                {getContextualQuestions().slice(0, 6).map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-slate-100 hover:border-slate-300 text-xs py-1 px-2 border-slate-200 justify-start h-auto whitespace-normal"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question.length > 20 ? `${question.substring(0, 20)}...` : question}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Posez votre question..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 rounded-full border-slate-200 focus:border-slate-300 focus:ring-slate-300"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  size="sm"
                  className="rounded-full bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default GlobalChatbot;
