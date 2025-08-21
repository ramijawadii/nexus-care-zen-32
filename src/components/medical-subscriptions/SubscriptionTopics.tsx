
import { useState } from 'react';
import { Plus, Heart, Brain, Bone, Eye, Stethoscope, Activity, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  subscribed: boolean;
  articleCount: number;
  category: string;
}

const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'Cardiologie',
    description: 'Maladies cardiovasculaires, hypertension, insuffisance cardiaque',
    icon: Heart,
    subscribed: true,
    articleCount: 45,
    category: 'Spécialité'
  },
  {
    id: '2',
    name: 'Neurologie',
    description: 'Troubles neurologiques, AVC, épilepsie, démences',
    icon: Brain,
    subscribed: true,
    articleCount: 32,
    category: 'Spécialité'
  },
  {
    id: '3',
    name: 'Orthopédie',
    description: 'Traumatologie, chirurgie orthopédique, rhumatologie',
    icon: Bone,
    subscribed: false,
    articleCount: 28,
    category: 'Spécialité'
  },
  {
    id: '4',
    name: 'Ophtalmologie',
    description: 'Pathologies oculaires, chirurgie de la cataracte, glaucome',
    icon: Eye,
    subscribed: false,
    articleCount: 19,
    category: 'Spécialité'
  },
  {
    id: '5',
    name: 'Médecine Générale',
    description: 'Soins primaires, prévention, diagnostic différentiel',
    icon: Stethoscope,
    subscribed: true,
    articleCount: 67,
    category: 'Générale'
  },
  {
    id: '6',
    name: 'Urgences',
    description: 'Médecine d\'urgence, réanimation, soins critiques',
    icon: Activity,
    subscribed: false,
    articleCount: 41,
    category: 'Spécialité'
  }
];

interface SubscriptionTopicsProps {
  searchQuery: string;
}

const SubscriptionTopics = ({ searchQuery }: SubscriptionTopicsProps) => {
  const [topics, setTopics] = useState<Topic[]>(mockTopics);

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSubscription = (topicId: string) => {
    setTopics(prev => prev.map(topic =>
      topic.id === topicId ? { ...topic, subscribed: !topic.subscribed } : topic
    ));
  };

  const subscribedTopics = filteredTopics.filter(topic => topic.subscribed);
  const availableTopics = filteredTopics.filter(topic => !topic.subscribed);

  return (
    <div className="space-y-6">
      {subscribedTopics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Mes Abonnements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscribedTopics.map((topic) => (
              <Card key={topic.id} className="border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <topic.icon className="w-5 h-5 text-primary" />
                      <CardTitle className="text-base">{topic.name}</CardTitle>
                    </div>
                    <Switch
                      checked={topic.subscribed}
                      onCheckedChange={() => toggleSubscription(topic.id)}
                    />
                  </div>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{topic.category}</Badge>
                    <span className="text-sm text-text-muted">{topic.articleCount} articles</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {availableTopics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Sujets Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTopics.map((topic) => (
              <Card key={topic.id} className="border-border-primary hover:border-primary/30 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <topic.icon className="w-5 h-5 text-text-secondary" />
                      <CardTitle className="text-base">{topic.name}</CardTitle>
                    </div>
                    <Switch
                      checked={topic.subscribed}
                      onCheckedChange={() => toggleSubscription(topic.id)}
                    />
                  </div>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{topic.category}</Badge>
                    <span className="text-sm text-text-muted">{topic.articleCount} articles</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTopics;
