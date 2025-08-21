import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Trash2, 
  Save, 
  Calculator,
  AlertCircle,
  CheckCircle2,
  Code,
  Settings,
  Edit3
} from 'lucide-react';

interface FormulaParameter {
  id: string;
  name: string;
  label: string;
  type: 'number' | 'boolean' | 'select';
  required: boolean;
  unit?: string;
  options?: { value: string; label: string; points?: number }[];
  min?: number;
  max?: number;
}

interface CustomFormula {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: FormulaParameter[];
  formula: string;
  interpretations: {
    range: string;
    level: 'low' | 'moderate' | 'high' | 'very-high';
    description: string;
    recommendations: string[];
  }[];
  references: string[];
}

interface CustomFormulaBuilderProps {
  onSaveFormula: (formula: CustomFormula) => void;
  existingFormula?: CustomFormula;
}

const CustomFormulaBuilder = ({ onSaveFormula, existingFormula }: CustomFormulaBuilderProps) => {
  const [formula, setFormula] = useState<CustomFormula>(existingFormula || {
    id: '',
    name: '',
    description: '',
    category: '',
    parameters: [],
    formula: '',
    interpretations: [],
    references: []
  });

  const [newParameter, setNewParameter] = useState<Partial<FormulaParameter>>({
    name: '',
    label: '',
    type: 'number',
    required: true
  });

  const [newInterpretation, setNewInterpretation] = useState({
    range: '',
    level: 'low' as const,
    description: '',
    recommendations: ['']
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const addParameter = () => {
    if (!newParameter.name || !newParameter.label) {
      setValidationErrors(['Le nom et le libellé du paramètre sont obligatoires']);
      return;
    }

    const parameter: FormulaParameter = {
      id: Date.now().toString(),
      name: newParameter.name!,
      label: newParameter.label!,
      type: newParameter.type!,
      required: newParameter.required!,
      unit: newParameter.unit,
      options: newParameter.options,
      min: newParameter.min,
      max: newParameter.max
    };

    setFormula(prev => ({
      ...prev,
      parameters: [...prev.parameters, parameter]
    }));

    setNewParameter({
      name: '',
      label: '',
      type: 'number',
      required: true
    });
    setValidationErrors([]);
  };

  const removeParameter = (id: string) => {
    setFormula(prev => ({
      ...prev,
      parameters: prev.parameters.filter(p => p.id !== id)
    }));
  };

  const addInterpretation = () => {
    if (!newInterpretation.range || !newInterpretation.description) {
      setValidationErrors(['La plage et la description de l\'interprétation sont obligatoires']);
      return;
    }

    setFormula(prev => ({
      ...prev,
      interpretations: [...prev.interpretations, {
        ...newInterpretation,
        recommendations: newInterpretation.recommendations.filter(r => r.trim())
      }]
    }));

    setNewInterpretation({
      range: '',
      level: 'low',
      description: '',
      recommendations: ['']
    });
    setValidationErrors([]);
  };

  const removeInterpretation = (index: number) => {
    setFormula(prev => ({
      ...prev,
      interpretations: prev.interpretations.filter((_, i) => i !== index)
    }));
  };

  const validateFormula = () => {
    const errors: string[] = [];
    
    if (!formula.name.trim()) errors.push('Le nom de la formule est obligatoire');
    if (!formula.description.trim()) errors.push('La description est obligatoire');
    if (!formula.category.trim()) errors.push('La catégorie est obligatoire');
    if (formula.parameters.length === 0) errors.push('Au moins un paramètre est requis');
    if (!formula.formula.trim()) errors.push('La formule de calcul est obligatoire');
    if (formula.interpretations.length === 0) errors.push('Au moins une interprétation est requise');

    return errors;
  };

  const saveFormula = () => {
    const errors = validateFormula();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    const savedFormula: CustomFormula = {
      ...formula,
      id: formula.id || `custom-${Date.now()}`
    };

    onSaveFormula(savedFormula);
    setValidationErrors([]);
  };

  const updateRecommendation = (index: number, value: string) => {
    const newRecommendations = [...newInterpretation.recommendations];
    newRecommendations[index] = value;
    setNewInterpretation(prev => ({ ...prev, recommendations: newRecommendations }));
  };

  const addRecommendation = () => {
    setNewInterpretation(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, '']
    }));
  };

  const removeRecommendation = (index: number) => {
    setNewInterpretation(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            {existingFormula ? 'Modifier la Formule' : 'Créer une Nouvelle Formule'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom de la formule *</label>
              <Input
                value={formula.name}
                onChange={(e) => setFormula(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Score de risque personnalisé"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie *</label>
              <Input
                value={formula.category}
                onChange={(e) => setFormula(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Ex: Cardiovasculaire, Neurologique..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={formula.description}
              onChange={(e) => setFormula(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description détaillée de l'usage de cette formule"
              rows={3}
            />
          </div>

          {/* Parameters Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Paramètres ({formula.parameters.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Parameters */}
              {formula.parameters.map((param) => (
                <div key={param.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{param.type}</Badge>
                      <span className="font-medium">{param.label}</span>
                      {param.required && <span className="text-red-500 text-sm">*</span>}
                    </div>
                    <p className="text-sm text-gray-600">Variable: {param.name}</p>
                    {param.unit && <p className="text-xs text-gray-500">Unité: {param.unit}</p>}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeParameter(param.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {/* Add New Parameter */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Ajouter un paramètre</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                  <Input
                    placeholder="Nom variable (ex: age)"
                    value={newParameter.name}
                    onChange={(e) => setNewParameter(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Libellé affiché"
                    value={newParameter.label}
                    onChange={(e) => setNewParameter(prev => ({ ...prev, label: e.target.value }))}
                  />
                  <select
                    value={newParameter.type}
                    onChange={(e) => setNewParameter(prev => ({ ...prev, type: e.target.value as any }))}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="number">Nombre</option>
                    <option value="boolean">Oui/Non</option>
                    <option value="select">Sélection</option>
                  </select>
                  <Input
                    placeholder="Unité (optionnel)"
                    value={newParameter.unit || ''}
                    onChange={(e) => setNewParameter(prev => ({ ...prev, unit: e.target.value }))}
                  />
                </div>
                <Button onClick={addParameter} size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter Paramètre
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Formula Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="w-4 h-4" />
                Formule de Calcul
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formula.formula}
                onChange={(e) => setFormula(prev => ({ ...prev, formula: e.target.value }))}
                placeholder="Ex: (age * 0.1) + (systolic_bp * 0.05) + (diabetes ? 10 : 0)"
                rows={4}
                className="font-mono text-sm"
              />
              <div className="mt-2 text-xs text-gray-600">
                <p>Utilisez les noms de variables définis dans les paramètres.</p>
                <p>Opérateurs supportés: +, -, *, /, (), condition ? valeur1 : valeur2</p>
              </div>
            </CardContent>
          </Card>

          {/* Interpretations Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Interprétations ({formula.interpretations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Interpretations */}
              {formula.interpretations.map((interp, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          interp.level === 'low' ? 'bg-green-100 text-green-700' :
                          interp.level === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                          interp.level === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }
                      >
                        {interp.range}
                      </Badge>
                      <span className="font-medium capitalize">{interp.level}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeInterpretation(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{interp.description}</p>
                  <div className="text-xs text-gray-600">
                    <strong>Recommandations:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {interp.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Add New Interpretation */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Ajouter une interprétation</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <Input
                    placeholder="Plage (ex: 0-5, >10)"
                    value={newInterpretation.range}
                    onChange={(e) => setNewInterpretation(prev => ({ ...prev, range: e.target.value }))}
                  />
                  <select
                    value={newInterpretation.level}
                    onChange={(e) => setNewInterpretation(prev => ({ ...prev, level: e.target.value as any }))}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="low">Risque Faible</option>
                    <option value="moderate">Risque Modéré</option>
                    <option value="high">Risque Élevé</option>
                    <option value="very-high">Risque Très Élevé</option>
                  </select>
                  <Input
                    placeholder="Description du niveau"
                    value={newInterpretation.description}
                    onChange={(e) => setNewInterpretation(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-2">Recommandations</label>
                  {newInterpretation.recommendations.map((rec, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder={`Recommandation ${index + 1}`}
                        value={rec}
                        onChange={(e) => updateRecommendation(index, e.target.value)}
                        className="flex-1"
                      />
                      {newInterpretation.recommendations.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeRecommendation(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addRecommendation}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter Recommandation
                  </Button>
                </div>

                <Button onClick={addInterpretation} size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter Interprétation
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription>
                <div className="text-red-700">
                  <strong>Erreurs de validation :</strong>
                  <ul className="list-disc list-inside mt-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Save Button */}
          <Button onClick={saveFormula} className="w-full bg-green-500 hover:bg-green-600" size="lg">
            <Save className="w-4 h-4 mr-2" />
            {existingFormula ? 'Mettre à Jour' : 'Sauvegarder'} la Formule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomFormulaBuilder;
