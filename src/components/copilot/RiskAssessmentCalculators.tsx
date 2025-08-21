import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Zap,
  Target,
  Plus,
  Settings,
  BookOpen
} from 'lucide-react';

import CustomFormulaBuilder from './CustomFormulaBuilder';

interface RiskCalculator {
  id: string;
  name: string;
  category: string;
  description: string;
  parameters: Parameter[];
  interpretation: RiskInterpretation[];
  references: string[];
}

interface Parameter {
  id: string;
  label: string;
  type: 'number' | 'select' | 'boolean';
  unit?: string;
  options?: { value: string; label: string; points?: number }[];
  required: boolean;
}

interface RiskInterpretation {
  range: string;
  level: 'low' | 'moderate' | 'high' | 'very-high';
  description: string;
  recommendations: string[];
}

const RiskAssessmentCalculators = () => {
  const [activeTab, setActiveTab] = useState('calculators');
  const [selectedCalculator, setSelectedCalculator] = useState<string>('');
  const [calculatorValues, setCalculatorValues] = useState<{ [key: string]: any }>({});
  const [calculatedRisk, setCalculatedRisk] = useState<{
    score: number;
    percentage?: number;
    interpretation: RiskInterpretation | null;
  } | null>(null);
  const [customFormulas, setCustomFormulas] = useState<any[]>([]);

  // Risk calculators database
  const riskCalculators: RiskCalculator[] = [
    {
      id: 'wells-dvt',
      name: 'Score de Wells - TVP',
      category: 'Vasculaire',
      description: 'Évaluation de la probabilité de thrombose veineuse profonde',
      parameters: [
        {
          id: 'cancer',
          label: 'Cancer actif (traitement en cours ou dans les 6 derniers mois)',
          type: 'boolean',
          required: true
        },
        {
          id: 'paralysis',
          label: 'Paralysie, parésie ou immobilisation plâtrée récente',
          type: 'boolean',
          required: true
        },
        {
          id: 'bedrest',
          label: 'Alitement > 3 jours ou chirurgie majeure < 4 semaines',
          type: 'boolean',
          required: true
        },
        {
          id: 'tenderness',
          label: 'Douleur à la palpation le long du trajet veineux',
          type: 'boolean',
          required: true
        },
        {
          id: 'swelling',
          label: 'Œdème complet du mollet',
          type: 'boolean',
          required: true
        },
        {
          id: 'unilateral',
          label: 'Œdème unilatéral du mollet > 3cm',
          type: 'boolean',
          required: true
        },
        {
          id: 'previous',
          label: 'Antécédent de TVP documentée',
          type: 'boolean',
          required: true
        },
        {
          id: 'alternative',
          label: 'Diagnostic alternatif aussi probable que la TVP',
          type: 'boolean',
          required: true
        }
      ],
      interpretation: [
        {
          range: '≤ 0',
          level: 'low',
          description: 'Probabilité faible de TVP (3%)',
          recommendations: [
            'D-dimères suffisants si négatifs',
            'Pas d\'imagerie si D-dimères négatifs',
            'Echo-Doppler si D-dimères positifs'
          ]
        },
        {
          range: '1-2',
          level: 'moderate',
          description: 'Probabilité intermédiaire de TVP (17%)',
          recommendations: [
            'D-dimères recommandés',
            'Echo-Doppler si D-dimères positifs',
            'Surveillance clinique si négatifs'
          ]
        },
        {
          range: '≥ 3',
          level: 'high',
          description: 'Probabilité élevée de TVP (75%)',
          recommendations: [
            'Echo-Doppler en urgence',
            'Anticoagulation si Doppler positif',
            'Recherche EP associée'
          ]
        }
      ],
      references: ['Wells PS. et al. Lancet 1997', 'GEHT 2019']
    },
    {
      id: 'chads2-vasc',
      name: 'Score CHA₂DS₂-VASc',
      category: 'Cardiovasculaire',
      description: 'Évaluation du risque thromboembolique en fibrillation atriale',
      parameters: [
        {
          id: 'chf',
          label: 'Insuffisance cardiaque congestive',
          type: 'boolean',
          required: true
        },
        {
          id: 'hypertension',
          label: 'Hypertension artérielle',
          type: 'boolean',
          required: true
        },
        {
          id: 'age75',
          label: 'Âge ≥ 75 ans',
          type: 'boolean',
          required: true
        },
        {
          id: 'diabetes',
          label: 'Diabète mellitus',
          type: 'boolean',
          required: true
        },
        {
          id: 'stroke',
          label: 'AVC, AIT ou thromboembolie antérieur',
          type: 'boolean',
          required: true
        },
        {
          id: 'vascular',
          label: 'Maladie vasculaire (AOMI, IDM, plaque aortique)',
          type: 'boolean',
          required: true
        },
        {
          id: 'age65',
          label: 'Âge 65-74 ans',
          type: 'boolean',
          required: true
        },
        {
          id: 'female',
          label: 'Sexe féminin',
          type: 'boolean',
          required: true
        }
      ],
      interpretation: [
        {
          range: '0',
          level: 'low',
          description: 'Risque très faible (0% par an)',
          recommendations: [
            'Pas d\'anticoagulation',
            'Surveillance clinique',
            'Traitement symptomatique FA'
          ]
        },
        {
          range: '1',
          level: 'moderate',
          description: 'Risque faible (1.3% par an)',
          recommendations: [
            'Homme: anticoagulation non recommandée',
            'Femme: considérer anticoagulation',
            'Discussion bénéfice/risque'
          ]
        },
        {
          range: '≥ 2',
          level: 'high',
          description: 'Risque élevé (≥2.2% par an)',
          recommendations: [
            'Anticoagulation recommandée',
            'AVK ou AOD selon contexte',
            'Évaluer risque hémorragique (HAS-BLED)'
          ]
        }
      ],
      references: ['ESC 2020 Guidelines', 'Lip GY et al. Chest 2010']
    },
    {
      id: 'framingham',
      name: 'Score de Framingham',
      category: 'Cardiovasculaire',
      description: 'Estimation du risque cardiovasculaire à 10 ans',
      parameters: [
        {
          id: 'age',
          label: 'Âge',
          type: 'number',
          unit: 'années',
          required: true
        },
        {
          id: 'gender',
          label: 'Sexe',
          type: 'select',
          options: [
            { value: 'male', label: 'Masculin' },
            { value: 'female', label: 'Féminin' }
          ],
          required: true
        },
        {
          id: 'cholesterol',
          label: 'Cholestérol total',
          type: 'number',
          unit: 'mg/dL',
          required: true
        },
        {
          id: 'hdl',
          label: 'HDL cholestérol',
          type: 'number',
          unit: 'mg/dL',
          required: true
        },
        {
          id: 'sbp',
          label: 'Pression artérielle systolique',
          type: 'number',
          unit: 'mmHg',
          required: true
        },
        {
          id: 'smoking',
          label: 'Tabagisme actif',
          type: 'boolean',
          required: true
        },
        {
          id: 'diabetes',
          label: 'Diabète',
          type: 'boolean',
          required: true
        }
      ],
      interpretation: [
        {
          range: '< 10%',
          level: 'low',
          description: 'Risque faible à 10 ans',
          recommendations: [
            'Hygiène de vie',
            'Contrôle facteurs de risque',
            'Surveillance régulière'
          ]
        },
        {
          range: '10-20%',
          level: 'moderate',
          description: 'Risque modéré à 10 ans',
          recommendations: [
            'Optimisation thérapeutique',
            'Statine à discuter',
            'Surveillance rapprochée'
          ]
        },
        {
          range: '> 20%',
          level: 'high',
          description: 'Risque élevé à 10 ans',
          recommendations: [
            'Statine recommandée',
            'Contrôle strict PA et diabète',
            'Sevrage tabagique prioritaire'
          ]
        }
      ],
      references: ['Wilson PW et al. Circulation 1998', 'ATP IV Guidelines']
    },
    {
      id: 'has-bled',
      name: 'Score HAS-BLED',
      category: 'Hémorragique',
      description: 'Évaluation du risque hémorragique sous anticoagulants',
      parameters: [
        {
          id: 'hypertension',
          label: 'Hypertension (PA > 160 mmHg)',
          type: 'boolean',
          required: true
        },
        {
          id: 'renal',
          label: 'Insuffisance rénale (créat > 200 μmol/L)',
          type: 'boolean',
          required: true
        },
        {
          id: 'liver',
          label: 'Insuffisance hépatique',
          type: 'boolean',
          required: true
        },
        {
          id: 'stroke',
          label: 'Antécédent d\'AVC',
          type: 'boolean',
          required: true
        },
        {
          id: 'bleeding',
          label: 'Antécédent hémorragique ou prédisposition',
          type: 'boolean',
          required: true
        },
        {
          id: 'labile',
          label: 'INR labile (< 60% du temps en zone)',
          type: 'boolean',
          required: true
        },
        {
          id: 'elderly',
          label: 'Âge > 65 ans',
          type: 'boolean',
          required: true
        },
        {
          id: 'drugs',
          label: 'Médicaments favorisant saignement',
          type: 'boolean',
          required: true
        },
        {
          id: 'alcohol',
          label: 'Alcool (> 8 verres/semaine)',
          type: 'boolean',
          required: true
        }
      ],
      interpretation: [
        {
          range: '0-2',
          level: 'low',
          description: 'Risque hémorragique faible (1.02-1.88% par an)',
          recommendations: [
            'Anticoagulation bien tolérée',
            'Surveillance standard',
            'Continuer si indiquée'
          ]
        },
        {
          range: '≥ 3',
          level: 'high',
          description: 'Risque hémorragique élevé (≥3.74% par an)',
          recommendations: [
            'Surveillance rapprochée',
            'Correction facteurs de risque',
            'Évaluer bénéfice/risque régulièrement'
          ]
        }
      ],
      references: ['Pisters R et al. Chest 2010', 'ESC 2020']
    }
  ];

  const calculateWellsDVT = (values: any) => {
    let score = 0;
    if (values.cancer) score += 1;
    if (values.paralysis) score += 1;
    if (values.bedrest) score += 1;
    if (values.tenderness) score += 1;
    if (values.swelling) score += 1;
    if (values.unilateral) score += 1;
    if (values.previous) score += 1;
    if (values.alternative) score -= 2;
    
    return { score, percentage: undefined };
  };

  const calculateCHADS2VASc = (values: any) => {
    let score = 0;
    if (values.chf) score += 1;
    if (values.hypertension) score += 1;
    if (values.age75) score += 2;
    if (values.diabetes) score += 1;
    if (values.stroke) score += 2;
    if (values.vascular) score += 1;
    if (values.age65) score += 1;
    if (values.female) score += 1;
    
    return { score, percentage: undefined };
  };

  const calculateFramingham = (values: any) => {
    // Simplified Framingham calculation (in reality, uses complex coefficients)
    let score = 0;
    const age = parseInt(values.age) || 0;
    const cholesterol = parseInt(values.cholesterol) || 0;
    const hdl = parseInt(values.hdl) || 0;
    const sbp = parseInt(values.sbp) || 0;
    
    // Age points (simplified)
    if (values.gender === 'male') {
      if (age >= 30 && age <= 34) score += -9;
      if (age >= 35 && age <= 39) score += -4;
      if (age >= 40 && age <= 44) score += 0;
      if (age >= 45 && age <= 49) score += 3;
      if (age >= 50 && age <= 54) score += 6;
      if (age >= 55 && age <= 59) score += 8;
      if (age >= 60 && age <= 64) score += 10;
      if (age >= 65 && age <= 69) score += 11;
      if (age >= 70 && age <= 74) score += 12;
      if (age >= 75) score += 13;
    }
    
    // Cholesterol points (simplified)
    if (cholesterol >= 160 && cholesterol <= 199) score += 4;
    if (cholesterol >= 200 && cholesterol <= 239) score += 7;
    if (cholesterol >= 240 && cholesterol <= 279) score += 9;
    if (cholesterol >= 280) score += 11;
    
    // HDL points
    if (hdl >= 60) score -= 1;
    if (hdl >= 50 && hdl <= 59) score += 0;
    if (hdl >= 40 && hdl <= 49) score += 1;
    if (hdl < 40) score += 2;
    
    // BP points (simplified)
    if (sbp >= 120 && sbp <= 129) score += 0;
    if (sbp >= 130 && sbp <= 139) score += 1;
    if (sbp >= 140 && sbp <= 159) score += 1;
    if (sbp >= 160) score += 2;
    
    // Smoking
    if (values.smoking) score += 5;
    
    // Diabetes
    if (values.diabetes) score += 5;
    
    // Convert score to percentage (simplified)
    let percentage = 0;
    if (score < 0) percentage = 1;
    else if (score <= 4) percentage = 3;
    else if (score <= 6) percentage = 6;
    else if (score <= 8) percentage = 10;
    else if (score <= 10) percentage = 15;
    else if (score <= 12) percentage = 20;
    else if (score <= 14) percentage = 30;
    else percentage = 40;
    
    return { score, percentage };
  };

  const calculateHASBLED = (values: any) => {
    let score = 0;
    if (values.hypertension) score += 1;
    if (values.renal) score += 1;
    if (values.liver) score += 1;
    if (values.stroke) score += 1;
    if (values.bleeding) score += 1;
    if (values.labile) score += 1;
    if (values.elderly) score += 1;
    if (values.drugs) score += 1;
    if (values.alcohol) score += 1;
    
    return { score, percentage: undefined };
  };

  const handleCalculate = () => {
    if (!selectedCalculator) return;
    
    let result = { score: 0, percentage: undefined };
    
    switch (selectedCalculator) {
      case 'wells-dvt':
        result = calculateWellsDVT(calculatorValues);
        break;
      case 'chads2-vasc':
        result = calculateCHADS2VASc(calculatorValues);
        break;
      case 'framingham':
        result = calculateFramingham(calculatorValues);
        break;
      case 'has-bled':
        result = calculateHASBLED(calculatorValues);
        break;
    }
    
    const calculator = riskCalculators.find(c => c.id === selectedCalculator);
    const interpretation = calculator?.interpretation.find(interp => {
      const score = result.score;
      const range = interp.range;
      
      if (range.includes('≤')) {
        const threshold = parseInt(range.split('≤')[1].trim());
        return score <= threshold;
      } else if (range.includes('≥')) {
        const threshold = parseInt(range.split('≥')[1].trim());
        return score >= threshold;
      } else if (range.includes('-')) {
        const [min, max] = range.split('-').map(n => parseInt(n.trim()));
        return score >= min && score <= max;
      } else if (range.includes('<')) {
        if (range.includes('%')) {
          const threshold = parseInt(range.split('<')[1].replace('%', '').trim());
          return (result.percentage || 0) < threshold;
        }
      } else if (range.includes('>')) {
        if (range.includes('%')) {
          const threshold = parseInt(range.split('>')[1].replace('%', '').trim());
          return (result.percentage || 0) > threshold;
        }
      } else {
        return range === score.toString();
      }
      
      return false;
    });
    
    setCalculatedRisk({
      ...result,
      interpretation: interpretation || null
    });
  };

  const handleSaveCustomFormula = (formula: any) => {
    setCustomFormulas(prev => {
      const existing = prev.findIndex(f => f.id === formula.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = formula;
        return updated;
      }
      return [...prev, formula];
    });
    setActiveTab('calculators');
  };

  const selectedCalc = riskCalculators.find(c => c.id === selectedCalculator);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'very-high': return 'text-red-800 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle2 className="w-5 h-5" />;
      case 'moderate': return <Target className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'very-high': return <Zap className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-blue-50 border border-blue-200">
          <TabsTrigger value="calculators" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculateurs
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Créer Formule
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Mes Formules ({customFormulas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculators" className="space-y-6">
          {/* Standard Calculators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculateurs Validés
                </span>
                <Badge className="bg-green-100 text-green-700">
                  Standards Internationaux
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskCalculators.map((calc) => (
                  <Card 
                    key={calc.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCalculator === calc.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => {
                      setSelectedCalculator(calc.id);
                      setCalculatorValues({});
                      setCalculatedRisk(null);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{calc.name}</h4>
                        <Badge variant="outline">{calc.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{calc.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Formulas */}
          {customFormulas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Formules Personnalisées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customFormulas.map((calc) => (
                    <Card 
                      key={calc.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCalculator === calc.id ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={() => {
                        setSelectedCalculator(calc.id);
                        setCalculatorValues({});
                        setCalculatedRisk(null);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{calc.name}</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {calc.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{calc.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Personnalisé
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {calc.parameters.length} paramètres
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Calculator Interface */}
          {selectedCalc && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedCalc.name}</span>
                  <Badge className="bg-blue-500 text-white">{selectedCalc.category}</Badge>
                </CardTitle>
                <p className="text-muted-foreground">{selectedCalc.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parameters Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCalc.parameters.map((param) => (
                    <div key={param.id} className="space-y-2">
                      <label className="block text-sm font-medium">
                        {param.label}
                        {param.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {param.type === 'number' && (
                        <div className="flex">
                          <Input
                            type="number"
                            value={calculatorValues[param.id] || ''}
                            onChange={(e) => setCalculatorValues({
                              ...calculatorValues,
                              [param.id]: e.target.value
                            })}
                            className="flex-1"
                            placeholder={`Entrer ${param.label.toLowerCase()}`}
                          />
                          {param.unit && (
                            <span className="flex items-center px-3 bg-muted border border-l-0 rounded-r-md text-sm">
                              {param.unit}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {param.type === 'select' && param.options && (
                        <select
                          value={calculatorValues[param.id] || ''}
                          onChange={(e) => setCalculatorValues({
                            ...calculatorValues,
                            [param.id]: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-border rounded-md"
                        >
                          <option value="">Sélectionner...</option>
                          {param.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                      
                      {param.type === 'boolean' && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={calculatorValues[param.id] || false}
                            onChange={(e) => setCalculatorValues({
                              ...calculatorValues,
                              [param.id]: e.target.checked
                            })}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm">Oui</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button onClick={handleCalculate} className="w-full" size="lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculer le Risque
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Results Display */}
          {calculatedRisk && calculatedRisk.interpretation && (
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Résultat de l'Évaluation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {selectedCalc?.id === 'framingham' && calculatedRisk.percentage
                      ? `${calculatedRisk.percentage}%`
                      : calculatedRisk.score
                    }
                  </div>
                  <div className="text-muted-foreground">
                    {selectedCalc?.id === 'framingham' 
                      ? 'Risque cardiovasculaire à 10 ans'
                      : `Score: ${calculatedRisk.score} points`
                    }
                  </div>
                  
                  {calculatedRisk.percentage && selectedCalc?.id === 'framingham' && (
                    <div className="mt-4">
                      <Progress value={Math.min(calculatedRisk.percentage, 50)} className="h-3" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Risque: {calculatedRisk.percentage}% (maximum affiché: 50%)
                      </div>
                    </div>
                  )}
                </div>

                {/* Risk Level */}
                <Alert className={`${getRiskColor(calculatedRisk.interpretation.level)} border-2`}>
                  <div className="flex items-center">
                    {getRiskIcon(calculatedRisk.interpretation.level)}
                    <AlertDescription className="ml-2">
                      <div className="font-semibold text-lg mb-2">
                        {calculatedRisk.interpretation.range} - 
                        <span className="ml-2 capitalize">
                          Risque {calculatedRisk.interpretation.level === 'low' ? 'Faible' :
                                 calculatedRisk.interpretation.level === 'moderate' ? 'Modéré' :
                                 calculatedRisk.interpretation.level === 'high' ? 'Élevé' : 'Très Élevé'}
                        </span>
                      </div>
                      <p className="mb-4">{calculatedRisk.interpretation.description}</p>
                      
                      <div>
                        <strong>Recommandations:</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          {calculatedRisk.interpretation.recommendations.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </AlertDescription>
                  </div>
                </Alert>

                {/* References */}
                {selectedCalc && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Références:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedCalc.references.map((ref, idx) => (
                        <li key={idx}>• {ref}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!selectedCalculator && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calculator className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Calculateurs de Risque Clinique</h3>
                <p className="text-muted-foreground mb-4">
                  Sélectionnez un calculateur pour évaluer le risque spécifique de votre patient
                  selon les scores validés internationalement.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline"><Heart className="w-3 h-3 mr-1" />Cardiovasculaire</Badge>
                  <Badge variant="outline"><Activity className="w-3 h-3 mr-1" />Vasculaire</Badge>
                  <Badge variant="outline"><AlertTriangle className="w-3 h-3 mr-1" />Hémorragique</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="custom">
          <CustomFormulaBuilder onSaveFormula={handleSaveCustomFormula} />
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Gestion des Formules Personnalisées
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customFormulas.length === 0 ? (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Aucune formule personnalisée
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Créez votre première formule de calcul personnalisée
                  </p>
                  <Button 
                    onClick={() => setActiveTab('custom')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer une Formule
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customFormulas.map((formula) => (
                    <Card key={formula.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{formula.name}</h4>
                              <Badge className="bg-blue-100 text-blue-700">
                                {formula.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{formula.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                {formula.parameters.length} paramètres
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {formula.interpretations.length} niveaux de risque
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {formula.references.length} références
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Edit functionality would go here
                                console.log('Edit formula:', formula.id);
                              }}
                            >
                              Modifier
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                setCustomFormulas(prev => prev.filter(f => f.id !== formula.id));
                              }}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessmentCalculators;
