
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Stethoscope, 
  Calculator, 
  BookOpen, 
  Pill, 
  Brain,
  MessageSquare,
  Activity,
  FileSearch,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Bot
} from 'lucide-react';

// Import existing components
import DiagnosticAssistant from './DiagnosticAssistant';
import RiskAssessmentCalculators from './RiskAssessmentCalculators';
import ClinicalGuidelines from './ClinicalGuidelines';
import TreatmentRecommendations from './TreatmentRecommendations';
import DrugInteractionChecker from './DrugInteractionChecker';
import EvidenceBasedMedicine from './EvidenceBasedMedicine';
import ChatbotAssistant from './ChatbotAssistant';

const CopilotAssistant = () => {
  const [activeModule, setActiveModule] = useState<string>('overview');

  const modules = [
    {
      id: 'chatbot',
      title: 'Assistant Conversationnel',
      description: 'Chat intelligent avec l\'IA médicale pour réponses rapides et personnalisées',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-700',
      component: ChatbotAssistant
    },
    {
      id: 'diagnostic',
      title: 'Assistant Diagnostique',
      description: 'Aide au diagnostic différentiel basé sur les symptômes et signes cliniques',
      icon: Stethoscope,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-700',
      component: DiagnosticAssistant
    },
    {
      id: 'risk-calculators',
      title: 'Calculateurs de Risque',
      description: 'Scores et calculateurs validés pour l\'évaluation des risques cliniques',
      icon: Calculator,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-700',
      component: RiskAssessmentCalculators
    },
    {
      id: 'guidelines',
      title: 'Guidelines Cliniques',
      description: 'Accès aux recommandations et guidelines médicales actualisées',
      icon: BookOpen,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-700',
      component: ClinicalGuidelines
    },
    {
      id: 'treatment',
      title: 'Recommandations Thérapeutiques',
      description: 'Protocoles de traitement et recommandations médicamenteuses',
      icon: Pill,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      textColor: 'text-red-700',
      component: TreatmentRecommendations
    },
    {
      id: 'drug-interactions',
      title: 'Interactions Médicamenteuses',
      description: 'Vérification des interactions et contre-indications',
      icon: Activity,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
      textColor: 'text-pink-700',
      component: DrugInteractionChecker
    },
    {
      id: 'evidence',
      title: 'Médecine Basée sur les Preuves',
      description: 'Recherche et analyse de la littérature médicale',
      icon: FileSearch,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
      textColor: 'text-indigo-700',
      component: EvidenceBasedMedicine
    }
  ];

  const activeModuleData = modules.find(m => m.id === activeModule);
  const ActiveComponent = activeModuleData?.component;

  return (
    <div className="h-full flex flex-col">
      {activeModule === 'overview' ? (
        // Overview Dashboard
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Assistant Médical Intelligent
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explorez nos outils d'aide à la décision clinique pour améliorer la qualité des soins
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">7</p>
                      <p className="text-sm text-gray-600">Modules Disponibles</p>
                    </div>
                    <Brain className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">50+</p>
                      <p className="text-sm text-gray-600">Calculateurs Médicaux</p>
                    </div>
                    <Calculator className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">200+</p>
                      <p className="text-sm text-gray-600">Guidelines Médicales</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card 
                  key={module.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${module.bgColor} border-2 hover:border-gray-300`}
                  onClick={() => setActiveModule(module.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-lg mb-2 ${module.textColor}`}>
                          {module.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {module.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={module.textColor}>
                            IA Assistée
                          </Badge>
                          <ChevronRight className={`w-5 h-5 ${module.textColor}`} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Activité Récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Vos consultations récentes apparaîtront ici</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // Module View
        <div className="flex flex-col h-full">
          {/* Module Header */}
          <div className="border-b bg-white px-6 py-4 flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveModule('overview')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Retour au tableau de bord
            </Button>
            {activeModuleData && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeModuleData.color} flex items-center justify-center`}>
                  <activeModuleData.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeModuleData.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {activeModuleData.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Module Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopilotAssistant;
