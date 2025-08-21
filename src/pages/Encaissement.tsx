
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Plus, Download, BarChart3 } from 'lucide-react';
import AppSidebar from '../components/AppSidebar';
import EncaissementManagement from '../components/finance/EncaissementManagement';
import GlobalChatbot from '../components/shared/GlobalChatbot';

const EncaissementPage = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          <SidebarInset>
            <header className="h-16 bg-surface-elevated border-b border-border-primary flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold text-text-primary">Encaissements & Collections</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Rapports
                </Button>
                <Button size="sm" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel Encaissement
                </Button>
              </div>
            </header>

            <main>
              <div className="p-6">
                <EncaissementManagement />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default EncaissementPage;
