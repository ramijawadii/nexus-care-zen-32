
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Star, 
  Calendar, 
  Users, 
  BarChart3,
  FileText,
  TrendingUp,
  Award,
  Globe,
  Database
} from 'lucide-react';

interface MedicalStudy {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  studyType: 'rct' | 'meta-analysis' | 'systematic-review' | 'cohort' | 'case-control' | 'cross-sectional';
  participants: number;
  followUp?: string;
  primaryOutcome: string;
  keyFindings: string[];
  limitations: string[];
  clinicalRelevance: string;
  evidenceLevel: 'IA' | 'IB' | 'IIA' | 'IIB' | 'III';
  doi?: string;
  abstract: string;
  tags: string[];
}

interface ClinicalTrial {
  id: string;
  title: string;
  status: 'recruiting' | 'active' | 'completed' | 'terminated';
  phase: 'I' | 'II' | 'III' | 'IV';
  condition: string;
  intervention: string;
  primaryEndpoint: string;
  estimatedCompletion: string;
  sponsor: string;
  location: string;
  eligibility: string[];
}

interface Guideline {
  id: string;
  organization: string;
  title: string;
  year: number;
  keyRecommendations: string[];
  evidenceSummary: string;
  lastUpdate: string;
}

const EvidenceBasedMedicine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Mock medical literature database
  const medicalStudies: MedicalStudy[] = [
    {
      id: '1',
      title: 'Efficacité de la metformine dans la prévention du diabète de type 2: étude randomisée contrôlée sur 3234 patients',
      authors: ['Knowler WC', 'Barrett-Connor E', 'Fowler SE', 'Hamman RF'],
      journal: 'New England Journal of Medicine',
      year: 2024,
      studyType: 'rct',
      participants: 3234,
      followUp: '2.8 ans (moyenne)',
      primaryOutcome: 'Incidence du diabète de type 2',
      keyFindings: [
        'Réduction de 58% du risque de diabète avec la metformine vs placebo',
        'Efficacité maintenue sur toute la durée du suivi',
        'Effets bénéfiques plus marqués chez les patients jeunes (<60 ans)',
        'Amélioration des paramètres métaboliques (HbA1c, insulino-résistance)'
      ],
      limitations: [
        'Population principalement caucasienne',
        'Durée de suivi relativement courte',
        'Effets gastro-intestinaux limitant l\'observance'
      ],
      clinicalRelevance: 'Confirme l\'efficacité de la metformine en prévention primaire du diabète chez les sujets à haut risque',
      evidenceLevel: 'IA',
      doi: '10.1056/NEJMoa240012',
      abstract: 'Cette étude randomisée contrôlée évalue l\'efficacité de la metformine (850mg 2x/j) versus placebo dans la prévention du diabète de type 2 chez 3234 sujets prédiabétiques...',
      tags: ['metformine', 'diabète', 'prévention', 'RCT']
    },
    {
      id: '2',
      title: 'Meta-analyse: Anticoagulants oraux directs vs warfarine en fibrillation atriale - Analyse de 71,683 patients',
      authors: ['Ruff CT', 'Giugliano RP', 'Braunwald E', 'Hoffman EB'],
      journal: 'Lancet',
      year: 2024,
      studyType: 'meta-analysis',
      participants: 71683,
      primaryOutcome: 'AVC et embolie systémique',
      keyFindings: [
        'Réduction de 19% du risque d\'AVC avec AOD vs warfarine (RR 0.81, IC95% 0.73-0.91)',
        'Diminution de 52% des hémorragies intracrâniennes (RR 0.48, IC95% 0.39-0.59)',
        'Mortalité toutes causes réduite de 10% (RR 0.90, IC95% 0.85-0.95)',
        'Profil de sécurité favorable chez les patients âgés'
      ],
      limitations: [
        'Hétérogénéité entre les études',
        'Données limitées sur certaines populations spécifiques',
        'Coût plus élevé des AOD'
      ],
      clinicalRelevance: 'Renforce les recommandations actuelles privilégiant les AOD en première intention en FA',
      evidenceLevel: 'IA',
      doi: '10.1016/S0140-6736(24)00123-4',
      abstract: 'Cette meta-analyse inclut 12 essais randomisés comparant les AOD (dabigatran, rivaroxaban, apixaban, edoxaban) à la warfarine chez les patients en FA...',
      tags: ['anticoagulants', 'fibrillation', 'AVC', 'meta-analyse']
    },
    {
      id: '3',
      title: 'Impact des inhibiteurs SGLT2 sur les événements cardiovasculaires: revue systématique de 47 études',
      authors: ['McMurray JJV', 'Solomon SD', 'Inzucchi SE'],
      journal: 'European Heart Journal',
      year: 2023,
      studyType: 'systematic-review',
      participants: 89547,
      primaryOutcome: 'Événements cardiovasculaires majeurs',
      keyFindings: [
        'Réduction de 23% des hospitalisations pour insuffisance cardiaque',
        'Diminution de 17% de la mortalité cardiovasculaire',
        'Bénéfices indépendants du contrôle glycémique',
        'Efficacité démontrée chez les non-diabétiques'
      ],
      limitations: [
        'Durée de suivi variable entre études',
        'Critères d\'inclusion hétérogènes',
        'Coût-efficacité à évaluer'
      ],
      clinicalRelevance: 'Étend les indications des SGLT2i au-delà du diabète, vers la cardiologie préventive',
      evidenceLevel: 'IA',
      abstract: 'Revue systématique analysant l\'impact cardiovasculaire des inhibiteurs SGLT2 dans 47 études randomisées...',
      tags: ['SGLT2', 'cardiovasculaire', 'insuffisance cardiaque']
    }
  ];

  // Mock clinical trials
  const clinicalTrials: ClinicalTrial[] = [
    {
      id: 'ct1',
      title: 'Efficacité du GLP-1 dans la maladie d\'Alzheimer précoce',
      status: 'recruiting',
      phase: 'III',
      condition: 'Maladie d\'Alzheimer stade précoce',
      intervention: 'Sémaglutide 1mg/semaine vs placebo',
      primaryEndpoint: 'Évolution des scores cognitifs à 18 mois',
      estimatedCompletion: 'Décembre 2025',
      sponsor: 'CHU Salpêtrière, Paris',
      location: 'France (multicentrique)',
      eligibility: [
        'Age 55-80 ans',
        'Diagnostic confirmé d\'Alzheimer précoce',
        'MMSE 18-26',
        'Consentement éclairé'
      ]
    },
    {
      id: 'ct2',
      title: 'Thérapie génique dans la cardiomyopathie dilatée',
      status: 'active',
      phase: 'II',
      condition: 'Cardiomyopathie dilatée idiopathique',
      intervention: 'Injection intramyocardique de vecteur AAV',
      primaryEndpoint: 'Amélioration de la FEVG à 6 mois',
      estimatedCompletion: 'Juin 2025',
      sponsor: 'Institut du Cœur, Lyon',
      location: 'Lyon, Marseille, Bordeaux',
      eligibility: [
        'FEVG < 35%',
        'Traitement optimal maximal',
        'Absence de contre-indication IRM',
        'Espérance de vie > 1 an'
      ]
    }
  ];

  // Mock guidelines
  const guidelines: Guideline[] = [
    {
      id: 'g1',
      organization: 'ESC/EAS 2024',
      title: 'Prise en charge des dyslipidémies',
      year: 2024,
      keyRecommendations: [
        'Cible LDL < 1.4 mmol/L (haut risque CV)',
        'Statine haute intensité en première intention',
        'Ézétimibe si cible non atteinte',
        'Anti-PCSK9 si persistance > 1.8 mmol/L'
      ],
      evidenceSummary: 'Nouvelles cibles plus strictes basées sur 23 études de morbi-mortalité',
      lastUpdate: '2024-01-15'
    }
  ];

  const getStudyTypeLabel = (type: string) => {
    const types = {
      'rct': 'Essai Randomisé Contrôlé',
      'meta-analysis': 'Meta-analyse',
      'systematic-review': 'Revue Systématique',
      'cohort': 'Étude de Cohorte',
      'case-control': 'Cas-Témoins',
      'cross-sectional': 'Transversale'
    };
    return types[type as keyof typeof types] || type;
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'IA': return 'bg-green-500 text-white';
      case 'IB': return 'bg-green-400 text-white';
      case 'IIA': return 'bg-yellow-500 text-white';
      case 'IIB': return 'bg-yellow-400 text-black';
      case 'III': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting': return 'bg-blue-500 text-white';
      case 'active': return 'bg-green-500 text-white';
      case 'completed': return 'bg-gray-500 text-white';
      case 'terminated': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bid => bid !== id) : [...prev, id]
    );
  };

  const filteredStudies = medicalStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         study.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Médecine Basée sur les Preuves
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher publications, auteurs, pathologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              PubMed
            </Button>
            <Button variant="outline">
              <Award className="w-4 h-4 mr-2" />
              Cochrane
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="literature" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="literature">
            <FileText className="w-4 h-4 mr-2" />
            Littérature
          </TabsTrigger>
          <TabsTrigger value="trials">
            <BarChart3 className="w-4 h-4 mr-2" />
            Essais Cliniques
          </TabsTrigger>
          <TabsTrigger value="guidelines">
            <BookOpen className="w-4 h-4 mr-2" />
            Guidelines
          </TabsTrigger>
          <TabsTrigger value="bookmarks">
            <Star className="w-4 h-4 mr-2" />
            Favoris
          </TabsTrigger>
        </TabsList>

        {/* Literature Tab */}
        <TabsContent value="literature">
          <ScrollArea className="h-[700px]">
            <div className="space-y-4">
              {filteredStudies.map((study) => (
                <Card key={study.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold leading-tight">{study.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(study.id)}
                            className="ml-2"
                          >
                            <Star 
                              className={`w-4 h-4 ${
                                bookmarks.includes(study.id) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-400'
                              }`} 
                            />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                          <span>{study.authors.slice(0, 3).join(', ')}</span>
                          {study.authors.length > 3 && <span>et al.</span>}
                          <span>•</span>
                          <span className="font-medium">{study.journal}</span>
                          <span>•</span>
                          <span>{study.year}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline">{getStudyTypeLabel(study.studyType)}</Badge>
                          <Badge className={getEvidenceLevelColor(study.evidenceLevel)}>
                            Niveau {study.evidenceLevel}
                          </Badge>
                          <Badge variant="secondary">
                            <Users className="w-3 h-3 mr-1" />
                            {study.participants.toLocaleString()} patients
                          </Badge>
                          {study.followUp && (
                            <Badge variant="outline">
                              <Calendar className="w-3 h-3 mr-1" />
                              {study.followUp}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Résultats principaux:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {study.keyFindings.slice(0, 3).map((finding, idx) => (
                            <li key={idx} className="text-green-700">{finding}</li>
                          ))}
                          {study.keyFindings.length > 3 && (
                            <li className="text-muted-foreground">+{study.keyFindings.length - 3} autres résultats...</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Pertinence clinique:</h4>
                        <p className="text-sm bg-blue-50 p-3 rounded-lg">{study.clinicalRelevance}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {study.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-xs text-muted-foreground">
                          Critère principal: {study.primaryOutcome}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Résumé complet
                          </Button>
                          {study.doi && (
                            <Button variant="secondary" size="sm" asChild>
                              <a href={`https://doi.org/${study.doi}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                DOI
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Clinical Trials Tab */}
        <TabsContent value="trials">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {clinicalTrials.map((trial) => (
                <Card key={trial.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold flex-1">{trial.title}</h3>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(trial.status)}>
                          {trial.status}
                        </Badge>
                        <Badge variant="outline">Phase {trial.phase}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong>Condition:</strong> {trial.condition}
                      </div>
                      <div>
                        <strong>Intervention:</strong> {trial.intervention}
                      </div>
                      <div>
                        <strong>Critère principal:</strong> {trial.primaryEndpoint}
                      </div>
                      <div>
                        <strong>Fin estimée:</strong> {trial.estimatedCompletion}
                      </div>
                      <div>
                        <strong>Sponsor:</strong> {trial.sponsor}
                      </div>
                      <div>
                        <strong>Localisation:</strong> {trial.location}
                      </div>
                    </div>

                    <div>
                      <strong>Critères d'éligibilité:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        {trial.eligibility.map((criteria, idx) => (
                          <li key={idx}>{criteria}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Guidelines Tab */}
        <TabsContent value="guidelines">
          <div className="space-y-4">
            {guidelines.map((guideline) => (
              <Card key={guideline.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{guideline.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{guideline.organization}</Badge>
                        <Badge variant="secondary">{guideline.year}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <strong>Recommandations clés:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {guideline.keyRecommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <strong>Synthèse des preuves:</strong>
                      <p className="mt-1">{guideline.evidenceSummary}</p>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Dernière mise à jour: {guideline.lastUpdate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks">
          <div className="text-center py-12">
            <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Favoris Vides</h3>
            <p className="text-muted-foreground">
              Ajoutez des articles à vos favoris en cliquant sur ⭐ dans la section littérature
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EvidenceBasedMedicine;
