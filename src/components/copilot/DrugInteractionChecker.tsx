
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'critical' | 'major' | 'moderate' | 'minor';
  description: string;
  mechanism: string;
  recommendations: string[];
  alternatives?: string[];
}

interface Drug {
  name: string;
  category: string;
  commonDosages: string[];
}

const DrugInteractionChecker = () => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);

  // Mock drug database
  const drugDatabase: Drug[] = [
    { name: 'Aspirine', category: 'Anti-inflammatoire', commonDosages: ['100mg', '500mg'] },
    { name: 'Warfarine', category: 'Anticoagulant', commonDosages: ['2.5mg', '5mg'] },
    { name: 'Métformine', category: 'Antidiabétique', commonDosages: ['500mg', '850mg'] },
    { name: 'Simvastatine', category: 'Statine', commonDosages: ['20mg', '40mg'] },
    { name: 'Lisinopril', category: 'IEC', commonDosages: ['5mg', '10mg', '20mg'] },
    { name: 'Amiodarone', category: 'Antiarythmique', commonDosages: ['200mg'] },
    { name: 'Digoxine', category: 'Digitalique', commonDosages: ['0.25mg'] }
  ];

  // Mock interactions database
  const interactionsDatabase: DrugInteraction[] = [
    {
      drug1: 'Warfarine',
      drug2: 'Aspirine',
      severity: 'critical',
      description: 'Risque hémorragique majeur',
      mechanism: 'Synergie des effets anticoagulants',
      recommendations: [
        'Surveillance INR rapprochée',
        'Réduire la dose de warfarine si nécessaire',
        'Éviter les AINS si possible'
      ],
      alternatives: ['Paracétamol pour la douleur']
    },
    {
      drug1: 'Simvastatine',
      drug2: 'Amiodarone',
      severity: 'major',
      description: 'Risque de rhabdomyolyse',
      mechanism: 'Inhibition CYP3A4 par amiodarone',
      recommendations: [
        'Limiter simvastatine à 20mg/jour',
        'Surveillance CPK régulière',
        'Arrêter si douleurs musculaires'
      ],
      alternatives: ['Pravastatine', 'Rosuvastatine']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'major': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      case 'minor': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'major': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <Info className="w-4 h-4" />;
      case 'minor': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const addDrug = (drugName: string) => {
    if (!selectedDrugs.includes(drugName)) {
      const newDrugs = [...selectedDrugs, drugName];
      setSelectedDrugs(newDrugs);
      checkInteractions(newDrugs);
    }
  };

  const removeDrug = (drugName: string) => {
    const newDrugs = selectedDrugs.filter(d => d !== drugName);
    setSelectedDrugs(newDrugs);
    checkInteractions(newDrugs);
  };

  const checkInteractions = (drugs: string[]) => {
    const foundInteractions: DrugInteraction[] = [];
    
    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const interaction = interactionsDatabase.find(
          int => (int.drug1 === drugs[i] && int.drug2 === drugs[j]) ||
                 (int.drug1 === drugs[j] && int.drug2 === drugs[i])
        );
        if (interaction) {
          foundInteractions.push(interaction);
        }
      }
    }
    
    setInteractions(foundInteractions);
  };

  const filteredDrugs = drugDatabase.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Drug Search and Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Vérificateur d'Interactions Médicamenteuses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un médicament..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {searchTerm && (
            <div className="max-h-40 overflow-y-auto border border-border rounded-lg p-2">
              {filteredDrugs.map((drug) => (
                <Button
                  key={drug.name}
                  variant="ghost"
                  className="w-full justify-start h-auto p-2"
                  onClick={() => addDrug(drug.name)}
                  disabled={selectedDrugs.includes(drug.name)}
                >
                  <div className="text-left">
                    <div className="font-medium">{drug.name}</div>
                    <div className="text-xs text-muted-foreground">{drug.category}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Selected Drugs */}
          {selectedDrugs.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Médicaments sélectionnés:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDrugs.map((drug) => (
                  <Badge key={drug} variant="secondary" className="flex items-center gap-1">
                    {drug}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-auto p-0 ml-1"
                      onClick={() => removeDrug(drug)}
                    >
                      <XCircle className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interaction Results */}
      {interactions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-600">
            ⚠️ {interactions.length} Interaction(s) Détectée(s)
          </h3>
          
          {interactions.map((interaction, index) => (
            <Alert key={index} className={`border-l-4 ${
              interaction.severity === 'critical' ? 'border-l-red-500 bg-red-50' :
              interaction.severity === 'major' ? 'border-l-orange-500 bg-orange-50' :
              interaction.severity === 'moderate' ? 'border-l-yellow-500 bg-yellow-50' :
              'border-l-green-500 bg-green-50'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getSeverityColor(interaction.severity)} text-white`}>
                  {getSeverityIcon(interaction.severity)}
                </div>
                
                <div className="flex-1">
                  <AlertDescription className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {interaction.drug1} × {interaction.drug2}
                      </h4>
                      <Badge className={`${getSeverityColor(interaction.severity)} text-white ml-2`}>
                        {interaction.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div>
                      <strong>Description:</strong> {interaction.description}
                    </div>
                    
                    <div>
                      <strong>Mécanisme:</strong> {interaction.mechanism}
                    </div>
                    
                    <div>
                      <strong>Recommandations:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {interaction.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {interaction.alternatives && (
                      <div>
                        <strong>Alternatives suggérées:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {interaction.alternatives.map((alt, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-50">
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      )}

      {selectedDrugs.length > 0 && interactions.length === 0 && (
        <Alert className="border-l-4 border-l-green-500 bg-green-50">
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>
            <strong>Aucune interaction majeure détectée</strong> entre les médicaments sélectionnés.
            Surveillance clinique de routine recommandée.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DrugInteractionChecker;
