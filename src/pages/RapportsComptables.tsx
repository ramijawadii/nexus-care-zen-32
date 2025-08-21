
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Download, Calendar, FileText } from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import RapportsExports from '../components/finance/RapportsExports';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const RapportsComptables = () => {
  console.log('Rapports Comptables page loaded successfully');

  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Rapports Comptables</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Période
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Modèles
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Global
                </Button>
              </div>
            </header>

            <main className="p-6">
              <RapportsExports />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default RapportsComptables;
