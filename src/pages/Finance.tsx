
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Calculator,
  Plus,
  TrendingDown,
  FileText
} from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import GestionTresorerie from '../components/finance/GestionTresorerie';
import RapportsExports from '../components/finance/RapportsExports';
import IndicateursMedicaux from '../components/finance/IndicateursMedicaux';
import AutomatisationsAlertes from '../components/finance/AutomatisationsAlertes';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const Finance = () => {
  console.log('Finance component loaded successfully');
  
  const handleAddEncaissement = () => {
    // Redirect to comptabilite generale page
    window.location.href = '/comptabilite-generale';
  };

  const handleAddDepense = () => {
    // Redirect to depenses page
    window.location.href = '/depenses';
  };

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Finance & Comptabilité - Cabinet Médical</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleAddEncaissement}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Encaissement
                </Button>
                <Button size="sm" onClick={handleAddDepense}>
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Ajouter une Dépense
                </Button>
              </div>
            </header>

            <main className="p-6">
              <Tabs defaultValue="tresorerie" className="space-y-6">
                {/* Main Navigation Tabs - Dark Theme */}
                <TabsList className="grid w-full grid-cols-4 bg-slate-900 p-1">
                  <TabsTrigger 
                    value="tresorerie" 
                    className="flex items-center text-white data-[state=active]:bg-slate-700 data-[state=active]:text-white hover:bg-slate-800"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Trésorerie
                  </TabsTrigger>
                  <TabsTrigger 
                    value="indicateurs" 
                    className="flex items-center text-white data-[state=active]:bg-slate-700 data-[state=active]:text-white hover:bg-slate-800"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Indicateurs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="automatisations" 
                    className="flex items-center text-white data-[state=active]:bg-slate-700 data-[state=active]:text-white hover:bg-slate-800"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Automatisations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rapports" 
                    className="flex items-center text-white data-[state=active]:bg-slate-700 data-[state=active]:text-white hover:bg-slate-800"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Rapports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tresorerie">
                  <GestionTresorerie />
                </TabsContent>

                <TabsContent value="indicateurs">
                  <IndicateursMedicaux />
                </TabsContent>

                <TabsContent value="automatisations">
                  <AutomatisationsAlertes />
                </TabsContent>

                <TabsContent value="rapports">
                  <RapportsExports />
                </TabsContent>
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default Finance;
