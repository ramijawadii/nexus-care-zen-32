
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Stethoscope, 
  Calculator, 
  Pill, 
  Activity,
  MessageSquare,
  Bot,
  Brain,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react';
import { Patient } from '@/types/patient';

// Import existing copilot components
import DiagnosticAssistant from './DiagnosticAssistant';
import RiskAssessmentCalculators from './RiskAssessmentCalculators';
import TreatmentRecommendations from './TreatmentRecommendations';
import DrugInteractionChecker from './DrugInteractionChecker';
import ChatbotAssistant from './ChatbotAssistant';

interface PatientCopilotProps {
  patient: Patient;
}

const PatientCopilot = ({ patient }: PatientCopilotProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'chat',
      title: 'Assistant Conversationnel',
      description: 'Chat intelligent avec l\'IA médicale pour ce dossier',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-700',
      component: ChatbotAssistant,
      stats: 'Réponses instantanées'
    },
    {
      id: 'diagnostic',
      title: 'Assistant Diagnostique',
      description: 'Aide au diagnostic basé sur les symptômes du patient',
      icon: Stethoscope,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-700',
      component: DiagnosticAssistant,
      stats: '95% de précision'
    },
    {
      id: 'risk-calculator',
      title: 'Calculateurs de Risque',
      description: 'Évaluation des risques cliniques personnalisée',
      icon: Calculator,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-700',
      component: RiskAssessmentCalculators,
      stats: '50+ calculateurs'
    },
    {
      id: 'treatment',
      title: 'Recommandations Thérapeutiques',
      description: 'Suggestions de traitement adaptées au profil patient',
      icon: Pill,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-700',
      component: TreatmentRecommendations,
      stats: 'Basé sur les guidelines'
    },
    {
      id: 'interactions',
      title: 'Interactions Médicamenteuses',
      description: 'Vérification des interactions et contre-indications',
      icon: Activity,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
      textColor: 'text-red-700',
      component: DrugInteractionChecker,
      stats: 'Base de données complète'
    }
  ];

  const activeToolData = tools.find(t => t.id === activeTab);
  const ActiveComponent = activeToolData?.component;

  return (
    <Card className="h-full bg-gradient-to-br from-slate-50 to-blue-50 border-blue-200">
      <CardHeader className="border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
              Assistant IA Médical
              <Sparkles className="w-6 h-6 text-purple-500" />
            </CardTitle>
            <p className="text-sm text-gray-600">
              Outils d'aide à la décision clinique avancés
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Sécurisé
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <Target className="w-3 h-3 mr-1" />
              IA Certifiée
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 h-full overflow-auto">
        {activeTab === 'overview' ? (
          // Overview Dashboard - Only showing once
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center py-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-xl animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Intelligence Artificielle Médicale
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explorez nos outils d'aide à la décision clinique alimentés par l'IA pour 
                améliorer la qualité des soins et optimiser vos diagnostics
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">5</p>
                      <p className="text-xs text-gray-600">Outils IA</p>
                    </div>
                    <Brain className="w-6 h-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">95%</p>
                      <p className="text-xs text-gray-600">Précision</p>
                    </div>
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">50+</p>
                      <p className="text-xs text-gray-600">Calculateurs</p>
                    </div>
                    <Calculator className="w-6 h-6 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">24/7</p>
                      <p className="text-xs text-gray-600">Disponible</p>
                    </div>
                    <Bot className="w-6 h-6 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tools Grid - Single display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card 
                  key={tool.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${tool.bgColor} border-2 hover:border-blue-300 group relative overflow-hidden`}
                  onClick={() => setActiveTab(tool.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6 relative">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <ChevronRight className={`w-5 h-5 ${tool.textColor} group-hover:translate-x-1 transition-transform`} />
                      </div>
                      
                      <div>
                        <h3 className={`font-bold text-lg mb-2 ${tool.textColor} group-hover:text-gray-900 transition-colors`}>
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          {tool.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`${tool.textColor} text-xs`}>
                            {tool.stats}
                          </Badge>
                          <Badge className="bg-blue-500 text-white text-xs">
                            IA
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Start Guide */}
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <TrendingUp className="w-5 h-5" />
                  Guide de Démarrage Rapide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                    <h4 className="font-medium text-blue-900 mb-1">Sélectionnez un Outil</h4>
                    <p className="text-xs text-blue-700">Choisissez l'assistant IA adapté à vos besoins</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                    <h4 className="font-medium text-blue-900 mb-1">Saisissez les Données</h4>
                    <p className="text-xs text-blue-700">Renseignez les informations nécessaires</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                    <h4 className="font-medium text-blue-900 mb-1">Obtenez les Résultats</h4>
                    <p className="text-xs text-blue-700">Analysez les recommandations IA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Individual Tool Content
          <div className="h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid grid-cols-5 bg-blue-50 border border-blue-200 mb-6 self-start">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  Accueil
                </TabsTrigger>
                {tools.map((tool) => (
                  <TabsTrigger 
                    key={tool.id}
                    value={tool.id}
                    className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-blue-600 hover:bg-blue-75 p-3"
                  >
                    <tool.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{tool.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex-1 bg-white rounded-lg border border-blue-200 shadow-sm overflow-auto">
                <div className="p-6">
                  {activeToolData && (
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activeToolData.color} flex items-center justify-center`}>
                        <activeToolData.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">{activeToolData.title}</h2>
                        <p className="text-sm text-gray-600">{activeToolData.description}</p>
                      </div>
                      <Badge variant="outline" className={activeToolData.textColor}>
                        {activeToolData.stats}
                      </Badge>
                    </div>
                  )}
                  
                  {ActiveComponent && <ActiveComponent />}
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientCopilot;
