
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Search, ExternalLink, Calendar, Star } from 'lucide-react';

interface Guideline {
  id: string;
  title: string;
  organization: string;
  category: string;
  lastUpdated: string;
  summary: string;
  keyRecommendations: string[];
  evidenceLevel: 'A' | 'B' | 'C';
  url?: string;
  tags: string[];
}

const ClinicalGuidelines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock guidelines database
  const guidelines: Guideline[] = [
    {
      id: '1',
      title: 'Prise en charge de l\'hypertension artérielle',
      organization: 'HAS (Haute Autorité de Santé)',
      category: 'Cardiovasculaire',
      lastUpdated: '2024-01-15',
      summary: 'Recommandations pour le diagnostic, le suivi et le traitement de l\'hypertension artérielle chez l\'adulte.',
      keyRecommendations: [
        'Mesure de la PA en consultation et MAPA/AMT systématiques',
        'Cible tensionnelle < 140/90 mmHg (générale)',
        'Cible < 130/80 mmHg si diabète ou maladie rénale',
        'IEC/ARA2 en première intention si < 80 ans',
        'Diurétique thiazidique ou ICa si > 80 ans'
      ],
      evidenceLevel: 'A',
      tags: ['hypertension', 'cardiovasculaire', 'diagnostic', 'traitement'],
      url: 'https://has-sante.fr'
    },
    {
      id: '2',
      title: 'Diagnostic et prise en charge du diabète de type 2',
      organization: 'SFD (Société Francophone du Diabète)',
      category: 'Endocrinologie',
      lastUpdated: '2023-12-10',
      summary: 'Guidelines pour le diagnostic précoce et la prise en charge optimale du diabète type 2.',
      keyRecommendations: [
        'HbA1c ≥ 6.5% ou glycémie ≥ 7 mmol/L pour le diagnostic',
        'Cible HbA1c < 7% (générale), personnalisée selon le profil',
        'Metformine en première intention sauf contre-indication',
        'Ajout SGLT2i ou GLP1-RA si maladie CV ou rénale',
        'Surveillance ophtalmologique annuelle'
      ],
      evidenceLevel: 'A',
      tags: ['diabète', 'endocrinologie', 'HbA1c', 'metformine'],
      url: 'https://sfdiabete.org'
    },
    {
      id: '3',
      title: 'Antibiothérapie des infections respiratoires basses',
      organization: 'SPILF (Société de Pathologie Infectieuse)',
      category: 'Infectiologie',
      lastUpdated: '2024-02-01',
      summary: 'Recommandations pour l\'antibiothérapie probabiliste et documentée des pneumonies.',
      keyRecommendations: [
        'Amoxicilline 1g x3/j en ambulatoire (pneumonie typique)',
        'Amoxicilline-clavulanate si BPCO ou comorbidités',
        'Azithromycine ou lévofloxacine si pneumonie atypique',
        'Durée : 5-7 jours (pneumonie non sévère)',
        'Réévaluation clinique à 48-72h systématique'
      ],
      evidenceLevel: 'B',
      tags: ['antibiotique', 'pneumonie', 'infection', 'respiratoire'],
      url: 'https://spilf.fr'
    },
    {
      id: '4',
      title: 'Dépistage et prise en charge des troubles anxio-dépressifs',
      organization: 'HAS',
      category: 'Psychiatrie',
      lastUpdated: '2023-11-20',
      summary: 'Approche diagnostique et thérapeutique des troubles de l\'humeur en médecine générale.',
      keyRecommendations: [
        'Utilisation des échelles PHQ-9 et GAD-7 pour le dépistage',
        'Psychothérapie en première intention (dépression légère-modérée)',
        'ISRS ou IRSN si indication médicamenteuse',
        'Réévaluation à 2-4 semaines après initiation traitement',
        'Orientation spécialisée si idées suicidaires ou résistance'
      ],
      evidenceLevel: 'B',
      tags: ['dépression', 'anxiété', 'psychiatrie', 'PHQ-9'],
      url: 'https://has-sante.fr'
    }
  ];

  const categories = ['all', ...Array.from(new Set(guidelines.map(g => g.category)))];

  const filteredGuidelines = guidelines.filter(guideline => {
    const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guideline.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (guidelineId: string) => {
    setFavorites(prev => 
      prev.includes(guidelineId) 
        ? prev.filter(id => id !== guidelineId)
        : [...prev, guidelineId]
    );
  };

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-yellow-500';
      case 'C': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Guidelines Cliniques
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher guidelines, pathologies, traitements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toutes catégories' : category}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines List */}
      <Tabs value="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes ({filteredGuidelines.length})</TabsTrigger>
          <TabsTrigger value="favorites">Favoris ({favorites.length})</TabsTrigger>
          <TabsTrigger value="recent">Récentes</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredGuidelines.map((guideline) => (
                <Card key={guideline.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{guideline.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(guideline.id)}
                            className="p-1"
                          >
                            <Star 
                              className={`w-4 h-4 ${
                                favorites.includes(guideline.id) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{guideline.organization}</Badge>
                          <Badge variant="secondary">{guideline.category}</Badge>
                          <Badge className={`${getEvidenceColor(guideline.evidenceLevel)} text-white`}>
                            Niveau {guideline.evidenceLevel}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(guideline.lastUpdated).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{guideline.summary}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Recommandations clés:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {guideline.keyRecommendations.slice(0, 3).map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                            {guideline.keyRecommendations.length > 3 && (
                              <li className="text-muted-foreground">
                                +{guideline.keyRecommendations.length - 3} autres recommandations...
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {guideline.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {guideline.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={guideline.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Consulter
                            </a>
                          </Button>
                        )}
                        <Button variant="secondary" size="sm">
                          Détails complets
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="text-center py-8 text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune guideline en favori pour le moment</p>
            <p className="text-sm">Cliquez sur ⭐ pour ajouter des guidelines à vos favoris</p>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Guidelines récemment consultées apparaîtront ici</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalGuidelines;
