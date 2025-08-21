
import { useState } from 'react';
import { Search, Filter, Download, ExternalLink, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Guideline {
  id: string;
  title: string;
  organization: string;
  category: string;
  lastUpdated: string;
  summary: string;
  evidenceLevel: 'A' | 'B' | 'C';
  favorite: boolean;
}

const mockGuidelines: Guideline[] = [
  {
    id: '1',
    title: 'Prise en charge de l\'hypertension artérielle',
    organization: 'ESC/ESH 2023',
    category: 'Cardiologie',
    lastUpdated: '2023-08-15',
    summary: 'Recommandations européennes pour le diagnostic et le traitement de l\'hypertension artérielle.',
    evidenceLevel: 'A',
    favorite: true
  },
  {
    id: '2',
    title: 'Diagnostic et traitement du diabète de type 2',
    organization: 'ADA/EASD 2023',
    category: 'Endocrinologie',
    lastUpdated: '2023-10-01',
    summary: 'Consensus international sur la prise en charge du diabète de type 2.',
    evidenceLevel: 'A',
    favorite: false
  },
  {
    id: '3',
    title: 'Anticoagulation dans la fibrillation auriculaire',
    organization: 'HAS 2023',
    category: 'Cardiologie',
    lastUpdated: '2023-06-20',
    summary: 'Recommandations françaises sur l\'anticoagulation dans la FA non valvulaire.',
    evidenceLevel: 'A',
    favorite: true
  },
  {
    id: '4',
    title: 'Prévention des infections nosocomiales',
    organization: 'SF2H 2023',
    category: 'Infectiologie',
    lastUpdated: '2023-09-10',
    summary: 'Guide de prévention des infections associées aux soins.',
    evidenceLevel: 'B',
    favorite: false
  }
];

interface GuidelinesEvidenceProps {
  searchQuery: string;
}

const GuidelinesEvidence = ({ searchQuery }: GuidelinesEvidenceProps) => {
  const [guidelines, setGuidelines] = useState<Guideline[]>(mockGuidelines);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredGuidelines = guidelines.filter(guideline => {
    const matchesSearch = guideline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guideline.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guideline.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || guideline.evidenceLevel === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const toggleFavorite = (guidelineId: string) => {
    setGuidelines(prev => prev.map(guideline =>
      guideline.id === guidelineId ? { ...guideline, favorite: !guideline.favorite } : guideline
    ));
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-yellow-100 text-yellow-800';
      case 'C':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = Array.from(new Set(mockGuidelines.map(g => g.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Recommandations & Preuves</h3>
        <div className="flex items-center space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous niveaux</SelectItem>
              <SelectItem value="A">Niveau A</SelectItem>
              <SelectItem value="B">Niveau B</SelectItem>
              <SelectItem value="C">Niveau C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredGuidelines.map((guideline) => (
          <Card key={guideline.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{guideline.category}</Badge>
                    <Badge className={getEvidenceLevelColor(guideline.evidenceLevel)}>
                      Niveau {guideline.evidenceLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-base leading-normal">{guideline.title}</CardTitle>
                  <CardDescription className="mt-2">{guideline.summary}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleFavorite(guideline.id)}
                >
                  <Star className={`w-4 h-4 ${guideline.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-muted">
                  <div>{guideline.organization}</div>
                  <div>Mis à jour: {new Date(guideline.lastUpdated).toLocaleDateString('fr-FR')}</div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GuidelinesEvidence;
