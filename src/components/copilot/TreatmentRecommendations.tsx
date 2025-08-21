
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Pill, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  Heart,
  Activity,
  Brain,
  Baby,
  UserX,
  Calendar,
  Target
} from 'lucide-react';

interface TreatmentProtocol {
  condition: string;
  firstLine: Medication[];
  secondLine: Medication[];
  contraindications: string[];
  specialPopulations: SpecialPopulation[];
  monitoring: MonitoringParameter[];
  duration: string;
  followUp: string[];
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  duration?: string;
  alternatives?: string[];
  sideEffects: string[];
  interactions: string[];
  cost: 'low' | 'medium' | 'high';
  evidence: 'A' | 'B' | 'C';
}

interface SpecialPopulation {
  population: string;
  adjustments: string[];
  contraindications?: string[];
}

interface MonitoringParameter {
  parameter: string;
  frequency: string;
  targetRange?: string;
  action: string;
}

const TreatmentRecommendations = () => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientWeight, setPatientWeight] = useState('');
  const [comorbidities, setComorbidities] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

  // Mock treatment protocols database
  const treatmentProtocols: TreatmentProtocol[] = [
    {
      condition: 'Hypertension Artérielle',
      firstLine: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: '1 fois/jour',
          route: 'Per os',
          duration: 'Long terme',
          alternatives: ['Enalapril', 'Ramipril'],
          sideEffects: ['Toux sèche', 'Hypotension', 'Hyperkaliémie'],
          interactions: ['AINS', 'Diurétiques épargneurs K+'],
          cost: 'low',
          evidence: 'A'
        },
        {
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: '1 fois/jour',
          route: 'Per os',
          alternatives: ['Lercanidipine', 'Félodipine'],
          sideEffects: ['Œdèmes chevilles', 'Céphalées', 'Flush'],
          interactions: ['Simvastatine', 'Digoxine'],
          cost: 'low',
          evidence: 'A'
        }
      ],
      secondLine: [
        {
          name: 'Indapamide',
          dosage: '1.5mg',
          frequency: '1 fois/jour',
          route: 'Per os',
          sideEffects: ['Hypokaliémie', 'Hyperuricémie', 'Troubles digestifs'],
          interactions: ['Lithium', 'Digitaliques'],
          cost: 'low',
          evidence: 'A'
        }
      ],
      contraindications: [
        'Sténose artère rénale bilatérale (IEC)',
        'Grossesse (IEC/ARA2)',
        'Bloc AV 2-3 (β-bloquants)',
        'Insuffisance cardiaque décompensée (ICa)'
      ],
      specialPopulations: [
        {
          population: 'Patient âgé > 80 ans',
          adjustments: [
            'Cible PA < 150/90 mmHg',
            'Débuter à faible dose',
            'Surveillance hypotension orthostatique'
          ]
        },
        {
          population: 'Insuffisance rénale',
          adjustments: [
            'Éviter AINS',
            'Surveiller créatininémie et kaliémie',
            'Adapter posologie selon DFG'
          ]
        },
        {
          population: 'Diabète',
          adjustments: [
            'Cible PA < 130/80 mmHg',
            'IEC/ARA2 préférentiels',
            'Surveillance glycémique'
          ]
        }
      ],
      monitoring: [
        {
          parameter: 'PA',
          frequency: 'Mensuelle puis trimestrielle',
          targetRange: '< 140/90 mmHg (générale)',
          action: 'Ajuster traitement si non contrôlée'
        },
        {
          parameter: 'Créatininémie',
          frequency: 'À 1 semaine puis trimestrielle',
          action: 'Arrêter IEC si augmentation > 30%'
        },
        {
          parameter: 'Kaliémie',
          frequency: 'À 1 semaine puis trimestrielle',
          targetRange: '3.5-5.0 mmol/L',
          action: 'Surveillance rapprochée si IEC + diurétique'
        }
      ],
      duration: 'Traitement à vie',
      followUp: [
        'Consultation à 1 mois',
        'Puis tous les 3 mois si contrôlée',
        'AMT ou MAPA annuelle',
        'ECG et fond d\'œil si non contrôlée'
      ]
    },
    {
      condition: 'Diabète Type 2',
      firstLine: [
        {
          name: 'Metformine',
          dosage: '500mg',
          frequency: '2 fois/jour',
          route: 'Per os',
          duration: 'Long terme',
          alternatives: ['Metformine LP'],
          sideEffects: ['Troubles digestifs', 'Acidose lactique (rare)', 'Carence B12'],
          interactions: ['Produits de contraste iodés', 'Alcool'],
          cost: 'low',
          evidence: 'A'
        }
      ],
      secondLine: [
        {
          name: 'Sitagliptine',
          dosage: '100mg',
          frequency: '1 fois/jour',
          route: 'Per os',
          sideEffects: ['Infections respiratoires', 'Pancréatite (rare)'],
          interactions: ['Digoxine'],
          cost: 'high',
          evidence: 'B'
        },
        {
          name: 'Gliclazide LP',
          dosage: '30mg',
          frequency: '1 fois/jour',
          route: 'Per os',
          sideEffects: ['Hypoglycémie', 'Prise de poids'],
          interactions: ['β-bloquants', 'Alcool'],
          cost: 'low',
          evidence: 'B'
        }
      ],
      contraindications: [
        'Insuffisance rénale sévère (DFG < 30) pour metformine',
        'Insuffisance hépatique pour metformine',
        'Acidocétose diabétique',
        'Grossesse (préférer insuline)'
      ],
      specialPopulations: [
        {
          population: 'Patient âgé > 75 ans',
          adjustments: [
            'Cible HbA1c 7.5-8.5%',
            'Éviter sulfamides si fragilité',
            'Surveillance hypoglycémies'
          ]
        },
        {
          population: 'Insuffisance rénale',
          adjustments: [
            'Arrêter metformine si DFG < 30',
            'Réduire dose si DFG 30-60',
            'Adapter autres antidiabétiques selon DFG'
          ]
        },
        {
          population: 'Maladie cardiovasculaire',
          adjustments: [
            'SGLT2i ou GLP1-RA préférentiels',
            'Cible HbA1c < 7%',
            'Traitement cardiovasculaire optimal'
          ]
        }
      ],
      monitoring: [
        {
          parameter: 'HbA1c',
          frequency: 'Tous les 3 mois',
          targetRange: '< 7% (générale)',
          action: 'Intensifier si > 7% à 6 mois'
        },
        {
          parameter: 'Glycémie à jeun',
          frequency: 'Hebdomadaire puis mensuelle',
          targetRange: '0.7-1.1 g/L',
          action: 'Auto-surveillance selon profil'
        },
        {
          parameter: 'Créatininémie',
          frequency: 'Annuelle',
          action: 'Adapter traitement selon DFG'
        }
      ],
      duration: 'Traitement à vie',
      followUp: [
        'Consultation tous les 3 mois',
        'Bilan lipidique annuel',
        'Fond d\'œil annuel',
        'Examen podologique annuel'
      ]
    }
  ];

  const conditions = treatmentProtocols.map(p => p.condition);

  const selectedProtocol = treatmentProtocols.find(p => p.condition === selectedCondition);

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEvidenceColor = (evidence: string) => {
    switch (evidence) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getPopulationIcon = (population: string) => {
    if (population.includes('âgé')) return <User className="w-4 h-4" />;
    if (population.includes('rénale')) return <Activity className="w-4 h-4" />;
    if (population.includes('hépatique')) return <Brain className="w-4 h-4" />;
    if (population.includes('cardiovasculaire')) return <Heart className="w-4 h-4" />;
    if (population.includes('grossesse')) return <Baby className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Condition Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Recommandations Thérapeutiques IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pathologie à traiter</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            >
              <option value="">Sélectionner une pathologie...</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Âge (années)</label>
              <Input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="ex: 65"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Poids (kg)</label>
              <Input
                type="number"
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)}
                placeholder="ex: 70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Créatinine (μmol/L)</label>
              <Input
                type="number"
                placeholder="ex: 90"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Protocol Display */}
      {selectedProtocol && (
        <Tabs defaultValue="first-line" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="first-line">1ère Intention</TabsTrigger>
            <TabsTrigger value="second-line">2ème Intention</TabsTrigger>
            <TabsTrigger value="monitoring">Surveillance</TabsTrigger>
            <TabsTrigger value="special">Populations Spéciales</TabsTrigger>
          </TabsList>

          {/* First Line Treatment */}
          <TabsContent value="first-line" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProtocol.firstLine.map((med, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold">{med.name}</h4>
                      <div className="flex gap-2">
                        <Badge className={`${getEvidenceColor(med.evidence)} text-white`}>
                          Niveau {med.evidence}
                        </Badge>
                        <Badge className={getCostColor(med.cost)}>
                          {med.cost === 'low' ? 'Économique' : 
                           med.cost === 'medium' ? 'Modéré' : 'Coûteux'}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <strong className="text-blue-800">Posologie:</strong>
                        <div className="mt-1">
                          {med.dosage} - {med.frequency}
                          <div className="text-xs text-blue-600 mt-1">
                            Voie: {med.route} {med.duration && `• Durée: ${med.duration}`}
                          </div>
                        </div>
                      </div>

                      {med.alternatives && (
                        <div>
                          <strong>Alternatives:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {med.alternatives.map((alt, idx) => (
                              <Badge key={idx} variant="outline">{alt}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <strong className="text-red-700">Effets indésirables:</strong>
                        <ul className="list-disc list-inside mt-1 text-red-600">
                          {med.sideEffects.slice(0, 3).map((effect, idx) => (
                            <li key={idx}>{effect}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong className="text-orange-700">Interactions:</strong>
                        <ul className="list-disc list-inside mt-1 text-orange-600">
                          {med.interactions.map((interaction, idx) => (
                            <li key={idx}>{interaction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contraindications */}
            <Alert className="border-l-4 border-l-red-500 bg-red-50">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <strong className="text-red-800">Contre-indications importantes:</strong>
                <ul className="list-disc list-inside mt-2 text-red-700">
                  {selectedProtocol.contraindications.map((ci, idx) => (
                    <li key={idx}>{ci}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Second Line Treatment */}
          <TabsContent value="second-line" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProtocol.secondLine.map((med, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold">{med.name}</h4>
                      <div className="flex gap-2">
                        <Badge className={`${getEvidenceColor(med.evidence)} text-white`}>
                          Niveau {med.evidence}
                        </Badge>
                        <Badge className={getCostColor(med.cost)}>
                          {med.cost === 'low' ? 'Économique' : 
                           med.cost === 'medium' ? 'Modéré' : 'Coûteux'}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <strong className="text-orange-800">Posologie:</strong>
                        <div className="mt-1">
                          {med.dosage} - {med.frequency}
                          <div className="text-xs text-orange-600 mt-1">
                            Voie: {med.route}
                          </div>
                        </div>
                      </div>

                      <div>
                        <strong className="text-red-700">Effets indésirables:</strong>
                        <ul className="list-disc list-inside mt-1 text-red-600">
                          {med.sideEffects.map((effect, idx) => (
                            <li key={idx}>{effect}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong className="text-orange-700">Interactions:</strong>
                        <ul className="list-disc list-inside mt-1 text-orange-600">
                          {med.interactions.map((interaction, idx) => (
                            <li key={idx}>{interaction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoring */}
          <TabsContent value="monitoring" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Paramètres de Surveillance
              </h3>
              
              {selectedProtocol.monitoring.map((param, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{param.parameter}</h4>
                      <Badge variant="outline">{param.frequency}</Badge>
                    </div>
                    
                    {param.targetRange && (
                      <div className="bg-green-50 p-2 rounded mb-2">
                        <strong className="text-green-800">Cible:</strong> {param.targetRange}
                      </div>
                    )}
                    
                    <div className="bg-blue-50 p-2 rounded">
                      <strong className="text-blue-800">Action:</strong> {param.action}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Suivi Clinique
                  </h4>
                  <div className="space-y-1">
                    <div><strong>Durée du traitement:</strong> {selectedProtocol.duration}</div>
                    <div><strong>Planning de suivi:</strong></div>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      {selectedProtocol.followUp.map((follow, idx) => (
                        <li key={idx}>{follow}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Special Populations */}
          <TabsContent value="special" className="space-y-4">
            <h3 className="text-lg font-semibold">Populations Spéciales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProtocol.specialPopulations.map((pop, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center mb-3">
                      {getPopulationIcon(pop.population)}
                      <span className="ml-2">{pop.population}</span>
                    </h4>
                    
                    <div className="space-y-2">
                      <div>
                        <strong className="text-blue-700">Adaptations:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                          {pop.adjustments.map((adj, idx) => (
                            <li key={idx}>{adj}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {pop.contraindications && (
                        <div>
                          <strong className="text-red-700">Contre-indications spécifiques:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-red-600">
                            {pop.contraindications.map((ci, idx) => (
                              <li key={idx}>{ci}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {!selectedCondition && (
        <Card>
          <CardContent className="p-12 text-center">
            <Pill className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Recommandations Thérapeutiques</h3>
            <p className="text-muted-foreground mb-4">
              Sélectionnez une pathologie pour obtenir les recommandations de traitement 
              basées sur les guidelines actuelles.
            </p>
            <Badge variant="outline" className="bg-blue-50">
              Protocoles Evidence-Based Medicine
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TreatmentRecommendations;
