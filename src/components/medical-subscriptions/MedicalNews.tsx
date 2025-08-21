
import { Calendar, TrendingUp, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'breaking' | 'update' | 'research' | 'policy';
  publishedDate: string;
  source: string;
  priority: 'high' | 'medium' | 'low';
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Nouvelle directive de la HAS sur la prescription d\'antibiotiques',
    content: 'La Haute Autorité de Santé publie de nouvelles recommandations pour limiter la résistance antibiotique en pratique ambulatoire.',
    category: 'policy',
    publishedDate: '2024-01-15',
    source: 'HAS',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Épidémie de grippe: mise à jour des recommandations vaccinales',
    content: 'Face à la recrudescence des cas de grippe, les autorités sanitaires renforcent les recommandations de vaccination pour les populations à risque.',
    category: 'breaking',
    publishedDate: '2024-01-14',
    source: 'Santé Publique France',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Avancée dans la recherche sur la maladie d\'Alzheimer',
    content: 'Une nouvelle étude révèle des biomarqueurs prometteurs pour le diagnostic précoce de la maladie d\'Alzheimer.',
    category: 'research',
    publishedDate: '2024-01-12',
    source: 'INSERM',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Mise à jour des protocoles de téléconsultation',
    content: 'L\'Assurance Maladie actualise les conditions de remboursement et les bonnes pratiques en téléconsultation.',
    category: 'update',
    publishedDate: '2024-01-10',
    source: 'Assurance Maladie',
    priority: 'medium'
  }
];

interface MedicalNewsProps {
  searchQuery: string;
}

const MedicalNews = ({ searchQuery }: MedicalNewsProps) => {
  const filteredNews = mockNews.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breaking':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'research':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'policy':
        return <Info className="w-4 h-4 text-purple-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'breaking':
        return 'Urgent';
      case 'research':
        return 'Recherche';
      case 'policy':
        return 'Réglementation';
      case 'update':
        return 'Mise à jour';
      default:
        return category;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-200';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Actualités Médicales</h3>
        <Badge variant="secondary">{filteredNews.length} actualités</Badge>
      </div>

      <div className="space-y-4">
        {filteredNews.map((news) => (
          <Card key={news.id} className={`hover:shadow-md transition-shadow ${getPriorityColor(news.priority)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(news.category)}
                  <Badge variant="outline">{getCategoryLabel(news.category)}</Badge>
                  {news.priority === 'high' && (
                    <Badge className="bg-red-500">Priorité haute</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-text-muted">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(news.publishedDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <CardTitle className="text-base leading-normal">{news.title}</CardTitle>
              <CardDescription>{news.content}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-muted">Source: {news.source}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicalNews;
