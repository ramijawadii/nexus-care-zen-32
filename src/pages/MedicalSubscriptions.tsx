
import { useState } from 'react';
import { Search, Bell, Settings, Plus, BookOpen, Newspaper, FileText } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AppSidebar from '../components/AppSidebar';
import SubscriptionTopics from '../components/medical-subscriptions/SubscriptionTopics';
import RecentArticles from '../components/medical-subscriptions/RecentArticles';
import MedicalNews from '../components/medical-subscriptions/MedicalNews';
import GuidelinesEvidence from '../components/medical-subscriptions/GuidelinesEvidence';

const MedicalSubscriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <SidebarInset>
          <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-subtle" />
                <Input
                  type="text"
                  placeholder="Rechercher des articles, sujets médicaux..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-96"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </header>

          <main className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Veille Médicale</h2>
                <p className="text-text-muted">Suivez les dernières actualités et recommandations médicales</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Gérer les Abonnements</span>
              </Button>
            </div>

            <Tabs defaultValue="subscriptions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="subscriptions" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Abonnements</span>
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Articles Récents</span>
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center space-x-2">
                  <Newspaper className="w-4 h-4" />
                  <span>Actualités</span>
                </TabsTrigger>
                <TabsTrigger value="guidelines" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Recommandations</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="subscriptions" className="mt-6">
                <SubscriptionTopics searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="articles" className="mt-6">
                <RecentArticles searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="news" className="mt-6">
                <MedicalNews searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="guidelines" className="mt-6">
                <GuidelinesEvidence searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MedicalSubscriptions;
