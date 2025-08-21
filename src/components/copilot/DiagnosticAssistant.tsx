
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Stethoscope, 
  Plus, 
  Minus, 
  AlertTriangle, 
  CheckCircle2,
  Target,
  TrendingUp,
  FileText,
  Calculator
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  frequency: string;
}

interface DiagnosticHypothesis {
  condition: string;
  probability: number;
  reasoning: string;
  supportingFactors: string[];
  contradictingFactors: string[];
  requiredTests: string[];
  urgency: 'low' | 'medium' | 'high';
}

interface ClinicalCalculator {
  name: string;
  description: string;
  category: string;
  formula: string;
  normalRange?: string;
}

const DiagnosticAssistant = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientSex, setPatientSex] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [diagnosticHypotheses, setDiagnosticHypotheses] = useState<DiagnosticHypothesis[]>([]);
  const [selectedCalculator, setSelectedCalculator] = useState<string>('');

  // Mock clinical calculators
  const clinicalCalculators: ClinicalCalculator[] = [
    {
      name: 'Score de Wells (TVP)',
      description: 'Évaluation du risque de thrombose veineuse profonde',
      category: 'Vasculaire',
      formula: 'Cancer actif (1pt) + Paralysie/immobilisation (1pt) + Alitement > 3j (1pt) + Douleur le long des veines (1pt) + Œdème mollet (1pt) + Œdème unilatéral (1pt) + Antécédent TVP (1pt) + Diagnostic alternatif probable (-2pts)',
      normalRange: '< 2: faible risque'
    },
    {
      name: 'Score CHADS2-VASc',
      description: 'Évaluation du risque d\'AVC en FA',
      category: 'Cardiovasculaire',
      formula: 'ICC (1pt) + HTA (1pt) + Age ≥75 (2pts) + Diabète (1pt) + AVC/AIT (2pts) + Maladie vasculaire (1pt) + Age 65-74 (1pt) + Sexe féminin (1pt)',
      normalRange: '0-1: faible risque, ≥2: anticoagulation recommandée'
    },
    {
      name: 'Clairance créatinine (Cockcroft)',
      description: 'Estimation de la fonction rénale',
      category: 'Néphrologie',
      formula: '[(140-âge) × poids × (0.85 si femme)] / (0.814 × créatinine)',
      normalRange: '> 90 mL/min/1.73m²'
    },
    {
      name: 'IMC (Indice de Masse Corporelle)',
      description: 'Classification du statut pondéral',
      category: 'Général',
      formula: 'Poids (kg) / Taille² (m²)',
      normalRange: '18.5-24.9: normal'
    }
  ];

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        name: currentSymptom,
        severity: 'moderate',
        duration: '1-3 jours',
        frequency: 'Constant'
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom('');
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const generateDiagnosticHypotheses = () => {
    // Mock diagnostic engine - in reality, this would use advanced AI/ML algorithms
    const mockHypotheses: DiagnosticHypothesis[] = [
      {
        condition: 'Syndrome grippal',
        probability: 85,
        reasoning: 'Présence de fièvre, courbatures et fatigue en période épidémique',
        supportingFactors: [
          'Symptômes systémiques typiques',
          'Début aigu des symptômes',
          'Contexte épidémiologique favorable'
        ],
        contradictingFactors: [
          'Absence de signes respiratoires marqués'
        ],
        requiredTests: [
          'Test rapide grippe si disponible',
          'NFS si évolution défavorable'
        ],
        urgency: 'low'
      },
      {
        condition: 'Pneumonie communautaire',
        probability: 65,
        reasoning: 'Fièvre + toux + dyspnée chez patient âgé avec facteurs de risque',
        supportingFactors: [
          'Âge > 65 ans',
          'Fièvre élevée',
          'Dyspnée d\'effort récente'
        ],
        contradictingFactors: [
          'Absence d\'expectoration purulente',
          'Saturation O2 normale'
        ],
        requiredTests: [
          'Radiographie thoracique',
          'NFS + CRP',
          'Hémocultures si fièvre > 38.5°C'
        ],
        urgency: 'medium'
      },
      {
        condition: 'Embolie pulmonaire',
        probability: 25,
        reasoning: 'Dyspnée aiguë avec facteurs de risque thromboemboliques',
        supportingFactors: [
          'Dyspnée d\'apparition brutale',
          'Douleur thoracique',
          'Facteurs de risque présents'
        ],
        contradictingFactors: [
          'Absence de signes de TVP',
          'D-dimères non réalisés'
        ],
        requiredTests: [
          'D-dimères',
          'Score de Wells',
          'Angio-scanner thoracique si indication'
        ],
        urgency: 'high'
      }
    ];

    setDiagnosticHypotheses(mockHypotheses);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'low': return <CheckCircle2 className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="symptoms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="symptoms">
            <Stethoscope className="w-4 h-4 mr-2" />
            Analyse Symptômes
          </TabsTrigger>
          <TabsTrigger value="diagnosis">
            <Brain className="w-4 h-4 mr-2" />
            Diagnostic IA
          </TabsTrigger>
          <TabsTrigger value="calculators">
            <Calculator className="w-4 h-4 mr-2" />
            Calculateurs
          </TabsTrigger>
        </TabsList>

        {/* Symptoms Analysis Tab */}
        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collecte des Symptômes et Anamnèse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Patient Demographics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Âge du patient</label>
                  <Input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="ex: 65"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sexe</label>
                  <select
                    value={patientSex}
                    onChange={(e) => setPatientSex(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  >
                    <option value="">Sélectionner</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>
              </div>

              {/* Symptoms Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Ajouter un symptôme</label>
                <div className="flex gap-2">
                  <Input
                    value={currentSymptom}
                    onChange={(e) => setCurrentSymptom(e.target.value)}
                    placeholder="ex: Fièvre, céphalées, toux..."
                    onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                  />
                  <Button onClick={addSymptom}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Current Symptoms */}
              {symptoms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Symptômes rapportés:</h4>
                  <div className="space-y-2">
                    {symptoms.map((symptom) => (
                      <div key={symptom.id} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{symptom.name}</span>
                          <Badge variant="outline" className={getSeverityColor(symptom.severity)}>
                            {symptom.severity}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSymptom(symptom.id)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium mb-1">Antécédents médicaux pertinents</label>
                <Textarea
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  placeholder="HTA, diabète, cardiopathie, allergies médicamenteuses..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={generateDiagnosticHypotheses}
                className="w-full"
                disabled={symptoms.length === 0}
              >
                <Brain className="w-4 h-4 mr-2" />
                Générer les Hypothèses Diagnostiques IA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagnosis Tab */}
        <TabsContent value="diagnosis" className="space-y-4">
          {diagnosticHypotheses.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Hypothèses Diagnostiques IA
              </h3>
              
              {diagnosticHypotheses
                .sort((a, b) => b.probability - a.probability)
                .map((hypothesis, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold">{hypothesis.condition}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`flex items-center ${getUrgencyColor(hypothesis.urgency)}`}>
                              {getUrgencyIcon(hypothesis.urgency)}
                              <span className="ml-1 text-sm font-medium">
                                Urgence {hypothesis.urgency}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {hypothesis.probability}%
                          </div>
                          <Progress value={hypothesis.probability} className="w-24 mt-1" />
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{hypothesis.reasoning}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-green-700 mb-2">✓ Facteurs en faveur:</h5>
                          <ul className="text-sm space-y-1">
                            {hypothesis.supportingFactors.map((factor, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-red-700 mb-2">⚠ Éléments défavorables:</h5>
                          <ul className="text-sm space-y-1">
                            {hypothesis.contradictingFactors.map((factor, idx) => (
                              <li key={idx} className="flex items-start">
                                <AlertTriangle className="w-3 h-3 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Examens complémentaires suggérés:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {hypothesis.requiredTests.map((test, idx) => (
                            <Badge key={idx} variant="secondary">{test}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Assistant Diagnostic IA</h3>
                <p className="text-muted-foreground mb-4">
                  Saisissez les symptômes du patient dans l'onglet "Analyse Symptômes" 
                  pour générer des hypothèses diagnostiques assistées par IA.
                </p>
                <Button variant="outline">
                  Commencer l'analyse
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Clinical Calculators Tab */}
        <TabsContent value="calculators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Calculateurs Cliniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clinicalCalculators.map((calc, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold">{calc.name}</h4>
                        <Badge variant="outline">{calc.category}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{calc.description}</p>
                      
                      <div className="text-xs bg-muted p-2 rounded mb-3">
                        <strong>Formule:</strong> {calc.formula}
                      </div>
                      
                      {calc.normalRange && (
                        <div className="text-xs text-green-700 bg-green-50 p-2 rounded mb-3">
                          <strong>Valeurs normales:</strong> {calc.normalRange}
                        </div>
                      )}
                      
                      <Button size="sm" variant="secondary" className="w-full">
                        <TrendingUp className="w-3 h-3 mr-2" />
                        Utiliser le calculateur
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiagnosticAssistant;
