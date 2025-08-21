
import { Clock, ExternalLink, BookmarkPlus, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  summary: string;
  journal: string;
  publishedDate: string;
  authors: string[];
  topic: string;
  url: string;
  isNew: boolean;
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Nouvelle approche thérapeutique dans le traitement de l\'insuffisance cardiaque',
    summary: 'Cette étude présente une approche innovante combinant thérapie génique et médicaments traditionnels pour améliorer la fonction cardiaque chez les patients atteints d\'insuffisance cardiaque chronique.',
    journal: 'European Heart Journal',
    publishedDate: '2024-01-15',
    authors: ['Dr. Marie Dubois', 'Prof. Jean Martin'],
    topic: 'Cardiologie',
    url: '#',
    isNew: true
  },
  {
    id: '2',
    title: 'Impact de l\'IA dans le diagnostic précoce des AVC',
    summary: 'Analyse comparative de l\'efficacité des algorithmes d\'intelligence artificielle versus les méthodes traditionnelles pour le diagnostic précoce des accidents vasculaires cérébraux.',
    journal: 'Stroke Medicine',
    publishedDate: '2024-01-12',
    authors: ['Dr. Sophie Laurent', 'Dr. Pierre Rousseau'],
    topic: 'Neurologie',
    url: '#',
    isNew: true
  },
  {
    id: '3',
    title: 'Protocoles de prévention en médecine générale post-COVID',
    summary: 'Recommandations actualisées pour la prévention et le suivi des patients en médecine générale dans le contexte post-pandémique.',
    journal: 'Family Medicine Review',
    publishedDate: '2024-01-10',
    authors: ['Dr. Anne Moreau', 'Dr. Luc Bernard'],
    topic: 'Médecine Générale',
    url: '#',
    isNew: false
  }
];

interface RecentArticlesProps {
  searchQuery: string;
}

const RecentArticles = ({ searchQuery }: RecentArticlesProps) => {
  const filteredArticles = mockArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Articles Récents</h3>
        <Badge variant="secondary">{filteredArticles.length} articles</Badge>
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{article.topic}</Badge>
                    {article.isNew && <Badge className="bg-primary">Nouveau</Badge>}
                  </div>
                  <CardTitle className="text-base leading-normal mb-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm">{article.summary}</CardDescription>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="ghost" size="icon">
                    <BookmarkPlus className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-text-muted">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{article.journal}</span>
                  <span>Par {article.authors.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(article.publishedDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentArticles;
